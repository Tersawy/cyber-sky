<template>
	<SectionPage>
		<v-container>
			<v-layout row warp align-end style="height: 20rem">
				<v-col cols="12" md="6">
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title style="font-size:42px">
								مرحبا بك
							</v-list-item-title>
							<v-list-item-subtitle style="font-size:20px" class="grey--text text--darken-2">
								{{ $store.state.auth.user.fullname }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col cols="12" md="6" class="d-flex">
					<v-spacer></v-spacer>
					<v-btn large style="font-weight: blod !important;" color="#fff" to="/user/profile">
						<v-icon>mdi-edit</v-icon>
						تعديل البيانات الشخصية
					</v-btn>
				</v-col>
			</v-layout>
			<v-layout row wrap class="my-12">
				<v-col cols="12">
					<h1 style="font-size: 42px" class="pa-2">دوراتي التدريبية</h1>
				</v-col>
				<v-col cols="12">
					<h3 v-if="!myCourses.length" class="text-center py-12 mb-12 grey--text text--darken-2">
						لم تقم بشراء اي دورة تدريبية
					</h3>
					<template v-for="(course, i) in myCourses">
						<UserCourseCard :data="course" :key="i" />
					</template>
				</v-col>
			</v-layout>
			<v-layout row wrap class="mt-12">
				<v-col cols="12">
					<h1 class="mb-4" style="font-size: 23px">الكورسات المضافة حديثاً</h1>
				</v-col>
				<v-col cols="12" md="4" v-for="course in lastCourses" :key="course.id">
					<CoursesCard :image="{ height: '290px' }" :data="course" />
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	import { mapState } from "vuex";
	const SectionPage = () => import("@component/Section.vue");
	const CoursesCard = () => import("@component/cards/CoursesCard.vue");
	const UserCourseCard = () => import("@component/cards/UserCourseCard.vue");

	export default {
		components: {
			SectionPage,
			CoursesCard,
			UserCourseCard
		},
		data() {
			return {
				courses: [],
				lastCourses: []
			};
		},
		mounted() {
			if (this.$route.params.paymentSuccess) {
				this.$swal.fire({
					icon: "success",
					title: "تهانينا, تم شراء الدورة بنجاح",
					confirmButtonText: "اغلاق",
					confirmButtonColor: "#0082c6"
				});
			}
			this.getAll();
		},
		computed: {
			...mapState("model", {
				isloading: s => s.isloading
			}),
			myCourses() {
				return this.$store.getters.myCourses;
			}
		},
		methods: {
			getAll() {
				this.$store
					.dispatch("model/sendReq", {
						method: "all",
						url: "course"
					})
					.then(resp => (this.lastCourses = resp.data.results.slice(0, 3)));
			}
		}
	};
</script>

<style>
	.transform-card {
		transform: translateY(-10%);
	}
</style>
