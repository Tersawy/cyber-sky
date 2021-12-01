import Vue from "vue";
import Vuex from "vuex";
import auth from "./models/auth";
import model from "./models/model";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		sections: [],
		setting: {},
		user_courses: [],
		registerDailog: false,
		loginDailog: false,
		forgetPasswordDailog: false,
		changePasswordDailog: false,
		isLoading: true
	},
	getters: {
		myCourses: state => {
			return state.user_courses.filter(c => !!c.status);
		}
	},
	mutations: {
		setSections(state, data) {
			state.sections = data;
		},
		setSetting(state, data) {
			state.setting = data;
		},
		setRegisterDailog(state, value) {
			state.registerDailog = value;
		},
		setLoginDailog(state, value) {
			state.loginDailog = value;
		},
		setForgetPasswordDailog(state, value) {
			state.forgetPasswordDailog = value;
		},
		setChangePasswordDailog(state, value) {
			state.changePasswordDailog = value;
		},
		setLoading(state, value) {
			state.isLoading = value;
			document.body.style.overflowY = value ? "hidden" : "auto";
			window.scrollTo(0, 0);
		}
	},
	actions: {
		isHaveCourse({ commit, state }, courseId) {
			return state.user_courses.filter(it => {
				console.log(it.course_detals.id == courseId);
				return state.user_courses.filter(it => it.id == 78).length;
			}).length;
		}
	},
	modules: {
		auth,
		model
	}
});
