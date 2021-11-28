<template>
    <ul>
        <li class="relative px-6">
            <button
                class="inline-flex items-center justify-between w-full text-sm transition-all duration-100 hover:text-gray-800 dark:hover:text-gray-200"
                @click="isOpen = !isOpen"
                aria-haspopup="true"
            >
                <span class="inline-flex items-center">
                    <i class="icon-tags" />
                    <span class="ml-4">Tags</span>
                </span>
                <i
                    class="icon-right-open transition-all duration-100 ease-out"
                    :class="isOpen ? 'rotated' : ''"
                />
            </button>
        </li>
        <li class="relative px-6 overflow-hidden">
            <div
                class="relative transition-all duration-100 ease-out"
                :class="isOpen ? 'top-0 opacity-100' : '-top-20 opacity-0'"
            >
                <div
                    class="submenu"
                    aria-label="submenu"
                >
                    <button
                        v-for="tag in tags"
                        :key="tag.id"
                        @click="toggleTag(tag)"
                    >
                        #{{ tag }}
                    </button>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    import { ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import globals from '../js/globals.js';

    export default {
        setup () {
            const router = useRouter();
            const route = useRoute();
            const isOpen = ref(true);
            const tags = globals.tags;

            // const toggleTag = (tag) => {
            //     const filter = route?.query?.filter?.split(',') || [];
            //     const newFilter = Array.from(new Set([...filter, tag])).join(',');
            //     router.push({ query: { filter: newFilter } });
            // };
            const toggleTag = (tag) => {
                globals.tagFilter[tag] = !globals.tagFilter[tag];
                debugger;
            };

            return {
                tags,
                isOpen,
                toggleTag
            };
        }
    }
</script>

<style lang="scss" scoped>
    .rotated {
        transform: rotate(90deg);
    }

    .submenu {
        @apply
            p-2
            mt-2
            flex
            flex-col
            items-start
            space-y-2
            overflow-hidden
            text-sm
            font-medium
            text-gray-500
            rounded-md
            shadow-inner
            bg-gray-50
            dark:text-gray-400
            dark:bg-gray-900;
        
        & > button {
            @apply
                px-2
                py-1
                transition-colors
                duration-150
                hover:text-gray-800
                dark:hover:text-gray-200;
        }
    }
</style>