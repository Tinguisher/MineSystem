<template>
  <div :class="{ 'sidebar-expanded': sidebarExpanded }" class="sidebar">
    <div class="flex-column space-between navbar">
      <div style="height: 50%">
        <div class="logo">
          <div class="icon-container" style="align-items: right">
            <PhList @click="changeImage" />
          </div>
          <img :src="imageSrc" />
        </div>
        <nav
          class="nav-menu"
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <ul>
            <router-link to="/landingpage">
              <li
                :class="{ active: isActive === 'DashBoard' }"
                @click="setActive('DashBoard')"
              >
                <div class="icon-container">
                  <PhHouse :size="20" :color="getIconColor('DashBoard')" />
                </div>
                <span>Home</span>
              </li>
            </router-link>
            <router-link to="/landingpage/inventory">
              <li
                :class="{ active: isActive === 'InventoryPage' }"
                @click="setActive('InventoryPage')"
              >
                <div class="icon-container">
                  <PhTreasureChest
                    :size="20"
                    :color="getIconColor('InventoryPage')"
                  />
                </div>
                <span>Inventory</span>
              </li>
            </router-link>
            <router-link to="/landingpage/customers">
              <li
                :class="{ active: isActive === 'CustomerPage' }"
                @click="setActive('CustomerPage')"
              >
                <div class="icon-container">
                  <PhUser :size="20" :color="getIconColor('CustomerPage')" />
                </div>
                <span>Customers</span>
              </li>
            </router-link>
            <router-link to="/landingpage/orders">
              <li
                :class="{ active: isActive === 'OrderPage' }"
                @click="setActive('OrderPage')"
              >
                <div class="icon-container">
                  <PhClipboardText
                    :size="20"
                    :color="getIconColor('OrderPage')"
                  />
                </div>
                <span>Orders</span>
              </li> </router-link
            ><router-link to="/landingpage/live-sessions">
              <li
                :class="{ active: isActive === 'LiveSession' }"
                @click="setActive('LiveSession')"
              >
                <div class="icon-container">
                  <PhBroadcast
                    :size="20"
                    :color="getIconColor('LiveSession')"
                  />
                </div>
                <span>Live Sessions</span>
              </li>
            </router-link>
          </ul>
        </nav>
      </div>
      <div style="height: 8%">
        <nav
          class="nav-menu"
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <ul>
            <li
              :class="{ active: isActive === 'contact-us' }"
              @click="setActive('contact-us')"
            >
              <div class="icon-container">
                <PhPhone :size="20" :color="getIconColor('contact-us')" />
              </div>
              <span>Contact Us</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PhHouse,
  PhTreasureChest,
  PhUser,
  PhClipboardText,
  PhBroadcast,
  PhPhone,
  PhList,
} from "@phosphor-icons/vue";
export default {
  name: "NavigationBar",
  components: {
    PhHouse,
    PhUser,
    PhTreasureChest,
    PhClipboardText,
    PhBroadcast,
    PhPhone,
    PhList,
  },
  data() {
    return {
      isActive: "DashBoard",
      imageSrc: require("@/assets/logo-small.png"),
      sidebarExpanded: false,
      components: [
        "DashBoard",
        "InventoryPage",
        "CustomerPage",
        "OrderPage",
        "LiveSession",
      ],
    };
  },
  methods: {
    setActive(menuItem) {
      this.isActive = menuItem;
      this.$emit("componentSelected", menuItem);
    },
    changeImage() {
      this.sidebarExpanded = !this.sidebarExpanded;
      this.imageSrc =
        this.imageSrc === require("@/assets/logo-small.png")
          ? require("@/assets/logo-full.png")
          : require("@/assets/logo-small.png");
    },
    getIconColor(menuItem) {
      return this.isActive === menuItem ? "#ffffff" : "#000000"; // White if active, black if inactive
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 2.8%;
  height: 100%;
  align-items: center;
}

.navbar {
  padding: 26px 10px;
  border-radius: 10px;
  border: 3px solid rgba(251, 255, 244, 0.27);
  background: #fdfdfd;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logo {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  height: 25%;
}

.icon-container {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.nav-menu {
  width: 100%;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
}

.nav-menu li {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-menu li span {
  margin-left: 5%;
  color: #000000;
}

.nav-menu li.active span,
.nav-menu li.active .icon-container {
  color: #ffffff;
}

.nav-menu li.active,
.nav-menu li:hover {
  background-color: #f1b100;
  border-radius: 10px;
}

.nav-menu ul li.active .icon-container svg path {
  fill: #ffffff;
}

.nav-menu ul li span {
  display: none;
  visibility: hidden;
  opacity: 0;
}

.sidebar-expanded {
  width: 10%;
}

.sidebar-expanded .icon-container {
  width: 15%;
}

.sidebar-expanded .nav-menu ul li span {
  display: inline;
  visibility: visible;
  opacity: 1;
  font-weight: 600;
}

.sidebar-expanded .logo .icon-container {
  width: 100%;
  display: flex;
  justify-content: right;
}

.sidebar-expanded .logo img {
  padding: 10px 0;
}
</style>
