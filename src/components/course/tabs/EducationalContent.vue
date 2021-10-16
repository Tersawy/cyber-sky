<template>
	<v-sheet class="mt-n1">
		<v-card class="mb-1">
			<v-card-title primary-title>
				<v-icon class="v-alert__icon icon-redius" color="#0082C6">fa-book</v-icon>
				<span>المحتوى التعليمي</span>
				<v-btn v-if="pdfLink" target="_blank" :href="`https://cdn.cyber-sky.org/media/${pdfLink}`" link class="mx-2 white--text" color="red" small>
					<span class="ml-2">عرض</span>
					<v-icon small>fa-file-pdf-o</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<span class="font-weight-light text-md-body-1"> ‏{{ data.length }} وحدات | {{ lessonsLength }} درساً </span>
			</v-card-title>
		</v-card>

		<v-expansion-panels>
			<v-expansion-panel v-for="(unit, i) in data" :key="i">
				<v-expansion-panel-header expand-icon="fa-angle-down">
					<v-chip class="mx-3 chip-count-expand"> {{ i }} </v-chip>
					{{ unit.name }}
				</v-expansion-panel-header>

				<v-expansion-panel-content>
					<v-list-item-group>
						<template v-for="lesson in unit.lessons">
							<v-list-item :key="lesson.id" @click="$emit('lesson', lesson)">
								<template v-slot:default="{ active }">
									<v-list-item-action v-if="showCheckbox">
										<v-checkbox :input-value="active"></v-checkbox>
									</v-list-item-action>

									<v-list-item-icon class="ml-2">
										<v-icon color="grey"> fa-video-camera </v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title> {{ lesson.name }} </v-list-item-title>
									</v-list-item-content>

									<v-list-item-action v-if="!lesson.lock">
										<v-icon color="grey"> fa-lock </v-icon>
									</v-list-item-action>
									<v-list-item-action v-if="lesson.lock">
										<v-btn icon color="blue" @click="playVideo(lesson)">
											<v-icon> fa-play </v-icon>
										</v-btn>
									</v-list-item-action>
								</template>
							</v-list-item>
						</template>
					</v-list-item-group>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-dialog v-model="pre" max-width="1000px" transition="dialog-transition">
			<v-card>
				<v-card-text class="pa-1">
					<video v-if="pre && currentVideo" :src="currentVideo" controls style="width: 100%"></video>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-sheet>
</template>

<script>
	export default {
		props: {
			showCheckbox: {
				type: Boolean,
				default: false
			},
			pdfLink: String,
			data: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				pre: false,
				currentVideo: ""
			};
		},
		computed: {
			lessonsLength() {
				return this.data.reduce((first, unit) => unit.lessons.length + first, 0);
			}
		},
		methods: {
			playVideo(lesson) {
				this.pre = true;
				this.currentVideo = process.env.VUE_APP_VIDEO_URL + lesson.url;
			}
		}
	};
</script>

<style>
	.chip-count-expand {
		max-width: 32px !important;
		border-width: 0.5px !important;
		border-style: solid !important;
		border-color: #eee !important;
		border-radius: 8px !important;
		background-color: #ffffff !important;
		color: #0082c6 !important;
		font-weight: bold;
	}
</style>
