import config from './config.js';

const http = {
    baseUrl: config.apiUrl,
    defaults: {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    },

    get (path, opts) {
        return fetch(`${http.baseUrl}${path}`, Object.assign({}, http.defaults, opts, { method: 'get' }))
            .then((res) => res.json());
    },

    post (path, opts) {
        return fetch(`${http.baseUrl}${path}`, Object.assign({}, http.defaults, opts, { method: 'post' }))
            .then((res) => res.json());
    },

    put (path, opts) {
        return fetch(`${http.baseUrl}${path}`, Object.assign({}, http.defaults, opts, { method: 'put' }))
            .then((res) => res.json());
    },

    delete (path, opts) {
        return fetch(`${http.baseUrl}${path}`, Object.assign(http.defaults, opts, { method: 'delete' }))
            .then((res) => res.json());
    }
};

export default http;
