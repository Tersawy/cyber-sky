<template>
	<SectionPage>
		<v-container v-if="Object.keys(post).length">
			<v-layout row wrap align-end style="height: 16rem;" class="mt-16">
				<v-col cols="12">
					<h1 class="mt-2" style="font-size: 40px;font-weight: lighter;">
						{{ post.title }}
					</h1>
				</v-col>
			</v-layout>
			<v-layout row wrap class="my-12">
				<v-col cols="12">
					<PostCard :full="1" :id="$route.params.id" :data="post"></PostCard>
				</v-col>
			</v-layout>
		</v-container>
		<NotFound v-else />
	</SectionPage>
</template>

<script>
	const PostCard = () => import("@component/cards/PostCard.vue");
	const SectionPage = () => import("@component/Section.vue");
	const NotFound = () => import("@/components/NotFound.vue");

	export default {
		components: {
			PostCard,
			SectionPage,
			NotFound
		},
		data() {
			return {
				post: {}
			};
		},

		async mounted() {
			try {
				let res = await this.getPost();
				this.post = res.data;
			} catch (err) {
				//
			} finally {
				this.setLoading();
			}
		},

		methods: {
			getPost() {
				return this.$store.dispatch("model/sendReq", { url: "blog/post", method: "get", id: this.$route.params.id });
			}
		}
	};
</script>
