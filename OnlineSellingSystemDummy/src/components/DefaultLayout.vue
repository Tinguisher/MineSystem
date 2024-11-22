
<template>
    <h1>Dashboard</h1>
    <button @click="logout">Log Out</button>

    <router-view></router-view>
</template>

<script>
    import { useStore } from "vuex";
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
        setup(){
            const store = useStore();
            const router = useRouter();

            // if logout button is clicked
            function logout(ev) {
                ev.preventDefault();

                // go to actions, logout from store index.js
                store.dispatch('logout')
                    // get the reply from it or returned values
                    .then( () => {
                        // navigate the user somewhere
                        router.push({
                            name: 'Login'
                        })
                    })
            }

            return {
                user: computed( () => store.state.user.data ),
                logout
            };
        }
    }
    
    
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
