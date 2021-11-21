<template>
    <button
        @click="addNote"
        class="fixed rounded-full bottom-8 right-8 bg-yellow-800 w-15 h-15 shadow-md"
    >
        <i class="icon-plus text-gray-200 text-lg" />
    </button>
    <button
        @click="clearAll"
        class="fixed rounded-full bottom-8 right-30 bg-red-800 w-15 h-15 shadow-md text-gray-200 text-6xl"
    >
        -
    </button>
    <button
        @click="saveAll"
        class="fixed rounded-full bottom-8 right-55 bg-green-500 w-15 h-15 shadow-md text-gray-200"
    >
        Save
    </button>
    <button
        @click="getAll"
        class="fixed rounded-full bottom-8 right-75 bg-green-500 w-15 h-15 shadow-md text-gray-200"
    >
        Get
    </button>
</template>

<script>
    import { db, loadData } from '../js/db.js';
    import http from '../js/http.js';

    export default {
        setup () {
            const addNote = async () => {
                await db.notes.add({
                    user: 'jkovalchik',
                    title: 'Example Note',
                    body: 'This is my first note in Notella!',
                    tags: []
                });
                console.log('note added');
            };

            const clearAll = async () => {
                await db.notes.clear();
                console.log('deleted');
            };

            const getAll = async () => {
                const data = await http.get('/notes')
                    .then((res) => JSON.parse(res.data));

                console.log('got:', data);
            };

            const saveAll = async () => {
                const data = await db.notes.toArray();
                await http.post('/notes', {
                    body: JSON.stringify({ data })
                });

                console.log('saved');
            };

            const loadData = async () => {
                const data = await db.notes.toArray();
                await http.put('/notes', {
                    body: JSON.stringify({ data })
                });

                console.log('saved');
            };

            return {
                addNote,
                clearAll,
                getAll,
                saveAll,
                loadData
            };
        }
    }
</script>
