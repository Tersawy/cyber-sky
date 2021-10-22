<template>
	<SectionPage>
		<v-container>
			<v-layout row align-end style="height: 20rem;">
				<v-col cols="12" md="6">
					<h1 style="font-size: 40px;font-weight: lighter;">
						الدورات التدريبية
					</h1>
				</v-col>
				<v-col cols="12" md="6" class="mb-n6">
					<v-row>
						<v-col cols="12" md="4">
							<v-select label="القسم" :items="$store.state.sections" item-text="name" item-value="id" v-model="query.section" @change="getAll" solo></v-select>
						</v-col>
						<v-col cols="12" md="4">
							<v-select label="التقييم" v-model="query.review" :items="filter_rat" @change="getAll" solo></v-select>
						</v-col>
						<v-col cols="12" md="4">
							<v-select label="السعر" @change="getAll" v-model="query.price" :items="filters_price" solo></v-select>
						</v-col>
					</v-row>
				</v-col>
			</v-layout>

			<v-layout row class="my-12" style="flex-wrap: wrap !important">
				<template v-if="!isloading">
					<v-col sm="6" md="4" lg="3" cols="12" v-for="course in data.results" :key="course.id">
						<CoursesCard :data="course"></CoursesCard>
					</v-col>
				</template>
				<template v-else>
					<v-col cols="12" md="4">
						<v-progress-linear buffer-value="0" color="success" stream></v-progress-linear>
					</v-col>
				</template>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	import { mapState } from "vuex";
	const CoursesCard = () => import("@component/cards/CoursesCard.vue");
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: {
			CoursesCard,
			SectionPage
		},
		data() {
			return {
				query: {
					section: null,
					path: this.$route.query.path,
					price: null,
					review: null,
					title: this.$route.query.q
				},
				filter_rat: [1, 2, 3, 4, 5],
				filters_price: [
					{ text: "100 - 300", value: { max: 300, min: 100 } },
					{ text: "300 - 500", value: { max: 500, min: 300 } },
					{ text: "500 - 900", value: { max: 900, min: 500 } },
					{ text: "900 - 1500", value: { max: 1500, min: 900 } },
					{ text: "1500 - 3000", value: { max: 3000, min: 1500 } }
				]
			};
		},
		async mounted() {
			try {
				await this.getAll();
			} catch (err) {
			} finally {
				this.setLoading(() => {
					if (this.$route.params.paymentSuccess == false) {
						const Toast = this.$swal.mixin({
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 3000,
							didOpen: toast => {
								toast.addEventListener("mouseenter", this.$swal.stopTimer);
								toast.addEventListener("mouseleave", this.$swal.resumeTimer);
							}
						});

						Toast.fire({ icon: "error", title: "تم إلغاء الدفع" });
					}
				});
			}

			if (this.$route.params.paymentSuccess == false) {
				try {
					this.$store.dispatch("model/sendReq", {
						url: "payment/confirmed/cancel",
						method: "create",
						item: JSON.stringify({
							transactionid: this.$route.params.sessionId
						})
					});
				} catch (err) {
					//
				}
			}
		},

		computed: {
			...mapState("model", {
				data: s => s.data,
				isloading: s => s.isloading
			})
		},

		methods: {
			getAll() {
				return this.$store.dispatch("model/sendReq", {
					method: "all",
					url: "course",
					params: { ...this.query }
				});
			}
		}
	};
</script>
