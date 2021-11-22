import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import { nodeResolve } from "@rollup/plugin-node-resolve";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        allowNodeBuiltins: ["pouchdb-browser", "pouchdb-utils"],
    },
    plugins: [
        nodeResolve(),
        Vue(),
        WindiCSS(),
    ]
})
