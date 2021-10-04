<template>
	<v-form ref="form" @submit.prevent="submit" class="my-5">
		<v-row>
			<v-col cols="12" class="mt-8">
				<v-text-field name="title" label="أدخل العنوان" outlined :hide-details="!errors.title" :error-messages="errors.title"></v-text-field>
			</v-col>
			<v-col cols="12" class="mt-8">
				<v-textarea name="text" label="نص الرسالة" outlined :hide-details="!errors.text" :error-messages="errors.text"></v-textarea>
			</v-col>
			<v-col cols="6">
				<v-select
					name="to"
					v-model="to"
					:items="[
						//// &quot;&quot;
						{ text: 'استاذه', value: 2 },
						{ text: 'الادراة', value: 4 }
					]"
					label="إرسال الرسالة إلى"
					outlined
				></v-select>
			</v-col>
			<v-col cols="6" v-if="to == 2">
				<v-autocomplete name="to" v-model="teacher" :items="teachers" item-text="fullname" item-value="id" label="المدرب" outlined></v-autocomplete>
			</v-col>
			<v-col cols="12" class="d-flex">
				<v-spacer></v-spacer>
				<v-btn color="blue white--text" large :loading="isloading" type="submit">
					ارسال الرسالة
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				countries: [],
				isloading: false,
				teachers: [],
				to: 4,
				teacher: 0
			};
		},
		watch: {
			to() {
				this.teacher = 0;
			}
		},
		methods: {
			submit() {
				let fd = new FormData(this.$refs.form.$el);
				if (this.teacher) fd.set("receiver_id", this.teacher);
				this.isloading = true;
				this.$store
					.dispatch("model/sendReq", {
						url: `chat/me`,
						method: "create",
						item: JSON.stringify(Object.fromEntries(fd))
					})
					.then(({ data }) => {
						alert("تم ارسال الرسالة");
						this.$emit("submit", data);
						this.$refs.form.reset();
					})
					.finally(() => (this.isloading = false));
			}
		},
		computed: mapState("auth", {
			errors: state => state.errors
		}),
		created() {
			this.$store
				.dispatch("model/_all", {
					url: `user/teachers`
				})
				.then(({ data }) => {
					this.teachers = data;
				});
		}
	};
</script>

<style></style>
