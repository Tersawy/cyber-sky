<template>
  <v-card outlined>
        <v-list-item three-line >
            <v-list-item-avatar  tile 
                size="270" 
                height="190px"
                color="grey"
            >
                <v-img 
                :src='`https://323f496c228ba266d14fe967a7ddb488.cyber-sky.org/media/${course.image}`'>
                </v-img>
            </v-list-item-avatar>


            <v-list-item-content>
                <div class="overline mb-4">
                    <v-btn 
                        outlined 
                        color='grey'
                    >
                        {{ course.section }}
                    </v-btn>
                </div>
                <v-list-item-title  style='font-size:20px'>
                   {{ course.title }}
                </v-list-item-title>
                <v-list-item-subtitle style='font-size:16px' >
                    {{ course.description }}
                </v-list-item-subtitle>                            
            </v-list-item-content>
        </v-list-item>

        <v-card-actions v-if='data.status' class="d-flex justify-end">
            <div >
                <v-btn outlined color='grey' v-if='!data.progressValue' 
                @click="$router.push({name: 'EducationContent', params: {id: data.id} })" >إبدأ الآن</v-btn>
                <v-btn outlined color='grey' v-else >أكمل الدراسة</v-btn>
            </div>
            <!-- <div v-else>
                <v-btn outlined color='grey' class="mx-2">أضف تقييم</v-btn>
                <v-btn outlined color='grey'>تنزيل الشهادة</v-btn>
            </div> -->
        </v-card-actions>
        <v-card-actions v-else class="d-flex justify-end">
            <v-chip outlined color="red darken-4" >
                لم يتم تاكد شراء الكورس يرجا التاكد من الاميل الخاص بيك ؟ 
            </v-chip>
        </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: ['data'],
    computed:{

        course() { 
            return this.data.course_detals
        }
    }
}
</script>

<style>

</style>