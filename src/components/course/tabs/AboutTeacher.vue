<template>
	<v-sheet class="ma-2">
		<v-card v-if="data.profile">
			<v-card-title> عن المدرس </v-card-title>
			<v-list>
				<v-list-item>
					<v-list-item-avatar style="border-radius: 8px !important;">
						<v-img :src="data.avatar" lazy-src="./../../../assets/avatar_teacher.png"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ data.fullname }}</v-list-item-title>
						<v-list-item-subtitle>{{ data.country }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="data.profile">
					<v-list-item-avatar></v-list-item-avatar>
					<v-list-item-content>
						<p style="color: grey">{{ data.profile.about }}</p>
						<p class="mt-1">
							<v-btn small icon link :href="data.profile.facebook">
								<v-icon small>fa-facebook</v-icon>
							</v-btn>
							<v-btn small icon link :href="data.profile.twitter">
								<v-icon small>fa-twitter</v-icon>
							</v-btn>
						</p>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-card-actions v-if="canBooking">
				<v-spacer></v-spacer>
				<v-btn color="blue" @click="dailog = true" large outlined width="25%"> حجز موعد + </v-btn>
				<dailog v-model="dailog" width="700px">
					<v-form @submit.prevent="submit" ref="form">
						<v-row>
							<v-col cols="6">
								<v-date-picker
									elevation="1"
									v-model="dates"
									:allowed-dates="allowedDates"
									no-title
									width="100%"
									color="green"
									event-color="blue"
									:events="allowedDates"
									readonly
								></v-date-picker>
							</v-col>
							<v-col cols="6">
								<v-btn-toggle @change="selectMeeting" v-model="meeting" class="d-block" color="deep-purple accent-2">
									<v-btn width="100%" v-for="meet in data.meetings" :key="meet.id" elevation="1" class="my-1" dir="rtl" outlined :value="meet">
										من الساعة {{ meet.from_hour }}:00
										{{ meet.timing }}
										إلى الساعة {{ meet.to_hour }}:00
										{{ meet.timing }}
									</v-btn>
								</v-btn-toggle>
							</v-col>
							<v-col cols="12">
								<v-text-field name="title" label="العنوان" outlined></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-textarea name="notes" label="ملاحظة" outlined></v-textarea>
							</v-col>
							<v-col cols="12">
								<h2></h2>
							</v-col>
							<v-col cols="12" class="d-flex ">
								<h2 v-if="data.profile">
									<sup>$</sup> {{ Number(data.profile.working_houer) || 0 }}
									مقابل ساعة واحده
								</h2>
								<v-spacer></v-spacer>
								<v-btn dark color="blue" :loading="isloading" elevation="1" type="submit">حجز الموعد</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</dailog>
			</v-card-actions>
		</v-card>
	</v-sheet>
</template>

<script>
	const dailog = () => import("@component/Dialog.vue");

	export default {
		props: ["can-booking", "data"],
		components: {
			dailog
		},
		data() {
			return {
				dailog: false,
				dates: null,
				meetings: this.data.meetings.map(meet => meet.date),
				meeting: {},
				isloading: false
			};
		},
		methods: {
			selectMeeting(meet) {
				this.dates = meet.date;
			},
			submit() {
				let fd = new FormData(this.$refs.form.$el);
				fd.set("meeting", this.meeting.id);
				fd.set("date", this.dates);
				this.isloading = true;
				this.$store
					.dispatch("model/sendReq", {
						url: "meeting/user",
						method: "create",
						item: JSON.stringify(Object.fromEntries(fd))
					})
					.then(() => {
						alert("  تم الحجز بنجاح يرجا انتظار تاكيد الموعد من قبل الاستاذ تاكد من الاميل الخاص بيك");
						this.$refs.form.reset();
					})
					.finally(() => {
						this.dailog = false;
						this.isloading = false;
					});
			},
			allowedDates(val) {
				return -1 != this.meetings.indexOf(val);
			}
		}
	};
</script>

<style></style>
