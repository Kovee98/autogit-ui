const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    saveInterval: import.meta.env.VITE_SAVE_INTERVAL || 5000,
    saveStartDelay: import.meta.env.VITE_SAVE_START_DELAY || 5000
};

export default config;
