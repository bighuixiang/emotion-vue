<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="userimg" @click="goPersonalCenter">
			<div class="gold">
				<span>{{gold}}</span>
			</div>
			<UserImage class="userimg-img" :images="userImage"></UserImage>
		</div>
		<OpenVIP :isShow="false"></OpenVIP>
		<Recharge :isShow="false"></Recharge>
		<DailyPrizes :isShow="false"></DailyPrizes>
		<Prompt :isShow="false"></Prompt>
		<VideoPlayer ref="videoplayer" :videos="videos"></VideoPlayer>
		<div class="page page-content text-center">
			<UserImage class="imgbg" :images="imgbg"></UserImage>
			<div class="bottom-btns">
				<div v-for="(btn,index) in btns" v-show="btn.isShow" class="buttons-div" :class="{'button-div-cur':btn.isShowAni}" @click.stop="goToPage(btn,index)">
					<article v-if="index==3">
						<div>
							<img :src="btn.imgurl" class="button-div-btnimg" />
						</div>
						<div>
							<img v-for="(subBtn,subIndex) in btn.subBtns" class="button-div-subbtnimg" :src="subBtn.imgurl" @click.stop="subBtnClick(subBtn)" />
						</div>
						<div></div>
					</article>
					<img v-else :src="btn.imgurl" class="button-div-btnimg" />
				</div>
			</div>

			<div v-for="p in playarea" @click="playVideo(p)" :style="{'left':p.coords[0]+'px','bottom':p.coords[1]+'px','width':p.coords[2]+'px','height':p.coords[3]+'px'}" class="playarea">
				
			</div>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import OpenVIP from './common/OpenVIP'
	import Recharge from './common/Recharge'
	import DailyPrizes from './common/DailyPrizes'
	import Prompt from './common/Prompt'
	import VideoPlayer from './common/VideoPlayer'

	export default {
		components: {
			UserImage,
			OpenVIP,
			Recharge,
			DailyPrizes,
			Prompt,
			VideoPlayer
		},
		data() {
			return {
				title: '',
				gold: 0,
				playarea: [],
				videos: {
					url: "",
					show: false
				},
				userImage: {
					"url": "",
					"border": "1px solid #ffffff",
					"width": "27px",
					"height": "27px",
					"borderRadius": "50%"
				},
				imgbg: {
					"url": "",
					"width": "100%",
					"height": "100",
					"borderRadius": "0"
				},
				btns: [{
						title: "空间",
						isGo: true,
						isShow: true,
						url: "/space",
						imgurl: "/static/image/index/space.png"
					},
					{
						title: "换装",
						isGo: true,
						isShow: true,
						url: "/facelift",
						imgurl: "/static/image/index/facelift.png"
					},
					{
						title: "游戏",
						isGo: false,
						isShow: true,
						url: "/about",
						imgurl: "/static/image/index/game.png"
					},
					{
						title: "游戏",
						isGo: false,
						isShow: false,
						isShowAni: false,
						url: "/about",
						imgurl: "/static/image/index/gamecur.png",
						subBtns: [{
							title: "猜拳",
							isGo: true,
							url: "/guessgame",
							imgurl: "/static/image/index/guessing.png"
						}, {
							title: "硬币",
							isGo: true,
							url: "/tossacoingame",
							imgurl: "/static/image/index/coin.png"
						}, {
							title: "骰子",
							isGo: true,
							url: "/dicegame",
							imgurl: "/static/image/index/dice.png"
						}]
					},
					{
						title: "聊天",
						isGo: true,
						isShow: true,
						url: "/chat",
						imgurl: "/static/image/index/chat.png"
					}
				],
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
				var wd = document.documentElement.clientWidth || document.body.clientWidth;
				var hg = document.documentElement.clientHeight || document.body.clientHeight;
				var wdbl = wd / 320;
				var hgbl = hg / 568;
				self.playarea = []
				self.$http.post(self.API.home, data).then(response => {
					if(response.data.code == 200) {
						self.userImage.url = response.data.content.headurl
						self.gold = response.data.content.amount
						self.title = response.data.content.girlname
						self.imgbg.url = response.data.content.mainimg
						response.data.content.playarea.forEach((item, index) => {
							var coords = []
							item.coords.split(',').forEach((subitem, i) => {
								switch(i) {
									case 0:
									case 2:
										coords.push(subitem * wdbl);
										break;
									case 1:
									case 3:
										coords.push(subitem * hgbl);
										break;
									default:
										break;
								}
							})
							item.coords = coords
						})
						self.playarea = response.data.content.playarea
						self.vip = response.data.content.vip
						window.localStorage.setItem("userInfo", JSON.stringify({
							userImage: self.userImage.url,
							mainimg: response.data.content.mainimg,
							girlname: response.data.content.girlname,
							girlheadurl: response.data.content.girlheadurl,
							girlid: response.data.content.girlid,
							gold: self.gold,
							vip: self.vip
						}))
						self.$nextTick(function() {
							setTimeout(() => {
								self.setTitle(self.title)
							}, 50)
						})
					} else {
						$toast.show(response.data.msg, 1500)
					}
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			playVideo(item) {
				var self = this
				//播放视频
				self.videos.url = item.video
				self.videos.show = true
				self.$nextTick(function() {
					self.$refs.videoplayer.init();
					//				self.$refs.videoplayer.play();
				})
			},
			goPersonalCenter() {
				var self = this
				$router.forward({
					path: "personalcenter",
					query: self.getBasicData(self),
				})
			},
			back() {
				$router.go(-1);
			},
			goToPage(item, index) {
				//跳转页面
				var self = this
				if(index == 2) {
					item.isShow = false
					self.btns[3].isShow = true
					setTimeout(() => {
						self.btns[3].isShowAni = true;
					}, 5)
					return false;
				} else if(index == 3) {
					item.isShowAni = false
					item.isShow = false
					self.btns[2].isShow = true
					return false;
				}

				if(item.isGo) {
					$router.forward({
						path: item.url,
						query: self.getBasicData(self)
					})
				}
			},
			subBtnClick(item) {
				var self = this
				if(item.isGo) {
					$router.forward({
						path: item.url,
						query: self.getBasicData(self)
					})
				}
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
	.playarea {
		position: absolute;
		z-index: 3;
		/*border: 2px solid #FF5155;*/
	}
	
	.has-navbar {
		background-color: #000000;
	}
	
	.button-div-btnimg {
		width: 2.15rem;
		height: auto;
	}
	
	.gold {
		background-color: rgba(255, 255, 255, 0.2);
		border: 1px solid #FFFFFF;
		border-radius: 50px;
		display: block;
		height: 27px;
		line-height: 25px;
		overflow: hidden;
		padding: 0 12px;
		float: left;
		margin-right: 6px;
		margin-top: 8px;
	}
	
	.gold span {
		background: url(../../static/image/index/gold.png) no-repeat center left;
		background-size: 16px;
		font-size: 12px;
		color: #FFFFFF;
		padding-left: 20px;
		display: block;
	}
	
	.userimg {
		height: 43px;
		line-height: 43px;
		position: fixed;
		top: 0;
		right: 12px;
		z-index: 99;
		overflow: auto;
	}
	
	.userimg .userimg-img {
		display: block;
		margin-top: 8px;
		float: left;
	}
	
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
		z-index: 8;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
	}
	
	.button-div-cur {
		position: relative;
	}
	
	.button-div-cur div:first-child {
		position: relative;
		top: 0;
		left: 0;
		z-index: 2;
	}
	
	.button-div-cur article div .button-div-subbtnimg,
	.buttons-div article div .button-div-subbtnimg {
		position: absolute;
		height: 1.4rem;
		width: 1.4rem;
		left: 0;
		top: 0;
		display: block;
		color: #FFFFFF;
		transition: transform 0.5s;
		-webkit-transition: -webkit-transform 0.5s;
		visibility: hidden;
	}
	
	.button-div-cur article div .button-div-subbtnimg:nth-child(1) {
		left: -0.8rem;
		margin-left: 0;
		transform: translate3d(0, -1.2rem, 0);
		-webkit-transform: translate3d(0, -1.2rem, 0);
		visibility: visible;
	}
	
	.button-div-cur article div .button-div-subbtnimg:nth-child(2) {
		transform: translate3d(0, -2rem, 0);
		-webkit-transform: translate3d(0, -2rem, 0);
		left: 50%;
		margin-left: -0.7rem;
		visibility: visible;
	}
	
	.button-div-cur article div .button-div-subbtnimg:nth-child(3) {
		transform: translate3d(0, -1.2rem, 0);
		-webkit-transform: translate3d(0, -1.2rem, 0);
		right: -0.8rem;
		margin-left: 0;
		left: auto;
		visibility: visible;
	}
</style>