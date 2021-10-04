<template>
	<SectionPage>
		<v-container style="margin-top: 16%;">
			<v-layout row warp class="my-16" align-end>
				<PrivacyCard></PrivacyCard>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");
	const PrivacyCard = () => import("@component/cards/Privacy.vue");
	export default {
		components: {
			SectionPage,
			PrivacyCard
		}
	};
</script>

<style>
	.h1-font {
		font-family: serif;
	}
</style>
