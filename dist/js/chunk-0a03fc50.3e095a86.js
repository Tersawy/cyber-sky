(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a03fc50"],{5005:function(t,e,a){t.exports=a.p+"img/avatar_rating.43cc1c3c.png"},"758d":function(t,e,a){},"9f72":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("SectionPage",[a("v-container",[a("v-layout",{staticClass:"mt-16",staticStyle:{height:"22rem"},attrs:{row:"",warp:"","align-end":""}},[a("v-col",{attrs:{cols:"12"}},[a("v-breadcrumbs",{attrs:{items:t.items,divider:">>"}}),a("h1",{staticStyle:{"font-size":"30px"}},[t._v(" "+t._s(t.current.title)+" ")]),a("p",{staticClass:"grey--text ",staticStyle:{"font-size":"20px"}},[t._v(" "+t._s(t.current.description)+" ")])],1)],1),a("v-layout",{attrs:{row:""}},[a("v-col",{attrs:{cols:"12",md:"8"}},[a("v-tabs",{staticClass:"mt-12",attrs:{"fixed-tabs":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab",[t._v("مقدمة")]),a("v-tab",[t._v("المحتوى التعليمي")]),a("v-tab",[t._v("المتطلبات")]),a("v-tab",[t._v("المدرب")]),a("v-tab",[t._v("التقييمات")]),a("v-tab-item",{staticClass:"pa-1"},[a("v-alert",{staticClass:"mt-8",attrs:{elevation:"2"},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("v-icon",{staticClass:"v-alert__icon icon-redius",attrs:{color:"#0082C6"}},[t._v(" fa-question ")])]},proxy:!0}])},[a("h3",{staticClass:"mb-4"},[t._v("ما الذي سوف تتعلمه من هذا الكورس")]),a("p",{staticStyle:{"white-space":"pre-wrap"},domProps:{innerHTML:t._s(t.current.goals)}})])],1),a("v-tab-item",[a("EducationalContentTab",{attrs:{data:t.current.units,"pdf-link":t.current.pdf}})],1),a("v-tab-item",[a("RequirementsTab",{attrs:{"list-requirement":t.current.requirements}})],1),a("v-tab-item",[a("AboutTeacherTab",{attrs:{data:t.current.teacher_profile,"can-booking":!!t.user.id}})],1),a("v-tab-item",[a("RatingTab",{attrs:{"rating-course":t.current.ratings,"can-rating":t.current.id}})],1)],1)],1),a("v-col",{staticClass:"order-first order-md-2 mt-md-n6",attrs:{cols:"12",md:"4"}},[a("CourseCard",{attrs:{data:t.current}}),a("v-alert",{staticClass:"mt-12",attrs:{type:"success"},model:{value:t.alertSuccessAddToCart,callback:function(e){t.alertSuccessAddToCart=e},expression:"alertSuccessAddToCart"}},[a("h3",[t._v("تمت الإضافة")]),a("p",[t._v("تمت إضافة الدورة التدريبية إلى سلة الشراء بنجاح")])])],1)],1)],1)],1)},r=[],c=(a("d3b7"),a("2f62")),s=function(){return a.e("chunk-40f39765").then(a.bind(null,"bbf6"))},u=function(){return Promise.all([a.e("chunk-1392101e"),a.e("chunk-14ae0164"),a.e("chunk-6c1edf20"),a.e("chunk-39558b06"),a.e("chunk-a3163f86"),a.e("chunk-f120ec20"),a.e("chunk-43140fb0"),a.e("chunk-24d67a57")]).then(a.bind(null,"010f"))},i=function(){return Promise.all([a.e("chunk-1392101e"),a.e("chunk-14ae0164"),a.e("chunk-6c1edf20"),a.e("chunk-19bbf643"),a.e("chunk-45f6a4d8"),a.e("chunk-b12094b8"),a.e("chunk-79e492fa"),a.e("chunk-4de32da1")]).then(a.bind(null,"dfa8"))},o=function(){return Promise.all([a.e("chunk-1392101e"),a.e("chunk-14ae0164"),a.e("chunk-6c1edf20"),a.e("chunk-45f6a4d8"),a.e("chunk-39558b06"),a.e("chunk-a3163f86"),a.e("chunk-b12094b8"),a.e("chunk-0ce072c4"),a.e("chunk-2d21e065")]).then(a.bind(null,"d498"))},d=function(){return a.e("chunk-2d0cc2a1").then(a.bind(null,"4d83"))},l=function(){return Promise.all([a.e("chunk-1392101e"),a.e("chunk-19bbf643"),a.e("chunk-39558b06"),a.e("chunk-a3163f86"),a.e("chunk-0041a583"),a.e("chunk-09af3442")]).then(a.bind(null,"195e"))},b={components:{CourseCard:l,SectionPage:s,EducationalContentTab:u,AboutTeacherTab:i,RatingTab:o,RequirementsTab:d},data:function(){return{userHaveCoures:!0,alertSuccessAddToCart:!1,items:[{text:"الرئيسية",disabled:!0,href:"breadcrumbs_dashboard"},{text:"القسم",disabled:!0,href:"breadcrumbs_link_1"},{text:"إسم الدورة",disabled:!1,href:"breadcrumbs_link_2"}],tab:0,ratings:[{avatar:a("5005"),name:"إسم صاحب التقييم",date_at:"28 November",value:5,text:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق"},{avatar:a("5005"),name:"إسم صاحب التقييم",date_at:"23 November",value:3,text:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق"}],list:["متطلب أساسي لإتمام الكورس","متطلب أساسي لإتمام الكورس","متطلب أساسي لإتمام الكورس","متطلب أساسي لإتمام الكورس","متطلب أساسي لإتمام الكورس"]}},computed:Object(c["b"])({current:function(t){return t.model.current},user:function(t){return t.auth.user}}),created:function(){var t=this.$route.params.id;this.$store.dispatch("model/sendReq",{method:"get",url:"course",id:t})}},h=b,f=(a("fd13"),a("2877")),m=a("6544"),v=a.n(m),k=a("0798"),p=a("2bc5"),_=a("62ad"),C=a("a523"),T=a("132d"),g=a("a722"),x=a("71a3"),w=a("c671"),y=a("fe57"),S=Object(f["a"])(h,n,r,!1,null,null,null);e["default"]=S.exports;v()(S,{VAlert:k["a"],VBreadcrumbs:p["a"],VCol:_["a"],VContainer:C["a"],VIcon:T["a"],VLayout:g["a"],VTab:x["a"],VTabItem:w["a"],VTabs:y["a"]})},fd13:function(t,e,a){"use strict";a("758d")}}]);