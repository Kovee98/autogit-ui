module.exports = {
    darkMode: 'class',
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            './index.html',
            './src/**/*.vue',
            './src/**/*.js',
            './src/**/*.scss'
        ]
    },
    theme: {
        extend: {
            fontFamily: {
            }
        }
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    }
};
