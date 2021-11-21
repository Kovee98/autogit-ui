<template>
    <!-- note card in the list -->
    <div
        @click="isOpen = true"
        class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 cursor-pointer"
        :class="{ '' : isOpen, 'cursor-pointer' : !isOpen }"
    >
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ note.title }}
        </p>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ note.body }}
        </p>
    </div>

    <!-- expanded note card -->
    <!-- backdrop -->
    <div
        v-if="isOpen"
        @click="isOpen = false"
        class="absolute left-0 top-0 w-screen h-screen bg-black opacity-75 z-index-100 flex items-center justify-center"
    />
    <div
        v-if="isOpen"
        class="absolute left-20 right-20 top-25 bottom-25 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 z-index-200"
    >
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ note.title }}
        </p>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ note.body }}
        </p>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        props: {
            note: Object
        },

        setup ({ note }) {
            const isOpen = ref(false);

            return {
                note,
                isOpen
            };
        }
    }
</script>
