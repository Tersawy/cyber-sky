<template>
	<v-footer color="#fff" class="mx-0 pa-0">
		<v-img src="./../../assets/footer/footer_1.png">
			<v-container grid-list-xs>
				<v-sheet color="#fff0">
					<v-layout row wrap class="ma-4 text-center text-md-right">
						<v-col cols="12" md="4">
							<v-img contain class="mx-auto mb-8" width="50%" :src="logo_footer"></v-img>
							<p style="word-break: break-word;">
								{{ $store.state.setting.description }}
							</p>
						</v-col>
						<v-col cols="12" md="2">
							<h3 class="mx-auto mb-8">روابط تهمك</h3>
							<p>
								<v-btn class="footer-button" to="/paths" text block link>المسارات التعليمية</v-btn>
								<v-btn class="footer-button" href="https://blog.cyber-sky.org" target="blank" text block>المدونة</v-btn>
								<v-btn class="footer-button" to="/service" text block>الشروط و الأحكام</v-btn>
								<v-btn class="footer-button" to="/privacy" text block>سياسة الخصوصية</v-btn>
							</p>
						</v-col>
						<v-col cols="12" md="3" id="contact">
							<h3 class="mx-auto mb-8">لديك سؤال أو استفسار</h3>
							<p>
								<a class="text-decoration-none" :href="`mailto:${$store.state.setting.email}`">
									<span class="d-inline-block" style="width:35px">
										<v-icon class="mb-1">fa-envelope</v-icon>
									</span>
									<span class="d-inline-block" style="width:150px">
										{{ $store.state.setting.email }}
									</span>
								</a>
							</p>
							<p>
								<a class="text-decoration-none" :href="`whatsapp://send?text=Hello&phone=${$store.state.setting.phone_primary}`">
									<span class="d-inline-block" style="width:35px">
										<v-icon class="mb-1" color="green">fa-whatsapp</v-icon>
									</span>
									<span class="d-inline-block" style="width:150px">
										{{ $store.state.setting.phone_primary }}
									</span>
								</a>
							</p>
							<p>
								<a class="text-decoration-none" :href="`tel:${$store.state.setting.phone_second}`">
									<span class="d-inline-block" style="width:35px">
										<v-icon class="mb-1" color="blue">fa-phone</v-icon>
									</span>
									<span class="d-inline-block" style="width:150px">
										{{ $store.state.setting.phone_second }}
									</span>
								</a>
							</p>
						</v-col>
						<v-col cols="12" md="3" id="contact">
							<h3 class="mx-auto">تابعنا</h3>
							<v-layout row wrap justify-center>
								<v-col cols="4" class="followers mt-md-2 mt-xl-12">
									<v-btn
										elevation="0"
										fab
										:width="$vuetify.breakpoint.xlAndUp ? '100' : '80'"
										:height="$vuetify.breakpoint.xlAndUp ? '100' : '80'"
										color="blue darken-3 mt-md-6 mt-xl-8"
										dark
										href="https://www.facebook.com/cyberskyacademy"
										target="blank"
									>
										<v-icon x-large>fa-facebook</v-icon>
									</v-btn>
								</v-col>

								<v-col cols="4" class="followers mt-xl-12">
									<v-btn
										elevation="0"
										fab
										:width="$vuetify.breakpoint.xlAndUp ? '100' : '80'"
										:height="$vuetify.breakpoint.xlAndUp ? '100' : '80'"
										color="pink darken-2"
										dark
										href="https://www.instagram.com/cyberskyacademy/"
										target="blank"
									>
										<v-icon x-large>fa-instagram</v-icon>
									</v-btn>
								</v-col>
								<v-col cols="4" class="followers mt-md-2 mt-xl-16">
									<v-btn
										elevation="0"
										fab
										:width="$vuetify.breakpoint.xlAndUp ? '100' : '80'"
										:height="$vuetify.breakpoint.xlAndUp ? '100' : '80'"
										color="info"
										dark
										href="https://twitter.com/cyberskyacademy"
										target="blank"
									>
										<v-icon x-large>fa-twitter</v-icon>
									</v-btn>
								</v-col>
							</v-layout>
						</v-col>
					</v-layout>
				</v-sheet>
			</v-container>
			<v-layout class="justify-end align-end mx-md-16 text-center text-md-start">
				<v-col dir="ltr" cols="12" md="3" class="text-md-start " :class="{ 'white--text': $vuetify.breakpoint.mdAndUp }">
					<h1 class="text-h3">CyberSky, lnc.</h1>
					<h4 class="mb-6 text-h6 ">
						<v-icon class="mx-1" x-small :class="{ 'white--text': $vuetify.breakpoint.mdAndUp }">fa-pencil</v-icon>
						Copyright @2021
					</h4>
					<address class="text-h6">
						<v-icon class="mx-2" :class="{ 'white--text': $vuetify.breakpoint.mdAndUp }">fa-map-marker</v-icon>
						US . Delaware . Middletown
					</address>
				</v-col>
			</v-layout>
		</v-img>
	</v-footer>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data: () => ({
			logo_footer: require("./../../assets/footer.png")
		})
	};
</script>

<style>
	footer > .v-image:first-child > .v-image__image {
		background-color: #0082c6;
	}

	.footer-button .v-btn__content {
		justify-content: start;
	}
	#contact p {
		font-family: Gotham;
		direction: ltr;
		text-align: right;
		line-height: 1.5;
	}
	#followers {
		height: 76% !important;
		position: absolute;
		top: 24% !important;
		z-index: 0;
	}
	.followers > .theme--dark.v-btn.v-btn--has-bg {
		border: 3px solid #eee !important;
		border-color: #fff !important;
	}

	@media only screen and (max-width: 960px) {
		footer > .v-image:first-child > .v-image__image {
			background-color: white !important;
		}
	}
</style>
