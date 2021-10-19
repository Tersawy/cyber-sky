<template>
	<SectionPage> </SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: { SectionPage },

		mounted() {
			this.$router.push({ name: "Courses" });
		}
	};
</script>
