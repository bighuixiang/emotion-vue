<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<UserImage class="imgbg" :images="imgbg"></UserImage>
			<div class="bottom-btns">
				<div v-for="(btn,index) in btns" @click.stop="goToPage(btn,index)">
					<img :src="btn.imgurl" class="button-div-btnimg" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'

	export default {
		components: {
			UserImage
		},
		data() {
			return {
				title: '',
				userInfo: null,
				imgs: [],
				imgbg: {
					"url": "",
					"width": "100%",
					"height": "100",
					"borderRadius": "0",
					"bgcolor": "0",
				},
				btns: [{
						title: "泳装",
						isGo: true,
						isShow: true,
						url: "/space",
						imgurl: "/static/image/facelift/swimwear.png"
					},
					{
						title: "女仆装",
						isGo: true,
						isShow: true,
						url: "/facelift",
						imgurl: "/static/image/facelift/aprondress.png"
					},
					{
						title: "工作装",
						isGo: false,
						isShow: true,
						url: "/about",
						imgurl: "/static/image/facelift/workclothes.png"
					}
				]
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.title = self.userInfo != null ? self.userInfo.girlname : ''
			self.$nextTick(function() {
				setTimeout(()=>{
					self.setTitle(self.title)
				},50)
			})
			self.search()
		},
		methods: {
			search() {
				var self = this
				let data = self.getBasicData(self)
				data.id = self.userInfo != null ? self.userInfo.girlid : ''
				self.$http.post(self.API.cosplay, data).then(response => {
					if(response.data.code == 200) {
						self.imgs = response.data.content
						var currCosplay = window.localStorage.getItem('currCosplay')
						if(currCosplay != null) {
							response.data.content.forEach((item, index) => {
								if(item.name == currCosplay) {
									self.imgbg.url = item.img
								}
							})
						} else
							self.imgbg.url = response.data.content.length > 0 ? response.data.content[0].img : ''
					} else {
						$toast.show(response.data.msg, 1500)
					}
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			back() {
				$router.go(-1);
			},
			goToPage(item, index) {
				//跳转页面
				var self = this
				self.imgbg.url = self.imgs[index].img
				window.localStorage.setItem('currCosplay', self.imgs[index].name)
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
</style>
<style scoped>
	.imgbg {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
	}
	
	.bottom-btns {
		position: absolute;
		width: 90%;
		left: 5%;
		right: 0;
		bottom: 0.375rem;
		z-index: 2;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
	}
	
	.button-div-btnimg {
		width: 2.15rem;
		height: auto;
	}
</style>