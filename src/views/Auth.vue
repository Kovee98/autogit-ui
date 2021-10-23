<template>
    <p>You will soon be redirected.</p>
</template>

<script>
    import { onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { session } from '../js/storage';

    export default {
        setup () {
            onMounted(() => {
                const router = useRouter();
                const route = useRoute();
                const query = route.query;

                if (query.ok) {
                    // store auth data in session
                    session.set('user', query);

                    router.push('/');
                }
            });
        }
    }
</script>

<style scoped>
    a {
        color: #42b983;
    }
</style>
