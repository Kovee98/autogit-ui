<template>
    <div class="mt-10 grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div
            v-for="note in notes"
            :key="note.id"
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
        >
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {{ note.title }}
            </p>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ note.body }}
            </p>
        </div>
    </div>

    <PlusButton />
</template>

<script>
    import PlusButton from '../components/PlusButton.vue';
    import { liveQuery } from "dexie";
    import { useObservable } from "@vueuse/rxjs";
    import { db } from '../js/db.js';

    export default{
        components: {
            PlusButton
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
