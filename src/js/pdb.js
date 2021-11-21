// import * as PouchDB from 'pouchdb';

// // add plugins
// PouchDB.plugin(require('pouchdb-authentication'));
// PouchDB.plugin(require('crypto-pouch'));

// function createDB(name, opts) {
//     const db = new PouchDB(name);

//     // create search indexes
//     if(opts.indexes) {
//         db.createIndex({
//             index: {
//                 fields: [...opts.indexes],
//                 ddoc: name,
//                 name: name
//             }
//         }).catch((err) => {
//             log.info(`${String(name).toUpperCase()}:index:err`, err);
//         });
//     }

//     // stops replication if the handler exists
//     db.stop = function () {
//         if (db.replication) {
//             log.info(`pdb:${String(db.name).toUpperCase()}:repl stopping`);
//             db.replication.cancel();
//         } else {
//             log.info(`pdb:${String(db.name).toUpperCase()}:repl already stopped`);
//         }

//         db.replication = null;
//         db.isStarted = false;
//     };

//     db.start = function (driver) {
//         if(SYNC.ENABLED && SYNC.URL && !db.isStarted) {
//             log.info(`pdb:${String(db.name).toUpperCase()}:repl:start`);

//             var opts = {
//                 live: true,
//                 retry: true,
//                 heartbeat: SYNC.HEARTBEAT,
//                 timeout: SYNC.HEARTBEAT,
//                 back_off_function: function(delay) {
//                     if(delay === 0) {
//                         return SYNC.HEARTBEAT;
//                     } else if (delay >= SYNC.HEARTBEAT) {
//                         return delay;
//                     } else {
//                         return delay * 3;
//                     }
//                 }
//             };

//             const name = driver ? `${db.name}-${driver.id}` : db.name;
//             const remote = `${SYNC.URL}/${name}`;

//             // cancel old replication before starting, to be safe
//             db.stop();

//             // do one way, one-off sync from the server until completion
//             db.replicate.from(remote).on('complete', function (info) {
//                 actions[db.name].onComplete(db, info);

//                 // two-way, continuous, retriable sync
//                 db.replication = db.sync(remote, opts)
//                     .on('change', (info) => actions[db.name].onChange(db, { db: db.name, ...info }))
//                     .on('error', (err) => actions[db.name].onError(db, err));
//             }).on('error', (err) => actions[db.name].onError(db, err));

//             db.isStarted = true;
//         }
//     };

//     // resolves with all docs in local db
//     db.getAll = function (opts = {}) {
//         return db.allDocs({ include_docs: true })
//             .then((res) => res.rows)
//             .then((rows) => rows.map((row) => row.doc))
//             .then((docs) => opts.include_design ? docs : docs.filter((doc) => doc._id[0] !== '_'));
//     };

//     // abstract update function
//     db.update = function(data) {
//         return db.get(String(data._id)).then((doc) => {
//             log.info(`pdb:${String(db.name).toUpperCase()}:update`, data);

//             // use _rev we just got
//             delete(data._rev);

//             // Update object
//             let record = Object.assign(doc, data);

//             // Update record
//             return db.put(record)
//                 .then((res) => db.get(res.id).catch((err) => {
//                     return record._deleted ? { _deleted: true } : err;
//                 }));
//         }).catch((err) => {
//             // reject but not error
//             if(err.status && err.status === 404) {
//                 return Promise.reject(err);
//             } else {
//                 log.error(`pdb:${String(db.name).toUpperCase()}:UPDATE`, err.status, err.name);
//                 return Promise.reject(err);
//             }
//         });
//     };

//     // updates if existing, inserts otherwise
//     db.upsert = function(doc) {
//         return db.get(String(doc._id))
//             .then(() => db.update(doc))
//             .catch(() => db.put(doc))
//             .then((res) => db.get(res.id || res._id));
//     };

//     db.clear = function() {
//         return new Promise((resolve, reject) => {
//             db.getAll().then((docs) => {
//                 if(docs.length) {
//                     let queued = [];

//                     // build call request array
//                     docs.forEach((record) => {
//                         queued.push(db.put(Object.assign(record, {_deleted: true})));
//                     });

//                     // process queue
//                     Promise.all(queued).then(() => {
//                         log.info(`pdb:PURGE:${String(db.name).toUpperCase()}`, docs.length);
//                         return resolve(true);
//                     }).catch((err) => {
//                         log.error(`pdb:PURGE:${String(db.name).toUpperCase()}:ERR`, err);
//                         return reject(false);
//                     });
//                 } else {
//                     log.info(`pdb:PURGE:${String(db.name).toUpperCase()}`, 'Nothing to purge');
//                     return resolve(false);
//                 }
//             });
//         });
//     };

//     db.delete = async function () {
//         const res = await db.destroy();
//         delete pdb[db.name];
//         return Promise.resolve(res);
//     };

//     // compact pre-existing data
//     db.compact();

//     return db;
// }
// let pdb = {
//     // closes all db connections
//     disconnect: function () {
//         return Promise.all([
//             pdb.notes.close(),
//         ]).then(() => {
//             pdb.notes = undefined;
//         });
//     },
//     // closes and reopens all db connections
//     reconnect: function () {
//         return pdb.disconnect()
//             .then(() => pdb.init());
//     },
//     // starts replication for dbs
//     start: function (driver) {
//         pdb.notes.start(driver);
//     },
//     // stops replication for dbs
//     stop: function () {
//         pdb.notes.stop();
//     },
//     // stops and then starts replication for dbs
//     restart: function (user) {
//         pdb.stop();
//         pdb.start(user);
//     },
//     init: function (driver) {
//         pdb.notes = pdb.notes || createDB('notes', {indexes: ['created', 'action', 'status']});

//         // auto-restart replication if driver is logged in
//         driver = driver || local.get('driver');
//         if (driver && driver.id) {
//             pdb.start(driver);
//         }
//     }
// };

// export default pdb;
