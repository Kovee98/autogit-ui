const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3080',
    dbUrl: import.meta.env.VITE_DB_URL || 'https://admin:password@localhost:5984',
    dbPass: import.meta.env.VITE_DB_PASS || 'password',
    saveInterval: import.meta.env.VITE_SAVE_INTERVAL || 10000,
    saveStartDelay: import.meta.env.VITE_SAVE_START_DELAY || 3000
};

export default config;
