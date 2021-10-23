<template>
    <!-- large, full-screen welcoming page describing what this app is -->
    <h1>Home Page</h1>
    <button
        @click="auth"
        class="btn btn-success"
    >
        Authenticate with Github
    </button>
</template>

<script setup>
    import { ref } from 'vue';

    // defineProps({
    //     msg: String
    // });

    const count = ref(0);
    const auth = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=99989ffeadeefa8f2d08&path=http://localhost:3000/auth';
    };
</script>

<style scoped>
    a {
        color: #42b983;
    }
</style>
