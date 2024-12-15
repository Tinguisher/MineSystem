<template>
    <h4>This is individual products</h4>

    <h4>{{ model.id ? model.name : "Create a product?" }}</h4>
    {{ model }}

    <!-- product form -->
    <form @submit.prevent="saveProduct">
        <!-- if there is image put image, if not, input file for create -->
        <img v-if="model.image" :src="model.image" :alt="model.name">
        <input type="file" v-else>

        <br>
        <input type="text" placeholder="Code" v-model="model.code">
        <br>
        <input type="text" placeholder="Name" v-model="model.name">
        <br>
        <input type="text" placeholder="Stock" v-model="model.stock">
        <br>
        <input type="text" placeholder="Price" v-model="model.price">
        <br>
        <input type="text" placeholder="Description" v-model="model.description">
        <br>
        <button type="submit">Submit this product</button>
    </form>
</template>

<script setup>
import store from "../store";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// create an empty product for edit
let model = ref({
    image: "",
    code: "",
    name: "",
    stock: null,
    price: null,
    description: ""
})

// if there is id in the params
if (route.params.id) {
    // get the model from the store/index using the id
    model.value = store.state.products.find(
        (s) => s.id === parseInt(route.params.id)
    );
}

</script>