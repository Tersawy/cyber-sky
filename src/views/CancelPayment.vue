<template>
    <SectionPage>
        <v-container class="mb-12">
            <v-layout row align-center justify-center style='height: 30rem;'>
                <v-col cols=12>
                    
                </v-col>
                <v-col cols=12 >
                    <div v-if='!isloading'>
                        <h1 class="text-h3 mb-16" >
                            Payment Failed
                        </h1>
                        <v-btn :to='{name: "UserCourse"}' plain link>
                            My Profile 
                        </v-btn>
                    </div>
                    <h1 v-else class="mt-4 mx-auto text-center">
                        <v-progress-circular 
                            indeterminate
                            size="100"
                        >
                        </v-progress-circular>
                    </h1>
                </v-col>
            </v-layout>
            
        </v-container>
     </SectionPage> 
</template>

<script>
import { mapState } from 'vuex'
const SectionPage = () => import("@component/Section.vue")

export default {
    components: {
        SectionPage,
    },
    data() { 
        return {
            items: [
                {
                    text: 'الرئيسية',
                    href: 'breadcrumbs_dashboard',
                },
                {
                    text: ' إسم الدورة التدريبية',
                    href: 'breadcrumbs_link_1',
                },
                {
                    text: ' معلومات الدفع',
                    href: 'breadcrumbs_link_2',
                },
            ],
            isloading: false,
            isError: false
        }
    },

    created() {
        this.isloading = true
        this.$store.dispatch("model/sendReq", {
            url: "payment/confirmed/cancel/",
            method: "create",
            item: JSON.stringify({
                transactionid: this.$route.params.sessionId,
            })
        })
        .catch( () => this.isError = true)
        .finally( ()=>  this.isloading = false )
    }
}
</script>

<style>

</style>