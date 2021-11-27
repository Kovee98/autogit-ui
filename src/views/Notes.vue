<template>
    <div class="mt-10 grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <NoteCard
            v-for="note in notes"
            :key="note.id"
            :note="note"
            :open="openNote"
        />
    </div>

    <ActionButtons />
</template>

<script>
    import { reactive, ref } from 'vue';
    import ActionButtons from '../components/ActionButtons.vue';
    import NoteCard from '../components/NoteCard.vue';
    import rxdb from '../js/rxdb.js';
    import emitter from '../js/mitt.js';

    export default{
        components: {
            ActionButtons,
            NoteCard
        },

        setup () {
            const openNote = ref( '-1');
            const notes = reactive([]);

            const updateNotes = async () => {
                const dbNotes = await rxdb?.db?.notes?.find().exec();

                // update array reactively
                if (Array.isArray(dbNotes)) {
                    notes.splice(0, notes.length, ...dbNotes);
                }
            };

            emitter.on('update-notes', updateNotes);
            // onMounted(() => updateNotes);

            emitter.on('open-note', (id) => {
                openNote.value = id;
            });

            return {
                openNote,
                notes
            };
        }
    };
</script>
