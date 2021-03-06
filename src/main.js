import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from "moment";
import GAuth from "vue-google-oauth2";
import VueSweetalert2 from "vue-sweetalert2";
import globalMixin from "@/mixins/globalMixin.js";
import "@/assets/scss/main.scss";

import "sweetalert2/dist/sweetalert2.min.css";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

moment.locale("en", {
	isPM: function(input) {
		return (input + "").toLowerCase()[0] === "p";
	}
});
Vue.prototype.moment = moment;

Vue.mixin(globalMixin);

const gauthOption = {
	clientId: "170212797865-c56iccpqnbf14sph4eb8gi2a3hml849f.apps.googleusercontent.com",
	scope: "profile email",
	prompt: "select_account"
};

Vue.use(GAuth, gauthOption);

router.beforeEach((to, from, next) => {
	store.commit("setLoading", true);
	store.commit("auth/initToken"); // Load Token From storage
	if (!store.state.sections.length) {
		store
			.dispatch("model/_all", {
				url: "course/section"
			})
			.then(resp => {
				store.commit("setSections", resp.data.results);
			});
		store
			.dispatch("model/_all", {
				url: "user/setting"
			})
			.then(resp => {
				store.commit("setSetting", resp.data);
			});
	}
	if (to.meta.auth || store.state.auth.token) {
		// load Currnet User
		if (store.state.auth.token) {
			if (store.state.auth.user.id) {
				next();
			} else {
				store
					.dispatch("auth/user")
					.then(data => {
						store
							.dispatch("model/_all", {
								url: "user/courses"
							})
							.then(data => (store.state.user_courses = data.data));
						next();
					})
					.catch(() => {
						store.dispatch("auth/logout");
						if (to.meta.auth || from.meta.auth) {
							next("/");
						}
					});
			}
		} else {
			store.dispatch("auth/logout");
			if (to.meta.auth) {
				next({ name: from.name });
			}
		}
	} else {
		next();
	}
});

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount("#app");
