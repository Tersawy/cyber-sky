<template>
	<div id="course">
		<v-container>
			<v-layout row wrap justify-center style="top: -20pt;position: relative;">
				<v-col md="4" cols="12" v-for="course in courses.results" :key="course.id">
					<CoursesCard :data="course" :class="`mt-${course.id * 4}`"> </CoursesCard>
				</v-col>
			</v-layout>

			<v-layout row wrap justify-center>
				<v-col cols="12">
					<h1 class="text-h2 text-center ma-4 pa-4" style="font-weight: lighter;">
						التدوينات
					</h1>
				</v-col>
				<v-col md="6" lg="4" xl="3" cols="12" v-for="post in posts.results" :key="post.id">
					<PostCard class="mt-7" :data="post"> </PostCard>
				</v-col>
			</v-layout>
			<v-layout row wrap justify-center class="pb-12">
				<v-col cols="12">
					<h1 class="text-h2 text-center ma-4 pa-4" style="font-weight: lighter;">
						مؤسسات
						<span style="color: #D83232">تدعمنا</span>
					</h1>
				</v-col>
				<v-col md="2" cols="10" v-for="(img, i) in supertImages" :key="i">
					<v-img :src="require(`./../../assets/suport/${img}`)"></v-img>
				</v-col>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	const CoursesCard = () => import("@component/cards/CoursesCard.vue");
	const PostCard = () => import("@component/cards/PostCard.vue");

	export default {
		components: {
			CoursesCard,
			PostCard
		},

		data: () => ({
			supertImages: ["cyper_ready.png", "context.png", "secjuice.png", "compTIA.png", "enterTimes.png", "infosecury.png"],
			courses: [],
			posts: []
		}),
		computed: mapState("model", {
			data: s => s.data,
			isloading: s => s.isloading
		}),
		created() {
			this.$store.dispatch("model/sendReq", { method: "all", url: "course", params: { limit: 3 } }).then(resp => {
				// console.log(resp.data.results)
				this.courses = resp.data;
			});
			this.$store.dispatch("model/sendReq", { method: "all", url: "blog/post", params: { limit: 2 } }).then(resp => {
				this.posts = resp.data;
			});
		}
	};
</script>

<style>
	#course {
		/* position: absolute; */
		background-color: #fff;
		/* top: -70pt */
	}
</style>
