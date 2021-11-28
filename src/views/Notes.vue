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
    import { reactive, ref, onMounted, watchEffect } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import ActionButtons from '../components/ActionButtons.vue';
    import NoteCard from '../components/NoteCard.vue';
    import rxdb from '../js/rxdb.js';
    import emitter from '../js/mitt.js';
    import { session } from '../js/storage.js';
    import { buildSession, setExpirationTimer, isAuthorized } from '../js/auth.js';
    import globals from '../js/globals.js';

    export default{
        components: {
            ActionButtons,
            NoteCard
        },

        setup () {
            const router = useRouter();
            const route = useRoute();
            const openNote = ref( '-1');
            const notes = reactive([]);

            const updateNotes = async (filter) => {
                let dbNotes = await rxdb?.notes?.find().exec();

                // update tags
                const tags = new Set();
                for (let i = 0; i < dbNotes?.length; i++) {
                    for (let j = 0; j < dbNotes[i]?.tags?.length; j++) {
                        tags.add(dbNotes[i]?.tags[j]);
                    }
                }
                const tagsArr = Array.from(tags);
                globals.tags.splice(0, globals.tags.length, ...tagsArr);

                // update array reactively
                if (Array.isArray(dbNotes)) {
                    if (filter) {
                        dbNotes = dbNotes.filter((note) => note?.tags?.some((tag) => filter?.includes(tag)));
                    }

                    notes.splice(0, notes.length, ...dbNotes);
                }
            };

            emitter.on('update-notes', updateNotes);
            emitter.on('open-note', (id) => {
                openNote.value = id;
            });

            watchEffect(() => {
                const filter = route?.query?.filter?.split(',');
                updateNotes(filter);
            });

            onMounted(async () => {
                const isBuilt = isAuthorized() || await buildSession(router);

                if (isBuilt) {
                    const user = session.get('user');
                    await rxdb.init(user);
                    setExpirationTimer();

                    router.push('/notes');
                } else {
                    router.push('/login');
                }
            });

            return {
                openNote,
                notes
            };
        }
    };
</script>
