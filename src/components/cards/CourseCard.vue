<template>
	<v-card>
		<v-hover>
			<template v-slot:default="{ hover }">
				<v-img
					style="cursor: pointer;"
					:src="`https://323f496c228ba266d14fe967a7ddb488.cyber-sky.org/media/${data.image}`"
					:lazy-src="require('../../assets/logo end.jpg')"
					@click="videoShow"
				>
					<v-dialog v-model="video" persistent max-width="800px" transition="dialog-transition">
						<v-card>
							<v-card-text class="mx-0 px-0">
								<video v-if="video && data.video" width="100%" controls ref="video" :src="`${VIDEO_URL}${data.video}`" type="video/mp4">
									Your browser does not support HTML video.
								</video>
							</v-card-text>
							<v-card-title primary-title>
								<strong>{{ data.title }}</strong>
							</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn dark color="red text--white" elevation="1" @click="video = false"> اغلاق </v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-row class="justify-center align-center " style="height:100%">
						<v-col cols="4">
							<v-icon size="80" color="white" :style="{ opacity: hover ? 1 : 0.5 }"> fa-play </v-icon>
						</v-col>
					</v-row>
				</v-img>
			</template>
		</v-hover>
		<v-card-title primary-title>
			<v-btn color="blue" dark class="elevation-0">{{ data.section }}</v-btn>
			<v-spacer></v-spacer>
			<h3 class="float-left mt-4 text-h6" style="color:#D83232">
				<span class="text-h6" :class="{ 'text-decoration-line-through red--text text--lighten-3': data.discount }">{{ data.price }}</span>
				<span v-if="data.discount">
					<span class="text-h6" v-if="Number(data.discount) != 0"> {{ data.discount }} </span>
					<span class="text-h6" v-else> Free </span>
				</span>
				<sup>$</sup>
			</h3>
		</v-card-title>
		<v-card-actions>
			<v-btn v-if="!isBuy" large dark width="65%" color="#0082C6" class="ml-1 elevation-0" @click="handleBuy">
				<template v-if="data.userHaveCoures">إبدأ الآن</template>
				<template v-else>إشتري </template>
			</v-btn>
			<v-btn
				v-else
				large
				outlined
				width="55%"
				color="priarmy"
				elevation="0"
				@click="$router.push({ name: 'EducationContent', params: { id: isBuy.id } })"
				class="ml-1"
			>
				<v-icon>شاهد</v-icon>
			</v-btn>
		</v-card-actions>
		<v-card-text class="pb-12"></v-card-text>
	</v-card>
</template>

<script>
	export default {
		props: {
			data: Object
		},
		data() {
			return {
				video: false
			};
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

				this.$router.push({ name: "Payment", params: { id: this.data.id } });
			},

			videoShow() {
				this.video = true;
				// this.$refs.video.reload()
			}
		}
	};
</script>

<style></style>
