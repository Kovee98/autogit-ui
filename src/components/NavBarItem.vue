<template>
    <ul>
        <li class="relative px-6 py-3">
            <!-- Active items have the snippet below -->
            <span
                v-if="isActive"
                class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
            ></span>
            <!-- Add this classes to an active anchor (a tag) -->
            <!-- text-gray-800 dark:text-gray-100 -->
            <router-link
                :to="route"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                :class="{ 'text-gray-800 dark:text-gray-100': isActive }"
            >
                <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                </svg>
                <span class="ml-4">{{ name }}</span>
            </router-link>
            <!-- <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                :class="{ 'text-gray-800 dark:text-gray-100': isActive }"
                href="/dashboard"
            >
                <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                </svg>
                <span class="ml-4">{{ name }}</span>
            </a> -->
        </li>
    </ul>
</template>

<script>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    export default {
        props: {
            name: String,
            route: String
        },
        setup ({ name, route }) {
            const isActive = computed(() => {
                const $route = useRoute();
                return $route.path === route;
            });

            return {
                isActive,
                name,
                route
            };
        },
    };
</script>

<style lang="scss" scoped>

</style>
