<template>
  <div class="landing-page">
    <div class="div-container">
      <div class="page-container">
        <NavigationBar @componentSelected="setComponent" />
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import DashBoard from "../components/DashBoard.vue";
import InventoryPage from "../components/InventoryPage.vue";
import CustomerPage from "../components/CustomerPage.vue";
import OrderPage from "../components/OrderPage.vue";
import LiveSession from "../components/LiveSession.vue";

export default {
  name: "LandingPage",
  components: {
    NavigationBar,
    DashBoard,
    InventoryPage,
    CustomerPage,
    OrderPage,
    LiveSession,
  },
  data() {
    return {
      currentComponent: "DashBoard", // Default starting component
    };
  },
  methods: {
    setComponent(componentName) {
      this.currentComponent = componentName; // Update the current component
    },
  },
};
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
</style>
