<template>
	<SectionPage>
		<v-container class="">
			<v-layout row warp>
				<v-col cols="6">
					<h1 class="white--text">الرسائل</h1>
					<v-breadcrumbs dark :items="items" id="breadcrumb" class="mt-n4">
						<template v-slot:divider>
							<v-icon>fa-angle-double-left</v-icon>
						</template>
					</v-breadcrumbs>
				</v-col>
				<v-col cols="6" class="justify-end d-flex">
					<v-btn color="#3B86FF" dark elevation="1"> إنشاء رسالة جديدة +</v-btn>
				</v-col>
			</v-layout>

			<v-layout row wrap>
				<v-col cols="12">
					<v-btn-toggle v-model="tab" color="white">
						<v-btn :color="tab == 0 ? `#3B86FF` : `#eee`" :value="0" :outlined="tab == 0">
							رسائل الدعم الفني
						</v-btn>

						<v-btn :color="tab == 1 ? `#3B86FF` : `#eee`" :value="1" :outlined="tab == 1">
							رسائل المدربين
						</v-btn>

						<v-btn :color="tab == 2 ? `#3B86FF` : `#eee`" :value="2" :outlined="tab == 2">
							رسائل الإدارة
						</v-btn>
					</v-btn-toggle>
				</v-col>
				<v-col cols="12" class="mt-n3">
					<v-card>
						<v-layout row warp>
							<v-col cols="12" md="4">
								<v-list>
									<template v-for="i in 5">
										<v-list-item :key="i" link three-line @click="activeMessage = true">
											<v-list-item-avatar tile color="grey" size="40">
												<img src="./../../assets/avatar_teacher.png" alt="" />
											</v-list-item-avatar>
											<v-list-item-content>
												<v-list-item-title> Alaa Aqeel </v-list-item-title>
												<v-list-item-subtitle class="text-truncate">
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci animi magni exercitationem,
												</v-list-item-subtitle>
												<v-list-item-subtitle> منذ 3 دقايق </v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</template>
								</v-list>
							</v-col>
							<v-col cols="12" md="8" :class="{ 'order-first': $vuetify.breakpoint.smAndDown }">
								<v-card flat class="px-md-12 py-6" dir="auto" v-if="activeMessage">
									<v-card-title v-if="$vuetify.breakpoint.smAndDown" class="justify-end" @click="activeMessage = false">
										<v-btn icon><v-icon>fa-close</v-icon> </v-btn>
									</v-card-title>
									<v-card-text style="white-space: pre-wrap;"> {{ test_message }} </v-card-text>
								</v-card>
							</v-col>
						</v-layout>
					</v-card>
				</v-col>
			</v-layout>
		</v-container>
	</SectionPage>
</template>

<script>
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: {
			SectionPage
		},
		data() {
			return {
				tab: null,
				activeMessage: false,
				items: [
					{
						text: "الرئيسية",
						href: "breadcrumbs_dashboard"
					},
					{
						text: " الرسائل الواردة",
						href: "breadcrumbs_link_1"
					}
				],
				test_message: `
Hi David,

Iste minus et. Non necessitatibus ut est est id amet. Officiis sequi dolorum assumenda ipsam magnam cum possimus. Laudantium nulla amet tempore excepturi id expedita dolorum quisquam deserunt. Odit vel sint dolor eos. Ea blanditiis animi. Quibusdam unde unde. Perspiciatis vel pariatur qui. Deleniti omnis est quae. Laboriosam numquam amet aliquid.

Iste minus et. Non necessitatibus ut est est id amet. Officiis sequi dolorum assumenda ipsam magnam cum possimus. Laudantium nulla amet tempore excepturi id expedita dolorum quisquam deserunt. Odit vel sint dolor eos. Ea blanditiis animi. Quibusdam unde unde. Perspiciatis vel pariatur qui. Deleniti omnis est quae. Laboriosam numquam amet aliquid.Iste minus et. Non necessitatibus ut est est id amet. Officiis sequi dolorum 

Iste minus et. Non necessitatibus ut est est id amet. Officiis sequi dolorum assumenda ipsam magnam cum possimus. Laudantium nulla amet tempore excepturi id expedita dolorum
            `
			};
		},

		mounted() {
			this.setLoading();
		}
	};
</script>

<style>
	#breadcrumb a.v-breadcrumbs__item {
		color: white;
	}
</style>
