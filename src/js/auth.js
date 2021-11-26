import http from './http.js';
import { session as storage } from './storage.js';
import emitter from './mitt.js';

const auth = {
    expirationTimer: null,

    getSession () {
        return http.get('/user')
            .catch((err) => {
                console.log('auth:getSession:err:', err);
                return null;
            })
            .then((res = {}) => res.ok ? res.session : null);
    },

    async buildSession () {
        try {
            const session = await auth.getSession();

            if (!session) {
                auth.clear();
                return false;
            } else {
                const user = session?.passport?.user;
                const expireDate = new Date(session?.cookie?.expires || Date.now());

                // set up session data
                storage.set('expires', expireDate);
                storage.set('user', user);

                return true;
            }
        } catch (err) {
            console.error('auth:buildSession:err', err);
            return false;
        }
    },

    setExpirationTimer () {
        const expireDate = new Date(storage.get('expires', Date.now()));
        const currDate = new Date();
        const expiresIn = expireDate - currDate;

        clearTimeout(auth.expirationTimer);
        auth.expirationTimer = setTimeout(() => {
            auth.clear();
            emitter.emit('expired');
        }, expiresIn);
    },

    isAuthorized () {
        return auth.isLoggedIn() && !auth.isExpired();
    },

    isLoggedIn () {
        return !!storage.get('user', false);
    },

    isExpired () {
        const expires = storage.get('expires', false);
        return !expires || (new Date(expires) < new Date());
    },

    logout () {
        return http.delete('/logout')
            .catch((err) => err)
            .then((res) => {
                if (res.ok) {
                    auth.clear();
                    return true;
                } else {
                    console.error('auth:logout:err', 'there was an error logging out');
                    return false;
                }
            });
    },

    clear () {
        clearTimeout(auth.expirationTimer);
        storage.clear();
    }
};

export const getSession = auth.getSession;
export const buildSession = auth.buildSession;
export const setExpirationTimer = auth.setExpirationTimer;
export const isLoggedIn = auth.isLoggedIn;
export const isExpired = auth.isExpired;
export const isAuthorized = auth.isAuthorized;
export const logout = auth.logout;

export default auth;
