import axios from "axios";

const instance = axios.create({
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},

	transformRequest: [
		function(data, headers) {
			// You may modify the headers object here
			headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;

			// Do not change data
			return data;
		}
	]
});

instance.interceptors.request.use(
	function(response) {
		// Do something before request is sent
		return response;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

export default instance;
