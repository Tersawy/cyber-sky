<template>
	<SectionPage>
		<v-container class="mb-12">
			<v-layout row align-start style="height: 10rem;">
				<v-col cols="12">
					<v-breadcrumbs class="mt-12" :items="items" id="breadcrumb">
						<template v-slot:divider>
							<v-icon color="white">fa-angle-double-left</v-icon>
						</template>
					</v-breadcrumbs>
				</v-col>
			</v-layout>

			<v-layout row class="mb-12 mt-15">
				<v-col cols="12">
					<FormPayment :data="{ ...data, ...current }" />
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	import { mapState } from "vuex";
	const SectionPage = () => import("@component/Section.vue");
	const FormPayment = () => import("@component/forms/Payment.vue");

	export default {
		components: {
			SectionPage,
			FormPayment
		},
		data() {
			return {
				items: [
					{
						text: "الرئيسية",
						href: "breadcrumbs_dashboard"
					},
					{
						text: " إسم الدورة التدريبية",
						href: "breadcrumbs_link_1"
					},
					{
						text: " معلومات الدفع",
						href: "breadcrumbs_link_2"
					}
				]
			};
		},
		async mounted() {
			try {
				if (this.$route.params.slug) {
					await this.$store.dispatch("model/sendReq", { method: "get", url: `meeting`, id: this.$route.params.slug });
				} else {
					await this.$store.dispatch("model/sendReq", { method: "get", url: "course", id: this.$route.params.id });
				}
			} catch (err) {
				//
			} finally {
				this.setLoading();
			}
		},
		computed: mapState("model", {
			data: s => s.data,
			isloading: s => s.isloading,
			current: s => s.current
		})
	};
</script>

<style>
	.payment-form {
		transform: translateY(-30%);
	}

	#breadcrumb a.v-breadcrumbs__item {
		color: white;
	}
</style>
