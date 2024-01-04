<template>
    <div class="col-12">
        <div class="text-right mb-2">
            <button class="btn btn-sm btn-primary" @click="showModal = true">
                Add Post
            </button>
        </div>
        <div class="card mb-2" v-for="(post, i) in posts" :key="i">
            <div class="card-body">
                <p>{{ post.title }}</p>
                <p>{{ post.post }}</p>
                <button
                    class="btn btn-sm btn-danger mr-1"
                    @click="deletePost(post.id)"
                >
                    Delete Post
                </button>
                <button
                    class="btn btn-sm btn-primary"
                    @click="editPost(post.id)"
                >
                    Edit Post
                </button>
            </div>
        </div>

        <div
            class="modal fade show"
            id="PostModal"
            style="display: block"
            v-if="showModal"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="submit">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">
                                {{ form.id ? "Edit Post" : "Add Post" }}
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="showModal = false"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group mb-2">
                                <label>Title</label>
                                <input
                                    name="title"
                                    class="form-control"
                                    v-model="form.title"
                                />
                                <HasError :form="form" field="title" />
                            </div>
                            <div class="form-group mb-2">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    class="form-control"
                                    v-model="form.description"
                                ></textarea>
                                <HasError :form="form" field="description" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                                @click="showModal = false"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary"
                                :disabled="form.busy"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Form from "vform";
import { HasError } from "vform/src/components/bootstrap5";
import axios from "axios";

export default {
    name: "Posts",
    components: {
        HasError,
    },
    data() {
        return {
            form: new Form({
                id: null,
                title: null,
                description: null,
            }),
            showModal: false,
        };
    },
    computed: {
        ...mapGetters({
            posts: "posts/posts",
        }),
    },
    created() {
        this.getPosts();
    },
    methods: {
        ...mapActions({
            setPosts: "posts/setPosts",
        }),
        async getPosts() {
            const { data } = await axios.get("/api/posts");
            if (data.success) {
                this.setPosts(data.data);
            }
        },
        async submit() {
            const { data } = await this.form.post("api/posts");
            if (data.success) {
                this.getPosts();
                this.showModal = false;
                this.form.reset();
                this.$swal({ text: data.message, icon: "success" });
            } else {
            }
        },
        async deletePost(post) {
            this.$swal({
                text: "Are you sure",
                icon: "question",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete("/api/posts/" + post);
                    if (data.success) {
                        this.getPosts();
                        this.$swal({ text: data.message, icon: "success" });
                    } else {
                        this.$swal({ text: data.message, icon: "warning" });
                    }
                }
            });
        },
        editPost(post) {
            const item = this.posts.find((f) => {
                return (f.id = post);
            });
            this.form.id = item.id;
            this.form.title = item.title;
            this.form.description = item.post;
            this.showModal = true;
        },
    },
};
</script>
