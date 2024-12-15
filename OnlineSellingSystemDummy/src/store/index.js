import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpProducts = [
    {
        id: 1,
        image: "../assets/vue.svg",
        code: "001",
        name: "Product1",
        stock: 500,
        price: 10,
        description: "hehe"
    },
    {
        id: 2,
        image: "../assets/vue.svg",
        code: "002",
        name: "2",
        stock: 100,
        price: 20,
        description: "heheaa"
    },
    {
        id: 3,
        image: "../assets/vue.svg",
        code: "003",
        name: "Prodc3",
        stock: 300,
        price: 30,
        description: "hehess"
    },
    {
        id: 4,
        image: "../assets/vue.svg",
        code: "004",
        name: "pr4",
        stock: 5000,
        price: 15,
        description: "hehedd"
    },
    {
        id: 5,
        image: "../assets/vue.svg",
        code: "005",
        name: "Br5",
        stock: 5002,
        price: 70,
        description: "heheff"
    }
]

const store = createStore({
    state: {
        user: {
            data: {},
            // get the session storage that has name 'token'
            token: sessionStorage.getItem('TOKEN')
        },
        products: [...tmpProducts],
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return  axiosClient.post('/register', user)
                .then(({data}) => {
                    // go to mutations setUser
                    commit('setUser', data);
                    return data;
                })

        },
        login({ commit }, user) {
            return  axiosClient.post('/login', user)
                .then(({data}) => {
                    // go to mutations setUser
                    commit('setUser', data);
                    return data;
                })

        },
        // there is nothing to pass, so its just a commit
        logout({ commit }) {
            return  axiosClient.post('/logout')
                .then((response) => {
                    // go to mutations logout
                    commit('logout');
                    return response;
                })
        },
    },
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN')
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token)
        }
    },
    modules: {}
})

export default store;