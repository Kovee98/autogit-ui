<template>
    <h1>Home</h1>
</template>

<script>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
        setup () {
            onMounted(() => {
                const router = useRouter();
                router.push('/notes');
            });
        }
    }
</script>
