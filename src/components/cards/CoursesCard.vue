<template>
	<v-card v-bind="$attrs">
		<v-hover>
			<template v-slot:default="{ hover }">
				<v-card :elevation="hover ? 10 : 0">
					<v-img
						style="cursor: pointer;"
						height="100%"
						@click="$router.push({ name: 'Course', params: { id: data.id } })"
						:src="`https://323f496c228ba266d14fe967a7ddb488.cyber-sky.org/media/${data.image}`"
						:lazy-src="require('../../assets/logo end.jpg')"
						v-bind="$attrs.image"
					>
						<v-sheet class="fill-height" color="#fff0">
							<v-row justify="start" align="end" class="fill-height">
								<v-col cols="6" class="mr-2">
									<v-btn color="red" dark style="font-size:12px" elevation="0"> {{ data.section }} </v-btn>
								</v-col>
							</v-row>
						</v-sheet>
					</v-img>
				</v-card>
			</template>
		</v-hover>
		<v-card-title style="font-size:12px"> {{ data.title }} </v-card-title>
		<v-card-subtitle> {{ data.title }} </v-card-subtitle>
		<v-card-text>
			<v-row v-if="data.teacher_profile" align="center" class="mx-0">
				<v-col cols="12" class="mx-0 ">
					<v-avatar tile color="#333" class="rounded-lg float-left"> </v-avatar>
					<h6>معلم الكورس</h6>
					<h5>{{ data.teacher_profile.fullname }}</h5>
				</v-col>
				<v-col cols="12">
					<h3 class="float-left mt-4 text-h6" style="color:#D83232">
						<span class="text-h6" :class="{ 'text-decoration-line-through red--text text--lighten-3': data.discount }">{{ data.price }}</span>
						<span v-if="data.discount">
							<span class="text-h6" v-if="Number(data.discount) != 0"> {{ data.discount }} </span>
							<span class="text-h6" v-else> Free </span>
						</span>
						<sup>$</sup>
					</h3>
					<v-rating
						half-icon="fa-star-half"
						full-icon="fa-star"
						empty-icon="fa-star-o"
						:value="data.ratings.rating__avg"
						color="amber"
						dense
						half-increments
						readonly
						size="16"
					></v-rating>
					<div class="rating-number grey--text ml-4">{{ data.ratings.rating__avg }} ({{ data.ratingCount }})</div>
				</v-col>
			</v-row>
		</v-card-text>
		<v-divider class="mx-4"></v-divider>
		<v-card-actions class="mx-0">
			<v-row justify="center">
				<v-col cols="12">
					<v-btn v-if="!isBuy" large dark width="55%" color="#0082C6" elevation="0" class="ml-1" @click="handleBuy">
						إشتري
					</v-btn>
					<v-btn
						v-else
						large
						outlined
						width="55%"
						color="#0082C6"
						elevation="0"
						@click="$router.push({ name: 'EducationContent', params: { id: isBuy.id } })"
						class="ml-1"
					>
						<v-icon>شاهد</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			isBuy() {
				return this.$store.state.user_courses.filter(it => it.course_detals.id == this.data.id)[0];
			}
		},

		methods: {
			handleBuy() {
				if (!this.isLogin) {
					return this.$store.commit("setLoginDailog", true);
				}

				this.$router.push({ name: "Payment", params: { id: data.id } });
			}
		}
	};
</script>

<style>
	.v-card h3,
	.v-card .rating-number {
		font-family: OpenSans;
	}

	.v-card .v-btn:not(.v-btn--round).v-size--large {
		min-width: unset;
	}
</style>
