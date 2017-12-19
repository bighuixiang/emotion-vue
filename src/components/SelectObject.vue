<template>
	<div>
		<von-header theme="light">
			<button @click="back" class="button button-icon ion-ios-arrow-back" slot="left"></button>
			<span slot="title">{{title}}</span>
		</von-header>
		<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back,hideNavbar:true}">
			<div class="page-content text-center">
				<div class="swiper-container" style="margin-top: 1rem;">
					<div id="swiper-wrapper" class="swiper-wrapper">
						<div v-for="item in objectList" class="swiper-slide">
							<div class="album-div" @click="goPictureBrowsing(item)">
								<UserImage class="album-userimage" :images="item.userImage"></UserImage>
								<img @click="choice(item.id)" v-if="item.ischoice==0" class="xihuandianji" src="../../static/image/selectobject/xihuanmoren.png" />
								<img v-if="item.ischoice==1" class="xihuandianji" src="../../static/image/selectobject/xihuandianji.png" />
								<ul class="album-userinfo">
									<li>
										<div>
											<span>姓名</span>
											<em>{{item.name}}</em>
										</div>
									</li>
									<li>
										<div>
											<span>身高</span>
											<em>{{item.height}}CM</em>
										</div>
									</li>
									<li>
										<div>
											<span>年龄</span>
											<em>{{item.age}}岁</em>
										</div>
									</li>
									<li>
										<div>
											<span>性格</span>
											<em>
												<i v-for="i in item.nature">
													{{i.name}}
												</i>
											</em>
										</div>
									</li>
									<li>
										<div>
											<span>体重</span>
											<em>{{item.weight}}KG</em>
										</div>
									</li>
									<li>
										<div>
											<span>胸围</span>
											<em>{{item.bust}}</em>
										</div>
									</li>
									<li>
										<div>
											<span>职业</span>
											<em>{{item.job}}</em>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<img @click="contact" src="../../static/image/selectobject/mashangjiaow.png" class="contact-immediately" />
			</div>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import Swiper from 'swiper'

	export default {
		components: {
			UserImage,
		},
		data() {
			return {
				title: '对象选择',
				objectList: [],
				selectIndex: 0,
			}
		},
		mounted() {
			let self = this
			self.search()
		},
		methods: {
			search() {
				var self = this
				let data = self.getBasicData(self)
				data.type = 0
				self.$http.post(self.API.choicelist, data).then(response => {
						if(response.data.code == 200) {
							self.objectList = response.data.content
							self.objectList.forEach((item, index) => {
								item.userImage = {
									"url": item.thumbnail,
									"width": "7.8rem",
									"height": "12rem",
									"borderRadius": "12px",
								}
							})
							self.$nextTick(function() {
								let swiper = new Swiper('.swiper-container', {
									pagination: '.swiper-pagination',
									effect: 'coverflow',
									grabCursor: true,
									centeredSlides: true,
									slidesPerView: 'auto',
									loop: false,
									observer: true,
									observeParents: true,
									coverflow: {
										rotate: 50,
										stretch: 100,
										depth: 400,
										modifier: 1,
										slideShadows: false
									},
									onTransitionStart: function(swiper) {
										self.selectIndex = swiper.activeIndex
									}
								})
							})
						} else {
							$toast.show(response.data.msg, 1500)
						}
					},
					response => {
						$toast.show('网络错误', 1500)
					})
			},
			contact() {
				let self = this
				var id = self.objectList[self.selectIndex].id
				self.choice(id)
			},
			choice(id) {
				let self = this
				let data = self.getBasicData(self)
				data.id = id
				self.$http.post(self.API.choice, data).then(response => {
					if(response.data.code == 200) {
						self.search()
					} else {
						$toast.show(response.data.msg, 1500)
					}
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			goPictureBrowsing(item) {
				var self = this
				let query = self.getBasicData(self)
				query.photoid = item.photoid
				query.id = item.id
				$router.forward({
					path: "/picturebrowsing",
					query
				})
			},
			back() {
				$router.go(-1);
			}
		},
	}
</script>

<style scoped>
	.page.has-navbar .page-content {
		padding: 0.375rem;
		padding-top: 44px;
	}
	
	.xihuandianji {
		position: absolute;
		z-index: 88;
		top: 0.375rem;
		right: 0.375rem;
		width: 1.4rem;
		height: auto;
		display: block;
	}
	
	.album-userinfo {
		position: absolute;
		bottom: 0.375rem;
		z-index: 88;
		left: 0;
		right: 0;
		text-align: left;
	}
	
	.album-userinfo li {
		width: 50%;
		float: left;
	}
	
	.album-userinfo li div {
		transform: scale(0.75, 0.75);
		-webkit-transform: scale(0.75, 0.75);
		white-space: nowrap;
	}
	
	.album-userinfo li div em {
		margin-left: 3px;
		opacity: 0.6;
	}
	
	.album-userimage {
		border-bottom-right-radius: 16px !important;
	}
	
	.contact-immediately {
		width: 4.5rem;
		position: fixed;
		left: 50%;
		bottom: 0.25rem;
		margin-left: -2.025rem;
	}
	
	.album-div {
		position: relative;
		overflow: hidden;
		border-radius: 12px;
	}
	
	.album-div:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: -4px;
		background: url(../../static/image/selectobject/baijianbian.png) 50%/cover;
		/*border-radius: 5px;*/
		z-index: 1;
	}
	
	.album-div .album-div-gold {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		color: #FFFFFF;
		text-align: center;
		transform: scale(0.8, 0.8);
		-webkit-transform: scale(0.8, 0.8);
		z-index: 8;
	}
	/*.album-div p {
		background: url(../../static/image/space/zhuyejinbi.png) no-repeat center left;
		font-size: 0.375rem;
		background-size: 0.375rem;
		padding-left: 0.42rem;
		margin-bottom: 6px;
		display: inline;
	}*/
	
	.swiper-container {
		width: 100%;
		height: 12rem;
		/*padding-left: 0.8rem;*/
		/*padding-right: 2.8rem;*/
	}
	
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		flex-direction: column;
	}
</style>