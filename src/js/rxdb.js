// import { 
//     addPouchPlugin,
//     createRxDatabase,
//     getRxStoragePouch
// } from '../vendor/rxdb/rxdb.browserify.js';

import {
    addPouchPlugin,
    createRxDatabase,
    getRxStoragePouch
} from '../vendor/rxdb/es';

// add the pouchdb indexeddb adapter
addPouchPlugin(require('pouchdb-adapter-idb'));

export async function initDb () {
    // create a database
    const db = await createRxDatabase({
        // the name of the database
        name: 'heroesdb',
        // use pouchdb with the indexeddb-adapter as storage engine.
        storage: getRxStoragePouch('idb'),
        // optional password, used to encrypt fields when defined in the schema
        password: 'myLongAndStupidPassword'
    });

    // create collections
    await db.addCollections({
    heroes: {
        schema: mySchema
    }
    });

    // insert a document
    db.heroes.insert({ name: 'Bob' });
}