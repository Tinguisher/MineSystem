import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import LandingPage from "../views/LandingPage.vue";
import NavigationBar from "../components/NavigationBar.vue";
import DashBoard from "../components/DashBoard.vue";
import InventoryPage from "../components/InventoryPage.vue";
import CustomerPage from "../components/CustomerPage.vue";
import OrderPage from "../components/OrderPage.vue";
import LiveSession from "../components/LiveSession.vue";
import CategoryView from "../components/CategoryView.vue";
import ProductView from "../components/ProductView.vue";

const routes = [
  {
    path: "/",
    redirect: "/loginpage",
    component: LoginForm,
  },
  {
    path: "/landingpage",
    redirect: "/landingpage",
    name: "LandingPage",
    component: LandingPage,
    children: [
      {
        path: "/landingpage",
        name: "LandingPage",
        component: LandingPage,
      },
      {
        path: "/",
        name: "navigationBar",
        component: NavigationBar,
      },
      {
        path: "/dashboard",
        component: DashBoard,
        name: "home",
      },
      {
        path: "/inventory",
        component: InventoryPage,
        name: "inventory",
      },
      {
        path: "/customers",
        component: CustomerPage,
        name: "customers",
      },
      {
        path: "/orders",
        component: OrderPage,
        name: "orders",
      },
      {
        path: "/live-sessions",
        component: LiveSession,
        name: "liveSessions",
      },
    ],
  },

  { path: "/category-view", component: CategoryView, name: "categoryView" },
  { path: "/product-view", component: ProductView, name: "productView" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
