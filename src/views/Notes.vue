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
    import { computed } from 'vue';
    import PlusButton from '../components/PlusButton.vue';
    import NoteCard from '../components/NoteCard.vue';
    import { liveQuery } from "dexie";
    import { useObservable } from "@vueuse/rxjs";
    // import { db } from '../js/db.js';
    import { db } from '../js/rxdb.js';

    export default{
        components: {
            PlusButton,
            NoteCard
        },

        setup () {
            const notes = computed(() => {
                if ((db || {}).notes) {
                    console.log('grabbing notes');
                    return db.notes
                        .find()
                        .exec();
                } else {
                    return [];
                }
            });
            // const notes = useObservable(
            //     liveQuery(() => {
            //         if ((db || {}).notes) {
            //             return db.notes
            //                 .find()
            //                 .exec();
            //         } else {
            //             return [];
            //         }
            //     }));

            return {
                notes
            };
        }
    };
</script>
