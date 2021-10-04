<template>
	<v-sheet row wrap class="ma-2">
		<v-card>
			<v-card-title>
				<v-icon left class="v-alert__icon icon-redius" color="#0082C6"> fa-comments </v-icon>
				التقييمات
				<v-spacer></v-spacer>
				<span v-if="ratingCourse" class="rating-value mx-2">{{ ratingCourse.length }} تقييم </span>

				<v-dialog v-if="isBuy" scrollable max-width="500px" transition="dialog-transition">
					<template v-slot:activator="{ on }">
						<v-btn text v-if="isBuy" v-on="on">+ إضافة تقييم</v-btn>
					</template>

					<v-card>
						<v-card-title> اضافة تقييم </v-card-title>
						<v-card-text>
							<v-form ref="form" @submit.prevent="submit">
								<v-rating
									v-model="reatingData.rating"
									name="rating"
									color="yellow accent-4"
									hover
									size="25"
									class="my-3"
									full-icon="fa-star"
									empty-icon="fa-star-o"
								></v-rating>
								<v-textarea v-model="reatingData.text" label="نص" name="text" outlined rows="3"></v-textarea>

								<v-btn color="blue" elevation="0" dark type="submit" :loading="isloading">
									اضافة
								</v-btn>
							</v-form>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-card-title>
			<v-card-text>
				<v-list class="mr-12" v-if="!isloading">
					<template v-for="(rating, i) in ratings">
						<div :key="i">
							<v-list-item class="mr-4">
								<v-list-item-avatar tile color="grey">
									<!-- <v-img :src="rating.avatar"></v-img> -->
									{{ rating.user_detals.fullname[0] }}
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title> {{ rating.user_detals.fullname }}</v-list-item-title>
									<v-list-item-subtitle>
										{{ moment(rating.created_at, "LT").fromNow() }}
									</v-list-item-subtitle>
								</v-list-item-content>
								<v-list-item-action v-if="rating.rating">
									<v-rating
										color="yellow accent-4"
										dense
										half-increments
										hover
										size="15"
										readonly
										:value="rating.rating"
										half-icon="fa-star-half"
										full-icon="fa-star"
										empty-icon="fa-star-o"
									></v-rating>
								</v-list-item-action>
							</v-list-item>
							<v-list-item class="mr-2">
								<v-list-item-content>
									<p style="color: grey">
										{{ rating.text }}
									</p>
								</v-list-item-content>
							</v-list-item>
							<v-divider></v-divider>
						</div>
					</template>
					<v-list-item class="mr-2">
						<v-list-item-content>
							<p style="color: grey" v-if="!ratings.length">
								لاتوجد مراجعات
							</p>
						</v-list-item-content>
					</v-list-item>
				</v-list>
				<v-row v-else class="justify-center ma-4">
					<v-progress-circular indeterminate color="primary"></v-progress-circular>
				</v-row>
			</v-card-text>

			<v-card-actions class="mr-12">
				<v-btn text>عرض المزيد</v-btn>
			</v-card-actions>
		</v-card>
	</v-sheet>
</template>

<script>
	export default {
		props: ["rating-course", "can-rating"],
		computed: {
			isBuy() {
				return this.$store.state.user_courses.filter(it => it.course_detals.id == this.canRating)[0];
			}
		},
		data() {
			return {
				reatingData: {},
				ratings: [],
				isloading: false
			};
		},
		methods: {
			submit() {
				this.isloading = true;
				this.$store
					.dispatch("model/sendReq", {
						method: "create",
						url: `user/review/${this.canRating}/`,
						item: JSON.stringify(this.reatingData)
					})
					.then(data => {
						this.$refs.form.reset();
						this.ratings.push(data.data);
					})
					.finally(() => (this.isloading = false));
			}
		},
		created() {
			this.isloading = true;
			this.$store
				.dispatch("model/sendReq", {
					method: "all",
					url: `user/review/${this.canRating}`
				})
				.then(data => (this.ratings = data.data.results))
				.finally(() => (this.isloading = false));
		}
	};
</script>

<style></style>
