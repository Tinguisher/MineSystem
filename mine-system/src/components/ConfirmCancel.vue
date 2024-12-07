<template>
  <div class="action-buttons">
    <button type="submit" class="confirm-button" @click="handleConfirm">
      Confirm
    </button>
    <button type="button" class="cancel-button" @click="handleCancel">
      Cancel
    </button>
  </div>
</template>

<script>
export default {
  name: "confirm-cancel",
  props: {
    showPopup: {
      type: Boolean,
      required: true,
    },
    validateCategoryName: {
      type: Function,
      required: true,
    },
    submitCategory: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleConfirm() {
      this.validateCategoryName();
      if (!this.$parent.categoryNameError) {
        this.submitCategory();
      }
    },
    handleCancel() {
      this.$emit("update:showPopup", false);
    },
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: space-between;
}

button {
  width: 45%;
  height: 85%;
  font-size: 16px;
  font-weight: 900;
}

.confirm-button {
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #f1b100;
  background: #f1b100;
}

.cancel-button {
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #1a1d1f;
}
</style>
