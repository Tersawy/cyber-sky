<template>
	<SectionPage>
		<v-container style="margin-top: 16%;">
			<v-layout row wrap class="my-16" align-end>
				<TermsOfServiceCard></TermsOfServiceCard>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");
	const TermsOfServiceCard = () => import("@component/cards/TermsOfService.vue");

	export default {
		components: {
			SectionPage,
			TermsOfServiceCard
		},

		mounted() {
			this.setLoading();
		}
	};
</script>

<style>
	.h1-font {
		font-family: serif;
	}
</style>
