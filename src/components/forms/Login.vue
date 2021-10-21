<template>
	<v-form @submit.prevent="submit" ref="form" class="my-5">
		<v-row class="justify-center align-center">
			<v-col cols="6">
				<v-img src="../../assets/footer.png" contain width="100%"></v-img>
			</v-col>

			<v-col cols="12" class="mt-8">
				<v-text-field name="email" label="البريد الاكتروني" type="email" filled outlined required hide-details="" :error="!!errors.email"></v-text-field>
				<span v-if="errors.detail" class="red--text pt-2 mr-2">
					البريد الاكتروني او الرمز السر غير صحيح
				</span>
			</v-col>
			<v-col cols="12">
				<v-text-field name="password" label="كلمة السر" type="password" filled outlined hide-details :error="!!errors.password" required></v-text-field>
			</v-col>

			<v-col cols="12" class="d-flex">
				<v-spacer></v-spacer>
				<v-btn text color="grey darken-2" small @click="showForgetPassword">
					نسيت كلمة السر ؟
				</v-btn>
			</v-col>

			<v-col cols="12">
				<vue-recaptcha ref="recaptcha" sitekey="6LdckecbAAAAAIV3GDus4EHLfoqOWhebNigOn5Oj" @verify="validate">
					<v-btn @click="isloading = true" color="blue white--text" block large :loading="isloading" type="submit">
						تسجيل الدخول
					</v-btn>

					<facebook-login hidden style="width: 100%" class="button" ref="facebook" appId="705914536902929" @login="onFacebookLogin"> </facebook-login>

					<v-btn color="blue darken-3 white--text" @click="facebook" type="button" block large class="mt-5">
						انشاء اشتراك بستخدام فيس بوك
					</v-btn>
					<v-btn outlined color="grey darken-3" @click="google()" type="button" block large class="mt-1  white--text">
						انشاء اشتراك بستخدام Google
					</v-btn>
				</vue-recaptcha>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
	//
	import { mapState } from "vuex";
	import facebookLogin from "facebook-login-vuejs";
	import VueRecaptcha from "vue-recaptcha";
	export default {
		components: {
			facebookLogin,
			VueRecaptcha
		},
		data() {
			return {
				isloading: false
			};
		},
		computed: mapState("auth", {
			errors: s => s.errors
		}),
		methods: {
			showForgetPassword() {
				this.$store.commit("setLoginDailog", false);
				this.$store.commit("setForgetPasswordDailog", true);
			},

			async submit() {
				let fd = new FormData(this.$refs.form.$el);

				this.isloading = true;

				try {
					let res = await this.$store.dispatch("auth/login", fd);

					if (res.Status == "not verified") {
						this.$store.commit("setLoginDailog", false);

						return this.$swal.fire({
							icon: "warning",
							title: "برجاء التأكد من البريد الالكتروني لتفعيل الحساب الخاص بك",
							confirmButtonText: "اغلاق",
							confirmButtonColor: "#0082c6"
						});
					}

					await this.$store.dispatch("auth/user");

					this.$router.go(0);
				} catch (err) {
				} finally {
					this.isloading = false;
				}
			},
			async google() {
				const googleUser = await this.$gAuth.signIn();
				console.log(googleUser);
				if (googleUser) {
					this.$store
						.dispatch("auth/social", {
							type: "google",
							auth_token: googleUser.Zb.access_token,
							email: googleUser.Rs.Ct
						})
						.then(data => {
							console.log(data);
							this.$store.dispatch("auth/user");
							this.$emit("submit");
						});

					return googleUser;
				}

				return false;
			},

			facebook() {
				this.$refs.facebook.$el.childNodes[0].click();
			},
			validate(data) {
				this.$refs.recaptcha.reset();
				this.submit();
			},
			onFacebookLogin(data) {
				if (data.response) {
					data.FB.api("/me", "GET", { fields: "id,name,email" }, userInfo => {
						this.$store
							.dispatch("auth/social", {
								type: "facebook/",
								auth_token: data.response.authResponse.accessToken,
								email: userInfo.email,
								fullname: userInfo.name
							})
							.then(() => {
								this.$store.dispatch("auth/user");
								this.$emit("submit");
							});
					});
				}
			}
		}
	};
</script>

<style></style>
