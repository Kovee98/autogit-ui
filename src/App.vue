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
    import { useRouter } from 'vue-router';
    import NavBar from './components/NavBar.vue';
    import { isAuthorized } from './js/auth.js';
    import { local } from './js/storage.js';

    export default {
        components: {
            NavBar
        },
        setup () {
            const isDark = computed(() => {
                const data = local.get('dark');

                if (data) {
                    return data;
                } else {
                    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
            });
            const router = useRouter();

            onMounted(() => isAuthorized(router));

            return {
                isDark
            };
        }
    }
</script>
