<template>
    <!-- typical navbar, display sign in with github if not currently logged in -->
    <!-- <div class="w-screen py-4 bg-indigo-300">Nav Bar</div>
    <div>
    </div> -->
    <nav id="header" class="w-full z-30 py-1 bg-white shadow-lg border-b border-blue-400">
      <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
         <label for="menu-toggle" class="cursor-pointer md:hidden block">
            <svg class="fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
               <title>menu</title>
               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
         </label>
         <input class="hidden" type="checkbox" id="menu-toggle">
         
         <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
                
                <ul class="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
                    <li><router-link class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" to="/">Dashboard</router-link></li>
                    <li><router-link class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" to="/settings">Settings</router-link></li>
                </ul>
            </nav>
         </div>
         
         <div class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div class="auth flex items-center w-full md:w-full">
                <button
                    @click="auth"
                    class="btn btn-success"
                >
                    Sign in with GitHub
                </button>
               <!-- <button class="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">Sign up</button> -->
            </div>
         </div>
      </div>
   </nav>
</template>

<script>
    export default {
        setup () {
            const auth = () => {
                window.location.href = 'http://localhost:4000/login';
            };

            return { auth };
        }
    }
</script>

<style>

</style>