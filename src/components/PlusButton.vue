<template>
    <button
        @click="addNote"
        class="fixed rounded-full bottom-8 right-8 bg-yellow-800 w-15 h-15 shadow-md"
    >
        <i class="icon-plus text-gray-200 text-lg" />
    </button>
</template>

<script>
    import db from '../js/rxdb.js';
    import emitter from '../js/mitt.js';

    export default {
        setup () {
            const addNote = async () => {
                const res = await db?.notes?.put({
                    title: 'Untitled Note',
                    body: '',
                    tags: []
                });

                emitter.emit('open-note', res.id);
            };

            return {
                addNote,
            };
        }
    }
</script>
