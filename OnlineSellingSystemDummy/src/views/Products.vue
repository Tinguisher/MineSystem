<template>
    <h2>This is products</h2>

    <div>
        <div v-for="product in products" :key="product.id">
            <h4>Title: {{ product.title }}</h4>
        </div>
    </div>
</template>

<script setup>
import store from '../store';
import { computed } from 'vue';

const products = computed(() => store.state.products);
</script>