<template>
    <!-- <NavBar /> -->

    <div class="">
        <router-view />
    </div>
</template>

<script>
    import NavBar from './components/NavBar.vue';

    export default {
        components: {
            NavBar
        },
        setup () {
            return {};
        }
    }
</script>

<style>
</style>
