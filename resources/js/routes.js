import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'

import Login from "./pages/auth/Login.vue"
import Register from "./pages/auth/Register.vue"
import ForgetPassword from "./pages/auth/ForgetPassword.vue"
import ResetPassword from "./pages/auth/ResetPassword.vue"
import Dashboard from "./pages/Dashboard.vue"
import Profile from "./pages/Profile.vue"
import Posts from "./pages/Posts.vue"
import Default from "./layout/App.vue"



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            component: Default,
            path: '/',
            meta: {
                title: `Home`,
                middleware: "auth",
            },
            children:[
                {
                    name: 'dashboard',
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
            name: 'login',
            component: Login,
            path: '/login',
            meta: {
                middleware: "guest",
                title: `Login`
            }
        },
        {
            name: 'register',
            component: Register,
            path: '/register',
            meta: {
                middleware: "guest",
                title: `Register`
            }
        },
        {
            name: 'forget.password',
            component: ForgetPassword,
            path: '/forget-password',
            meta: {
                middleware: "guest",
                title: `Forget Password`
            }
        },
        {
            name: 'reset.password',
            component: ResetPassword,
            path: '/password/reset/:token',
            meta: {
                middleware: "guest",
                title: `Reset Password`
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router
