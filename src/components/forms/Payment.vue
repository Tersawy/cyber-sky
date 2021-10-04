<template>
	<v-form @submit.prevent="submit" ref="form">
		<!-- <v-row>
            <v-col cols=12 sm=6 md=4>
                <v-text-field
                    name='fullname'
                    outlined
                    label="الإسم بالكامل"
                ></v-text-field>
            </v-col>
            <v-col cols=12 sm=6 md=4>
                <v-text-field
                    name='address'
                    outlined
                    label="العنوان"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols=12 sm=6 md=4>
                <v-select
                    name='country'
                    outlined
                    append-icon='fa-angle-down'
                    :items="['الدولة','العراق']"
                    label="الدولة"
                ></v-select>
            </v-col>
            <v-col cols=12 sm=3 md=2>
                <v-text-field
                    name='city'
                    outlined
                    label="المدينة"
                ></v-text-field>
            </v-col>
            <v-col cols=12 sm=3 md=2>
                <v-text-field
                    name='zip_code'
                    outlined
                    label="ZIP CODE"
                ></v-text-field>
            </v-col>
        </v-row> -->
		<h2 class="mt-sm-8">طريقة الدفع</h2>
		<p>إختر طريقة الدفع المناسبة لك من طرق الدفع المتوفرة أدناه:-</p>

		<v-item-group v-model="tabs">
			<v-row>
				<v-col cols="6" sm="4">
					<v-item v-slot="{ active, toggle }" value="cc">
						<v-card outlined class="pa-6 payment-icon" :class="{ 'active-card': active }" @click="toggle">
							<v-img contain class="mx-auto" src="./../../assets/icons/credit.png"></v-img>
						</v-card>
					</v-item>
				</v-col>
				<v-col cols="12" sm="4">
					<v-item v-slot="{ active, toggle }" value="usdt">
						<v-card outlined class="pa-6 payment-icon" :class="{ 'active-card': active }" @click="toggle">
							<v-img contain class="mx-auto" src="./../../assets/tether_Logo.png"></v-img>
						</v-card>
					</v-item>
				</v-col>
			</v-row>
		</v-item-group>

		<v-tabs-items v-model="tabs">
			<v-tab-item value="cc">
				<stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :session-id="sessionId" @loading="v => (loading = v)" />
				<p class="text-h6">اضغط على اكمل الطلب ليتم تحويلك الى صفحة الدفع</p>
			</v-tab-item>

			<v-tab-item value="usdt">
				<v-row>
					<v-col cols="12" md="6" class="pa-4">
						<h2>بيانات ال USDT</h2>
						<h4>عنوان التحويل</h4>
						<h4 class="pa-2">
							<v-text-field
								name="address"
								:value="data.address"
								readonly
								label="Address"
								:error-messages="errors.address"
								id="address"
								outlined
								background-color="grey lighten-4"
							></v-text-field>
						</h4>
						<p class="pt-3 px-2 ma-0">بعد التحويل يرجاء كتابة Transaction ID</p>

						<v-text-field
							name="tx_id"
							:error-messages="errors.tx_id"
							label="Transaction ID "
							id="tx_id"
							outlined
							hint="Transaction ID ادخل رقم العملية  "
						></v-text-field>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>

		<v-row class="mt-12">
			<template v-if="!data.slug">
				<v-col cols="10" md="4">
					<v-text-field
						v-model="coupon"
						:error-messages="errors.message"
						:color="coupon_detals.id ? `green` : ''"
						outlined
						dense
						hide-details
						label="كود الخصم"
					></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn outlined x-large :loading="isloading" height="100%" @click="checkCoupon"> تحقق </v-btn>
				</v-col>
			</template>
			<v-list-item class="px-5 mx-2 " dense>
				<v-list-item-content>
					<v-list-item-title> السعر الإجمالي </v-list-item-title>

					<v-list-item-subtitle v-if="data.slug">
						<strong class="text-h6 grey--text text--darken-4"> {{ meeting_price }} </strong>
						دولار
					</v-list-item-subtitle>

					<v-list-item-subtitle v-else>
						<strong class="text-h6 grey--text text--darken-4"> {{ price }} </strong>
						دولار
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-col cols="6">
				<v-checkbox dense v-model="accept" value="value" hide-details>
					<template v-slot:label>
						<v-btn text color="blue" to="/service" @click.stop>
							هل توافق على شرروط الخدمة
						</v-btn>
					</template>
				</v-checkbox>
			</v-col>
			<v-col cols="2" class="d-flex align-end">
				<v-btn color="blue" large elevation="4" type="submit" :dark="!!accept" :disabled="!accept" :loading="isloading">
					إكمال الطلب
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
	import { mapState } from "vuex";
	import { StripeCheckout } from "@vue-stripe/vue-stripe";
	export default {
		props: ["data"],
		components: {
			StripeCheckout
		},
		data() {
			return {
				loading: false,
				tabs: "cc",
				accept: null,
				coupon: null,
				coupon_detals: {},
				price: this.data.price,
				isMeeting: false,
				sessionId: "",
				publishableKey: ""
			};
		},
		watch: {
			data(data) {
				this.price = data.discount ? data.discount : data.price;
			}
		},
		computed: {
			...mapState("model", {
				errors: s => s.errors,
				isloading: s => s.isloading
			}),
			meeting_price() {
				return Number(this.data.meeting_deatls.teacher_detals.profile.working_houer) * Number(this.data.meeting_deatls.for_duration);
			}
		},
		methods: {
			submit() {
				let fd = new FormData(this.$refs.form.$el);
				if (this.isMeeting) {
					this.meeting(fd);
				} else {
					this.couser(fd);
				}
			},
			meeting(fd) {
				this.$store
					.dispatch("model/sendReq", {
						url: `meeting/buy/${this.data.slug}`,
						item: JSON.stringify(Object.fromEntries(fd)),
						method: "create"
					})
					.then(data => alert(" يرجا التحقق من الاميل"))
					.catch(err => console.log(err));
			},
			couser(fd) {
				fd.set("price", this.price);
				if (this.coupon_detals.id) fd.set("coupon", this.coupon_detals.code);
				fd.set("type", this.tabs);

				this.$store
					.dispatch("model/sendReq", {
						url: `payment/course/${this.data.id}`,
						item: JSON.stringify(Object.fromEntries(fd)),
						method: "create"
					})
					.then(data => {
						this.$store.state.user_courses.push(data.data);
						if (data.data.sessionId) {
							this.sessionId = data.data.sessionId;
							this.$refs.checkoutRef.redirectToCheckout();
							return;
						}
						alert(" يرجا التحقق من الاميل");
					})
					.catch(err => {
						if (err.response.data.error == "HAVE_COURSE") {
							alert("لقد قمت بشراء الكورس يرجا التحقق من الاميل ");
						}
					});
			},
			checkCoupon() {
				if (this.coupon && this.coupon_detals.code != this.coupon) {
					this.coupon_detals = {};
					this.$store
						.dispatch("model/sendReq", {
							url: `user/coupon/${this.data.id}`,
							item: JSON.stringify({ coupon: this.coupon }),
							method: "create"
						})
						.then(resp => {
							this.coupon_detals = resp.data;
							if (resp.data.discount_type == "%") {
								this.price = eval(`${this.price}-((${this.coupon_detals.discount_value}/100)*${this.price})`);
							} else {
								this.price = this.price - this.coupon_detals.discount_value;
							}
						})
						.catch(() => (this.price = this.data.discount ? this.data.discount : this.data.price));
				}
			}
		},
		created() {
			this.isMeeting = !!this.data.slug;
			this.$store
				.dispatch("model/sendReq", {
					method: "_all",
					url: "payment/stripekey/"
				})
				.then(({ data }) => (this.publishableKey = data.publicKey));
		}
	};
</script>

<style>
	.active-card {
		background-color: #d6edff !important;
		/* border-color: #D6EDFF !important; */
	}
	.payment-icon {
		height: 80%;
	}

	.payment-icon .v-image {
		height: 100%;
		width: 40%;
	}
</style>
