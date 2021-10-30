<template>
    <div :class="{ 'dark': isDark }">
        <div v-if="$route.meta.navbar === false">
            <router-view />
        </div>
        <div v-else>
            <NavBar>
                <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    {{ $route.meta.title }}
                </h2>
                <router-view />
            </NavBar>
        </div>
    </div>
</template>

<script>
    import { onMounted, computed } from 'vue';
    import NavBar from './components/NavBar.vue';
    import auth from './js/auth.js';

    export default {
        components: {
            NavBar
        },
        setup () {
            const isDark = computed(() => {
                if (window.localStorage.getItem('dark')) {
                    return JSON.parse(window.localStorage.getItem('dark'));
                } else {
                    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
            });

            onMounted(auth.checkAuth);

            return {
                isDark
            };
        }
    }
</script>
