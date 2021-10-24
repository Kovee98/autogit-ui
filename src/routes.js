import Home from './views/Home.vue';
import Auth from './views/Auth.vue';
import Dashboard from './views/Dashboard.vue';

export default [
    {
        path: '/',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
    },
    {
        path: '/auth',
        component: Auth,
        meta: { title: 'Auth' }
    },
    // {
    //     path: '/:path(.*)',
    //     component: NotFound
    // }
];
