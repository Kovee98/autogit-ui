<template>

</template>

<script>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { getSession } from '../js/auth.js';
    import { local } from '../js/storage.js';

    export default {
        setup () {
            const router = useRouter();

            let timer = null;
            onMounted(async () => {
                const session = await getSession(router);

                if (!session) {
                    local.remove('user');
                    router.push('/login');
                } else {
                    const user = session?.passport?.user;
                    const expireDate = new Date(session?.cookie?.expires || Date.now());
                    const currDate = new Date();
                    const expiresIn = expireDate - currDate;

                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        router.push('/login');
                        local.remove('user');
                    }, expiresIn);

                    local.set('user', user);
                    router.push('/notes');
                }
            });

            return {};
        }
    }
</script>
