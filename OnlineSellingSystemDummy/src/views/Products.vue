<template>
    <h2>This is products</h2>

    <div>
        <div v-for="product in products" :key="product.id">
            <h4>Title: {{ product.name }}</h4>

            <router-link :to="{ name: 'ProductView', params: { id: product.id }}"> CHECK THE PRODUCT {{ product.id }} </router-link>
        </div>
    </div>
</template>

<script setup>
import store from '../store';
import { computed } from 'vue';

// get the products from the store/index.js
const products = computed(() => store.state.products);
</script>