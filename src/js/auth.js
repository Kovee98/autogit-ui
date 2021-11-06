import http from './http.js';
import { local } from './storage.js';

const auth = {
    getSession () {
        return http.get('/user')
            .catch((err) => {
                console.log('auth:getSession:err:', err);
                return null;
            })
            .then((res = {}) => res.ok ? res.session : null);
    },

    logout (router) {
        return http.delete('/logout')
            .catch((err) => err)
            .then((res) => {
                if (res.ok) {
                    router.push('/login');
                } else {
                    console.error('There was an error logging out');
                }
            });
    }
};

export const getSession = auth.getSession;
export const logout = auth.logout;

export default auth;
