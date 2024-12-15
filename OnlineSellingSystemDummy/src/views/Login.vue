<template>
    <h1>Login</h1>
    <form @submit="login">
        <!-- vmodels are to get values from it -->
        <input type="email" v-model="user.email" placeholder="Email">
        <input type="password" v-model="user.password" placeholder="Password">
        <p>Remember me</p>
        <input type="checkbox" v-model="user.remember">
        <br>
        <button type="submit">Sign in</button>
        {{ errorMsg }}
    </form>

    <router-link :to="{ name: 'Register' }">Register a new Account</router-link>
</template>

<script setup>
import store from '../store';
import { useRouter } from "vue-router";
import { ref } from 'vue';

const router = useRouter();

const user = {
    email: '',
    password: '',
    remember: false
}

let errorMsg = ref('');

function login(ev) {
    ev.preventDefault();

    store.dispatch('login', user)
        .then(() => {
            // redirect to dashboard if success
            router.push({
                name: 'Dashboard'
            })
        })
        .catch(err => {
            // err from catch, then get response, then data, inside data is message object (preview network)
            errorMsg.value = err.response.data.message;
        })
}

</script>