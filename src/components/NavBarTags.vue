<template>
    <ul>
        <li class="relative px-6 py-3">
            <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="isOpen = !isOpen"
                aria-haspopup="true"
            >
                <span class="inline-flex items-center">
                    <i class="icon-tags" />
                    <span class="ml-4">Tags</span>
                </span>
                <i v-if="isOpen" class="icon-down-open" />
                <i v-if="!isOpen" class="icon-right-open" />
            </button>
            <div v-if="isOpen">
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
    import { reactive, ref } from 'vue';

    export default {
        setup () {
            const isOpen = ref(true);
            const tags = reactive([
                'help',
                'general',
                'house'
            ]);

            const toggleTag = (tag) => {
                console.log('toggling tag:', tag);
            };

            return {
                tags,
                isOpen,
                toggleTag
            };
        }
    }
</script>

<style scoped>
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