<template>
	<v-app-bar color="#fff0" style="z-index: 101;" flat absolute>
		<v-container :fluid="$store.state.auth.isLogin" class="mt-1">
			<v-layout row wrap>
				<v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" dark @blur="itemNav = !itemNav"> </v-app-bar-nav-icon>
				<v-spacer v-if="$vuetify.breakpoint.mdAndDown"></v-spacer>
				<router-link to="/" tag="a">
					<v-avatar tile width="150">
						<v-img contain src="./../../assets/logo-nav.png" alt="logo"></v-img>
					</v-avatar>
				</router-link>
				<v-spacer></v-spacer>

				<div v-if="$vuetify.breakpoint.lgAndUp">
					<v-btn text color="white" to="/courses" large>الدورات التدريبية</v-btn>
					<v-btn text color="white" to="/paths" large>المسارات التعليمية</v-btn>
					<v-btn text color="white" large to="/blog">المدونة</v-btn>
					<v-btn text color="white" large class="text-capitalize font-weight-medium" @click="showInDevDailog"> مختبرات افتراضية </v-btn>
				</div>

				<v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>

				<template v-if="!$store.state.auth.isLogin && $vuetify.breakpoint.mdAndUp">
					<v-btn @click="$store.commit(`setLoginDailog`, true)" color="white" large class="ml-3" style="color:#005FAB">
						تسجيل دخول
					</v-btn>

					<v-btn @click="$store.commit(`setRegisterDailog`, true)" outlined color="white" large>
						تسجيل الإشتراك
					</v-btn>
				</template>

				<template v-if="$store.state.auth.isLogin">
					<!-- <v-btn icon color="#fff" elevation=0  >
                        <v-icon >fa-shopping-basket</v-icon>
                    </v-btn> -->
					<v-btn icon :large="$vuetify.breakpoint.mdAndUp" color="#fff" elevation="0" class="mx-md-2" link to="/message">
						<v-icon color="#fff">fa-comments</v-icon>
					</v-btn>
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn
								dark
								color="#fff2"
								elevation="0"
								:large="$vuetify.breakpoint.mdAndUp"
								class="mx-2"
								v-on="on"
								:to="!$vuetify.breakpoint.smAndDown ? `/user/courses` : null"
							>
								<v-icon>fa-user</v-icon>
							</v-btn>
						</template>
						<v-list v-if="$vuetify.breakpoint.smAndDown">
							<v-list-item link to="/user/courses">
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold">
										{{ $store.state.auth.user.fullname }}
									</v-list-item-title>
									<v-list-item-subtitle class="font-weight-lightr">
										{{ $store.state.auth.user.email }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-list-item link>
								<v-list-item-content>
									<v-list-item-title @click="logout">
										تسجيل الخروج
										<v-icon style="transform: rotate(180deg);">fa-sign-out</v-icon>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-menu>

					<v-list-item-content class="account-user" v-if="$vuetify.breakpoint.mdAndUp">
						<v-list-item-title class="font-weight-bold">{{ $store.state.auth.user.fullname }}</v-list-item-title>
						<v-list-item-subtitle class="font-weight-lightr">Student Site Here</v-list-item-subtitle>
					</v-list-item-content>
					<v-btn @click="logout" dark color="#fff2" elevation="0" large v-if="$vuetify.breakpoint.mdAndUp">
						<v-icon color="#fff" style="transform: rotate(180deg);">fa-sign-out</v-icon>
					</v-btn>
				</template>
			</v-layout>

			<v-layout row wrap class="itemNav" v-if="$vuetify.breakpoint.mdAndDown & itemNav" v-click-outside="onClickOutside">
				<v-col cols="12">
					<v-list color="rgb(11 114 169 / 90%)" dark class="pa-0">
						<v-list-item color="#333" link to="/courses">
							<v-list-item-title>
								الدورات التدريبية
							</v-list-item-title>
						</v-list-item>

						<v-list-item color="#333" link to="/paths">
							<v-list-item-title>
								المسارات التعليمية
							</v-list-item-title>
						</v-list-item>
						<v-list-item color="#333" link to="/blog">
							<v-list-item-title>
								المدونة
							</v-list-item-title>
						</v-list-item>
						<v-list-item color="#333" link @click="showInDevDailog">
							<v-list-item-title>
								مختبرات افتراضية
							</v-list-item-title>
						</v-list-item>
						<v-list-item v-if="!$store.state.auth.isLogin">
							<v-btn @click="$store.commit(`setLoginDailog`, true)" color="white" large class="ml-3" style="color:#005FAB">
								تسجيل دخول
							</v-btn>

							<v-btn @click="$store.commit(`setRegisterDailog`, true)" outlined color="white" large>
								تسجيل الإشتراك
							</v-btn>
						</v-list-item>
					</v-list>
				</v-col>
			</v-layout>
		</v-container>
	</v-app-bar>
</template>

<script>
	export default {
		name: "CustomNavbar",
		components: {},
		data() {
			return {
				itemNav: false
			};
		},
		methods: {
			onClickOutside() {
				this.itemNav = false;
			},
			async logout() {
				await this.$store.dispatch("auth/logout");
				location.reload(true);
				this.$router.push("/");
			},
			showInDevDailog() {
				this.$swal.fire({
					icon: "warning",
					title: "هذه الميزة قيد التطوير",
					confirmButtonText: "اغلاق",
					confirmButtonColor: "#0082c6"
					// text: "Something went wrong!"
					// footer: '<a href="">Why do I have this issue?</a>'
				});
			}
		}
	};
</script>

<style>
	.account-user {
		flex: unset !important;
		padding: 0px 0px !important;
		display: inline !important;
		margin: 0px 0px 0px 25px !important;
		color: white !important;
	}
	.itemNav {
		position: absolute;
		right: 10px;
		width: 100%;
		color: white;
	}
</style>
