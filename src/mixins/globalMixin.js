export default {
	computed: {
		VIDEO_URL() {
			return process.env.VUE_APP_VIDEO_URL;
		},
		isLogin() {
			return this.$store.state.auth.isLogin;
		}
	},
	methods: {
		setLoading(value = false, fn = () => {}) {
			let v = typeof value === "boolean" ? value : false;

			if (typeof value === "function") {
				fn = value;
			}

			setTimeout(() => {
				this.$store.commit("setLoading", v);
				fn();
			}, 1200);
		}
	}
};
