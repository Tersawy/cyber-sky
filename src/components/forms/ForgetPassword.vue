<template>
	<v-form @submit.prevent="submit" ref="form" class="my-5">
		<v-row class="justify-center align-center">
			<v-col cols="6">
				<v-img src="../../assets/footer.png" contain width="100%"></v-img>
			</v-col>

			<v-col cols="12" class="mt-8">
				<v-text-field
					name="email"
					v-model="email"
					label="البريد الاكتروني"
					type="email"
					filled
					outlined
					required
					hide-details=""
					:error="!!errors.email"
				></v-text-field>
				<span v-if="errors.detail" class="red--text pt-2 mr-2">
					البريد الاكتروني غير صحيح
				</span>
			</v-col>

			<v-col cols="12" class="d-flex">
				<v-spacer></v-spacer>
				<v-btn text color="grey darken-2" small @click="showLogin">
					تسجيل الدخول
				</v-btn>
			</v-col>

			<v-col cols="12" class="d-flex">
				<v-spacer></v-spacer>
				<v-btn @click="isloading = true" color="blue white--text" block large :loading="isloading" type="submit">
					إعادة تعيين كلمة المرور
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
	//
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				isloading: false,
				email: ""
			};
		},
		computed: mapState("auth", {
			errors: s => s.errors
		}),
		methods: {
			showLogin() {
				this.$store.commit("setForgetPasswordDailog", false);
				this.$store.commit("setLoginDailog", true);
			},

			async submit() {
				// let fd = new FormData(this.$refs.form.$el);

				this.isloading = true;

				try {
					await this.$store.dispatch("auth/resetPasswordByEmail", { email: this.email, redirect_url: "https://cyber-sky.org/verify-token" });

					this.$store.commit("setForgetPasswordDailog", false);

					this.$swal.fire({
						icon: "success",
						title: "لقد أرسلنا لك رابطًا لإعادة تعيين كلمة المرور الخاصة بك",
						confirmButtonText: "اغلاق",
						confirmButtonColor: "#0082c6"
					});
				} catch (err) {
				} finally {
					this.isloading = false;
				}
			}
		}
	};
</script>
