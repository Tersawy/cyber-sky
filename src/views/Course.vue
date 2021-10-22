<template>
	<SectionPage>
		<v-container>
			<v-layout row wrap align-end class="mt-16" style="height: 22rem;">
				<v-col cols="12">
					<v-breadcrumbs :items="items" divider=">>"> </v-breadcrumbs>

					<h1 style="font-size: 30px">{{ current.title }}</h1>
					<p class="grey--text col col-12 col-md-8" style="font-size: 20px">{{ current.description }}</p>
				</v-col>
			</v-layout>

			<v-layout row wrap>
				<v-col cols="12" md="8">
					<v-tabs fixed-tabs v-model="tab" class="mt-12">
						<v-tab>مقدمة</v-tab>
						<v-tab>المحتوى التعليمي</v-tab>
						<v-tab>المتطلبات</v-tab>
						<v-tab>المدرب</v-tab>
						<v-tab>التقييمات</v-tab>

						<v-tab-item class="pa-1">
							<v-alert elevation="2" class="mt-8">
								<template v-slot:prepend>
									<v-icon class="v-alert__icon icon-redius" color="#0082C6"> fa-question </v-icon>
								</template>
								<h3 class="mb-4">ما الذي سوف تتعلمه من هذا الكورس</h3>
								<!-- <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق</p> -->
								<p style="white-space: pre-wrap;" v-html="current.goals"></p>
							</v-alert>
						</v-tab-item>

						<v-tab-item>
							<EducationalContentTab :data="current.units" :pdf-link="current.pdf" />
						</v-tab-item>

						<v-tab-item>
							<RequirementsTab :list-requirement="current.requirements" />
						</v-tab-item>
						<v-tab-item>
							<AboutTeacherTab :data="current.teacher_profile" :can-booking="!!user.id" />
						</v-tab-item>
						<v-tab-item>
							<RatingTab :rating-course="current.ratings" :can-rating="current.id" />
						</v-tab-item>
					</v-tabs>
				</v-col>

				<v-col cols="12" md="4" class="order-first order-md-2 mt-md-n6">
					<CourseCard :data="current" />
					<v-alert v-model="alertSuccessAddToCart" type="success" class="mt-12">
						<h3>تمت الإضافة</h3>
						<p>تمت إضافة الدورة التدريبية إلى سلة الشراء بنجاح</p>
					</v-alert>
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	import { mapState } from "vuex";
	const SectionPage = () => import("@component/Section.vue");
	const EducationalContentTab = () => import("@component/course/tabs/EducationalContent.vue");
	const AboutTeacherTab = () => import("@component/course/tabs/AboutTeacher.vue");
	const RatingTab = () => import("@component/course/tabs/Rating.vue");
	const RequirementsTab = () => import("@component/course/tabs/Requirements.vue");
	const CourseCard = () => import("@component/cards/CourseCard.vue");

	export default {
		components: {
			CourseCard,
			SectionPage,
			EducationalContentTab,
			AboutTeacherTab,
			RatingTab,
			RequirementsTab
		},
		data: () => ({
			userHaveCoures: true,
			alertSuccessAddToCart: false,
			items: [
				{
					text: "الرئيسية",
					disabled: true,
					href: "breadcrumbs_dashboard"
				},
				{
					text: "القسم",
					disabled: true,
					href: "breadcrumbs_link_1"
				},
				{
					text: "إسم الدورة",
					disabled: false,
					href: "breadcrumbs_link_2"
				}
			],
			tab: 0,
			ratings: [
				{
					avatar: require("./../assets/avatar_rating.png"),
					name: "إسم صاحب التقييم",
					date_at: "28 November",
					value: 5,
					text:
						"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق"
				},
				{
					avatar: require("./../assets/avatar_rating.png"),
					name: "إسم صاحب التقييم",
					date_at: "23 November",
					value: 3,
					text:
						"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق"
				}
			],
			list: ["متطلب أساسي لإتمام الكورس", "متطلب أساسي لإتمام الكورس", "متطلب أساسي لإتمام الكورس", "متطلب أساسي لإتمام الكورس", "متطلب أساسي لإتمام الكورس"]
		}),

		async mounted() {
			let id = this.$route.params.id;
			try {
				await this.$store.dispatch("model/sendReq", { method: "get", url: "course", id: id });
			} catch (err) {
				//
			} finally {
				this.setLoading();
			}
		},

		computed: mapState({
			current: s => s.model.current,
			user: s => s.auth.user
		})
	};
</script>

<style>
	.translate-top {
		transform: translate(0px, -56px);
	}
	.icon-redius {
		border-width: 0.5px !important;
		border-style: solid !important;
		border-color: #eee !important;
		border-radius: 8px !important;
		padding: 16px !important;
		/* font-weight: bold; */
	}

	.chip-count-expand {
		max-width: 6% !important;
		border-width: 0.5px !important;
		border-style: solid !important;
		border-color: #eee !important;
		border-radius: 8px !important;
		background-color: #ffffff !important;
		color: #0082c6 !important;
		font-weight: bold;
	}

	.rating-value {
		font-weight: lighter;
		font-size: 14px;
	}
</style>
