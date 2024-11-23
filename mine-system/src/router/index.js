import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import LandingPage from "../views/LandingPage.vue";
import DashBoard from "../components/DashBoard.vue";
import InventoryPage from "../components/InventoryPage.vue";
import CustomerPage from "../components/CustomerPage.vue";
import OrderPage from "../components/OrderPage.vue";
import LiveSession from "../components/LiveSession.vue";
import CategoryView from "../components/CategoryView.vue";
import ProductView from "../components/ProductView.vue";
import NavigationBar from "@/components/NavigationBar.vue";

const routes = [
  {
    path: "/",
    component: LoginForm,
  },
  {
    path: "/landingpage",
    component: LandingPage,
    children: [
      {
        path: "",
        components: {
          default: DashBoard,
          navigation: NavigationBar,
        },
      },
      {
        path: "inventory",
        components: {
          default: InventoryPage,
          navigation: NavigationBar,
        },
      },
      {
        path: "customers",
        components: {
          default: CustomerPage,
          navigation: NavigationBar,
        },
      },
      {
        path: "orders",
        components: {
          default: OrderPage,
          navigation: NavigationBar,
        },
      },
      {
        path: "live-sessions",
        components: {
          default: LiveSession,
          navigation: NavigationBar,
        },
      },
      {
        path: "category-view",
        components: {
          default: CategoryView,
          navigation: NavigationBar,
        },
      },
      {
        path: "product-view",
        components: {
          default: ProductView,
          navigation: NavigationBar,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
