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
</template>

<script>
    import { db } from '../js/rxdb.js';
    import emitter from '../js/mitt.js';

    export default {
        setup () {
            const addNote = async () => {
                await db.notes.add({
                    title: 'Example Note',
                    body: 'This is my first note in Notella!',
                    tags: []
                });
            };

            const clearAll = async () => {
                await db.notes.clearAll();
            };

            return {
                addNote,
                clearAll,
            };
        }
    }
</script>
