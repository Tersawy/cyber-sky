import axios from "axios";

axios.defaults.baseURL = "https://3b13c294758ac0ddce1a755cccdcbfd1.cyber-sky.org/";

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
		},
		setErrors(state, errors) {
			state.errors = errors;
		}
	},
	actions: {
		verify({ commit }, token) {
			return axios.get(`verify/?token=${token}`);
		},
		logout({ commit, state }) {
			commit("destroyToken");
			state.isLogin = false;
			state.user = {};
		},
		social({ commit, state }, data) {
			state.errors = {};

			delete axios.defaults.headers.Authorization;

			return axios.post(`social/${data.type}/`, data).then(({ data }) => {
				// state.isLogin = true
				commit("initToken", data.tokens.access);
				return data;
			});
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
					// state.isLogin = true
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
		},

		async resetPasswordByEmail({ state }, payload) {
			state.errors = {};

			try {
				//
				let { data } = await axios.post("request-reset-email/", payload);

				return Promise.resolve(data);
				//
			} catch ({ response: { data: errors } }) {
				//
				state.errors = errors;

				return Promise.reject(errors);
			}
		},

		async verifyToken({ state }, { uid, token }) {
			state.errors = {};

			try {
				//
				let { data } = await axios.get(`password-reset/${uid}/${token}`);

				return Promise.resolve(data);
				//
			} catch ({ response: { data: errors } }) {
				//
				state.errors = errors;

				return Promise.reject(errors);
			}
		},

		async changePassword({ state }, payload) {
			state.errors = {};

			try {
				//
				let { data } = await axios.patch(`password-reset-complete/`, payload);

				return Promise.resolve(data);
				//
			} catch ({ response: { data: errors } }) {
				//
				state.errors = errors;

				return Promise.reject(errors);
			}
		}
	}
};
