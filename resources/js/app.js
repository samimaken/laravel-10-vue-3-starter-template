

import './bootstrap';

import { createApp } from 'vue';
import App from "./components/App.vue"
import routes from "./routes.js"
import store from "./store/index"
import "admin-lte/plugins/jquery/jquery.min.js"
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "admin-lte/dist/js/adminlte.min.js"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App);
app.use(routes)
app.use(store)
app.use(VueSweetalert2);




app.mount('#app');
