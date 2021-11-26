<template>
    <div class="w-screen h-screen dark:bg-gray-800" />
</template>

<script>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { buildSession } from '../js/auth.js';

    export default {
        setup () {
            const router = useRouter();

            onMounted(async () => {
                const isBuilt = await buildSession(router);
                router.push(isBuilt ? '/notes' : '/login');
            });

            return {};
        }
    }
</script>
