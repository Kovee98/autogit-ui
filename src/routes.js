import Home from './views/Home.vue';
import Auth from './views/Auth.vue';
import Dashboard from './views/Dashboard.vue';
import Blank from './views/Blank.vue';

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
    {
        path: '/blank',
        component: Blank,
        meta: { title: 'Blank' }
    },
    // {
    //     path: '/:path(.*)',
    //     component: NotFound
    // }
];
