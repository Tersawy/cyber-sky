<template>
	<v-form @submit.prevent="submit" class="my-5">
		<v-row class="justify-center align-center">
			<v-col cols="6">
				<v-img src="../../assets/footer.png" contain width="100%"></v-img>
			</v-col>

			<v-col cols="12">
				<v-text-field v-model="password" label="كلمة السر الجديدة" type="password" filled outlined hide-details :error="!!errors.password" required></v-text-field>
			</v-col>

			<v-col cols="12">
				<v-text-field
					v-model="repeat_password"
					label="تأكيد كلمة السر"
					type="password"
					filled
					outlined
					hide-details
					:error="!!errors.repeat_password"
					required
				></v-text-field>
				<span v-if="errors.repeat_password" class="red--text pt-2 mr-2">
					{{ errors.repeat_password }}
				</span>
			</v-col>

			<v-col cols="12">
				<v-btn color="blue white--text" block large :loading="isloading" type="submit">
					تعيين كلمة السر
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
				password: "",
				repeat_password: ""
			};
		},
		computed: mapState("auth", {
			errors: s => s.errors
		}),

		watch: {
			repeat_password(v) {
				if (v !== this.password) {
					this.$store.commit("auth/setErrors", { repeat_password: "كلمة السر غير مطابقه !" });
				} else {
					// if (this.password) {
					this.$store.commit("auth/setErrors", {});
					// }
				}
			}
		},

		methods: {
			async submit() {
				let { token, uid: uidb64 } = this.$route.params;

				if (!this.password) return;

				if (this.password !== this.repeat_password) {
					return this.$store.commit("auth/setErrors", { repeat_password: "كلمة السر غير مطابقه !" });
				}

				this.isloading = true;

				try {
					await this.$store.dispatch("auth/changePassword", { password: this.password, token, uidb64 });

					this.$store.commit("setChangePasswordDailog", false);

					this.$swal
						.fire({
							icon: "success",
							title: "تم تعيين كلمه السر الجديدة بنجاح",
							confirmButtonText: "تسجيل الدخول",
							confirmButtonColor: "#0082c6"
						})
						.then(result => {
							if (result.isConfirmed) {
								this.$store.commit("setLoginDailog", true);
							}
						});
				} catch (err) {
				} finally {
					this.isloading = false;
				}
			}
		}
	};
</script>
