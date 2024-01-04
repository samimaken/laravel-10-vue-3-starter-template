<template>
    <div class="wrapper">
        <Nav />
        <Sidebar />

        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Starter Page</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li class="breadcrumb-item active">
                                    Starter Page
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                       <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>

        <aside class="control-sidebar control-sidebar-dark">
            <div class="p-3">
                <h5>Title</h5>
                <p>Sidebar content</p>
            </div>
        </aside>

        <Footer />
    </div>
</template>

<script>
import Footer from "./Footer.vue";
import Nav from "./Nav.vue";
import Sidebar from "./Sidebar.vue";
import { mapActions } from "vuex";

export default {
    name: "default-layout",
    components: {
        Footer,
        Nav,
        Sidebar,
    },
    created(){
      this.fetchUser()
    },
    methods:{
      ...mapActions({
        fetchUser: "auth/fetchUser"
      })
    }

};
</script>
