import { reactive } from 'vue';

const globals = {
    tags: reactive([]),
    tagFilter: reactive({})
};

export const tags = globals.tags;

export default globals;
