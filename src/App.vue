<template>
	<v-app style="background-color:#fff">
		<CustomNavbar> </CustomNavbar>

		<v-main>
			<router-view></router-view>
		</v-main>

		<mydialog v-model="loginDailog" width="">
			<form-login></form-login>
		</mydialog>

		<mydialog v-model="registerDailog" width="">
			<form-resgiter></form-resgiter>
		</mydialog>

		<mydialog v-model="forgetPasswordDailog" width="">
			<ForgetPassword />
		</mydialog>

		<mydialog v-model="changePasswordDailog" width="">
			<ChangePassword />
		</mydialog>

		<CustomFooter />
		<Loading />
	</v-app>
</template>

<script>
	import mydialog from "@/components/Dialog.vue";
	import formLogin from "@/components/forms/Login.vue";
	import formResgiter from "@/components/forms/Register.vue";

	import Loading from "@/components/Loading.vue";

	const ForgetPassword = () => import("@/components/forms/ForgetPassword.vue");
	const ChangePassword = () => import("@/components/forms/ChangePassword.vue");

	const CustomNavbar = () => import("@component/layout/Navbar.vue");

	// const CustomHeader = () => import("@component/layout/Header.vue");
	const CustomFooter = () => import("@component/layout/Footer.vue");

	export default {
		name: "App",

		components: {
			CustomNavbar,
			CustomFooter,
			mydialog,
			formLogin,
			formResgiter,
			ForgetPassword,
			ChangePassword,
			Loading
		},

		computed: {
			registerDailog: {
				get: function() {
					return this.$store.state.registerDailog;
				},
				set: function(v) {
					this.$store.commit("setRegisterDailog", v);
				}
			},
			loginDailog: {
				get: function() {
					return this.$store.state.loginDailog;
				},
				set: function(v) {
					this.$store.commit("setLoginDailog", v);
				}
			},
			forgetPasswordDailog: {
				get: function() {
					return this.$store.state.forgetPasswordDailog;
				},
				set: function(v) {
					this.$store.commit("setForgetPasswordDailog", v);
				}
			},
			changePasswordDailog: {
				get: function() {
					return this.$store.state.changePasswordDailog;
				},
				set: function(v) {
					this.$store.commit("setChangePasswordDailog", v);
				}
			},
			isLoading() {
				return this.$store.state.isLoading;
			}
		}
	};
</script>
