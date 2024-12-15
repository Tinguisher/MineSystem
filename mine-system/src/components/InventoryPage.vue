<template>
  <div>
    <div class="inventory">
      <div class="flex-row right" style="height: 5%">
        <p class="username">Username</p>
        <div class="image-profile"></div>
      </div>

      <!--for adjust -->
      <div class="flex-row space-between" style="height: 93%">
        <div
          style="width: 13%"
          :style="{ display: currentTab === 'products' ? 'block' : 'none' }"
        >
          <aside class="filter-panel">
            <h3>Product Category</h3>
            <div
              v-for="category in categories"
              :key="category.id"
              style="height: 20px"
            >
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  :value="category.name"
                  v-model="selectedFilters.categories"
                  @change="applyFilters"
                />
                {{ category.name }}
              </label>
            </div>

            <h3>Sort By</h3>
            <label class="custom-radio">
              <input
                type="radio"
                value="name"
                v-model="sortBy"
                @change="applyFilters"
              />
              Product Name
            </label>
            <label class="custom-radio">
              <input
                type="radio"
                value="quantity"
                v-model="sortBy"
                @change="applyFilters"
              />
              Product Quantity
            </label>
            <label class="custom-radio">
              <input
                type="radio"
                value="price"
                v-model="sortBy"
                @change="applyFilters"
              />
              Product Price
            </label>

            <h3>Order By</h3>
            <label class="custom-radio">
              <input
                type="radio"
                value="asc"
                v-model="orderBy"
                @change="applyFilters"
              />
              Ascending
            </label>
            <label class="custom-radio">
              <input
                type="radio"
                value="desc"
                v-model="orderBy"
                @change="applyFilters"
              />
              Descending
            </label>
          </aside>
        </div>

        <div
          class="flex-column space-between"
          :style="{ width: currentTab === 'categories' ? '100%' : '87%' }"
        >
          <div class="search-bar-container">
            <div class="search-bar">
              <input
                type="text"
                placeholder="Search here..."
                class="input-search"
                v-model="searchQuery"
                @input="handleSearch"
              />
              <PhMagnifyingGlass
                :size="20"
                style="position: relative; margin-left: -58.3%"
              />
            </div>
          </div>

          <div class="tab-container">
            <!-- Tabs -->
            <div class="tabs">
              <button
                class="tab-button"
                :class="{ active: currentTab === 'categories' }"
                @click="currentTab = 'categories'"
              >
                Categories
              </button>
              <button
                class="tab-button"
                :class="{ active: currentTab === 'products' }"
                @click="currentTab = 'products'"
              >
                Products
              </button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content" style="height: 30%">
              <div v-if="currentTab === 'categories'" class="tab-panel">
                <CategoryView
                  :filtered-categories="filteredCategories"
                  @select-category="showProducts"
                />
              </div>
              <div v-if="currentTab === 'products'" class="tab-panel">
                <ProductView
                  :filtered-products="filteredProducts"
                  :category="selectedCategory"
                  @back="showCategories"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryView from "./CategoryView.vue";
import ProductView from "./ProductView.vue";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

export default {
  name: "InventoryPage",
  components: {
    CategoryView,
    ProductView,
    PhMagnifyingGlass,
  },
  data() {
    return {
      currentTab: "categories",
      searchQuery: "",
      selectedFilters: {
        categories: [],
      },
      sortBy: null, // Sorting field
      orderBy: "asc", // Sorting order
      selectedCategory: null,
      categories: [
        { id: 1, name: "Shirts" },
        { id: 2, name: "Pants" },
        { id: 3, name: "Shoes" },
        { id: 4, name: "Bags" },
        { id: 5, name: "Long Sleeves" },
        { id: 6, name: "Women's Shoes" },
        { id: 7, name: "Toys" },
        { id: 8, name: "Appliance" },
        { id: 9, name: "Supplies" },
        // { id: 10, name: "School Supplies" },
        // { id: 11, name: "Groceries" },
        // { id: 12, name: "Perfumes" },
        // { id: 13, name: "Tools" },
        // { id: 14, name: "Slippers" },
        // { id: 15, name: "Foods" },
        // { id: 16, name: "Lipsticks" },
        // { id: 17, name: "Make Ups" },
        // { id: 18, name: "Shorts" },
        // { id: 19, name: "Jorts" },
        // { id: 20, name: "Glasses" },
        // { id: 21, name: "Laptops" },
        // { id: 22, name: "Candies" },
      ],
      products: [
        {
          id: 1,
          name: "Red T-Shirt",
          stock: 10,
          price: 15,
          category: "Shirts",
          code: "0000-0001",
        },
        {
          id: 2,
          name: "Nike Shoe 1",
          stock: 30,
          price: 80,
          category: "Shoes",
          code: "0000-0002",
        },
        {
          id: 3,
          name: "Long Sleeve Black",
          stock: 0,
          price: 25,
          category: "Long Sleeves",
          code: "0000-0003",
        },
        {
          id: 4,
          name: "Ball",
          stock: 18,
          price: 20,
          category: "Toys",
          code: "0000-0004",
        },
        {
          id: 5,
          name: "Doll",
          stock: 50,
          price: 80,
          category: "Toys",
          code: "0000-0005",
        },
        {
          id: 6,
          name: "Sapatos",
          stock: 0,
          price: 50,
          category: "Shoes",
          code: "0000-0006",
        },
        {
          id: 7,
          name: "Black Bag",
          stock: 99,
          price: 999,
          category: "Bags",
          code: "0000-0007",
        },
        {
          id: 8,
          name: "Pink Pants",
          stock: 81,
          price: 1000,
          category: "Pants",
          code: "0000-0008",
        },
        {
          id: 9,
          name: "Stove",
          stock: 16,
          price: 10232,
          category: "Appliance",
          code: "0000-0009",
        },
        {
          id: 10,
          name: "Bond Paper Legal",
          stock: 27,
          price: 10,
          category: "Supplies",
          code: "0000-0010",
        },
        {
          id: 10,
          name: "Black Hat",
          stock: 77,
          price: 10,
          category: "Hats",
          code: "0000-0011",
        },
      ],
    };
  },
  computed: {
    filteredCategories() {
      return this.categoriesWithCount.filter((category) =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredProducts() {
      let filtered = this.products;

      // Filter by category
      if (this.selectedFilters.categories.length) {
        filtered = filtered.filter((product) =>
          this.selectedFilters.categories.includes(product.category)
        );
      }

      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Sort products
      if (this.sortBy) {
        filtered = filtered.sort((a, b) => {
          if (this.orderBy === "asc") {
            return a[this.sortBy] > b[this.sortBy] ? 1 : -1;
          } else {
            return a[this.sortBy] < b[this.sortBy] ? 1 : -1;
          }
        });
      }

      return filtered;
    },
    categoriesWithCount() {
      return this.categories.map((category) => {
        const count = this.products.filter(
          (product) => product.category === category.name
        ).length;
        return { ...category, count };
      });
    },
  },
  methods: {
    showProducts(category) {
      if (category) {
        this.selectedCategory = category;
        this.currentTab = "products";
      } else {
        console.warn("Category not selected!");
      }
    },
    showCategories() {
      this.currentTab = "categories"; // Use currentTab instead of currentView
      this.selectedCategory = null;
    },
    applyFilters() {
      console.log(
        "Filters applied:",
        this.selectedFilters,
        this.sortBy,
        this.orderBy
      );
    },
    handleSearch() {
      // Search functionality is handled via computed properties.
    },
  },
};
</script>

<style scoped>
.inventory {
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  float: right;
}

.search-bar-container {
  height: 7%;
  display: flex;
  justify-content: left;
}

.search-bar {
  width: 1300px;
  border-radius: 10px;
  background: #fdfdfd;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: left;
  align-items: center;
}

.input-search {
  width: 700px;
  height: 40px;
  margin-left: 2%;
  outline: none;
  border: none;
  border-bottom: 1px solid #b9b9b9;
  padding: 0 30px;
  font-size: 15px;
  font-family: "Roboto";
  background: none;
}

::placeholder {
  font-size: 15px;
  font-family: "Roboto";
}

.filter-panel {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 163px;
  height: 98%;
  padding: 10px 20px;
  gap: 10px;
  border-radius: 10px;
  background: #fdfdfd;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.filter-panel h3 {
  text-align: left;
  padding: 10px 0px;
  color: #1a1d1f;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
  border-bottom: 1px solid #e1e1e1;
}

.filter-panel label {
  display: flex;
  align-content: flex-start;
}

/* Remove default styles */
input[type="radio"],
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  margin: 0 8px 0 0;
  border: 2px solid #ccc;
  background-color: white;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
}

/* Shared styles for both */
input[type="radio"],
input[type="checkbox"] {
  border-radius: 5px;
  border: 1px solid #1a1d1f;
  width: 16px;
  height: 16px;
}

input[type="radio"]:checked,
input[type="checkbox"]:checked {
  background-color: #f1b100;
  border-color: #f1b100;
}

input[type="radio"]:checked::after,
input[type="checkbox"]:checked::after {
  content: "";
  color: white;
  position: absolute;
  left: 4px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* Tab Container */
.tab-container {
  height: 90%;
  display: flex;
  flex-direction: column;
}

/* Tabs */
.tabs {
  width: 180px;
  height: 5%;
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* Tab Buttons */
.tab-button {
  text-align: center;
  padding: 10px 0px;
  font-size: 16px;
  border: none;
  background: none;
  color: #a6a6a6; /* Default color */
  cursor: pointer;
  position: relative;
}

.tab-button:hover {
  color: #000; /* Hover color */
}

.tab-button.active {
  color: #000; /* Active color */
}

.tab-button.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: gold; /* Gold underline for the active tab */
}

/* Tab Content */
.tab-content {
  padding: 20px;
}

.tab-panel {
  display: block;
}
</style>
