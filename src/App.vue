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

		<CustomFooter />
	</v-app>
</template>

<script>
	import mydialog from "@/components/Dialog.vue";
	import formLogin from "@/components/forms/Login.vue";
	import formResgiter from "@/components/forms/Register.vue";
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
			formResgiter
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
			}
		}
	};
</script>
