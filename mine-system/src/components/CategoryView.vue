<template>
  <div class="category-view">
    <div v-if="!filteredCategories.length" class="empty-state">
      <p>No categories found.</p>
    </div>
    <div class="category-card-add" @click="showPopup = true">
      <PhPlus :size="70" /><br />
      Add Category
    </div>

    <div
      class="category-card"
      v-for="category in filteredCategories"
      :key="category.id"
      @click="selectCategory(category)"
    >
      <div class="edit-delete"><PhDotsThree :size="25" weight="bold" /></div>
      <div class="category-icon"></div>
      <p class="category">
        <span>{{ category.count }} </span> {{ category.name }}
      </p>
    </div>
  </div>

  <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <div class="flex-column" style="height: 43%">
        <div class="close-button">
          <PhX :size="23" @click="showPopup = false" />
        </div>

        <div class="pop-up-title">New Category</div>
        <div class="pop-up-description">
          Customize your new category with an icon and name
        </div>
      </div>

      <form
        class="flex-column space-between"
        @submit.prevent="submitCategory"
        style="height: 53%; width: 90%; padding: 0% 5%"
      >
        <div
          class="flex-row space-between"
          style="height: 55%; align-items: center"
        >
          <div class="form-group" style="width: 20%">
            <label for="category-icon">Category Icon</label>
            <div class="icon-picker">
              <div class="category-icon-preview"></div>
              <button
                type="button"
                class="icon-edit-button"
                @click="selectIcon"
              >
                <PhPencilSimple :size="20" color="#f1b100" />
              </button>
            </div>
          </div>

          <div class="form-group" style="width: 78%">
            <!-- Bind dynamic class based on error state -->
            <label
              for="category-name"
              :class="{ 'error-label': categoryNameError }"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category-name"
              class="category-name"
              v-model="categoryName"
              :placeholder="
                categoryNameError && !categoryName
                  ? 'Ooops! You did not type anything!'
                  : 'Type your category’s name here!'
              "
              @input="validateCategoryName"
              @blur="validateCategoryName"
              :class="{
                'error-input': categoryNameError && !categoryName,
                'error-placeholder': categoryNameError && !categoryName,
              }"
            />

            <span v-if="categoryNameError" class="error-message">
              {{ categoryNameError }}
            </span>
          </div>
        </div>

        <div class="form-actions" style="height: 30%">
          <ConfirmCancel
            v-if="showPopup"
            @update:showPopup="showPopup = false"
            :showPopup="showPopup"
            :validateCategoryName="validateCategoryName"
            :submitCategory="submitCategory"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ConfirmCancel from "@/components/ConfirmCancel.vue";
import { PhPlus, PhDotsThree, PhX, PhPencilSimple } from "@phosphor-icons/vue";

export default {
  name: "CategoryView",
  components: {
    PhPlus,
    PhDotsThree,
    PhX,
    PhPencilSimple,
    ConfirmCancel,
  },
  props: ["filteredCategories"],
  data() {
    return {
      showPopup: false,
      categoryName: "",
      categoryNameError: "",
    };
  },
  methods: {
    validateCategoryName() {
      if (!this.categoryName.trim()) {
        this.categoryNameError = "*This field is required.";
      } else {
        this.categoryNameError = "";
      }
    },
    submitCategory() {
      this.validateCategoryName();
      if (!this.categoryNameError) {
        // Handle category submission
        console.log("Category submitted:", this.categoryName);
        this.showPopup = false;
      }
    },
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
  align-content: flex-start;
  gap: 25px;
  overflow-y: auto;
  height: 73vh;
  width: 98.5%;
}

.category-view::-webkit-scrollbar {
  width: 10px;
}

.category-view::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 10px;
}

.category-view::-webkit-scrollbar-thumb {
  background: #f1b100;
  border-radius: 10px;
}

.category-card {
  width: 220px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card-add {
  width: 220px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  background: #f1b100;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover,
.category-card-add:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.edit-delete {
  height: 10%;
  width: 90%;
  display: flex;
  justify-content: right;
}

.category-icon {
  width: 45%;
  height: 50%;
  background-color: #d8d8d8;
}

.category {
  color: #1a1d1f;
  font-size: 20px;
  font-weight: 500;
}

.category span {
  color: #f1b100;
}

.empty-state {
  text-align: center;
  color: #888;
  height: 10%;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1000;
}

/* Modal Content */
.popup-content {
  background-color: white;
  padding: 20px 30px;
  width: 600px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.close-button {
  font-size: 18px;
  cursor: pointer;
  height: 20%;
  display: flex;
  justify-content: right;
}

.pop-up-title {
  text-align: left;
  color: #f1b100;
  font-size: 48px;
  font-weight: 500;
  height: 50%;
}

.pop-up-description {
  color: #1a1d1f;
  font-size: 20px;
  text-align: left;
  height: 25%;
}

.form-group {
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 80%;
}

label {
  color: #1a1d1f;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
}

.icon-picker {
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

.category-icon-preview {
  width: 40px;
  height: 40px;
  margin-left: 15px;
  border: 1px solid #1a1d1f;
  border-radius: 5px;
}

.icon-edit-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.category-name {
  width: auto;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #424049;
  outline: none;
}

.category-name::placeholder {
  color: #424049;
  font-size: 20px;
}

input[type="text"]:focus {
  color: #f1b100;
  border-color: #f1b100;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.error-message {
  color: red;
  font-size: 15px;
  margin-top: 3px;
}

.error-placeholder::placeholder,
.error-label {
  color: red;
}

.error-input {
  border: 1px solid red;
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
