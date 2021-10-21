<template>
	<SectionPage>
		<v-container class="mb-12">
			<v-layout row align-center justify-center style="height: 30rem;">
				<v-col cols="12"> </v-col>
				<v-col cols="12">
					<h3 class="text-center">برجاء الانتظار</h3>
					<h1 class="mt-4 mx-auto text-center">
						<!-- http://localhost:8080/password-reset/NzQ/auuco6-9aff8e808ae01f9fbd3ec7a109bdc6f9/?redirect_url=https%3A%2F%2Fcyber-sky.org%2Fverify-token -->
						<v-progress-circular indeterminate size="100"> </v-progress-circular>
					</h1>
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: {
			SectionPage
		},
		data() {
			return {
				isloading: false
			};
		},

		async mounted() {
			this.isloading = true;

			let { uid, token } = this.$route.params;

			if (!uid || !token) return this.$router.push("/");

			let params = { isTokenVerified: false, uid, token };

			try {
				let res = await this.$store.dispatch("auth/verifyToken", { uid, token: token });

				if (res.status == "Success") {
					params.isTokenVerified = true;
				}
			} catch (err) {
			} finally {
				this.$router.push({ name: "Home", params });
				this.isloading = false;
			}
		}
	};
</script>

<style></style>
