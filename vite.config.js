import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        allowNodeBuiltins: ["pouchdb-browser", "pouchdb-utils"],
    },
    plugins: [
        VitePWA({
            display: "fullscreen",
        }),
        nodeResolve(),
        Vue(),
        WindiCSS(),
    ]
})
