<template>
	<SectionPage>
		<v-container>
			<v-layout row warp align-end style="height: 16rem;">
				<v-col cols="12" md="6">
					<h1 class="mt-2" style="font-size: 40px;font-weight: lighter;">
						{{ post.title }}
					</h1>
				</v-col>
			</v-layout>
			<v-layout row warp class="my-12">
				<v-col cols="12">
					<PostCard :full="1" :id="$route.params.id" :data="post"></PostCard>
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	const PostCard = () => import("@component/cards/PostCard.vue");
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: {
			PostCard,
			SectionPage
		},
		data() {
			return {
				post: {}
			};
		},
		created() {
			this.$store
				.dispatch("model/sendReq", {
					url: "blog/post",
					method: "get",
					id: this.$route.params.id
				})
				.then(resp => (this.post = resp.data));
		}
	};
</script>
