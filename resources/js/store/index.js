import auth from "@/store/auth";
import posts from "@/store/posts";
import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules: {
        auth,
        posts
    }
})

export default store
