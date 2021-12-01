<template>
	<v-row no-gutters>
		<v-col cols="1">
			<v-avatar tile color="grey lighten-3" size="60" class="mx-5">
				<v-icon>fa-user</v-icon>
			</v-avatar>
		</v-col>
		<v-col cols="11">
			<span class="grey--text ">{{ moment(item.created_at).fromNow() }} . </span>
			<span class="grey--text text--darken-3">{{ item.by.fullname }}</span>
			<h4 class="pa-2">{{ item.text }}</h4>
			<!-- <v-btn v-if='!reply' @click="" color="blue" text small link class="mx-2">اضافة رد</v-btn> -->
			<v-text-field
				v-if="!reply"
				name="reply"
				outlined
				dense
				hide-details
				label="رد على التعليق"
				id="id"
				v-model="reply_text"
				:loading="isloading"
				@keyup.enter="submitReply"
			></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		props: ["item", "reply"],
		data() {
			return {
				isloading: false,
				reply_text: ""
			};
		},
		methods: {
			submitReply() {
				this.isloading = true;
				this.$store
					.dispatch("model/sendReq", {
						url: `user/comment/${this.item.id}/reply/`,
						method: "create",
						item: JSON.stringify({ text: this.reply_text })
					})
					.then(resp => {
						this.isloading = false;
						this.reply_text = "";
						this.item.replies.push(resp.data);
					});
			}
		}
	};
</script>

<style></style>
