<template>
	<v-dialog :value="value" @input="$emit('input', $event)" persistent :overlay="false" :max-width="width || '500px'" transition="dialog-transition">
		<v-card>
			<v-toolbar dense color="white" elevation="0">
				<v-btn text color="black" @click="$emit('input', false)"> X </v-btn>
			</v-toolbar>
			<v-card-title>
				<slot name="title"></slot>
			</v-card-title>
			<v-card-text>
				<slot></slot>
			</v-card-text>
		</v-card>

		<template slot="activator" slot-scope="slotData">
			<slot name="activator" v-bind="slotData"></slot>
		</template>
	</v-dialog>
</template>

<script>
	export default {
		props: ["value", "width"],
		created() {
			this.$emit("input", false);
		}
	};
</script>

<style></style>
