import axios from "axios";

axios.defaults.baseURL = "https://web.sctest.live/auth/";

export default {
	namespaced: true,
	state: {
		isLogin: false,
		user: {},
		errors: {},
		token: null
	},
	mutations: {
		initToken(state, token = null) {
			state.token = token ? token : localStorage.getItem("access_token");
			if (state.token) {
				localStorage.setItem("access_token", state.token);
			}
		},
		destroyToken(state) {
			state.token = null;
			localStorage.removeItem("access_token");
		}
	},
	actions: {
		logout({ commit, state }) {
			commit("destroyToken");
			state.isLogin = false;
			state.user = {};
		},
		update({ commit, state }, data) {
			return axios
				.put(`user/`, data, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						"Content-Type": "application/json"
					}
				})
				.then(({ data }) => {
					state.user = data;
					return data;
				});
		},
		user({ commit, state }) {
			return axios
				.get(`user/`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						"Content-Type": "application/json"
					}
				})
				.then(({ data }) => {
					state.isLogin = true;
					state.user = data;
					return data;
				})
				.catch(errors => {
					state.isLogin = false;
					commit("destroyToken");
					return Promise.reject(errors);
				});
		},
		login({ commit, state }, data) {
			state.errors = {};
			return axios
				.post(`login/`, data)
				.then(({ data }) => {
					state.isLogin = true;
					commit("initToken", data.access);
					return data;
				})
				.catch(errors => {
					state.errors = errors.response.data;
					return Promise.reject(errors);
				});
		},

		register({ commit, state }, data) {
			state.errors = {};
			return axios
				.post(`register/`, data)
				.then(({ data }) => {
					// commit("initToken", data.access)
					return data;
				})
				.catch(errors => {
					state.errors = errors.response.data;
					return Promise.reject(errors);
				});
		}
	}
};
