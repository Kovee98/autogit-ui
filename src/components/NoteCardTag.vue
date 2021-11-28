<template>
    <div class="bg-gray-600 inline-flex items-center text-sm rounded-full px-1 py-2 mr-2 overflow-hidden h-2/3">
        <span class="text-gray-200 pl-2">#</span>
        <input
            :value="modelValue"
            @change="(e) => $emit('update:modelValue', e.target.value)"
            class="leading-relaxed max-w-10 truncate focus:outline-none bg-transparent text-gray-200"
        >

        <i
            @click="$emit('remove')"
            class="icon-cancel p-1 cursor-pointer text-xs text-gray-500 hover:text-gray-200 duration-100"
        />
        <!-- <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1" x-text="tag">tag</span> -->
        <!-- <button class="w-6 h-8 inline-block align-middle text-gray-500 focus:outline-none">
        </button> -->
    </div>
</template>

<script>
    export default {
        props: { 
            modelValue: String
        },

        setup ({ modelValue }) {
            return {};
        }
    }
</script>
