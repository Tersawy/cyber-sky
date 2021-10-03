<template>
    <v-sheet class='ma-2'>
        <v-alert elevation="2" >   
                <template v-slot:prepend>
                    <v-icon class="v-alert__icon icon-redius" color='#0082C6'>
                        fa-check
                    </v-icon>
                </template>
                <h3>المتطلبات لإتمام هذا الكورس</h3>
                <p v-html=listRequirement>
                    <!-- <v-list >
                        <template v-for="(require, i) in listRequirement" >
                            <div :key="i">
                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title>{{require}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider v-if='i < require.length'></v-divider>
                            </div>
                        </template>
                    </v-list> -->
                </p>
        </v-alert>
    </v-sheet>
</template>

<script>
export default {
    props: ['list-requirement']
}
</script>

<style>

</style>