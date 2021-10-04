<template>
	<SectionPage>
		<v-sheet color="#eee0" class="fill-height">
			<v-container grid-list-xs>
				<v-row class="mt-12">
					<v-col class="d-flex">
						<v-spacer></v-spacer>
						<v-dialog v-model="dialog" scrollable max-width="650px" transition="dialog-transition">
							<template v-slot:activator="{ on }">
								<v-btn color="blue" v-on="on" dark elevation="1">
									إنشاء رسالة جديدة +
								</v-btn>
							</template>
							<v-card>
								<v-card-title primary-title>
									رسالة جديدة
								</v-card-title>
								<v-card-text>
									<MessageForm></MessageForm>
								</v-card-text>
							</v-card>
						</v-dialog>
					</v-col>
					<v-col cols="12" class="py-0">
						<v-slide-group @change="getAll" v-model="tab" style="background-color: #fff">
							<v-slide-item v-slot="{ active, toggle }" :value="4">
								<v-btn tile :color="active ? `#3B86FF` : `#fff`" :outlined="active" @click="toggle">
									رسائل الادارة
								</v-btn>
							</v-slide-item>
							<v-slide-item v-slot="{ active, toggle }" :value="2">
								<v-btn tile :color="active ? `#3B86FF` : `#fff`" :outlined="active" @click="toggle">
									رسائل المدربين
								</v-btn>
							</v-slide-item>
						</v-slide-group>
					</v-col>
					<v-col cols="12" class="mt-n3">
						<v-card>
							<v-layout row warp>
								<!-- <v-col cols=12> -->

								<!-- </v-col> -->
								<v-col cols="12" md="4">
									<v-list>
										<v-subheader>
											<v-spacer></v-spacer>
											<v-btn block tile elevation="0" dark small color="blue" @click="getAll" :loading="isloading">
												<v-icon small>
													fa-repeat
												</v-icon>
											</v-btn>
										</v-subheader>
										<v-subheader class="text-center mx-0" v-if="!data.results.length">
											No Messages
										</v-subheader>
										<v-list-item-group color="grey darken-4">
											<template v-for="msg in data.results">
												<v-list-item :key="msg.id" link dense three-line active-class="" @click="activeMessage(msg)">
													<v-list-item-avatar tile color="blue" size="40">
														{{ msg.sender.fullname[0] }}
													</v-list-item-avatar>

													<v-list-item-content>
														<v-list-item-title v-if="msg.sender && msg.sender.id != $store.state.auth.user.id">
															{{ msg.sender.fullname }}
														</v-list-item-title>
														<v-list-item-title v-else>
															<template v-if="msg.receiver && tab != 4">
																{{ msg.receiver.fullname }}
															</template>
															<template v-else>
																الى الادارة
															</template>
														</v-list-item-title>
														<v-list-item-subtitle class="text-truncate">
															{{ msg.title }}
														</v-list-item-subtitle>
														<v-list-item-subtitle>
															{{ moment(msg.create_at).fromNow() }}
														</v-list-item-subtitle>
													</v-list-item-content>
												</v-list-item>
											</template>
										</v-list-item-group>
									</v-list>
								</v-col>
								<v-col cols="12" md="8" :class="{ 'order-first': $vuetify.breakpoint.smAndDown }">
									<v-card flat class="px-md-12 py-6" dir="auto" v-if="activeMessage">
										<v-card-title v-if="$vuetify.breakpoint.smAndDown" class="justify-end" @click="activeMessage({})">
											<v-btn icon>
												<v-icon> fa-close </v-icon>
											</v-btn>
										</v-card-title>
										<v-card-text style="white-space: pre-wrap">
											<h1 class="text-capitalize px-0 mx-0">{{ active.title }}</h1>
											<h4 class="mt-4 mx-3">{{ active.text }}</h4>
											<v-card-text>
												<v-alert
													v-for="reply in active.replies"
													:key="reply.id"
													tile
													border="right"
													colored-border
													dense
													:color="reply.user.id != active.sender.id ? 'blue' : 'success'"
													elevation="0"
													>{{ reply.text }}
													<br />
													<small class="grey--text text--light-2"> @{{ reply.user.fullname }}</small>
													<small class="grey--text text--darken-4"> {{ moment(reply.create_at).fromNow() }} </small>
												</v-alert>
												<v-card-text v-if="active.id" class="ma-0 pa-0">
													<v-form @submit.prevent="submitReply" ref="replyForm">
														<v-row no-gutters>
															<v-col cols="12">
																<v-textarea hide-details name="text" outlined auto-grow></v-textarea>
															</v-col>
															<v-col cols="12">
																<v-btn dark :loading="replyLoading" color="blue" type="submit" class="mt-2" title="Reply" elevation="0">
																	ارسال
																</v-btn>
															</v-col>
														</v-row>
													</v-form>
												</v-card-text>
											</v-card-text>
										</v-card-text>
									</v-card>
								</v-col>
							</v-layout>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-sheet>
	</SectionPage>
</template>

<script>
	import { mapState } from "vuex";
	const SectionPage = () => import("@component/Section.vue");
	const MessageForm = () => import("@component/forms/message.vue");
	export default {
		components: {
			SectionPage,
			MessageForm
		},
		data() {
			return {
				tab: 4,
				show: null,
				active: {}, // actaive message
				reply: false,
				replyLoading: false,
				dialog: false
			};
		},
		watch: {
			tab() {
				this.active = {};
			}
		},
		methods: {
			getAll() {
				this.$store.dispatch("model/sendReq", {
					url: `chat/me?role=${this.tab}`,
					method: "all"
				});
			},
			activeMessage(msg) {
				// set active message
				this.active = msg;
			},
			submitReply() {
				let fd = new FormData(this.$refs.replyForm.$el);
				this.replyLoading = true;
				this.$store
					.dispatch("model/sendReq", {
						url: `chat/reply/${this.active.id}`,
						method: "create",
						item: JSON.stringify(Object.fromEntries(fd))
					})
					.then(({ data }) => {
						this.active.replies.push(data);
						this.$refs.replyForm.reset();
					})
					.finally(() => (this.replyLoading = false));
			}
		},
		computed: {
			...mapState("model", {
				data: s => s.data,
				isloading: s => s.isloading
			})
		},
		created() {
			this.getAll();
		}
	};
</script>

<style></style>
