<template>
    <div ref="el" />
</template>

<script>
    import { ref, onMounted } from 'vue';
    import Editor from '@toast-ui/editor';

    export default {
        props: { 
            modelValue: String
        },

        setup ({ modelValue }, { emit }) {
            const el = ref(null);
            let editor;
            const editorOpts = {
                height: '100%',
                language: 'en-US',
                useCommandShortcut: true,
                initialEditType: 'wysiwyg',
                hideModeSwitch: true,
                usageStatistics: false,
                theme: 'dark',
                // toolbarItems: [
                //     ['heading', 'bold', 'italic', 'strike'],
                //     ['hr', 'quote'],
                //     ['ul', 'ol', 'task', 'indent', 'outdent'],
                //     ['table', 'image', 'link'],
                //     ['code', 'codeblock'],
                //     ['scrollSync'],
                // ]
            };

            onMounted(() => {
                // create toast editor
                editor = new Editor({ ...editorOpts, el: el.value });

                // initialize markdown
                editor.setMarkdown(modelValue);

                // set up events
                editor.on('change', () => emit('update:modelValue', editor.getMarkdown()));
            });

            return {
                el
            };
        }
    }
</script>
