const auth = {
    isAuthorized (router) {
        fetch('http://localhost:4000/session', {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((res) => res.ok && res.authenticated)
            .catch(() => false)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    router.push('/login');
                }
            });
    },

    logout () {
        console.log('logging out');
        fetch('http://localhost:4000/logout', {
            method: 'post',
            credentials: 'include'
        })
            .then((res) => res.json())
            .catch(() => false)
            .then((res) => {
                console.log('res:', res);
            });
    }
};

export const isAuthorized = auth.isAuthorized;
export const logout = auth.logout;

export default auth;
