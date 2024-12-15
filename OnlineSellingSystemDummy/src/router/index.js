import {createRouter, createWebHistory} from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Products from "../views/Products.vue";
import ProductView from "../views/ProductView.vue";
import store from "../store";
import AuthLayout from "../components/AuthLayout.vue";

const routes = [{
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: DefaultLayout,
        meta: {requiresAuth: true},
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/products', name: 'Products', component: Products },
            { path: '/products/create', name: 'ProductCreate', component: ProductView },
            { path: '/products/:id', name: 'ProductView', component: ProductView }
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    }
];

const router = createRouter ( {
    history: createWebHistory(),
    routes
})

router.beforeEach( (to, from, next) => {
    // check if authorized
    if (to.meta.requiresAuth && !store.state.user.token){
        next ({name: 'Login'})
    }
    else if (store.state.user.token && to.meta.isGuest) {
        next({Dashboard});
    }
    else{
        next();
    }
})

export default router