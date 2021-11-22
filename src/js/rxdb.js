import "@babel/polyfill";
import config from './config.js';
import { addPouchPlugin, createRxDatabase, getRxStoragePouch } from 'rxdb';
import noteSchema from '../schemas/notes.js';

// add idb for local storage
import * as idb from "pouchdb-adapter-idb";
addPouchPlugin(idb);

// enable replication to couchdb
import * as http from "pouchdb-adapter-http";
addPouchPlugin(http);

export let db = null;

export async function initDb (user = { username: 'jkovalchik' }) {
    try {
        const dbName = `notella_${user.username}`

        // create a database
        db = await createRxDatabase({
            // the name of the database
            name: dbName,
            storage: getRxStoragePouch('idb'),
            // optional password, used to encrypt fields when defined in the schema
            password: config.dbPass
        });

        // create collections
        await db.addCollections({
            notes: {
                schema: noteSchema
            }
        });

        const sync = db.notes.syncCouchDB({
            remote: `${config.dbUrl}/${dbName}`,
            options: {
                live: true,
                retry: true
            }
        });

        sync.denied$.subscribe((data) => {
            console.log(`rxdb:sync:denied:`, data);
        });

        sync.error$.subscribe((err) => {
            console.log(`rxdb:sync:error:`, err);
        });
    } catch (err) {
        console.error('rxdb:init:err', err);
    }
}