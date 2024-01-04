const posts = {
    namespaced: true,
    state: {
        posts: []
    },
    getters: {
        posts(state){
            return state.posts
        }
    },
    mutations: {
        SET_POSTS(state, data){
            state.posts = data;
        }
    },
    actions:{
        setPosts({commit}, payload) {
            commit('SET_POSTS', payload)
        }
    }
}

export default posts
