<template>
	<SectionPage> </SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: { SectionPage },

		mounted() {
			this.$router.push({ name: "UserCourse", params: { paymentSuccess: true, sessionId: this.$route.params.sessionId } });
		}
	};
</script>
