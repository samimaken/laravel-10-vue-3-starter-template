import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'

import Login from "./pages/auth/Login.vue"
import Register from "./pages/auth/Register.vue"
import Dashboard from "./pages/Dashboard.vue"
import Profile from "./pages/Profile.vue"
import Posts from "./pages/Posts.vue"
import Default from "./layout/App.vue"



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            component: Default,
            path: '/',
            meta: {
                title: `Home`,
                middleware: "auth",
            },
            children:[
                {
                    name: 'Dashboard',
                    component: Dashboard,
                    path: '/home',
                    meta: {
                        title: `Dashboard`,
                    }
                },
                {
                    name: 'posts',
                    component: Posts,
                    path: '/posts',
                    meta: {
                        title: `Post`,
                    }
                },
                {
                    name: 'profile',
                    component: Profile,
                    path: '/profile',
                    meta: {
                        title: `Profile`,
                    }
                },
            ]
        },

        {
            name: 'Login',
            component: Login,
            path: '/login',
            meta: {
                middleware: "guest",
                title: `Login`
            }
        },
        {
            name: 'Register',
            component: Register,
            path: '/register',
            meta: {
                middleware: "guest",
                title: `Register`
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "Dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "Login" })
        }
    }
})

export default router
