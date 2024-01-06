<template>
    <div class="container h-100 pt-5">
        <div class="row h-100 align-items-center pt-5">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Forget Password</h1>
                        <hr/>
                        <form @submit.prevent="sendMail" class="row" method="post">
                            <div class="form-group col-12">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" v-model="form.email" name="email" id="email" class="form-control">
                                <HasError :form="form" field="email" />
                            </div>
                            <div class="col-12 mb-2">
                                <Button class="btn btn-primary btn-block" :form="form">Submit</Button>
                            </div>
                            <div class="col-12 text-center">
                                <label>Already have an account? <router-link :to="{name:'Login'}">Login!</router-link></label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import Form from 'vform'
import { HasError, Button } from "vform/src/components/bootstrap5";
export default {
    name:"forget.password",
    components:{
        HasError,
        Button
    },
    data(){
        return {
           form: new Form({
            email: null
           })
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async sendMail(){
            await axios.get('/sanctum/csrf-cookie')
            const response = await this.form.post('/password/email')
            if(response.data && response.data.message) {
                this.$swal({ text: response.data.message, icon: "success" });
            } else {
                this.$swal({ text: "Facing Error try again", icon: "warning" });
            }
        },
    }
}
</script>
