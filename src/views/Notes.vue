<template>
    <div class="mt-10 grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <NoteCard
            v-for="note in notes"
            :key="note.id"
            :note="note"
        />
    </div>

    <PlusButton />
</template>

<script>
    import { reactive } from 'vue';
    import PlusButton from '../components/PlusButton.vue';
    import NoteCard from '../components/NoteCard.vue';
    import { db } from '../js/rxdb.js';
    import emitter from '../js/mitt.js';

    export default{
        components: {
            PlusButton,
            NoteCard
        },

        setup () {
            const notes = reactive([]);

            emitter.on('update-notes', async () => {
                console.log('update-notes');
                const dbNotes = await db.notes
                    .find()
                    .exec();

                // update array reactively
                notes.splice(0, notes.length, ...dbNotes);
            });

            return {
                notes
            };
        }
    };
</script>
