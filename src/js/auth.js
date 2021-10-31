import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// if authorized, setTimeout for expiration time
// if not authorized, route immediately to login
const auth = {
    isAuthorized () {
        fetch('http://localhost:4000/session')
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                return res;
            })
            .then((res) => res.ok && res.authenticated)
            .catch(() => false)
            .then((isAuthenticated) => {
                console.log('isAuthenticated:', isAuthenticated);
            });
    }
};

export default auth;
