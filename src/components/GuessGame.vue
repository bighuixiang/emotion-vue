<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<UserImage class="imgbg" :images="imgbg"></UserImage>
			<div class="interaction">
				<div class="interaction-userimg">
					<UserImage class="userimg-img" :images="userImage"></UserImage>
				</div>
				<p class="interaction-title" @click="doubleClick" :class="{'interaction-title-cur':isCheck}">双倍下注(VIP)</p>
				<div class="interaction-btn">
					<img src="../../static/image/common/quantou.png" @click="guess(1)" />
					<img src="../../static/image/common/jiandao.png" @click="guess(2)" />
					<img src="../../static/image/common/bu.png" @click="guess(3)" />
				</div>
			</div>
			<OpenVIP :isShow="isShowOpenVIP" @onClose="onClose"></OpenVIP>
			<VideoPlayer ref="videoplayer" @onEnded="onEnded" :videos="videos"></VideoPlayer>
			<Recharge :isShow="recharge" @onClose="onClose"></Recharge>
			<Prompt :isShow="prompt"  @onClose="onClose" @openVip="isShowOpenVIP=true"></Prompt>
			<div v-show="isShowText" class="showText">
				<div>
					<span>
						{{showText}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import OpenVIP from './common/OpenVIP'
	import Recharge from './common/Recharge'
	import Prompt from './common/Prompt'
	import VideoPlayer from './common/VideoPlayer'
	export default {
		components: {
			UserImage,
			OpenVIP,
			Recharge,
			Prompt,
			VideoPlayer
		},
		data() {
			return {
				title: '',
				showText: '',
				isShowText: false,
				isCheck: false,
				isShowOpenVIP: false,
				prompt : false,
				recharge: false,
				userInfo: null,
				curDiceNum: 1,
				curGameStatus: {},
				videos: {
					url: "",
					show: false
				},
				imgbg: {
					"url": "",
					"width": "100%",
					"height": "100",
					"borderRadius": "0"
				},
				userImage: {
					"url": "",
					"width": "1.8rem",
					"height": "1.8rem",
					"borderRadius": "50%",
				}
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.title = self.userInfo != null ? self.userInfo.girlname : ''
			self.imgbg.url = self.userInfo.mainimg
			self.userImage.url = self.userInfo.userImage
			//			self.search()
			self.$nextTick(function() {
				setTimeout(() => {
					self.setTitle(self.title)
				}, 50)
			})
		},
		methods: {
			guess(num) {
				let self = this
				self.curDiceNum = num;
				let data = self.getBasicData(self)
				data.points = num
				data.double = self.isCheck ? 1 : 0
				self.$http.post(self.API.rock, data).then(response => {
					if(response.data.code == 200) {
						self.curGameStatus = response.data.content
						//播放视频
						self.videos.url = response.data.content.video
						self.videos.show = true
						self.$nextTick(function() {
							self.$refs.videoplayer.init();
							//				self.$refs.videoplayer.play();
						})
					}else if(response.data.code == 601){
						self.prompt = true
					} else if(response.data.code == 602) {
						self.recharge = true
					} else {
						$toast.show(response.data.msg, 1500)
					}
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			onEnded() {
				let self = this
				//视频播放完了！！！
				if(self.curGameStatus.result == 1) {
					//您赢了
					self.showMsg('恭喜！您赢得了' + self.curGameStatus.amount + '金币')
				} else if(self.curGameStatus.result == 2) {
					//输了
					self.showMsg('您输了' + self.curGameStatus.amount + '金币哦！哎哟，别灰心嘛！')
				} else {
					//平局
					self.showMsg('您真厉害啊，居然能跟我打成平手，继续加油哦！')
				}
			},
			showMsg(text) {
				let self = this
				self.showText = text
				self.isShowText = true
				self.$nextTick(function() {
					setTimeout(() => {
						self.isShowText = false
						self.showText = ''
					}, 3000)
				})
			},
			doubleClick() {
				var self = this
				if(self.userInfo.vip == 1) {
					self.isCheck = !self.isCheck;
				} else {
					self.isShowOpenVIP = true;
				}
			},
			onClose() {
				this.isShowOpenVIP = false;
				this.recharge = false
				this.prompt = false
			},
			back() {
				$router.go(-1)
			},
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
	.showText {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 888;
	}
	
	.showText div {
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
	
	.showText div span {
		background-color: rgba(0, 0, 0, 0.8);
		padding: 0.375rem;
		color: #FFFFFF;
		overflow: hidden;
		border-radius: 5px;
	}
	
	.startGame {
		height: 1.58rem;
		margin-top: 0.375rem;
		width: auto;
	}
	
	.interaction {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 8;
		background-color: rgba(255, 255, 255, 0.9);
		width: 8rem;
		margin-left: -4rem;
		margin-top: -2.34rem;
		/*height: 4.86rem;*/
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .15);
		padding-bottom: 0.375rem;
	}
	
	.interaction .interaction-title {
		font-size: 0.375rem;
		background: url(../../static/image/common/xiazhuxuanxiang.png) no-repeat center left;
		background-size: 0.38rem;
		display: table;
		padding-left: 0.458rem;
		margin: 1.286rem auto 0.575rem;
	}
	
	.interaction .interaction-title-cur {
		background: url(../../static/image/common/xiazhuxuanzhong.png) no-repeat center left;
		background-size: 0.38rem;
	}
	
	.interaction .interaction-btn {
		margin: auto;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-content: center;
		width: 8rem;
		height: 2rem;
	}
	
	.interaction .interaction-btn img {
		width: 2rem;
		height: 2rem;
		display: block;
	}
	
	.interaction .interaction-userimg {
		position: absolute;
		left: 50%;
		margin-top: -1.05rem;
		margin-left: -1.05rem;
		padding: 0.15rem;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
	}
	
	.imgbg {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: url(/static/meinv.jpg) 50%/cover;
		z-index: 8;
	}
</style>