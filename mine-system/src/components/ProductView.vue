<template>
  <div class="product-view">
    <div v-if="!filteredProducts.length" class="empty-state">
      <p>No products available in this category.</p>
    </div>

    <!-- Check if category exists -->
    <h2 v-if="category">Products in {{ category.name }}</h2>
    <h2 v-else>No Category Selected</h2>
    <div class="product-card">Add Product</div>

    <div class="product-grid">
      <div
        class="product-card"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
        <p>Stock: {{ product.stock }}</p>
        <p>
          Status:
          <span
            :class="{
              available: product.stock > 0,
              unavailable: product.stock === 0,
            }"
          >
            {{ product.stock > 0 ? "Available" : "Unavailable" }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductView",
  props: {
    filteredProducts: {
      type: Array,
      required: true,
    },
    category: {
      type: Object,
      default: null, // Default to null if no category is provided
    },
  },
};
</script>
<style>
.product-card {
  border: 2px solid #000000;
  height: 20%;
  width: 30%;
}
</style>
