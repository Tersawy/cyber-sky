<template>
	<v-app style="background-color:#fff">
		<CustomNavbar> </CustomNavbar>

		<v-main>
			<router-view></router-view>
		</v-main>

		<CustomFooter />
	</v-app>
</template>

<script>
	const CustomNavbar = () => import("@component/layout/Navbar.vue");

	// const CustomHeader = () => import("@component/layout/Header.vue");
	const CustomFooter = () => import("@component/layout/Footer.vue");

	export default {
		name: "App",

		components: {
			CustomNavbar,
			CustomFooter
		},

		data: () => ({
			//
		})
	};
</script>
