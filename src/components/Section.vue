<template>
	<div class="content pt-12 mt-12 ">
		<div style="position: relative;z-index: 1">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="css">
	.content {
		height: auto;
	}

	.content:after {
		content: " ";
		background-color: #0082c6;
		background-image: url("./../assets/banner_1.png");
		display: block;
		height: 561px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-size: cover;
		background-position: top center;
	}
</style>
