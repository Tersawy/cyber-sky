<template>
	<v-form ref="form" @submit.prevent="submit" class="my-5">
		<v-row class="justify-center align-center">
			<v-col cols="6">
				<v-img src="../../assets/footer.png" contain width="100%"></v-img>
			</v-col>
			<v-col cols="12" class="mt-8">
				<v-text-field name="fullname" label="الاسم الكامل" filled outlined :hide-details="!errors.fullname" :error-messages="errors.fullname"></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-text-field name="email" label="البريد الاكتروني" id="email" filled outlined :error-messages="errors.email" :hide-details="!errors.email"></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-text-field name="password" label="كلمة السر" filled outlined :hide-details="!errors.password" :error-messages="errors.password"></v-text-field>
			</v-col>

			<v-col cols="12">
				<v-select
					:items="countries"
					name="country"
					item-text="name"
					item-value="name"
					label="الدولة"
					filled
					outlined
					:hide-details="!errors.country"
					:error-messages="errors.country"
				></v-select>
			</v-col>
			<v-col>
				<v-checkbox v-model="accept" value="value">
					<template v-slot:label>
						<v-btn text color="blue" to="/privacy" @click.stop>
							هل توافق على شرروط سياسة الخصوصية
						</v-btn>
					</template>
				</v-checkbox>
			</v-col>
			<v-col cols="12">
				<vue-recaptcha ref="recaptcha" sitekey="6LdckecbAAAAAIV3GDus4EHLfoqOWhebNigOn5Oj" @verify="validate">
					<v-btn :disabled="!accept" @click="isloading = true" color="blue white--text" block large :loading="isloading" type="submit">
						انشاء اشتراك
					</v-btn>

					<!-- <v-btn color="blue darken-3 white--text" block large class="mt-5"> 
                        انشاء اشتراك بستخدام فيس بوك 
                    </v-btn>
                    <v-btn outlined color="grey darken-3" block large class="mt-1  white--text" > 
                        انشاء اشتراك بستخدام كوكل 
                    </v-btn> -->
				</vue-recaptcha>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";
	import VueRecaptcha from "vue-recaptcha";
	const PrivacyCard = () => import("@component/cards/Privacy.vue");

	export default {
		components: {
			VueRecaptcha,
			PrivacyCard
		},
		data() {
			return {
				countries: [],
				isloading: false,
				accept: false
			};
		},
		methods: {
			submit() {
				let fd = new FormData(this.$refs.form.$el);

				this.isloading = true;
				this.$store
					.dispatch("auth/register", fd)
					.then(() => {
						this.$emit("submit");
					})
					.finally(() => (this.isloading = false));
			},
			validate(data) {
				this.$refs.recaptcha.reset();
				this.submit();
			}
		},
		computed: mapState("auth", {
			errors: state => state.errors
		}),
		created() {
			axios.get("https://restcountries.eu/rest/v2/all/").then(resp => (this.countries = resp.data));
		}
	};
</script>

<style></style>
