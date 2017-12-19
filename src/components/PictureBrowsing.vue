<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<div class="swiper-container">
				<div id="swiper-wrapper" class="swiper-wrapper">
					<div v-for="item in thumbnail" class="swiper-slide">
						<UserImage class="album-userimage" :images="item"></UserImage>
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import Swiper from 'swiper'

	export default {
		components: {
			UserImage
		},
		data() {
			return {
				title: '',
				thumbnail: [],
				userInfo: null,
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.title = self.userInfo != null ? self.userInfo.girlname : ''
			self.$nextTick(function() {
				setTimeout(() => {
					self.setTitle(self.title)
				}, 50)
			})
			self.search()
		},
		methods: {
			search() {
				var self = this
				let data = self.getBasicData(self)
				data.page = 1
				data.id = parseInt(self.$route.query.id)
				data.photoid = parseInt(self.$route.query.photoid)
				self.$http.post(self.API.thumbnaillist, data).then(response => {
					self.thumbnail = []
					if(response.data.code == 200) {
						response.data.content.forEach((item, index) => {
							var item = {
								"url": item.thumbnail,
								"width": "100%",
								"height": "100%",
								"borderRadius": "0"
							}
							self.thumbnail.push(item)
						})
						self.$nextTick(function() {
							var swiper = new Swiper('.swiper-container', {
								pagination: '.swiper-pagination',
								paginationClickable: true,
								observer: true,
								observeParents: true,
							});
						})
					} else {
						$toast.show(response.data.msg, 1500)
					}
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			back() {
				$router.go(-1);
			}
		},
	}
</script>
<style>
	.navbar {
		background-color: transparent;
	}
	
	.bar .button-bar>.button,
	.bar .buttons>.button {
		color: #ffffff;
	}
	
	.bar .title {
		color: #ffffff;
	}
	
	.navbar .navbar-container .bar.bar-header {
		box-shadow: none;
		-webkit-box-shadow: none;
	}
	
	.bar-header {
		border: none;
	}
	
	.swiper-pagination-bullet {
		background: url(../../static/image/picturebrowsing/lunboyuanxing.png) 50%/cover;
		opacity: 1;
		margin-right: 0.2rem;
	}
	
	.swiper-pagination-bullet-active {
		background: url(../../static/image/picturebrowsing/lunboyuanxing.png) 50%/cover;
		width: 0.46rem;
		border-radius: 20px;
		opacity: 1;
	}
</style>
<style scoped>
	.page-content {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow-x: hidden;
		overflow-y: auto;
		width: auto;
		height: auto;
		background-color: #f5f5f5;
		-webkit-overflow-scrolling: touch;
		/*padding-bottom: 1.3rem;*/
	}
	
	.page.has-navbar .page-content {
		padding: 0;
	}
	
	.swiper-pagination {
		bottom: 0.375rem;
	}
	
	.swiper-container {
		width: 100%;
		height: 100%;
		/*padding-left: 0.8rem;*/
		/*padding-right: 2.8rem;*/
	}
	
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		width: 100%;
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