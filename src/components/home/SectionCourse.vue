<template>
	<div id="course">
		<v-container>
			<v-layout row wrap justify-center style="top: -20pt;position: relative;">
				<v-col sm="6" md="4" xl="3" cols="12" v-for="course in courses.results" :key="course.id">
					<CoursesCard :data="course" :class="`mt-${course.id * 4}`"> </CoursesCard>
				</v-col>
				<v-col cols="12" class="text-center">
					<v-btn elevation="0" large v-if="courses.results && courses.results.length" class="mx-2 mt-8 font-weight-bold" to="/courses">
						المزيد...
					</v-btn>
				</v-col>
			</v-layout>

			<v-layout row wrap justify-center>
				<v-col cols="12">
					<h1 class="text-h2 text-center ma-4 pa-4" style="font-weight: lighter;">
						التدوينات
					</h1>
				</v-col>
				<v-col sm="6" lg="4" xl="3" cols="12" v-for="post in posts" :key="post.id">
					<PostCard class="mt-7" :data="post"> </PostCard>
				</v-col>
				<v-col cols="12" class="text-center">
					<v-btn elevation="0" large class="mx-2 mt-8 font-weight-bold" href="https://blog.cyber-sky.org" target="blank">
						المزيد...
					</v-btn>
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
				:slidesToShow="2"
				:slidesToScroll="1"
				:infinite="true"
				:swipeToSlide="true"
				:adaptiveHeight="true"
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
							<span class="user-text" :dir="opinion.dir"> {{ opinion.text }} </span>
							<span class="username text-right w-100"> — {{ opinion.username }} </span>
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
					userImg: "Nazim_Birmingham_UK.png",
					username: "Nazim Birmingham - UK",
					text:
						"Grateful for the opportunity of having Ismael as a trainer for CEH. He has the ability to teach at all levels and can cater to different learning styles. Training sessions were very informative yet very engaging and he always reinforced knowledge through practicals and challenges. This has definitely helped to me to progress my journey in cyber security as everything I had learnt with Ismael I was able to effectively put it into use in a real life environment and I pretty much transitioned seamlessly.",
					dir: "ltr"
				},
				{
					userImg: "مشاري_الكويت.png",
					username: "مشاري - الكويت",
					text: "تشرفت بدراسة كورس CSJP مع مدربين منصة CyberSky مع نخبة من المهندسين ساعدني الكورس في اجتياز شهادة eCPPT وحصولي على ترقية في الوظيفة.",
					dir: "rtl"
				},
				{
					userImg: "Ozmn_Birmingham_UK.png",
					username: "Ozmn Birmingham - UK",
					text:
						"Ismail is an absolutely incredible Python teacher. I have just completed the course on Python and I can say I understood every single thing thanks to his excellent teaching style and skills. I would definitely recommend Ismail as an ethical hacker as well as a Python instructor.",
					dir: "ltr"
				},
				{
					userImg: "محمود_فلسطين.png",
					username: "محمود - فلسطين",
					text:
						"اشتركت في كورس CSJP من منصة CyberSky وكان  ممتاز جدا جدا بحتوي على أدق التفاصيل ويغنيك عن البحث اونلاين على المعلومة بحيث انه يحتوي على كل المطلوب  والمدربين معاك لحظة بلحظة.",
					dir: "rtl"
				}
			],
			carouselResponsiveOptions: [
				{
					breakpoint: 1201,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						dots: true
					}
				},
				{
					breakpoint: 1115,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						initialSlide: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: false,
						initialSlide: 0
					}
				}
			],
			supertImages: ["Loreelei.jpg", "Khadijah_Abdul_Nabi.jpg", "Dariya_Khokhel.jpg"],
			courses: [],
			posts: [
				{
					title: "9 ملايين نظام اندرويد مصاب ببرمجيات خبيثة",
					image: "https://blog.cyber-sky.org/wp-content/uploads/2021/11/photo_2021-11-24_16-37-34-780x470.jpg",
					category: "اخبار سايبر",
					link: "https://blog.cyber-sky.org/9-mills-infected-devices",
					description:
						"هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام",
					date: "2021-10-14T01:40:03.635768Z"
				},
				{
					title: "11 مكتبة في بايثون عليك عدم استخدامها",
					image: "https://blog.cyber-sky.org/wp-content/uploads/2021/11/All-In-One-2021-Super-Sized-Ethical-Hacking-Bundle.jpg",
					category: "اخبار سايبر",
					link: "https://blog.cyber-sky.org/python-11-packages-not-safe",
					description: "أحدث المكتبات المتوفرة في بايثون على شبكة الانترنت تحتوي على أكثر من 11 ملايين برمجيات خبيثة",
					date: "2021-10-24T13:20:59.717051Z"
				}
			]
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
				// this.posts = postsResponse.data;
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
				min-height: 235px;
				margin: 0 15px;
				background-color: #fff;
				.img-container {
					position: relative;
					width: 194px;
					padding: 2px;
					// &:after {
					// 	position: absolute;
					// 	content: "";
					// 	top: 0;
					// 	right: -1px;
					// 	border-top: 170px solid #fff;
					// 	border-left: 45px solid transparent;
					// 	width: 0;
					// }
					img.user-img {
						width: 100%;
						height: 100%;
					}
				}
				p.user-opinion {
					overflow: hidden;
					text-overflow: ellipsis;
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
