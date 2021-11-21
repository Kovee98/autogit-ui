import config from './config.js';
import Dexie from 'dexie';
import http from './http.js';

export const db = new Dexie('notella');

db.version(1).stores({
    notes: '++nid, title, body, tags', // Primary key and indexed props
});


/*
    philosphy:  
        on start - save first and then pull
        - won't lose data from when offline for long periods of time
        - will merge the data for us
*/


async function saveData () {
    let start = new Date();

    try {
        await db.notes.toArray()
            .then((data = {}) => http.post('/notes', {
                body: JSON.stringify({ data })
            }));
    } catch (err) {
        console.error('save:err', err);
    }

    const end = new Date();
    const time = end - start;
    const waitTime = config.saveInterval - time;

    setTimeout(saveData, Math.max(waitTime, 0));
}

export async function loadData () {
    const localData = await db.notes.toArray();
    console.log('localData:', localData);

    const newData = await http.put('/notes', {
        body: JSON.stringify({ data: localData })
    });
    // const data = await http.get('/notes')
    //     .then((res) => JSON.parse(res.data));

    console.log('newData:', newData);
}

// start data synchronization
export async function init () {
    try {
        // pull data on app start
        await loadData();
    
        // start data saving loop after pull
        // setTimeout(saveData, config.saveStartDelay);
    } catch (err) {
        console.error('init:err', err);
    }
}