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
    }
};

export default auth;
