<template>
    <!-- backdrop for clickaway listener -->
    <div
        v-if="isOpen"
        @click="isOpen = !isOpen"
        class="absolute left-0 top-0 w-screen h-screen z-50"
    />

    <div class="fixed bottom-8 right-8 z-100">
        <div
            @blur="isOpen = !isOpen"
            class="flex flex-col items-center justify-center"
        >
            <div
                class="relative flex items-center transition-all ease-out"
                :class="isOpen ? 'bottom-[3rem]' : '-bottom-24'"
            >
                <div
                    class="fixed right-[7rem] p-3 bg-black rounded-md text-gray-200 transition-all delay-100 ease-out"
                    :class="isOpen ? 'opacity-100' : 'opacity-0'"
                >
                    Add Collection
                </div>
                <button class="rounded-full bg-yellow-800 w-12 h-12 shadow-md z-40">
                    <i class="icon-plus text-gray-200 text-lg" />
                </button>
            </div>
            <div
                class="relative flex items-center transition-all ease-out"
                :class="isOpen ? 'bottom-[1.5rem]' : '-bottom-12'"
            >
                <div
                    class="fixed right-[7rem] p-3 bg-black rounded-md text-gray-200 transition-all delay-100 ease-out"
                    :class="isOpen ? 'opacity-100' : 'opacity-0'"
                >
                    Add Note
                </div>
                <button
                    @click="addNote"
                    class="relative rounded-full bg-yellow-800 w-12 h-12 shadow-md z-40"
                >
                    <i class="icon-plus text-gray-200 text-lg" />
                </button>
            </div>
            <button
                @click="isOpen = !isOpen"
                class="relative rounded-full bg-yellow-800 w-18 h-18 shadow-md z-50 transition-all ease-out"
                :class="isOpen ? 'rotated' : ''"
            >
                <i class="icon-plus text-gray-200 text-2xl" />
            </button>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import db from '../js/rxdb.js';
    import emitter from '../js/mitt.js';

    export default {
        setup () {
            const isOpen = ref(false);
            const addNote = async () => {
                const res = await db?.notes?.put({
                    title: 'Untitled Note',
                    body: '',
                    tags: [ 'test', 'things', 'whatup' ]
                });

                isOpen.value = false;

                emitter.emit('open-note', res.id);
            };

            return {
                isOpen,
                addNote,
            };
        }
    }
</script>

<style lang="scss" scoped>
    .rotated {
        transform: rotate(45deg);
    }
</style>