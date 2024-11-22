<template>
  <div class="category-view">
    <div class="header">
      <h2>Categories</h2>
    </div>
    <div v-if="!filteredCategories.length" class="empty-state">
      <p>No categories found.</p>
    </div>
    <div class="category-card" @click="showPopup = true">Add Category</div>

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <div class="modal-content">
          <button class="close-button" @click="showPopup = false">✖</button>
          <h2>New Category</h2>
          <p>Customize your new category with an icon and name</p>

          <form @submit.prevent="submitCategory">
            <div class="form-group">
              <label for="category-icon">Category Icon</label>
              <div class="icon-picker">
                <img
                  v-if="icon"
                  :src="icon"
                  alt="Category Icon"
                  class="category-icon-preview"
                />
                <button
                  type="button"
                  class="icon-edit-button"
                  @click="selectIcon"
                >
                  ✏️
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="category-name">Category Name</label>
              <input
                type="text"
                id="category-name"
                v-model="categoryName"
                placeholder="Type your category’s name here!"
                required
              />
            </div>

            <div class="form-actions">
              <button type="submit" class="confirm-button">Confirm</button>
              <button type="button" class="cancel-button" @click="closeModal">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="category-card"
      v-for="category in filteredCategories"
      :key="category.id"
      @click="selectCategory(category)"
    >
      <div>...</div>
      <h3>{{ category.name }}</h3>
      <p>{{ category.count }} items</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryView",
  props: ["filteredCategories"],
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    selectCategory(category) {
      if (category && category.id) {
        this.$emit("select-category", category);
      } else {
        console.error("Invalid category selected.");
      }
    },
  },
};
</script>

<style scoped>
.category-view {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category-card {
  width: 150px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.empty-state {
  text-align: center;
  color: #888;
}

.header {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
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
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Modal Content */
.modal-content {
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

h2 {
  color: #ffb000; /* Gold color */
}

p {
  margin-top: 5px;
  margin-bottom: 20px;
  color: #555;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.icon-picker {
  display: flex;
  align-items: center;
}

.category-icon-preview {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.icon-edit-button {
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.confirm-button {
  background-color: #ffb000;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
