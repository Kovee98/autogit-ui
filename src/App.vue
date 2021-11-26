<template>
    <div :class="{ 'dark': isDark }">
        <div v-if="$route.meta.navbar === false">
            <router-view />
        </div>
        <div v-else>
            <NavBar>
                <router-view />
            </NavBar>
        </div>
    </div>
</template>

<script>
    import { onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import NavBar from './components/NavBar.vue';
    import { local, session } from './js/storage.js';
    import rxdb from './js/rxdb.js';
    import { buildSession, setExpirationTimer, isAuthorized } from './js/auth.js';
    import emitter from './js/mitt.js';

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

            emitter.on('expired', () => {
                router.push('/login');
            });

            // set navigation guard
            router.beforeEach((to, from, next) => {
                if (!isAuthorized() && to.meta.requireUser !== false) {
                    return next('/login');
                } else {
                    return next();
                }
            });

            onMounted(async () => {
                const isBuilt = isAuthorized() || await buildSession(router);

                if (isBuilt) {
                    const user = session.get('user');
                    await rxdb.init(user);
                    setExpirationTimer();
                }
            });

            return {
                isDark
            };
        }
    }
</script>
