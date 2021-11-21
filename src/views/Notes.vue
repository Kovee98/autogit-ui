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
    import PlusButton from '../components/PlusButton.vue';
    import NoteCard from '../components/NoteCard.vue';
    import { liveQuery } from "dexie";
    import { useObservable } from "@vueuse/rxjs";
    import { db } from '../js/db.js';

    export default{
        components: {
            PlusButton,
            NoteCard
        },

        setup () {
            const notes = useObservable(
                liveQuery(() => db.notes.toArray())
            );

            return {
                notes
            };
        }
    };
</script>
