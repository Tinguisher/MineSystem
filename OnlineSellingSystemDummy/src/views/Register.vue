<template>
    <h1>Register</h1>
    <form @submit="register">
        <input type="text" id="fullname" name="name" v-model="user.name" placeholder="Full name">
        <input type="email" v-model="user.email" placeholder="Email">
        <input type="password" name="password" v-model="user.password" placeholder="Password">
        <input type="text" name="password_confirmation" v-model="user.password_confirmation" placeholder="Password Confirmation">
        <br>
        <button type="submit">Sign up</button>
    </form>
    
    <router-link :to="{name: 'Login'}">Already have an account, Login</router-link>
</template>

<script setup>
import store from '../store';
import {useRouter} from "vue-router";

const router = useRouter();

const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
};

function register(ev) {
    ev.preventDefault();
    store
        // go to actions, register from store index.js
        .dispatch('register', user)
        .then( (data) => {
            // navigate the user somewhere
            router.push({
                name: 'Dashboard'
            })
        } )
}
</script>