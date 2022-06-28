<template>
<div>
	<v-form @submit.prevent="submit" ref="form">
		<h2 class="mt-sm-8">طريقة الدفع</h2>
		<p>إختر طريقة الدفع المناسبة لك من طرق الدفع المتوفرة أدناه:-</p>

		<v-item-group v-model="payment.type">
			<v-row>
				<v-col cols="12" sm="6" lg="4" xl="3">
					<v-item v-slot="{ active, toggle }" value="cc">
						<v-card outlined class="pa-6 payment-icon" :class="{ 'active-card': active }" @click="toggle">
							<v-img contain class="mx-auto" src="./../../assets/icons/master.png"></v-img>
						</v-card>
					</v-item>
				</v-col>
				<v-col cols="12" sm="6" lg="4" xl="3">
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
					<v-col cols="12" sm="8" lg="6" class="pa-4">
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
								hide-details
								disabled
								id="address"
								outlined
								background-color="grey lighten-4"
							></v-text-field>
						</h4>
						<v-col cols="12" sm="4" offset-sm="4" class="d-block d-sm-none">
							<v-img :src="require('../../assets/suport/qr.jpeg')"></v-img>
						</v-col>
						<p class="pt-3 px-2 ma-0">بعد التحويل برجاء كتابة Transaction ID</p>

						<v-text-field
							name="tx_id"
							:error-messages="errors.tx_id"
							label="Transaction ID"
							v-model="payment.tx_id"
							id="tx_id"
							outlined
							hint="Transaction ID ادخل رقم العملية"
						></v-text-field>
						<a class="text-decoration-none" :href="`whatsapp://send?text=Hello&phone=${$store.state.setting.phone_primary}`">
							<span class="font-weight-bold text-decoration-underline mb-8 green--text ml-2" style="font-size:13px">بعد إكمال الطلب قم بالتواصل مع الدعم الفني</span>
							<v-icon dense color="#4CAF50" style="cursor:pointer">fa-whatsapp</v-icon>
						</a>
					</v-col>
					<v-col cols="4" sm="4" lg="3" xl="2" offset-lg="2" offset-xl="1" class="mt-16 d-none d-sm-block pt-12 pt-md-0">
						<v-img :src="require('../../assets/suport/qr.jpeg')"></v-img>
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

			<v-col cols="12" sm="8" lg="6" xl="4">
				<v-checkbox dense v-model="payment.accept" :value="payment.accept" hide-details>
					<template v-slot:label>
						<v-btn text color="blue" to="/service" @click.stop>
							هل توافق على شروط الخدمة؟
						</v-btn>
					</template>
				</v-checkbox>
			</v-col>
			<v-col cols="12" sm="4" lg="6" xl="4" class="d-flex align-end">
				<v-btn color="blue" large elevation="4" type="submit" :dark="!!payment.accept" :disabled="!payment.accept" :loading="isloading">
					إكمال الطلب
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
	<form method="post" ref="paymentForm" :action="psData.actionTo" >
    <input type="hidden" name="Version" :value="psData.Version" />
    <input type="hidden" name="MerID" :value="psData.MerID" />
    <input type="hidden" name="AcqID" :value="psData.AcqID" />
    <input type="hidden" name="MerRespURL" :value="psData.MerRespURL" />
    <input type="hidden" name="PurchaseAmt" :value="psData.PurchaseAmt" />
    <input type="hidden" name="PurchaseCurrency" :value="psData.PurchaseCurrency" />
    <input type="hidden" name="PurchaseCurrencyExponent" :value="psData.PurchaseCurrencyExponent" />
    <input type="hidden" name="OrderID" :value="psData.OrderID" />
    <input type="hidden" name="CaptureFlag" :value="psData.CaptureFlag" />
    <input type="hidden" name="Signature" :value="psData.Signature" />
    <input type="hidden" name="SignatureMethod" :value="psData.SignatureMethod" />
	</form>
</div>

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
				payment: { accept: false, type: "cc", address: "TVkTzcWUsNZTrGzHYs2PNejnK1yRTHcoRG", tx_id: "" },
				psData: {
						Version: "1.0.0",
						actionTo: "https://e-commerce.bop.ps/EcomPayment/RedirectAuthLink",
						MerID: "456020456",
						AcqID: "000089",
						MerRespURL: "https://user.cyber-sky.org/payment-response",
						PurchaseAmt: "",
						PurchaseCurrency: "840",
						PurchaseCurrencyExponent: "2",
						OrderID: "",
						CaptureFlag: "M",
						Signature: "",
						SignatureMethod: "SHA1"
					}
			};
		},
		mounted() {
			if (this.$route.query.status == "success") {
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
			} else if (this.$route.query.status == "fail") {
					this.$swal
								.fire({
									icon: "error",
									title: "تم رفض العملية, الرجاء التحقق من البطاقة الخاصة بك",
									confirmButtonText: "رجوع",
									confirmButtonColor: "#f27474"
								})
								.then(result => {
									if (result.isConfirmed) {
										this.$router.push("/courses");
									}
								});
			}
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

					this.psData.PurchaseAmt = res.data.amount;
					this.psData.OrderID = res.data.orderId;
					this.psData.Signature = res.data.base64hash;

					this.$nextTick(() => this.$refs.paymentForm.submit());
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
