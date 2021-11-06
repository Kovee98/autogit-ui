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
    import { getSession, cleanSession } from './js/auth.js';
    import { local } from './js/storage.js';

    export default {
        components: {
            NavBar
        },
        setup () {
            const router = useRouter();
            const isDark = computed(() => {
                const data = local.get('dark');

                if (data) {
                    return data;
                } else {
                    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
            });

            // set navigation guard
            router.beforeEach((to, from, next) => {
                const user = local.get('user');
                // Redirect if user is disallowed to view the page
                const isLoggedIn = !!user;
                if (!isLoggedIn && to.meta.requireUser !== false) {
                    return router.push('/login');
                } else {
                    return next();
                }
            });

            let timer = null;
            onMounted(async () => {
                const session = await getSession(router);
                const user = session?.passport?.user;

                if (!session) {
                    router.push('/login');
                    local.remove('user');
                } else {
                    const expireDate = new Date(session?.cookie?.expires || Date.now());
                    const currDate = new Date();
                    const expiresIn = expireDate - currDate;

                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        router.push('/login');
                        local.remove('user');
                    }, expiresIn);

                    local.set('user', user);
                }
            });

            return {
                isDark
            };
        }
    }
</script>
