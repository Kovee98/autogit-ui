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
    </div>

    <!-- expanded note card -->
    <!-- backdrop -->
    <div
        v-if="isOpen"
        class="absolute left-0 top-0 w-screen h-screen z-index-100 flex items-center justify-center"
    >
        <div
            @click="closeNote"
            class="absolute left-0 top-0 w-screen h-screen bg-black opacity-75 z-40"
        />
        <div class="w-140 h-225 z-50 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 z-index-200 flex flex-col">
            <div class="w-full flex justify-between">
                <input
                    type="text"
                    v-model="form.title"
                    class="bg-transparent text-2xl font-semibold text-gray-700 dark:text-gray-200 w-full focus:outline-none border-b border-gray-700 p-2 mb-3"
                >

                <i
                    @click="closeNote"
                    class="icon-cancel p-1 cursor-pointer text-lg text-gray-500 mb-6"
                />
            </div>

            <ToastEditor
                v-model="form.body"
            />

            <!-- actions -->
            <div class="w-full justify-between flex border-t border-gray-700 pt-3">
                <button
                    @click="deleteNote"
                    class="btn-danger mr-2"
                >
                    <i class="icon-trash cursor-pointer text-lg text-gray-200" />
                    <!-- Delete -->
                </button>

                <div class="float-right">
                    <button
                        @click="closeNote"
                        class="btn-flat mr-2"
                    >
                        Cancel
                    </button>

                    <button
                        @click="saveNote"
                        class="btn-success"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import ToastEditor from './ToastEditor.vue';
    import emitter from '../js/mitt.js';
    import db from '../js/rxdb.js';

    export default {
        components: {
            ToastEditor
        },

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

            const deleteNote = async () => {
                try {
                    await db?.notes?.clear(form);
                    closeNote();
                } catch (err) {
                    console.error('NoteCard:saveNote:err', err);
                }
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
                deleteNote,
                saveNote
            };
        }
    }
</script>
