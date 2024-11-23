<template>
  <div class="product-view" style="height: 650px; overflow-y: scroll">
    <!-- Display when no products are available -->
    <div v-if="!filteredProducts.length" class="empty-state">
      <p>No products available in this category.</p>
    </div>

    <!-- Display category information -->
    <h2 v-if="category">Products in {{ category.name }}</h2>
    <h2 v-else>No Category Selected</h2>

    <!-- Add Product Button -->
    <div class="product-card" @click="showPopup = true">Add Product</div>

    <!-- List of products -->
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

    <!-- Add Product Popup -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <button class="close-button" @click="closePopup">✖</button>
        <h2>Create New Product</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Product Details Section -->
          <div class="form-input">
            <label>Product Code</label>
            <input
              v-model="product.productCode"
              placeholder="Product Code goes here"
            />
          </div>

          <div class="form-input">
            <label>Product Name</label>
            <input
              v-model="product.productName"
              placeholder="Product Name goes here"
            />
          </div>

          <div class="form-input">
            <label>Product Price</label>
            <input
              v-model="product.productPrice"
              placeholder="Product Price goes here"
            />
          </div>

          <div class="form-input">
            <label>Product Stock</label>
            <input
              :disabled="variations.length > 0"
              v-model="product.productStock"
              placeholder="Product Stock goes here"
            />
          </div>

          <div class="form-input">
            <label>Product Description</label>
            <textarea
              v-model="product.productDescription"
              placeholder="Product Description goes here"
            ></textarea>
          </div>

          <!-- Product Category -->
          <div class="form-input">
            <label>Product Category</label>
            <select v-model="product.productCategory">
              <option disabled value="">Select Product Category</option>
              <option
                v-for="category in filteredCategories"
                :key="category.id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Product Image -->
          <div class="form-input">
            <label>Product Image</label>
            <input type="file" @change="handleImageUpload" />
            <div v-if="product.productImagePreview" class="image-preview">
              <img :src="product.productImagePreview" alt="Product Preview" />
            </div>
          </div>

          <!-- Variations Section -->
          <div class="variation-section">
            <button type="button" @click="addVariation">+ New Variation</button>

            <div
              v-for="(variation, index) in variations"
              :key="index"
              class="variation-row"
            >
              <div class="form-input">
                <label>Variation Name</label>
                <input
                  v-model="variation.name"
                  placeholder="Variation Name goes here"
                />
              </div>

              <div class="form-input">
                <label>Variation Stock</label>
                <input
                  v-model="variation.stock"
                  placeholder="Variation Stock goes here"
                />
              </div>

              <div class="form-input">
                <label>Variation Price</label>
                <input
                  v-model="variation.price"
                  placeholder="Variation Price goes here"
                />
              </div>

              <button type="button" @click="removeVariation(index)">
                Remove
              </button>
            </div>
          </div>

          <div class="form-input">
            <button type="submit">Confirm</button>
            <button type="button" @click="closePopup">Cancel</button>
          </div>
        </form>
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
      default: null,
    },
    filteredCategories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showPopup: false,
      product: {
        productCode: "",
        productName: "",
        productPrice: "",
        productStock: "",
        productDescription: "",
        productCategory: "",
        productImage: null, // Holds the uploaded image file
        productImagePreview: null, // Holds the preview URL
      },
      variations: [],
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.product.productImage = file;

        // Generate a preview of the uploaded image
        const reader = new FileReader();
        reader.onload = (e) => {
          this.product.productImagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addVariation() {
      this.variations.push({
        name: "",
        stock: "",
        price: "",
      });
    },
    removeVariation(index) {
      this.variations.splice(index, 1);
      this.updateProductStock();
    },
    updateProductStock() {
      this.product.productStock = this.variations.reduce(
        (total, variation) => total + (parseInt(variation.stock) || 0),
        0
      );
    },
    handleSubmit() {
      console.log("Product submitted:", this.product);
      console.log("Variations:", this.variations);
      // Example: Handle image upload and other product data here
      this.closePopup();
    },
    closePopup() {
      this.showPopup = false;
      this.resetForm();
    },
    resetForm() {
      this.product = {
        productCode: "",
        productName: "",
        productPrice: "",
        productStock: "",
        productDescription: "",
        productCategory: "",
        productImage: null,
        productImagePreview: null,
      };
      this.variations = [];
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 2px solid #000000;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
  width: 20%;
  height: 30%;
}

.product-card:hover {
  background-color: #f4f4f4;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 70%;
}

.empty-state {
  font-size: 16px;
  color: #777;
  text-align: center;
}

.form-input {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #f1c40f;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
}

button:hover {
  background-color: #f39c12;
}

select {
  padding: 10px;
  font-size: 16px;
}

.variation-section {
  margin-top: 20px;
}

.variation-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.variation-row input {
  padding: 10px;
  font-size: 14px;
  width: 100%;
}

.variation-row button {
  margin-top: 0;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
