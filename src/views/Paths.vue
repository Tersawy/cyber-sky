<template>
	<div class="banner">
		<div class="v-image v-responsive theme--light" style="z-index: 1">
			<div class="v-responsive__content">
				<div class="v-sheet theme--light" style="background-color: rgba(255, 255, 255, 0);border-color: rgba(255, 255, 255, 0);">
					<div class="container grid-list-xs">
						<div class="row d-flex justify-start align-center mb-xl-16" style="height: 900px">
							<div class="text-center text-md-right col-md-7 col-12">
								<h1 class="text-sm-h3 text-h4 white--text">Cyber Sky</h1>
								<p class="mt-2 text-md-h4 text-h6 font-weight-thin white--text">
									المنصة التدريبية الأولى من نوعها في تقديم دورات في المجال السيبراني للطلاب الجدد , متوسطى المستوى أو أي شخص يريد تعلم الأمن السيبراني
								</p>
							</div>
						</div>
					</div>
					<img src="../assets/bk-services.0b94fb1f.png" class="bk-img-1" /><img src="../assets/paths.5327a64b.png" class="bk-img-2" />
				</div>
			</div>
		</div>

		<div class="fill-height" style="background-color: white;">
			<v-container>
				<v-layout row wrap class="justify-center" style="top: -220px;position: relative;z-index: 1;">
					<v-col cols="12" xl="10" md="12">
						<h1>المسارات التعليمية</h1>
					</v-col>
					<v-col cols="12">
						<v-row>
							<v-col cols="12" md="6" xl="4" class="mt-md-2" v-for="path in data" :key="path.id">
								<v-card rounded-lg hover :to="`/courses?path=${path.slug}`">
									<v-card-title>
										<v-icon class="font-size: 36px; color: rgb(216, 50, 50); caret-color: rgb(216, 50, 50);">
											fa-network-wired
										</v-icon>
									</v-card-title>
									<v-card-title>
										<span class="font-weight-bold black--text"> {{ path.name }} </span>
									</v-card-title>

									<v-card-text> {{ path.about }} </v-card-text>

									<v-card-actions>
										<v-btn color="blue" block text>
											<v-icon> fa-arrow-left </v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-col>
						</v-row>
					</v-col>
				</v-layout>
			</v-container>
		</div>
		<!-- <div  class="fill-height cards" style="background-color: white;">
      <div  class="container" style="top: -100px">
        <div
          
          class="layout justify-center align-center row wrap"
        >
          <div  class="col-md-12 col-xl-10 col-12">
            <div  class="row justify-center align-end">
              <div  class="col col-12">
                <h1  class="m-12 text-center text-md-right">
                  المسارات التعليمية
                </h1>
              </div>
              <div  class="col col-12">
                <div  class="row">
                  <div  class="col-md-6 col-12 mt-md-2">
                    <div
                      
                      class="
                        rounded-lg
                        v-card v-card--hover
                        v-sheet
                        theme--light
                      "
                    >
                      <div
                        
                        primary-title=""
                        class="v-card__title"
                      >
                        <i
                          
                          aria-hidden="true"
                          class="
                            v-icon
                            notranslate
                            fas
                            fa-network-wired
                            theme--light
                          "
                          style="
                            font-size: 36px;
                            color: rgb(216, 50, 50);
                            caret-color: rgb(216, 50, 50);
                          "
                        ></i>
                      </div>
                      <div  class="v-card__title">
                        <span
                          
                          class="font-weight-bold black--text"
                        >
                          أمن وحماية الشبكات
                        </span>
                      </div>
                      <div
                        
                        class="v-card__text"
                        style="font-size: 18px; line-height: 1.5"
                      >
                        تعلم جميع الأساليب والإجراءات التي سوف تمكنك من توفير
                        الحماية القصوى للمعلومات والبيانات في الشبكات
                      </div>
                      <div  class="v-card__actions">
                        <button
                          
                          type="button"
                          class="
                            elevation-0
                            v-btn v-btn--block v-btn--is-elevated v-btn--has-bg
                            theme--dark
                            v-size--large
                            blue
                            darken-3
                          "
                          style="
                            transform-origin: center top 0px;
                            display: none;
                          "
                        >
                          <span class="v-btn__content">
                            إستعرض المسار
                            <i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                v-icon--left
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span></button
                        ><button
                          
                          type="button"
                          class="
                            v-btn v-btn--block v-btn--text
                            theme--dark
                            v-size--default
                            blue--text
                          "
                          style="transform-origin: center top 0px"
                        >
                          <span class="v-btn__content"
                            ><i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div  class="col-md-6 col-12 mt-md-12">
                    <div
                      
                      class="
                        rounded-lg
                        v-card v-card--hover
                        v-sheet
                        theme--light
                      "
                    >
                      <div
                        
                        primary-title=""
                        class="v-card__title"
                      >
                        <i
                          
                          aria-hidden="true"
                          class="v-icon notranslate fa fa-database theme--light"
                          style="
                            font-size: 36px;
                            color: rgb(216, 50, 50);
                            caret-color: rgb(216, 50, 50);
                          "
                        ></i>
                      </div>
                      <div  class="v-card__title">
                        <span
                          
                          class="font-weight-bold black--text"
                        >
                          أمن وحماية قواعد البيانات
                        </span>
                      </div>
                      <div
                        
                        class="v-card__text"
                        style="font-size: 18px; line-height: 1.5"
                      >
                        تعلم جميع الأساليب والإجراءات التي سوف تمكنك من توفير
                        الحماية القصوى للمعلومات والبيانات في أنظمة قواعد
                        البيانات
                      </div>
                      <div  class="v-card__actions">
                        <button
                          
                          type="button"
                          class="
                            elevation-0
                            v-btn v-btn--block v-btn--is-elevated v-btn--has-bg
                            theme--dark
                            v-size--large
                            blue
                            darken-3
                          "
                          style="
                            transform-origin: center top 0px;
                            display: none;
                          "
                        >
                          <span class="v-btn__content">
                            إستعرض المسار
                            <i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                v-icon--left
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span></button
                        ><button
                          
                          type="button"
                          class="
                            v-btn v-btn--block v-btn--text
                            theme--dark
                            v-size--default
                            blue--text
                          "
                          style="transform-origin: center top 0px"
                        >
                          <span class="v-btn__content"
                            ><i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div  class="col-md-6 col-12 mt-md-2">
                    <div
                      
                      class="
                        rounded-lg
                        v-card v-card--hover
                        v-sheet
                        theme--light
                      "
                    >
                      <div
                        
                        primary-title=""
                        class="v-card__title"
                      >
                        <i
                          
                          aria-hidden="true"
                          class="v-icon notranslate fa fa-cog theme--light"
                          style="
                            font-size: 36px;
                            color: rgb(216, 50, 50);
                            caret-color: rgb(216, 50, 50);
                          "
                        ></i>
                      </div>
                      <div  class="v-card__title">
                        <span
                          
                          class="font-weight-bold black--text"
                        >
                          أمن وحماية أنظمة التشغيل
                        </span>
                      </div>
                      <div
                        
                        class="v-card__text"
                        style="font-size: 18px; line-height: 1.5"
                      >
                        تعلم جميع الأساليب والإجراءات التي سوف تمكنك من توفير
                        الحماية القصوى للمعلومات والبيانات في أنظمة التشغيل
                      </div>
                      <div  class="v-card__actions">
                        <button
                          
                          type="button"
                          class="
                            elevation-0
                            v-btn v-btn--block v-btn--is-elevated v-btn--has-bg
                            theme--dark
                            v-size--large
                            blue
                            darken-3
                          "
                          style="
                            transform-origin: center top 0px;
                            display: none;
                          "
                        >
                          <span class="v-btn__content">
                            إستعرض المسار
                            <i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                v-icon--left
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span></button
                        ><button
                          
                          type="button"
                          class="
                            v-btn v-btn--block v-btn--text
                            theme--dark
                            v-size--default
                            blue--text
                          "
                          style="transform-origin: center top 0px"
                        >
                          <span class="v-btn__content"
                            ><i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div  class="col-md-6 col-12 mt-md-12">
                    <div
                      
                      class="
                        rounded-lg
                        v-card v-card--hover
                        v-sheet
                        theme--light
                      "
                    >
                      <div
                        
                        primary-title=""
                        class="v-card__title"
                      >
                        <i
                          
                          aria-hidden="true"
                          class="v-icon notranslate fa fa-mobile theme--light"
                          style="
                            font-size: 36px;
                            color: rgb(216, 50, 50);
                            caret-color: rgb(216, 50, 50);
                          "
                        ></i>
                      </div>
                      <div  class="v-card__title">
                        <span
                          
                          class="font-weight-bold black--text"
                        >
                          أمن وحماية التطبيقات
                        </span>
                      </div>
                      <div
                        
                        class="v-card__text"
                        style="font-size: 18px; line-height: 1.5"
                      >
                        تعلم جميع الأساليب والإجراءات المتخذة لتحسين أمان
                        التطبيقات من الثغرات الأمنية في مراحل مختلفة من حياة
                        التطبيقات
                      </div>
                      <div  class="v-card__actions">
                        <button
                          
                          type="button"
                          class="
                            elevation-0
                            v-btn v-btn--block v-btn--is-elevated v-btn--has-bg
                            theme--dark
                            v-size--large
                            blue
                            darken-3
                          "
                          style="
                            transform-origin: center top 0px;
                            display: none;
                          "
                        >
                          <span class="v-btn__content">
                            إستعرض المسار
                            <i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                v-icon--left
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span></button
                        ><button
                          
                          type="button"
                          class="
                            v-btn v-btn--block v-btn--text
                            theme--dark
                            v-size--default
                            blue--text
                          "
                          style="transform-origin: center top 0px"
                        >
                          <span class="v-btn__content"
                            ><i
                              
                              aria-hidden="true"
                              class="
                                v-icon
                                notranslate
                                fa fa-arrow-left
                                theme--dark
                              "
                            ></i
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
		<div class="bk-img-0" style="z-index: 3"></div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	const SectionPage = () => import("@component/Section.vue");

	export default {
		components: {
			SectionPage
		},

		async mounted() {
			try {
				await this.$store.dispatch("model/sendReq", { url: "course/paths", method: "all" });
			} catch (err) {
				//
			} finally {
				this.setLoading();
			}
		},

		computed: mapState("model", {
			data: s => s.data.results
		})
	};
</script>

<style>
	.banner {
		background-color: #0082c6;
	}

	@media only screen and (min-width: 960px) {
		div.bk-img-0 {
			max-height: 64%;
		}
	}

	div.bk-img-0 {
		background-image: url(../assets/banner-home.47d17ed1.png);
		top: 0px;
		min-height: 30%;
		background-position: 0px 0px;
		height: 100%;
		left: 0px;
		width: 100%;
		position: absolute;
		background-size: contain;
		z-index: 3;
	}

	img.bk-img-1 {
		z-index: -2;
		bottom: 0px;
	}

	img.bk-img-2 {
		z-index: -2;
		bottom: -4rem;
	}

	img {
		position: absolute;
		width: 100%;
		border-style: none;
	}

	/* ./../assets/home_services.png */
</style>
