<template>
    <h4>This is content of dashboard</h4>
    <router-link :to="{ name: 'Products' }">Go to check your products</router-link>
</template>

<script setup>
import store from "../store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();



</script>