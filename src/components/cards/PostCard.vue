<template>
	<v-hover>
		<template v-slot:default="{ hover }">
			<v-card :elevation="hover && !full ? 10 : 1" :href="data.link" target="blank">
				<v-card class="pa-1" flat>
					<v-img :src="data.image" :lazy-src="require('../../assets/logo end.jpg')" :height="full ? '600' : '177'" width="100%"></v-img>
				</v-card>

				<v-btn dark color="red" elevation="0" class="mx-2 mt-2">
					{{ data.category }}
				</v-btn>
				<v-card-title style="font-size:18px" v-if="!id"> {{ data.title }} </v-card-title>
				<v-card-text v-if="full" v-html="data.description"></v-card-text>
				<v-divider class="mx-4"></v-divider>
				<v-list-item>
					<v-list-item-icon>
						<v-icon color="#23618B">fa-globe</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title v-if="data.teacher">{{ data.teacher }}</v-list-item-title>
						<v-list-item-title v-else> الادارة </v-list-item-title>
						<v-list-item-subtitle class="text-body-2">{{ moment(data.date).fromNow() }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-card>
		</template>
	</v-hover>
</template>

<script>
	export default {
		props: {
			id: Number | String,
			full: Number,
			data: Object
		}
	};
</script>

<style lang="scss">
	.v-card__text {
		img {
			width: 100%;
		}
	}
</style>
