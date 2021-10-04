export default {
	computed: {
		VIDEO_URL() {
			return process.env.VUE_APP_VIDEO_URL;
		},
		isLogin() {
			return this.$store.state.auth.isLogin;
		}
	}
};
