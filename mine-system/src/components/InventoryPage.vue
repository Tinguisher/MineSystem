<template>
  <div>
    <div class="flex-row right" style="height: 5%">
      <p class="username">Username</p>
      <div class="image-profile"></div>
    </div>
    <!--for adjust -->
    <div>
      <div class="search-bar" style="height: 10%; width: 10%">
        <input
          type="text"
          placeholder="Search here..."
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>

      <div class="tab-container">
        <!-- Tabs -->
        <div class="tabs" style="height: 10%">
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
            <aside class="filter-panel">
              <h3>Product Category</h3>
              <div v-for="category in categories" :key="category.id">
                <label>
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
              <label>
                <input
                  type="radio"
                  value="name"
                  v-model="sortBy"
                  @change="applyFilters"
                />
                Product Name
              </label>
              <label>
                <input
                  type="radio"
                  value="quantity"
                  v-model="sortBy"
                  @change="applyFilters"
                />
                Product Quantity
              </label>
              <label>
                <input
                  type="radio"
                  value="price"
                  v-model="sortBy"
                  @change="applyFilters"
                />
                Product Price
              </label>

              <h3>Order By</h3>
              <label>
                <input
                  type="radio"
                  value="asc"
                  v-model="orderBy"
                  @change="applyFilters"
                />
                Ascending
              </label>
              <label>
                <input
                  type="radio"
                  value="desc"
                  v-model="orderBy"
                  @change="applyFilters"
                />
                Descending
              </label>
            </aside>

            <main>
              <ProductView
                :filtered-products="filteredProducts"
                :category="selectedCategory"
                @back="showCategories"
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryView from "./CategoryView.vue";
import ProductView from "./ProductView.vue";

export default {
  name: "InventoryPage",
  components: {
    CategoryView,
    ProductView,
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
      ],
      products: [
        {
          id: 1,
          name: "Red T-Shirt",
          stock: 10,
          price: 15,
          category: "Shirts",
        },
        { id: 2, name: "Nike Shoe 1", stock: 30, price: 80, category: "Shoes" },
        {
          id: 3,
          name: "Long Sleeve Black",
          stock: 0,
          price: 25,
          category: "Long Sleeves",
        },
        { id: 4, name: "Pink Hat", stock: 0, price: 10, category: "Hats" },
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
.products-page {
  display: flex;
}
.filter-panel {
  width: 20%;
  padding: 20px;
  border-right: 1px solid #ccc;
}
.filter-panel h3 {
  margin-bottom: 10px;
}
.filter-panel label {
  display: block;
  margin-bottom: 5px;
}
main {
  width: 70%;
  padding: 20px;
  position: absolute;
  right: 0%;
  top: 25%;
}

/* Tab Container */
.tab-container {
  width: 100%;
  font-family: Arial, sans-serif;
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

/* Tab Buttons */
.tab-button {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  border: none;
  background: none;
  color: #888; /* Default color */
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
