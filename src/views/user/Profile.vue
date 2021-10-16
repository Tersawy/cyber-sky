<template>
	<SectionPage>
		<v-container>
			<v-layout row warp align-end style="height: 20rem;">
				<v-col cols="12" md="6">
					<h1 style="font-size: 40px;">تعديل الملف الشخصي</h1>
				</v-col>
			</v-layout>
			<v-layout row warp class="my-12">
				<v-col cols="8">
					<v-form ref="form" @submit.prevent="submit">
						<v-row>
							<v-col cols="12">
								<h3>البيانات الشخصية</h3>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field name="fullname" v-model="user.fullname" label="الاسم" outlined :error-messages="errors.fullname" elevation="0"></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field name="country" v-model="user.country" label="الدولة" outlined elevation="0" :error-messages="errors.country"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h3>بيانات الحساب</h3>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field name="email" label="البريد الالكتروني" v-model="user.email" outlined :error-messages="errors.email" elevation="0"></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field name="password" label="كلمة السر" v-model="user.password" outlined elevation="0" :error-messages="errors.password"></v-text-field>
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="12">
								<v-btn color="primary" large width="200px" :loading="isloading" type="submit"> حفظ التعديلات </v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	import { mapState } from "vuex";
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: {
			SectionPage
		},
		computed: mapState("auth", {
			errors: s => s.errors,
			user: s => s.user
		}),
		data() {
			return {
				isloading: false
			};
		},
		methods: {
			submit() {
				this.isloading = true;
				this.$store
					.dispatch("auth/update", JSON.stringify(this.user))
					.then(() => {
						this.$swal.fire({
							icon: "success",
							title: "تم تحديث الملف الشخصي بنجاح",
							confirmButtonText: "اغلاق",
							confirmButtonColor: "#0082c6"
						});
					})
					.finally(() => (this.isloading = false));
			}
		}
	};
</script>
