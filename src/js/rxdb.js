import "@babel/polyfill";
import config from './config.js';
import { addPouchPlugin, createRxDatabase, getRxStoragePouch } from 'rxdb';
import noteSchema from '../schemas/notes.js';
import emitter from './mitt.js';

// add idb for local storage
import * as idb from "pouchdb-adapter-idb";
addPouchPlugin(idb);

// enable replication to couchdb
import * as http from "pouchdb-adapter-http";
addPouchPlugin(http);

let init = false;
export let db = null;

export async function initDb (user = { username: 'jkovalchik' }) {
    try {
        // check if we're already initialized
        if (init) return true;

        const dbName = `notella_${user.username}`

        // create a database
        db = await createRxDatabase({
            name: dbName,
            storage: getRxStoragePouch('idb'),
            // used to encrypt fields when defined in the schema
            password: config.dbPass
        });

        // create collections
        await db.addCollections({
            notes: {
                schema: noteSchema
            }
        });

        // add custom methods
        db.notes.add = async function (doc) {
            try {
                doc.id = String(Date.now());
                await this.upsert(doc);
            } catch (err) {
                console.error('rxdb:add:err', err);
            }

            emitter.emit('update-notes');
        }

        db.notes.clear = async function (doc) {
            try {
                const note = await db.notes.findOne(doc.id).exec();
                await note.remove();
            } catch (err) {
                console.error('rxdb:add:err', err);
            }

            emitter.emit('update-notes');
        }

        db.notes.clearAll = async function (doc) {
            try {
                const notes = await db.notes.find().exec();
                const ids = notes.map((note) => note.id);
                
                await this.bulkRemove(ids);
            } catch (err) {
                console.error('rxdb:add:err', err);
            }

            emitter.emit('update-notes');
        }

        // do one way, one-off sync from the server until completion
        const notePull = db.notes.syncCouchDB({
            remote: `${config.dbUrl}/${dbName}`,
            waitForLeadership: false,
            options: {
                live: false,
                retry: true
            }
        });

        await notePull.awaitInitialReplication();
        emitter.emit('update-notes');

        // two-way, continuous, retriable sync
        const noteSync = db.notes.syncCouchDB({
            remote: `${config.dbUrl}/${dbName}`,
            options: {
                live: true,
                retry: true
            }
        });

        noteSync.change$.subscribe((data) => {
            console.log(`rxdb:sync:change:`, data);
            emitter.emit('update-notes');
        });

        noteSync.denied$.subscribe((data) => {
            console.log(`rxdb:sync:denied:`, data);
        });

        noteSync.error$.subscribe((err) => {
            console.log(`rxdb:sync:error:`, err);
        });

        // we've been initialized
        init = true;
    } catch (err) {
        console.error('rxdb:init:err', err);
    }
}