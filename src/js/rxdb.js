import "@babel/polyfill";
import config from './config.js';
import { addPouchPlugin, createRxDatabase, getRxStoragePouch } from 'rxdb';
import emitter from './mitt.js';
import schemas from '../schemas';
import { PROVIDERS } from "./enums.js";

// add idb for local storage
import * as idb from "pouchdb-adapter-idb";
addPouchPlugin(idb);

// enable replication to couchdb
import * as http from "pouchdb-adapter-http";
addPouchPlugin(http);

const rxdb = {
    db: null,
    notes: null,
    settings: null,

    async createDB (user) {
        try {
            // create a database
            const db = await createRxDatabase({
                name: `notella_${PROVIDERS[user.provider]}${user.id}`,
                storage: getRxStoragePouch('idb'),
                // TODO: figure out a way to have this password come dynamically from the user object
                password: config.dbPass // used to encrypt fields when defined in the schema
            });

            return db;
        } catch (err) {
            console.error('rxdb:createDB:err', err);
            return false;
        }
    },

    async createCollection (name, user) {
        try {
            // db needs to exist
            if (!rxdb.db) return false;

            // create collections
            await rxdb.db.addCollections({
                [name]: {
                    schema: schemas[name]
                }
            });

            // add custom methods
            rxdb.db[name].put = async function (doc) {
                let res;

                try {
                    doc.id = doc.id || String(Date.now());
                    res = await this.upsert(doc);
                } catch (err) {
                    console.error('rxdb:add:err', err);
                    res = false;
                }

                emitter.emit(`update-${name}`);

                return res;
            }

            rxdb.db[name].clear = async function (doc) {
                try {
                    const record = await rxdb.db[name].findOne(doc.id).exec();
                    await record.remove();
                } catch (err) {
                    console.error('rxdb:add:err', err);
                }

                emitter.emit(`update-${name}`);
            }

            rxdb.db[name].clearAll = async function (doc) {
                try {
                    const records = await rxdb.db[name].find().exec();
                    const ids = records.map((record) => record.id);

                    await this.bulkRemove(ids);
                } catch (err) {
                    console.error('rxdb:add:err', err);
                }

                emitter.emit(`update-${name}`);
            }

            rxdb.db[name].start = async function (user) {
                try {
                    const remote = `${config.dbUrl}/notella_${PROVIDERS[user.provider]}${user.id}_${name}`;

                    // do one way, one-off sync from the server until completion
                    const pull = rxdb.db[name].syncCouchDB({
                        remote: remote,
                        waitForLeadership: false,
                        options: {
                            live: false,
                            retry: true
                        }
                    });

                    pull.awaitInitialReplication()
                        .then(() => {
                            emitter.emit(`update-${name}`);
                        });

                    // two-way, continuous, retriable sync
                    const sync = rxdb.db[name].syncCouchDB({
                        remote: remote,
                        options: {
                            live: true,
                            retry: true
                        }
                    });

                    sync.change$.subscribe((data) => {
                        console.log(`rxdb:sync:change:`, data);
                        emitter.emit(`update-${name}`);
                    });

                    sync.denied$.subscribe((data) => {
                        console.log(`rxdb:sync:denied:`, data);
                    });

                    sync.error$.subscribe((err) => {
                        console.log(`rxdb:start:error:`, err);
                    });
                } catch (err) {
                    console.error('rxdb:start:err', err);
                }
            }

            rxdb[name] = rxdb.db[name];

            return rxdb[name];
        } catch (err) {
            console.error('rxdb:createCollection:err', err);
            return false;
        }
    },

    async start (user) {
        try {
            rxdb?.notes?.start(user);
            // rxdb?.settings?.start(user);

            return true;
        } catch (err) {
            console.error('rxdb:start:err', err);
            return false;
        }
    },

    async stop () {
        try {
            await rxdb?.notes?.remove();
            // await rxdb?.settings?.remove();
            await rxdb?.db?.remove();

            await rxdb?.notes?.destroy();
            // await rxdb?.settings?.destroy();
            await rxdb?.db?.destroy();

            rxdb.notes = undefined;
            rxdb.settings = undefined;
            rxdb.db = undefined;

            return true;
        } catch (err) {
            console.error('rxdb:stop:err', err);
            return false;
        }
    },

    async init (user = { id: 'test' }) {
        try {
            rxdb.db = rxdb.db || await rxdb.createDB(user);

            rxdb.notes = rxdb.notes || await rxdb.createCollection('notes', user);
            // rxdb.settings = rxdb.settings || await rxdb.createCollection('settings', user);

            rxdb.start(user);
        } catch (err) {
            console.error('rxdb:init:err', err);
        }
    },
};

export let db = rxdb.db;
export let notes = rxdb.notes;

export default rxdb;
