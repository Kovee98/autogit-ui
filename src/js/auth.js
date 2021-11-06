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

    logout (router) {
        fetch('http://localhost:4000/logout', {
            method: 'delete',
            credentials: 'include'
        })
            .then((res) => res.json())
            .catch((err) => err)
            .then((res) => {
                if (res.ok) {
                    router.push('/login');
                } else {
                    console.error('There was an error logging in');
                }
            });
    }
};

export const isAuthorized = auth.isAuthorized;
export const logout = auth.logout;

export default auth;
