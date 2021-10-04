import axios from "@/plugins/axios.js";

axios.defaults.baseURL = "https://web.sctest.live/user/";

export default {
	namespaced: true,
	state: {
		isloading: false,
		data: [],
		errors: [],
		current: {}
	},
	mutations: {
		setData(state, data) {
			state.data = data;
		},
		setCurrent(state, data) {
			state.current = data;
		}
	},
	actions: {
		async all({ commit, state }, data) {
			return await axios.get(data.url, { params: data.params }).then(resp => {
				commit("setData", resp.data);
				return resp;
			});
		},
		async get({ commit, state }, data) {
			return await axios.get(`${data.url}/${data.id}/`).then(resp => {
				commit("setCurrent", resp.data);
				return resp;
			});
		},
		async delete({ commit, state }, data) {
			return await axios.delete(`${data.url}/${data.id}/`);
		},
		async create({ commit, state }, data) {
			state.errors = [];
			return await axios.post(`${data.url}/`, data.item).catch(errors => {
				state.errors = errors.response.data;

				return Promise.reject(errors);
			});
		},
		async update({ commit, state }, data) {
			state.errors = [];
			return await axios.put(`${data.url}/${data.id}/`, data.item);
		},

		async sendReq({ state, dispatch }, data) {
			state.isloading = true;
			return await dispatch(`${data.method}`, {
				...data
			}).finally(() => (state.isloading = false));
		}
	}
};
