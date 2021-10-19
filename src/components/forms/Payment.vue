<template>
	<v-form @submit.prevent="submit" ref="form">
		<h2 class="mt-sm-8">طريقة الدفع</h2>
		<p>إختر طريقة الدفع المناسبة لك من طرق الدفع المتوفرة أدناه:-</p>

		<v-item-group v-model="payment.type">
			<v-row>
				<v-col cols="6" sm="4">
					<v-item v-slot="{ active, toggle }" value="cc">
						<v-card outlined class="pa-6 payment-icon" :class="{ 'active-card': active }" @click="toggle">
							<v-img contain class="mx-auto" src="./../../assets/icons/master.png"></v-img>
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

		<v-tabs-items v-model="payment.type">
			<v-tab-item value="cc">
				<stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :session-id="sessionId" @loading="v => (loading = v)" />
				<p class="text-h6">اضغط على اكمل الطلب ليتم تحويلك الى صفحة الدفع</p>
			</v-tab-item>

			<v-tab-item value="usdt">
				<v-row>
					<v-col cols="12" md="6" class="pa-4">
						<h2 class="d-inline-block ml-3 mt-4">بيانات ال USDT</h2>
						<span class="font-weight-bold mb-8 d-inline-block blue--text" style="font-size:13px">قم بالتحويل على شبكة TRC20</span>
						<h4>عنوان التحويل</h4>
						<h4 class="pa-2">
							<v-text-field
								name="address"
								:value="payment.address"
								readonly
								label="Address"
								:error-messages="errors.address"
								disabled
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
							v-model="payment.tx_id"
							id="tx_id"
							outlined
							hint="Transaction ID ادخل رقم العملية  "
						></v-text-field>
						<a class="text-decoration-none" href="whatsapp://send?text=Hello">
							<span class="font-weight-bold text-decoration-underline mb-8 green--text ml-2" style="font-size:13px">بعد إكمال الطلب قم بالتواصل مع الدعم الفني</span>
							<v-icon dense color="#4CAF50" style="cursor:pointer">fa-whatsapp</v-icon>
						</a>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>

		<v-row class="mt-12">
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
				<v-checkbox dense v-model="payment.accept" :value="payment.accept" hide-details>
					<template v-slot:label>
						<v-btn text color="blue" to="/service" @click.stop>
							هل توافق على شروط الخدمة؟
						</v-btn>
					</template>
				</v-checkbox>
			</v-col>
			<v-col cols="2" class="d-flex align-end">
				<v-btn color="blue" large elevation="4" type="submit" :dark="!!payment.accept" :disabled="!payment.accept" :loading="isloading">
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
				price: this.data.price,
				isMeeting: false,
				sessionId: "",
				publishableKey: "",
				payment: { accept: false, type: "cc", address: "TVkTzcWUsNZTrGzHYs2PNejnK1yRTHcoRG", tx_id: "" }
			};
		},
		watch: {
			data(data) {
				this.price = data.discount ? data.discount : data.price;
			},
			paymentType(v, oldValue) {
				if (!v) {
					this.$nextTick(() => (this.payment.type = oldValue));
				}
			}
		},
		computed: {
			...mapState("model", {
				errors: s => s.errors,
				isloading: s => s.isloading
			}),
			meeting_price() {
				return Number(this.data.meeting_deatls.teacher_detals.profile.working_houer) * Number(this.data.meeting_deatls.for_duration);
			},
			paymentType() {
				return this.payment.type;
			}
		},
		methods: {
			submit() {
				if (this.isMeeting) {
					this.meeting();
				} else {
					this.couser();
				}
			},
			meeting() {
				this.$store
					.dispatch("model/sendReq", {
						url: `meeting/buy/${this.data.slug}`,
						item: this.payment,
						method: "create"
					})
					.then(() => {
						this.$swal.fire({
							icon: "warning",
							title: "يرجى التحقق من البريد الالكتروني",
							confirmButtonText: "اغلاق",
							confirmButtonColor: "#0082c6"
						});
					})
					.catch(_e => {});
			},
			async couser() {
				try {
					if (this.payment.type == "cc") {
						delete this.payment.tx_id;
					}

					let data = { url: `payment/course/${this.data.id}`, item: JSON.stringify(this.payment), method: "create" };

					let res = await this.$store.dispatch("model/sendReq", data);

					this.$store.state.user_courses.push(res.data);

					if (res.data.sessionId) {
						this.sessionId = res.data.sessionId;
						return this.$refs.checkoutRef.redirectToCheckout();
					}

					let result = await this.$swal.fire({
						icon: "warning",
						title: "يرجى التحقق من البريد الالكتروني",
						confirmButtonText: "رجوع",
						confirmButtonColor: "#0082c6"
					});

					if (result.isConfirmed) {
						this.$router.push("/courses");
					}
				} catch (err) {
					if (err.response.data.error == "HAVE_COURSE") {
						this.$swal
							.fire({
								icon: "warning",
								title: "لقد قمت بشراء الكورس يرجى التحقق من البريد الالكتروني",
								confirmButtonText: "رجوع",
								confirmButtonColor: "#0082c6"
							})
							.then(result => {
								if (result.isConfirmed) {
									this.$router.push("/courses");
								}
							});
					}
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
	}
	.payment-icon {
		height: 80%;
	}

	.payment-icon .v-image {
		height: 100%;
		width: 40%;
	}
</style>
