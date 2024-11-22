import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpProducts = [
    {
        id: 1,
        title: "Product1",
        description: "hehe"
    },
    {
        id: 2,
        title: "2",
        description: "heheaa"
    },
    {
        id: 3,
        title: "Prodc3",
        description: "hehess"
    },
    {
        id: 4,
        title: "pr4",
        description: "hehedd"
    },
    {
        id: 5,
        title: "Br5",
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