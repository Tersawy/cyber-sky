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
				<v-text-field
					name="password"
					type="password"
					label="كلمة السر"
					filled
					outlined
					:hide-details="!errors.password"
					:error-messages="errors.password"
				></v-text-field>
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
				countries: [
					{ name: "Afghanistan", value: "Afghanistan" },
					{ name: "Albania", value: "Albania" },
					{ name: "Algeria", value: "Algeria" },
					{ name: "Andorra", value: "Andorra" },
					{ name: "Angola", value: "Angola" },
					{ name: "Antigua and Barbuda", value: "Antigua and Barbuda" },
					{ name: "Argentina", value: "Argentina" },
					{ name: "Armenia", value: "Armenia" },
					{ name: "Australia", value: "Australia" },
					{ name: "Austria", value: "Austria" },
					{ name: "Azerbaijan", value: "Azerbaijan" },
					{ name: "Bahamas", value: "Bahamas" },
					{ name: "Bahrain", value: "Bahrain" },
					{ name: "Bangladesh", value: "Bangladesh" },
					{ name: "Barbados", value: "Barbados" },
					{ name: "Belarus", value: "Belarus" },
					{ name: "Belgium", value: "Belgium" },
					{ name: "Belize", value: "Belize" },
					{ name: "Benin", value: "Benin" },
					{ name: "Bhutan", value: "Bhutan" },
					{ name: "Bolivia", value: "Bolivia" },
					{ name: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
					{ name: "Botswana", value: "Botswana" },
					{ name: "Brazil", value: "Brazil" },
					{ name: "Brunei ", value: "Brunei " },
					{ name: "Bulgaria", value: "Bulgaria" },
					{ name: "Burkina Faso", value: "Burkina Faso" },
					{ name: "Burundi", value: "Burundi" },
					{ name: "Côte d'Ivoire", value: "Côte d'Ivoire" },
					{ name: "Cabo Verde", value: "Cabo Verde" },
					{ name: "Cambodia", value: "Cambodia" },
					{ name: "Cameroon", value: "Cameroon" },
					{ name: "Canada", value: "Canada" },
					{ name: "Central African Republic", value: "Central African Republic" },
					{ name: "Chad", value: "Chad" },
					{ name: "Chile", value: "Chile" },
					{ name: "China", value: "China" },
					{ name: "Colombia", value: "Colombia" },
					{ name: "Comoros", value: "Comoros" },
					{ name: "Congo (Congo-Brazzaville)", value: "Congo (Congo-Brazzaville)" },
					{ name: "Costa Rica", value: "Costa Rica" },
					{ name: "Croatia", value: "Croatia" },
					{ name: "Cuba", value: "Cuba" },
					{ name: "Cyprus", value: "Cyprus" },
					{ name: "Czechia (Czech Republic)", value: "Czechia (Czech Republic)" },
					{ name: "Democratic Republic of the Congo", value: "Democratic Republic of the Congo" },
					{ name: "Denmark", value: "Denmark" },
					{ name: "Djibouti", value: "Djibouti" },
					{ name: "Dominica", value: "Dominica" },
					{ name: "Dominican Republic", value: "Dominican Republic" },
					{ name: "Ecuador", value: "Ecuador" },
					{ name: "Egypt", value: "Egypt" },
					{ name: "El Salvador", value: "El Salvador" },
					{ name: "Equatorial Guinea", value: "Equatorial Guinea" },
					{ name: "Eritrea", value: "Eritrea" },
					{ name: "Estonia", value: "Estonia" },
					{ name: 'Eswatini (fmr. "Swaziland")', value: 'Eswatini (fmr. "Swaziland")' },
					{ name: "Ethiopia", value: "Ethiopia" },
					{ name: "Fiji", value: "Fiji" },
					{ name: "Finland", value: "Finland" },
					{ name: "France", value: "France" },
					{ name: "Gabon", value: "Gabon" },
					{ name: "Gambia", value: "Gambia" },
					{ name: "Georgia", value: "Georgia" },
					{ name: "Germany", value: "Germany" },
					{ name: "Ghana", value: "Ghana" },
					{ name: "Greece", value: "Greece" },
					{ name: "Grenada", value: "Grenada" },
					{ name: "Guatemala", value: "Guatemala" },
					{ name: "Guinea", value: "Guinea" },
					{ name: "Guinea-Bissau", value: "Guinea-Bissau" },
					{ name: "Guyana", value: "Guyana" },
					{ name: "Haiti", value: "Haiti" },
					{ name: "Holy See", value: "Holy See" },
					{ name: "Honduras", value: "Honduras" },
					{ name: "Hungary", value: "Hungary" },
					{ name: "Iceland", value: "Iceland" },
					{ name: "India", value: "India" },
					{ name: "Indonesia", value: "Indonesia" },
					{ name: "Iran", value: "Iran" },
					{ name: "Iraq", value: "Iraq" },
					{ name: "Ireland", value: "Ireland" },
					{ name: "Israel", value: "Israel" },
					{ name: "Italy", value: "Italy" },
					{ name: "Jamaica", value: "Jamaica" },
					{ name: "Japan", value: "Japan" },
					{ name: "Jordan", value: "Jordan" },
					{ name: "Kazakhstan", value: "Kazakhstan" },
					{ name: "Kenya", value: "Kenya" },
					{ name: "Kiribati", value: "Kiribati" },
					{ name: "Kuwait", value: "Kuwait" },
					{ name: "Kyrgyzstan", value: "Kyrgyzstan" },
					{ name: "Laos", value: "Laos" },
					{ name: "Latvia", value: "Latvia" },
					{ name: "Lebanon", value: "Lebanon" },
					{ name: "Lesotho", value: "Lesotho" },
					{ name: "Liberia", value: "Liberia" },
					{ name: "Libya", value: "Libya" },
					{ name: "Liechtenstein", value: "Liechtenstein" },
					{ name: "Lithuania", value: "Lithuania" },
					{ name: "Luxembourg", value: "Luxembourg" },
					{ name: "Madagascar", value: "Madagascar" },
					{ name: "Malawi", value: "Malawi" },
					{ name: "Malaysia", value: "Malaysia" },
					{ name: "Maldives", value: "Maldives" },
					{ name: "Mali", value: "Mali" },
					{ name: "Malta", value: "Malta" },
					{ name: "Marshall Islands", value: "Marshall Islands" },
					{ name: "Mauritania", value: "Mauritania" },
					{ name: "Mauritius", value: "Mauritius" },
					{ name: "Mexico", value: "Mexico" },
					{ name: "Micronesia", value: "Micronesia" },
					{ name: "Moldova", value: "Moldova" },
					{ name: "Monaco", value: "Monaco" },
					{ name: "Mongolia", value: "Mongolia" },
					{ name: "Montenegro", value: "Montenegro" },
					{ name: "Morocco", value: "Morocco" },
					{ name: "Mozambique", value: "Mozambique" },
					{ name: "Myanmar (formerly Burma)", value: "Myanmar (formerly Burma)" },
					{ name: "Namibia", value: "Namibia" },
					{ name: "Nauru", value: "Nauru" },
					{ name: "Nepal", value: "Nepal" },
					{ name: "Netherlands", value: "Netherlands" },
					{ name: "New Zealand", value: "New Zealand" },
					{ name: "Nicaragua", value: "Nicaragua" },
					{ name: "Niger", value: "Niger" },
					{ name: "Nigeria", value: "Nigeria" },
					{ name: "North Korea", value: "North Korea" },
					{ name: "North Macedonia", value: "North Macedonia" },
					{ name: "Norway", value: "Norway" },
					{ name: "Oman", value: "Oman" },
					{ name: "Pakistan", value: "Pakistan" },
					{ name: "Palau", value: "Palau" },
					{ name: "Palestine State", value: "Palestine State" },
					{ name: "Panama", value: "Panama" },
					{ name: "Papua New Guinea", value: "Papua New Guinea" },
					{ name: "Paraguay", value: "Paraguay" },
					{ name: "Peru", value: "Peru" },
					{ name: "Philippines", value: "Philippines" },
					{ name: "Poland", value: "Poland" },
					{ name: "Portugal", value: "Portugal" },
					{ name: "Qatar", value: "Qatar" },
					{ name: "Romania", value: "Romania" },
					{ name: "Russia", value: "Russia" },
					{ name: "Rwanda", value: "Rwanda" },
					{ name: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
					{ name: "Saint Lucia", value: "Saint Lucia" },
					{ name: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
					{ name: "Samoa", value: "Samoa" },
					{ name: "San Marino", value: "San Marino" },
					{ name: "Sao Tome and Principe", value: "Sao Tome and Principe" },
					{ name: "Saudi Arabia", value: "Saudi Arabia" },
					{ name: "Senegal", value: "Senegal" },
					{ name: "Serbia", value: "Serbia" },
					{ name: "Seychelles", value: "Seychelles" },
					{ name: "Sierra Leone", value: "Sierra Leone" },
					{ name: "Singapore", value: "Singapore" },
					{ name: "Slovakia", value: "Slovakia" },
					{ name: "Slovenia", value: "Slovenia" },
					{ name: "Solomon Islands", value: "Solomon Islands" },
					{ name: "Somalia", value: "Somalia" },
					{ name: "South Africa", value: "South Africa" },
					{ name: "South Korea", value: "South Korea" },
					{ name: "South Sudan", value: "South Sudan" },
					{ name: "Spain", value: "Spain" },
					{ name: "Sri Lanka", value: "Sri Lanka" },
					{ name: "Sudan", value: "Sudan" },
					{ name: "Suriname", value: "Suriname" },
					{ name: "Sweden", value: "Sweden" },
					{ name: "Switzerland", value: "Switzerland" },
					{ name: "Syria", value: "Syria" },
					{ name: "Tajikistan", value: "Tajikistan" },
					{ name: "Tanzania", value: "Tanzania" },
					{ name: "Thailand", value: "Thailand" },
					{ name: "Timor-Leste", value: "Timor-Leste" },
					{ name: "Togo", value: "Togo" },
					{ name: "Tonga", value: "Tonga" },
					{ name: "Trinidad and Tobago", value: "Trinidad and Tobago" },
					{ name: "Tunisia", value: "Tunisia" },
					{ name: "Turkey", value: "Turkey" },
					{ name: "Turkmenistan", value: "Turkmenistan" },
					{ name: "Tuvalu", value: "Tuvalu" },
					{ name: "Uganda", value: "Uganda" },
					{ name: "Ukraine", value: "Ukraine" },
					{ name: "United Arab Emirates", value: "United Arab Emirates" },
					{ name: "United Kingdom", value: "United Kingdom" },
					{ name: "United States of America", value: "United States of America" },
					{ name: "Uruguay", value: "Uruguay" },
					{ name: "Uzbekistan", value: "Uzbekistan" },
					{ name: "Vanuatu", value: "Vanuatu" },
					{ name: "Venezuela", value: "Venezuela" },
					{ name: "Vietnam", value: "Vietnam" },
					{ name: "Yemen", value: "Yemen" },
					{ name: "Zambia", value: "Zambia" },
					{ name: "Zimbabwe`", value: "Zimbabwe`" }
				],
				isloading: false,
				accept: false
			};
		},
		methods: {
			async submit() {
				let fd = new FormData(this.$refs.form.$el);

				this.isloading = true;

				try {
					await this.$store.dispatch("auth/register", fd);

					this.$store.commit("setRegisterDailog", false);

					return this.$swal.fire({
						icon: "success",
						title: "تم ارسال رابط التفعيل على البريد الالكتروني الخاص بك برجاء التحقق منه لتفعيل حسابك",
						confirmButtonText: "اغلاق",
						confirmButtonColor: "#0082c6"
					});
				} catch (err) {
					//
				} finally {
					this.isloading = false;
				}
			},
			validate(data) {
				this.$refs.recaptcha.reset();
				this.submit();
			}
		},
		computed: mapState("auth", {
			errors: state => state.errors
		})
	};
</script>

<style></style>
