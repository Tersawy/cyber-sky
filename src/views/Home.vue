<template>
	<div class="home-banner fill-height">
		<v-container>
			<v-layout row align-end style="height: 600px; z-index: 1;">
				<v-col cols="12" md="7" class="white--text text-md-right text-center mt-sm-16">
					<h1 class="text-h4 text-sm-h3 text-md-h2 x">
						Cyber Sky
					</h1>
					<p class="text-h5 text-sm-h5 text-md-h4 mt-2">
						{{ $store.state.setting.description }}
					</p>
					<v-text-field
						dark
						v-if="$vuetify.breakpoint.mdAndUp"
						full-width
						height="66"
						x-large
						background-color="#0b68a8"
						color="#0b68a8"
						flat
						@keypress="searchRedirect"
						label="بحث"
						prepend-inner-icon="fa-search"
						solo
					></v-text-field>
				</v-col>
			</v-layout>
		</v-container>

		<v-img class="section-services" src="./../assets/services.png">
			<v-layout row wrap justify-center>
				<v-col cols="11" xl="7" lg="9" md="11">
					<v-row v-for="(card, i) in cards" :key="i" :justify="i % 2 == 0 ? `start` : `end`">
						<v-col cols="12" md="6">
							<v-card class="pa-5 py-8 mb-6 mb-lg-0" dark>
								<v-img :src="card.icon" :style="{ width: '10%' }" class="mx-3" :id="card.id"></v-img>
								<v-card-title> {{ card.title }} </v-card-title>
								<v-card-text style="font-size: 18px"> {{ card.text }} </v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-layout>
		</v-img>

		<v-layout row wrap>
			<v-col cols="12" class="text-center mt-sm-n16 mt-md-16 mt-xl-n16">
				<h1 style="font-size: 48px" class="mt-1">
					الدورات التدريبية المميزة
				</h1>
			</v-col>
			<v-col cols="12">
				<SectionCourse @finished="setLoading" />
			</v-col>
		</v-layout>
	</div>
</template>

<script>
	const SectionCourse = () => import("@component/home/SectionCourse.vue");

	export default {
		name: "Home",
		components: {
			// SectionBanner,
			SectionCourse
		},
		data: () => ({
			cards: [
				{
					title: "محتوى تعليمي إحترافي",
					text: "تعلم جميع الأدوات و والمهارات التي يجب عليك إتقانها لتصبح محترفا في مجال الأمن السبيراني",
					icon: require("./../assets/icon_card_1.png"),
					headline: "خدماتنا"
				},
				{
					title: "طبق الخبرات المكتسبة بشكل عملي",
					text: "ستتمكن من تطبيق كل ما تعلمته بشكل عملي عن طريق مختبرات افتراضية تحاكي السيناريوهات الواقعية",
					icon: require("./../assets/icon_card_2.svg"),
					id: "icon_card_2"
				},
				{
					title: "جلسات حوارية",
					text: "احصل على اجابات حصرية لأسئلتك واستفساراتك من فريق من الخبراء في مختلف المجالات.",
					icon: require("./../assets/icon_card_3.svg"),
					id: "icon_card_3"
				},
				{
					title: "شهادات معتمدة",
					text: "احصل على شهادات معتمدة بعد اتمام الاختبار الخاص بالشهادة (سيتم اتاحة التقدم للاختبارات بتاريخ 15-02-2022)",
					icon: require("./../assets/icon_card_4.png")
				}
			]
		}),

		mounted() {
			let params = this.$route.params;

			if (params.verified && !this.isLogin) {
				this.$swal
					.fire({
						icon: "success",
						title: "تم تفعيل حسابك بنجاح",
						confirmButtonText: "تسجيل الدخول",
						confirmButtonColor: "#0082c6"
					})
					.then(result => {
						if (result.isConfirmed) {
							this.$store.commit("setLoginDailog", true);
						}
					});
			}

			if (params.verified == false) {
				this.$swal.fire({
					icon: "error",
					title: "انتهت صلاحية الرابط",
					confirmButtonText: "إغلاق",
					confirmButtonColor: "#0082c6"
				});
			}

			if (params.isTokenVerified) {
				this.$store.commit("setChangePasswordDailog", true);
			}

			if (params.isTokenVerified === false) {
				const Toast = this.$swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 10000,
					didOpen: toast => {
						toast.addEventListener("mouseenter", this.$swal.stopTimer);
						toast.addEventListener("mouseleave", this.$swal.resumeTimer);
					}
				});

				Toast.fire({ icon: "error", title: "انتهت صلاحية الرابط" });

				this.$store.commit("setForgetPasswordDailog", true);
			}
		},

		methods: {
			searchRedirect(e) {
				if (e.key == "Enter") {
					this.$router.push(`/courses?q=${e.target.value}`);
				}
			}
		}
	};
</script>

<style>
	.home-banner {
		background-color: #0082c6;
		height: 100%;
	}
	.home-banner > div {
		position: relative;
		background-color: #fff0;
		z-index: 1;
	}
	.home-banner:after {
		z-index: 0;
		position: absolute;
		content: " ";
		top: 0;
		left: 0;
		background-color: #0082c6;
		background-image: url("./../assets/banner.png");
		background-position: left top !important;
		background-size: contain !important;
		height: 998px;
		width: 100%;
	}

	.section-services {
		position: relative;
		top: 15rem;
	}

	.section-services > .v-image__image {
		background-position: top center !important;
		background-size: contain !important;
		width: 1215.21px;
		height: 1615.61px;
		top: 0%;
		left: 50%;
		transform: translate(-60%, 0%);
	}

	.section-services > .v-responsive__content:after {
		/* ./../../assets/home_course.png */
		background-image: url("./../assets/home_course.png");
		background-position: center center !important;
		background-size: cover !important;
		width: 100%;
		content: " ";
		height: 500px;
		position: absolute;
		bottom: 9%;
		z-index: 0;
	}

	.section-services > .v-responsive__content .layout:after {
		background-image: url("./../assets/home_services.png");
		background-position: center center !important;
		background-size: cover !important;
		width: 100%;
		content: " ";
		height: 500px;
		position: absolute;
		top: 27%;
		z-index: -1;
	}

	.section-services > .v-responsive__content > .layout .v-card {
		z-index: 1;
		background-color: #005fab !important;
	}

	.section-services > .v-responsive__content > .layout .row:first-child .v-card,
	.section-services > .v-responsive__content > .layout .row:last-child .v-card {
		background-color: #1a8ecbb8 !important;
	}

	#icon_card_2 .v-image__image,
	#icon_card_3 .v-image__image {
		background-size: 13rem !important;
	}
	/*  */

	@media only screen and (max-width: 1904px) {
		.section-services > .v-responsive__content > .layout .row:last-child .v-card {
			margin-bottom: 20% !important;
		}
	}

	@media only screen and (max-width: 1264px) {
		.section-services > .v-image__image {
			width: 1300.21px;
		}
		.section-services > .v-responsive__content > .layout .row:last-child .v-card {
			margin-bottom: 40% !important;
		}
	}

	@media only screen and (max-width: 960px) {
		.section-services > .v-image__image {
			display: none;
		}
		.home-banner:after {
			background-size: 200% !important;
		}
		.section-services {
			top: 4%;
		}

		.section-services > .v-responsive__content:after {
			bottom: 0% !important;
		}
		.section-services > .v-responsive__content > .layout .row:last-child .v-card {
			margin-bottom: 60% !important;
		}
	}
</style>
