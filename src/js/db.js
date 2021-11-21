import config from './config.js';
import Dexie from 'dexie';
import http from './http.js';

export const db = new Dexie('notella');

db.version(1).stores({
    notes: '++nid, title, body, tags', // Primary key and indexed props
});

export async function syncData () {
    let start = new Date();

    try {
        const localData = await db.notes.toArray();
        console.log('localData:', localData);
    
        const newData = await http.put('/notes', {
            body: JSON.stringify({ data: localData })
        }).then((res = {}) => res.data);
    
        console.log('newData:', newData);



        const keys = newData.map((note) => note.nid);
        console.log('keys:', keys);
        const removals = localData
            .filter((note) => !keys.includes(note.nid))
            .map((note) => note.nid);
        console.log('removals:', removals);

        if (removals?.length > 0) {
            await db.notes.bulkDelete(removals);
        }

        if (newData?.length > 0) {
            await db.notes.bulkPut(newData);
        }
    } catch (err) {
        console.error('sync:err', err);
    }

    const end = new Date();
    const time = end - start;
    const waitTime = config.saveInterval - time;

    setTimeout(syncData, Math.max(waitTime, 0));
}

// start data synchronization
export async function init () {
    try {
        // start data saving loop after pull
        // setTimeout(syncData, config.saveStartDelay);
    } catch (err) {
        console.error('init:err', err);
    }
}