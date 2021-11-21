const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    saveInterval: import.meta.env.VITE_SAVE_INTERVAL || 10000,
    saveStartDelay: import.meta.env.VITE_SAVE_START_DELAY || 3000
};

export default config;
