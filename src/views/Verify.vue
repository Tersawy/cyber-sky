<template>
	<SectionPage>
		<v-container>
			<v-layout row align-center justify-center style="height: 15rem;margin-top:8rem">
				<v-progress-circular size="100" width="2" indeterminate color="blue"></v-progress-circular>
				<v-col cols="12" class="text-center mt-0 pt-0">
					<h3 class="pa-0 ma-0">
						جاري التحقق . . . .
					</h3>
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

		async mounted() {
			let token = this.$route.query.token;

			this.setLoading();

			if (token) {
				try {
					await this.$store.dispatch("auth/verify", token);

					return this.$router.push({ name: "Home", params: { verified: true } });
				} catch (_err) {}
			}

			this.$router.push("/");
		}
	};
</script>
