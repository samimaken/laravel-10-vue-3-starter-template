import axios from "axios";
import router from "../routes";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
    },
    mutations: {
        SET_AUTHENTICATION(state, value) {
            state.authenticated = value;
        },
        SET_USER(state, value) {
            state.user = value;
        },
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user;
        },
    },
    actions: {
        login({ commit }) {
            axios
                .get("/api/user")
                .then(({ data }) => {
                    commit("SET_AUTHENTICATION", true);
                    commit("SET_USER", data);
                    router.push({ name: "Dashboard" });
                })
                .catch(({ response: { data } }) => {
                    commit("SET_AUTHENTICATION", false);
                    commit("SET_USER", {});
                });
        },
        async fetchUser({ commit }) {
            // await axios.get('/sanctum/csrf-cookie')
           await axios
                .get("/api/user")
                .then(({ data }) => {
                    commit("SET_USER", data);
                })
                .catch(({ response: { data } }) => {
                    commit("SET_AUTHENTICATION", false);
                    commit("SET_USER", {});
                });
        },
        logout({ commit }) {
            commit("SET_USER", {});
            commit("SET_AUTHENTICATION", false);
        },
    },
};
