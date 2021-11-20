import Dexie from 'dexie';

export const db = new Dexie('notella');

db.version(1).stores({
    notes: '++id, title, body, tags', // Primary key and indexed props
});