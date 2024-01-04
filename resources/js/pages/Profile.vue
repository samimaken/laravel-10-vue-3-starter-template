<template>
    <div class="col-12" bis_skin_checked="1">
        <div class="card" bis_skin_checked="1">
            <div class="card-body" bis_skin_checked="1">
                <form @submit.prevent="submit" class="form-horizontal">
                    <div class="form-group row" bis_skin_checked="1">
                        <label for="inputName" class="col-sm-2 col-form-label"
                            >Name</label
                        >
                        <div class="col-sm-10" bis_skin_checked="1">
                            <input
                                type="text"
                                class="form-control"
                                id="inputName"
                                placeholder="Name"
                                name="name"
                                v-model="form.name"
                            />
                            <HasError :form="form" field="name" />
                        </div>
                    </div>
                    <div class="form-group row" bis_skin_checked="1">
                        <label for="email" class="col-sm-2 col-form-label"
                            >Email</label
                        >
                        <div class="col-sm-10" bis_skin_checked="1">
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="Email"
                                v-model="form.email"
                                name="email"
                            />
                            <HasError :form="form" field="email" />
                        </div>
                    </div>
                    <!-- <div class="form-group row" bis_skin_checked="1">
                        <label for="password" class="col-sm-2 col-form-label"
                            >Password</label
                        >
                        <div class="col-sm-10" bis_skin_checked="1">
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Password"
                                v-model="form.password"
                                name="password"
                            />
                            <HasError :form="form" field="password" />
                        </div>
                    </div>
                    <div class="form-group row" bis_skin_checked="1">
                        <label for="passwordConfirmation" class="col-sm-2 col-form-label"
                            >Confirm Password</label
                        >
                        <div class="col-sm-10" bis_skin_checked="1">
                            <input
                                type="password"
                                class="form-control"
                                id="passwordConfirmation"
                                placeholder="Confirm Password"
                                v-model="form.password_confirmation"
                                name="password_confirmation"
                            />
                        </div>
                    </div> -->

                    <div class="form-group row" bis_skin_checked="1">
                        <div class="offset-sm-2 col-sm-10" bis_skin_checked="1">
                            <button type="submit" class="btn btn-danger" :disabled="form.busy">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Form from "vform"
import { HasError } from 'vform/src/components/bootstrap5'
import { mapGetters, mapActions } from "vuex";
export default {
    components:{
        HasError
    },
    data(){
        return {
            form: new Form({
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
            })
        }
    },
    mounted(){
      this.form.name = this.user.name
      this.form.email = this.user.email
    },
    computed:{
        ...mapGetters({
            user: "auth/user"
        })
    },
    methods:{
        ...mapActions({
            'fetchUsr': "auth/fetchUser"
        }),
        async submit() {
            const {data} = await this.form.post('api/profile')
            if(data.success) {
                this.fetchUsr()
                this.$swal({ text: data.message, icon: "success" });
            } else {
                this.$swal({ text: data.message, icon: "warning" });
            }
        }
    }
};
</script>
