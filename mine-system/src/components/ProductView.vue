<template>
  <div class="product-view">
    <!-- Display when no products are available -->
    <div v-if="!sortedProducts.length" class="empty-state">
      <p>No products available in this category.</p>
    </div>

    <!-- List of products -->
    <div class="product-grid">
      <div class="product-card-add" @click="showPopup = true">
        <PhPlus :size="90" /><br />
        Add Product
      </div>
      <div
        class="product-card"
        v-for="product in sortedProducts"
        :key="product.id"
      >
        <div class="flex-row space-between" style="height: 5%">
          <p>{{ product.code }}</p>
          <PhDotsThree :size="25" weight="bold" />
        </div>
        <div class="product-container"></div>
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-category">
          {{ product.category }}
        </div>
        <div
          class="product-stock"
          :style="{ color: getStockColor(product.stock) }"
        >
          Stock: {{ product.stock }}
        </div>
        <div class="product-price">Price: ${{ product.price }}</div>
        <div
          class="product-status"
          :class="{
            available: product.stock > 0,
            unavailable: product.stock === 0,
          }"
          :style="{ background: getStatusBackground(product.stock) }"
        >
          {{ product.stock > 0 ? "Available" : "Unavailable" }}
        </div>
      </div>
    </div>

    <!-- Add Product Popup -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <div
          style="
            width: auto;
            background-color: aqua;
            height: 3%;
            text-align: right;
            padding: 0 10px;
          "
        >
          <PhX :size="23" @click="closePopup" />
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: pink;
            height: 11%;
            width: auto;
            text-align: left;
            padding: 0px 30px;
          "
        >
          <span style="color: #f1b100; font-size: 48px; font-weight: 500">
            Create New Product
          </span>
          <span style="color: #1a1d1f; font-size: 20px">
            Fill out the fields below to create a new product for your store
          </span>
        </div>
        <div
          style="
            background-color: #f1b100;
            height: 83%;
            padding: 0 30px;
            width: auto;
          "
        >
          <form
            @submit.prevent="handleSubmit"
            class="flex-column space-between"
          >
            <div
              style="
                height: 90%;
                background-color: antiquewhite;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <!-- Product Image -->
              <div
                class="form-input"
                style="width: 25%; background-color: aquamarine"
              >
                <label>Product Image</label>
                <input type="file" @change="handleImageUpload" />
                <div v-if="product.productImagePreview" class="image-preview">
                  <img
                    :src="product.productImagePreview"
                    alt="Product Preview"
                  />
                </div>
              </div>

              <div
                style="
                  display: flex;
                  flex-direction: column;
                  background-color: pink;
                  width: 73%;
                "
              >
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

                <!-- Variations Section -->
                <div class="variation-section">
                  <button type="button" @click="addVariation">
                    + New Variation
                  </button>

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
              </div>
            </div>

            <div style="height: 9%; background-color: lightcyan">
              <div
                class="form-input"
                style="display: flex; flex-direction: row"
              >
                <button type="submit">Confirm</button>
                <button type="button" @click="closePopup">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PhPlus, PhDotsThree, PhX } from "@phosphor-icons/vue";

export default {
  name: "ProductView",
  components: {
    PhPlus,
    PhDotsThree,
    PhX,
  },
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
      showPopup: true,
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

  computed: {
    sortedProducts() {
      // Create a shallow copy of filteredProducts before sorting to avoid mutating the prop
      return [...this.filteredProducts].sort((a, b) => {
        if (a.stock === 0 && b.stock > 0) {
          return 1; // Place `a` after `b`
        } else if (b.stock === 0 && a.stock > 0) {
          return -1; // Place `b` after `a`
        }
        return 0; // Maintain order for other cases
      });
    },
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
        category: "",
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
    getStockColor(stock) {
      if (stock < 20) {
        return "#F03D3E"; // Low stock
      } else if (stock <= 50 && stock > 20) {
        return "#FF9000"; // Medium stock
      } else {
        return "#000000"; // High stock
      }
    },
    getStatusBackground(stock) {
      return stock > 0 ? "#04bd64" : "#F03D3E"; // Green for available, red for unavailable
    },
  },
};
</script>

<style scoped>
.product-view {
  height: 700px;
  overflow-y: scroll;
  width: 100%;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 25px;
  height: 73vh;
  width: 98.5%;
}

.product-card-add {
  cursor: pointer;
  display: flex;
  width: 227px;
  height: 391px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f1b100;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  color: #fdfdfd;
  font-size: 20px;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card {
  cursor: pointer;
  display: flex;
  width: 227px;
  height: 391px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 10px;
  background: #fdfdfd;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover,
.product-card-add:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.product-container {
  border-radius: 10px;
  height: 50%;
  background-color: #777;
}

.product-name {
  height: 8%;
  color: #1a1d1f;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
  text-align: left;
}

.product-category {
  display: flex;
  width: 71px;
  height: 18px;
  max-width: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #f1b100;
  color: #f1b100;
  font-size: 10px;
  line-height: 18px;
}

.product-stock {
  font-size: 15px;
  font-weight: 700;
  height: 5%;
  text-align: left;
}

.product-price {
  color: #f1b100;
  font-size: 24px;
  font-weight: 700;
  height: 8%;
  text-align: left;
}

.product-status {
  display: flex;
  width: auto;
  height: 20px;
  padding: 5px 10px;
  align-items: center;
  border-radius: 10px;
  background: #04bd64;
  color: #fdfdfd;
  font-size: 14px;
  font-weight: 900;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1097px;
  height: 821px;
  padding: 15px;
  border-radius: 20px;
  background: #fdfdfd;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
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
