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
        @click="closeNote"
        class="absolute left-0 top-0 w-screen h-screen bg-black opacity-75 z-index-100 flex items-center justify-center"
    />
    <div
        v-if="isOpen"
        class="absolute left-20 right-20 top-25 bottom-25 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 z-index-200 flex flex-col"
    >
        <input
            type="text"
            v-model="form.title"
            class="bg-transparent text-2xl font-semibold text-gray-700 dark:text-gray-200 w-full focus:outline-none border-b border-gray-700 p-2 mb-3"
        >

        <textarea
            cols="30"
            class="bg-transparent text-md text-gray-600 dark:text-gray-200 w-full focus:outline-none h-full mb-8 p-2 resize-none"
            v-model="form.body"
            placeholder="(empty)"
        />

        <div class="w-full flex justify-end border-t border-gray-700 pt-3">
            <button
                @click="saveNote"
                class="btn btn-success"
            >
                Save
            </button>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import emitter from '../js/mitt.js';
    import db from '../js/rxdb.js';

    export default {
        props: {
            note: Object,
            open: String
        },

        setup ({ note, open }) {
            const isOpen = ref((note.id === open) || false);
            const form = JSON.parse(JSON.stringify(note.toJSON()));

            const closeNote = () => {
                isOpen.value = false;
                emitter.emit('open-note', '-1');
            };

            const saveNote = async () => {
                try {
                    await db?.notes?.put(form);
                    closeNote();
                } catch (err) {
                    console.error('NoteCard:saveNote:err', err);
                }
            };

            return {
                form,
                isOpen,
                closeNote,
                saveNote
            };
        }
    }
</script>
