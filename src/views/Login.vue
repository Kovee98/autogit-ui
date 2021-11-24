<template>
    <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        class="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div class="flex justify-center py-9">
            <h1
                class="mb-4 text-3xl font-semibold text-gray-700 dark:text-gray-200"
            >
            Notella
            </h1>
        </div>
        <div class="flex overflow-y-auto md:flex-row">
          <div class="flex items-center justify-center p-6 sm:p-12 w-full">
            <div class="w-full">
                <span class="dark:text-gray-200">Log in:</span>
                <button
                    v-for="btn in buttons"
                    :key="btn.id"
                    @click="login(btn.href)"
                    class="flex justify-center w-full px-4 py-2 mt-5 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                >
                    <span class="p-1 flex items-center">
                        <i :class="`icon-${ btn.icon } text-xl mr-2`"></i>
                        {{ btn.name }}
                    </span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import config from '../js/config.js';

    export default {
        setup () {
            const buttons = [
                { name: 'Facebook', href: `${config.apiUrl}/facebook/login`, icon: 'facebook' },
                { name: 'Github', href: `${config.apiUrl}/github/login`, icon: 'github' },
                { name: 'Google', href: `${config.apiUrl}/facebook/login`, icon: 'google' },
            ];

            const login = (href) => {
                window.location.href = href;
            };

            return {
                buttons,
                login
            };
        }
    };
</script>
