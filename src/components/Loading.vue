<template>
	<div class="loading" v-if="isLoading">
		<div class="">
			<v-img src="../assets/footer.png" class="mb-10" contain height="75"></v-img>
			<div class="prog">
				<v-progress-linear color="blue accent-4" indeterminate rounded height="6"></v-progress-linear>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			isLoading() {
				return this.$store.state.isLoading;
			}
		}
	};
</script>

<style scoped lang="scss">
	.loading {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		z-index: 1059;
		&:before {
			z-index: -1;
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
		}
		.prog {
			width: 30%;
			margin: 0 auto;
		}
	}
</style>
