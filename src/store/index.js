import Vue from "vue";
import Vuex from "vuex";
import auth from "./models/auth";
import model from "./models/model";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		sections: [],
		setting: {},
		user_courses: []
	},
	mutations: {
		setSections(state, data) {
			state.sections = data;
		},
		setSetting(state, data) {
			state.setting = data;
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
