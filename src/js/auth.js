import { useRouter, useRoute } from 'vue-router';

const auth = {
    checkAuth () {
        const router = useRouter();
        const route = useRoute();

        console.log(document.cookie);
        if (!document.cookie.includes('ag_sid')) {
            router.push('/login');
        } else {
            console.log('route.path:', route.path);
            router.push(route.path);
        }
    }
};

export default auth;
