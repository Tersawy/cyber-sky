<template>
	<div id="course">
		<v-container>
			<v-layout row wrap justify-center style="top: -20pt;position: relative;">
				<v-col sm="6" md="4" xl="3" cols="12" v-for="course in courses.results" :key="course.id">
					<CoursesCard :data="course" :class="`mt-${course.id * 4}`"> </CoursesCard>
				</v-col>
			</v-layout>

			<v-layout row wrap justify-center>
				<v-col cols="12">
					<h1 class="text-h2 text-center ma-4 pa-4" style="font-weight: lighter;">
						التدوينات
					</h1>
				</v-col>
				<v-col sm="6" lg="4" xl="3" cols="12" v-for="post in posts.results" :key="post.id">
					<PostCard class="mt-7" :data="post"> </PostCard>
				</v-col>
			</v-layout>
			<v-layout row wrap justify-center>
				<v-col cols="12">
					<h1 class="text-h2 text-center mt-12 mb-4" style="font-weight: lighter;">
						آراء
						<span style="color: #D83232">الطلاب</span>
					</h1>
				</v-col>
			</v-layout>
		</v-container>
		<div class="carousel-opinion">
			<VueSlickCarousel
				:arrows="false"
				:dots="true"
				:center-mode="true"
				:multiple="true"
				:slidesToShow="3"
				:slidesToScroll="1"
				:infinite="true"
				:swipeToSlide="true"
				:initialSlide="2"
				centerPadding="30px"
				:responsive="carouselResponsiveOptions"
			>
				<div v-for="(opinion, i) in opinions" :key="i">
					<div class="card-opinion">
						<div class="img-container">
							<img class="user-img" :src="require(`./../../assets/suport/${opinion.userImg}`)" />
						</div>
						<p class="user-opinion">
							<span class="user-text"> {{ opinion.text }} </span>
							<span class="username"> — {{ opinion.username }} </span>
						</p>
					</div>
				</div>
			</VueSlickCarousel>
		</div>
		<!-- <v-col md="2" cols="10" v-for="(img, i) in supertImages" :key="i">
					<v-img :src="require(`./../../assets/suport/${img}`)"></v-img>
				</v-col> -->
	</div>
</template>

<script>
	import { mapState } from "vuex";
	const CoursesCard = () => import("@component/cards/CoursesCard.vue");
	const PostCard = () => import("@component/cards/PostCard.vue");
	import VueSlickCarousel from "vue-slick-carousel";
	export default {
		components: { CoursesCard, PostCard, VueSlickCarousel },

		data: () => ({
			opinions: [
				{
					userImg: "Loreelei.jpg",
					username: "Loreelei",
					text:
						"Gaining new knowledge and skills through Cyber-Sky helped me break out of the mold I'd been in for over a decade. Cyber-Sky helped open doors for me."
				},
				{
					userImg: "Khadijah_Abdul_Nabi.jpg",
					username: "Khadijah Abdul Nabi",
					text:
						"With Cyber-Sky, I gained the confidence I needed to start a new journey in life. Now I’m in the process of transitioning to what I’ve always dreamed of doing."
				},
				{
					userImg: "Tri_Suseno.jpg",
					username: "Tri Suseno",
					text: "Cyber-sky has been invaluable for my businesses and my personal development. The courses helped me improve my day-to-day problem solving."
				},
				{
					userImg: "Dariya_Khokhel.jpg",
					username: "Dariya Khokhel",
					text:
						"These courses, from leading institutions all over the world, are only accessible to me through Cyber-Sky. I learn something new and fascinating every day."
				},
				{
					userImg: "Zeeshan_Usmani.jpg",
					username: "Zeeshan Usmani",
					text: "I got hooked with everything going on in the courses, from course content and TA feedback to meetup events and the professor's Twitter feed."
				}
			],
			carouselResponsiveOptions: [
				{
					breakpoint: 1201,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2
					}
				},
				{
					breakpoint: 680,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			],
			supertImages: ["Loreelei.jpg", "Khadijah_Abdul_Nabi.jpg", "Dariya_Khokhel.jpg"],
			courses: [],
			posts: []
		}),
		computed: mapState("model", {
			data: s => s.data,
			isloading: s => s.isloading
		}),
		async mounted() {
			let coursesRequest = this.$store.dispatch("model/sendReq", { method: "all", url: "course", params: { limit: 3 } });
			let postsRequest = this.$store.dispatch("model/sendReq", { method: "all", url: "blog/post", params: { limit: 2 } });

			try {
				let [coursesResponse, postsResponse] = await Promise.all([coursesRequest, postsRequest]);
				this.courses = coursesResponse.data;
				this.posts = postsResponse.data;
			} catch (err) {
				//
			} finally {
				this.$emit("finished");
			}
		}
	};
</script>

<style lang="scss">
	#course {
		background-color: #fff;
		.carousel-opinion {
			width: 100%;
			background-color: #f4f6f9;
			padding: 48px 0;
			.slick-list {
				padding: 10px 0;
			}
			.card-opinion {
				display: flex;
				box-shadow: 2px 2px 2px #bdbdbd;
				height: 170px;
				margin: 0 15px;
				background-color: #fff;
				.img-container {
					position: relative;
					width: 194px;
					&:after {
						position: absolute;
						content: "";
						top: 0;
						right: -1px;
						border-top: 170px solid #fff;
						border-left: 45px solid transparent;
						width: 0;
					}
					img.user-img {
						width: 100%;
						height: 100%;
					}
				}
				p.user-opinion {
					margin: 0;
					font-size: 12px;
					padding: 10px;
					align-self: center;
					width: 100%;
					display: flex;
					flex-direction: column;
					.username {
						margin-top: 20px;
						align-self: flex-end;
					}
				}
			}
		}
	}
</style>
