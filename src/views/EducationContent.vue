<template>
	<SectionPage>
		<div class="fill-height mb-12 pb-12">
			<v-container grid-list-xs>
				<v-breadcrumbs dark :items="items" id="breadcrumb" class="mt-n6">
					<template v-slot:divider>
						<v-icon>fa-angle-double-left</v-icon>
					</template>
				</v-breadcrumbs>
				<v-layout row wrap justify-start>
					<v-col cols="12" md="6" class="mb-n6">
						<v-btn-toggle v-model="tab" color="white">
							<v-btn :color="tab == 0 ? `#3B86FF` : `#eee`" :value="0" :outlined="tab == 0">
								المحتوى التعليمي
							</v-btn>

							<v-btn :color="tab == 1 ? `#3B86FF` : `#eee`" :value="1" :outlined="tab == 1">
								حائط النقاش
							</v-btn>

							<v-btn :color="tab == 2 ? `#3B86FF` : `#eee`" :value="2" :outlined="tab == 2">
								المهام التدريبية
							</v-btn>
						</v-btn-toggle>
					</v-col>
				</v-layout>
			</v-container>
			<v-row justify="center" align="center">
				<v-col cols="12">
					<div style="width:100%;height:600px" v-if="isXvast">
						<video
							controls
							v-if="lesson.url"
							class="video-js"
							ref="xvast_player"
							id="xvast_player"
							:src="`${VIDEO_URL}${lesson.url}#t=1,2`"
							:data-setup="JSON.stringify({ playbackRates: [0.5, 0.7, 1, 1.2, 1.5, 2], autoplay: true, width: 856, height: 480 })"
							preload="auto"
						></video>
					</div>
					<div v-else class="black text-center d-flex align-center justify-center" style="width:100%;height:478px">
						<p class="white--text">
							Please open the protected videos in Xvast browser. &nbsp;&nbsp;&nbsp;<a class="white--text" href="https://www.xvast.com">Download Xvast</a>
						</p>
					</div>
				</v-col>
			</v-row>

			<v-tabs-items v-model="tab">
				<v-tab-item>
					<EducationalContent :review-in-modal="false" v-if="course" @lesson="loadLesson" showCheckbox :data="course.units" />
				</v-tab-item>
				<v-tab-item class="container">
					<v-card outlined elevation="0">
						<v-card-title primary-title> حائط النقاش </v-card-title>
						<v-card-text>
							{{ comments.length }} التعليقات
							<v-divider></v-divider>
							<v-row class="my-2">
								<v-col cols="1">
									<v-avatar tile color="grey lighten-3" size="55" class="mx-5">
										<v-icon>fa-user</v-icon>
									</v-avatar>
								</v-col>
								<v-col cols="10">
									<v-textarea hide-details="" v-model="comment_text" outlined no-resize rows="1" placeholder="تعليق"></v-textarea>
								</v-col>
								<v-col cols="1">
									<v-btn color="blue" :loading="isloading" text height="100%" @click="submitComment">
										<v-icon> fa-send </v-icon>
									</v-btn>
								</v-col>
								<v-card-text v-for="comment in comments" :key="comment.id">
									<Comment :item="comment" @reply="showReplyForm(comment)"></Comment>
									<v-card-text class="px-15" v-for="reply in comment.replies" :key="reply.id">
										<Comment reply="1" :item="reply"></Comment>
									</v-card-text>
								</v-card-text>
							</v-row>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-container grid-list-xs>
						<v-layout row wrap>
							<v-col cols="6" v-for="lesson in lesson.missions" :key="lesson.id">
								<Task :data="lesson" />
							</v-col>
							<v-col cols="6" v-for="lesson in lesson.questions" :key="lesson.id">
								<Task :data="lesson" :answerChose="true" />
							</v-col>
						</v-layout>
					</v-container>
				</v-tab-item>
			</v-tabs-items>
			<!-- <v-dialog
                v-model="showReplyDailog"
                persistent
                max-width="500px"
                transition="dialog-transition"
               
            >
                <v-card v-if='currentComment.by'>
                    <v-card-title>
                        الرد على تعليق {{ currentComment.by.fullname }}
                    </v-card-title>
                    <v-card-text>
                        <v-textarea outlined no-resize rows="1" 
                        v-model="reply_text"
                        placeholder="تعليق"></v-textarea>
                    </v-card-text>  

                    <v-card-actions>
                        <v-btn color="blue" dark elevation="0" @click="submitReply" :loading="isloading">ارسال </v-btn>
                        <v-btn color="red" dark elevation="0"
                            @click="showReplyDailog = false"
                        >اغلاق</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> -->
		</div>
	</SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");
	const EducationalContent = () => import("@component/course/tabs/EducationalContent.vue");
	const Task = () => import("@component/course/Task.vue");
	const Comment = () => import("@component/Comment.vue");

	export default {
		components: {
			SectionPage,
			EducationalContent,
			Task,
			Comment
		},
		watch: {
			lesson() {}
		},
		data() {
			return {
				content: "",
				tab: 0,
				lesson: {},
				course: {},
				items: [
					{ text: "الرئيسية", href: "/" },
					{ text: "كورساتي ", href: "/user/courses/" },
					{ text: " الرسائل الواردة", disabled: true }
				],
				comments: [],
				currentComment: {},
				showReplyDailog: false,
				comment_text: "",
				isloading: false
			};
		},
		async mounted() {
			try {
				let res = await this.$store.dispatch("model/sendReq", { url: `user/course`, id: this.$route.params.id, method: "get" });

				if (!res.data.status) this.$router.back();

				this.course = res.data.course_detals;

				this.loadFirstLessonVideo();

				this.isloading = true;

				this.setLoading();

				res = await this.$store.dispatch("model/sendReq", { url: `user/comments`, id: this.course.id, method: "get" });

				this.isloading = false;

				this.comments = res.data;
			} catch (err) {
				//
			}
		},
		computed: {
			isXvast() {
				return navigator.userAgent.indexOf("Xvast") > 0;
			}
		},
		methods: {
			submitComment() {
				this.isloading = true;
				this.$store
					.dispatch("model/sendReq", {
						url: `user/comment/${this.course.id}`,
						method: "create",
						item: JSON.stringify({ text: this.comment_text })
					})
					.then(resp => {
						this.isloading = false;
						this.comment_text = "";
						this.comments.push(resp.data);
					});
			},
			loadLesson(lesson) {
				this.lesson = lesson;

				var myVid = this.$refs.xvast_player;

				if (!myVid) return;

				myVid.load();

				myVid.addEventListener("error", this.getLicense, true);
			},

			getLicense() {
				var myVid = this.$refs.xvast_player;

				if (!myVid) return;

				var isSupp = myVid.canPlayType("xvast");

				if (isSupp.indexOf("https") > 0) {
					var licURL = isSupp.substring(isSupp.indexOf("https")); // Using substring to capture a URL to obtain license;

					window.location.href = licURL; // Redirecting to obtain license page to verify and obtain license.
				}
			},

			loadFirstLessonVideo() {
				for (let u = 0; u < this.course.units.length; u++) {
					let unit = this.course.units[u];

					if (!unit.lessons.length) continue;

					for (let l = 0; l < unit.lessons.length; l++) {
						let lesson = unit.lessons[l];
						if (lesson.url) return (this.lesson = lesson);
					}
				}
			}
		},
		created() {}
	};
</script>

<style>
	#breadcrumb a.v-breadcrumbs__item {
		color: white;
	}
	.video-js {
		height: 100%;
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
</style>
