<template>
      <SectionPage>
        <v-container >
            <v-layout row warp align-end style='height: 20rem;'>
                <v-col cols=12 md=6 >
                    <h1 style="font-size: 40px;font-weight: lighter;">
                        المدونة
                    </h1>
                </v-col>
                 <v-col cols=12 md=6 class='mb-n6' >
                    <v-row >
                        <v-spacer></v-spacer>
                        <v-col cols=12 md=4>
                            <v-select
                                label="القسم"
                                :items='$store.state.sections'
                                item-text="name"
                                item-value="id"
                                v-model="section"
                                @change="getAll"
                                solo
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-col >
            </v-layout>
            <v-layout row warp class="my-12">
                <template v-if='!isloading'>
                    <v-col md=6 cols=12 v-for='post in posts.results' :key="post.id">
                        <PostCard :data='post'></PostCard>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols=12 md=4>
                        <v-progress-linear
                            buffer-value="0"
                            color="success"
                            stream
                        ></v-progress-linear>
                    </v-col>
                </template>
            </v-layout >
            </v-container>
    </SectionPage>
</template>

<script>
const PostCard = () => import("@component/cards/PostCard.vue")
const SectionPage = () => import("@component/Section.vue")

export default {
    components: {
        PostCard,
        SectionPage
    },
    data() {
        return {
            posts: [],
            section: null
        }
    },
    methods: {
        getAll(){
            this.$store.dispatch("model/sendReq", 
                {method: "all", url: 'blog/post', params: {section: this.section}})
            .then( resp=>{
                this.posts = resp.data
            })
        }
    },
    created(){
        this.getAll()
    }
}
</script>