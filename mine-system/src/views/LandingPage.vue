<template>
  <div class="landing-page">
    <div class="div-container">
      <div class="page-container">
        <router-view name="navigation"></router-view>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
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
