<template>
  <v-card outlined>
    <v-list-item >
        <v-list-item-icon>
            <v-icon class="icon-redius" color='#0082C6'>
                fa-question
            </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="headline mb-1">
                {{ data.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-wrap">
                {{ data.text }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>  
    <v-form @submit.prevent="submit" ref='form'>
        <v-card-text>
                <span v-if='answerChose' >
                    <v-radio-group name="answer">
                        <v-row >
                            <v-col cols=4 >
                                <v-radio class="d-inline"
                                    :label="data.first_option"
                                    :value="data.first_option"
                                ></v-radio>
                            </v-col>
                            <v-col cols=4>
                                <v-radio class="d-inline"
                                    :label="data.second_option"
                                    :value="data.second_option"
                                ></v-radio>
                            </v-col>
                            <v-col cols=4>
                                <v-radio class="d-inline"
                                    :label="data.third_option"
                                    :value="data.third_option"
                                ></v-radio>
                            </v-col>
                        </v-row> 
                    </v-radio-group>
                </span>
                <span v-else>
                    <v-expand-transition>
                        <v-textarea
                            outlined
                            auto-grow
                            label="نص الإجابة "
                            name="answer"
                            placeholder="أدخل إجابتك هنا"
                        ></v-textarea>
                    </v-expand-transition>
                </span>
        </v-card-text>
        <v-card-actions class="justify-end mt-6">
            <v-btn
                type="submit"
                color="blue" dark
                :loading="isloading"
                elevation=1>  إجابة </v-btn>
        </v-card-actions> 
    </v-form>  
  </v-card>
</template>

<script>
export default {
    props: ['answerChose', "data"],
    data() {
        return {
            isloading: false
        }
    },
    methods: {
        submit() {
            let fd = new FormData(this.$refs.form.$el)
            fd = Object.fromEntries(fd)
            this.isloading = true
            if (!this.answerChose){
                this.$store.dispatch("model/sendReq", {
                    url: `user/answer/messions/${this.data.id}/`,
                    method: "create",
                    item: JSON.stringify(fd)
                })
                .then( resp=> console.log(resp.data))
                .finally( ()=>  this.isloading = false)
            } else {
                this.$store.dispatch("model/sendReq", {
                    url: `user/answer/questions/${this.data.id}/`,
                    method: "create",
                    item: JSON.stringify(fd)
                })
                .then( resp=> console.log(resp.data))
                .finally( ()=>  this.isloading = false)
            } 
        }
    }
}
</script>

<style>
    .icon-redius{
        border-width: .5px !important;
        border-style: solid !important;
        border-color: #eee !important;
        border-radius: 8px !important;
        padding: 16px !important;
    }
</style>