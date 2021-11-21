import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import Notes from './views/Notes.vue';
import Redirect from './views/Redirect.vue';

export default [
    {
        path: '/',
        component: Home,
        meta: { title: 'Home', requireUser: false }
    },
    {
        path: '/login',
        component: Login,
        meta: { title: 'Login', navbar: false, requireUser: false }
    },
    {
        path: '/redirect',
        component: Redirect,
        meta: { title: 'Redirect', navbar: false, requireUser: false }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
    },
    {
        path: '/notes',
        component: Notes,
        meta: { title: 'Notes' }
    },
    {
        path: '/settings',
        component: Notes,
        meta: { title: 'Notes' }
    },
    // {
    //     path: '/:path(.*)',
    //     component: NotFound
    //     meta: { title: '404', navbar: false, requireUser: false }
    // }
];
