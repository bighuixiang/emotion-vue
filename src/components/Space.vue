<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<div class="userimgbg" :style="{'background': 'url('+thumbnail+') 50%/cover'}">
				<div class="userinfo">
					<UserImage class="userimg" :images="userImage"></UserImage>
					<div class="userinfo-list">
						<ul>
							<li>
								<div>
									<span>姓名</span>
									<em>{{userDetail.name}}</em>
								</div>
							</li>
							<li>
								<div>
									<span>身高</span>
									<em>{{userDetail.height}}CM</em>
								</div>
							</li>
							<li>
								<div>
									<span>年龄</span>
									<em>{{userDetail.age}}岁</em>
								</div>
							</li>
							<li>
								<div>
									<span>性格</span>
									<em>
										<i v-for="item in userDetail.nature">
											{{item.name}}
										</i>
									</em>
								</div>
							</li>
							<li>
								<div>
									<span>体重</span>
									<em>{{userDetail.weight}}KG</em>
								</div>
							</li>
							<li>
								<div>
									<span>胸围</span>
									<em>{{userDetail.bust}}</em>
								</div>
							</li>
							<li>
								<div>
									<span>职业</span>
									<em>{{userDetail.job}}</em>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="album">
				<p class="album-p">{{title}}的写真集</p>
				<div class="swiper-container">
					<div id="swiper-wrapper" class="swiper-wrapper">
						<div v-for="item in photo" class="swiper-slide">
							<div v-if="item.unlock==1" class="album-div" @click="goPictureBrowsing(item)">
								<UserImage :images="item.userImage"></UserImage>
							</div>
							<div v-else @click="unlock(item,0)" class="album-div album-div-suo">
								<Scrub :images="item.userImage"></Scrub>
								<div class="album-div-gold">
									<p>{{item.amount}}解锁</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-for="item in mv" class="album">
				<p class="album-p" style="margin-bottom: 11px;">{{title}}的私人MV</p>
				<div v-if="item.unlock==1" class="album-mv" @click="videoPlay(item)">
					<UserImage :images="item.userMv"></UserImage>
				</div>
				<div v-else class="album-mv" @click="unlock(item,1)">
					<UserImage :images="item.userMv"></UserImage>
					<div class="album-div-gold">
						<p>{{item.amount}}解锁</p>
					</div>
				</div>
			</div>
			<VideoPlayer ref="videoplayer" :videos="videos"></VideoPlayer>
			<Recharge :isShow="recharge" @onClose="onClose"></Recharge>
		</div>
		<div class="sendmsg" @click="goChat">
			<p>给佳佳发消息</p>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import Scrub from './common/Scrub'
	import Swiper from 'swiper'
	import VideoPlayer from './common/VideoPlayer'
	import Recharge from './common/Recharge'

	export default {
		components: {
			UserImage,
			Scrub,
			Recharge,
			VideoPlayer
		},
		data() {
			return {
				title: '',
				userInfo: null,
				userDetail: {},
				recharge: false,
				thumbnail: '',
				photo: [],
				mv: [],
				videos: {
					url: "",
					show: false
				},
				userImage: {
					"url": "",
					"border": "2px solid #ffffff",
					"width": "2rem",
					"height": "2rem",
					"borderRadius": "50%",
				}
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.title = self.userInfo != null ? self.userInfo.girlname : ''
			self.$nextTick(function() {
				setTimeout(() => {
					self.setTitle(self.title + "的主页")
				}, 50)
			})
			self.search()
		},
		methods: {
			search() {
				var self = this
				let data = self.getBasicData(self)
				data.id = self.userInfo != null ? self.userInfo.girlid : ''
				self.$http.post(self.API.girlhome, data).then(response => {
					if(response.data.code == 200) {
						self.userDetail = response.data.content
						self.userImage.url = response.data.content.headurl
						self.thumbnail = response.data.content.thumbnail
						self.photo = response.data.content.photo
						self.photo.forEach((item, index) => {
							item.userImage = {
								"url": item.url,
								"width": "2.5rem",
								"height": "3.5rem",
								"borderRadius": "6px",
								"filter": 2.5
							}
						})

						self.mv = response.data.content.mv
						self.mv.forEach((item, index) => {
							item.userMv = {
								"url": item.thumbnail,
								"width": "100%",
								"height": "6rem",
								"borderRadius": "6px",
							}
						})
						self.$nextTick(function() {
							var swiper = new Swiper('.swiper-container', {
								slidesPerView: 3.5,
								paginationClickable: true,
								observer: true,
								observeParents: true,
								freeMode: true
							});
						})
					} else {
						$toast.show(response.data.msg, 1500)
					}
					// success callback
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			onClose() {
				this.recharge = false
			},
			unlock(item, type) {
				var self = this
				let data = self.getBasicData(self)
				data.id = self.userInfo != null ? self.userInfo.girlid : ''
				data.unlockid = item.id
				data.type = type == 0 ? "photo" : "mv"
				$dialog.confirm({
					theme: 'ios',
					title: '确定花费' + item.amount + '金币解锁吗?',
					cancelText: '取消',
					okText: '解锁'
				}).then((res) => {
					if(!res)
						return false;
					self.$http.post(self.API.unlockgirl, data).then(response => {
						if(response.data.code == 200) {
							self.search()
						} else if(response.data.code == 602) {
							self.recharge = true
						} else {
							$toast.show(response.data.msg, 1500)
						}
					}, response => {
						$toast.show('网络错误', 1500)
					})
				})
			},
			videoPlay(item) {
				var self = this
				//播放视频
				//				self.videos.url = item.url
				self.videos.url = item.url
				self.videos.show = true
				self.$nextTick(function() {
					self.$refs.videoplayer.init();
					//				self.$refs.videoplayer.play();
				})
			},
			goPictureBrowsing(item) {
				var self = this
				let query = self.getBasicData(self)
				query.photoid = item.id
				query.id = self.userInfo != null ? self.userInfo.girlid : ''
				$router.forward({
					path: "/picturebrowsing",
					query
				})
			},
			back() {
				var self = this
				$router.back({
					path: "/",
					query: self.getBasicData(self)
				})
			},
			goChat() {
				var self = this
				$router.forward({
					path: "/chat",
					query: self.getBasicData(self)
				})
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
		padding-bottom: 1.3rem;
	}
	
	.page.has-navbar .page-content {
		padding: 0;
		padding-bottom: 1.3rem;
	}
	
	.sendmsg {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		height: 1.3rem;
		line-height: 1.3rem;
		color: #4B4B4B;
		font-size: 0.375rem;
		z-index: 86;
		border-top: 1px solid #EEEEF0;
	}
	
	.sendmsg p {
		display: table;
		margin: auto;
		padding-left: 0.5rem;
		background: url(../../static/image/space/liaotian.png) no-repeat center left;
		background-size: 0.4rem;
	}
	
	.album {
		background-color: #FFFFFF;
		padding: 0.375rem;
		margin-bottom: 0.125rem;
	}
	
	.album .album-p {
		text-align: left;
		font-size: 0.375rem;
		padding-left: 0.52rem;
		background: url(../../static/image/space/xiezhenji.png) no-repeat center left;
		background-size: 0.45rem;
		color: #4B4B4B;
	}
	
	.album .album-ul {
		position: relative;
		overflow: auto;
	}
	
	.album .album-div {
		position: relative;
		overflow: hidden;
	}
	
	.album .album-div-suo:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../static/image/space/suo.png) center center no-repeat rgba(0, 0, 0, 0.3);
		background-size: 0.6rem;
		border-radius: 6px;
		z-index: 1;
	}
	
	.album .album-div .album-div-gold {
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
	
	.album .album-div p {
		background: url(../../static/image/space/zhuyejinbi.png) no-repeat center left;
		font-size: 0.375rem;
		background-size: 0.375rem;
		padding-left: 0.42rem;
		margin-bottom: 6px;
		display: inline;
	}
	
	.album .album-mv .album-div-gold {
		position: absolute;
		bottom: 3px;
		/*left: 0;*/
		right: 0;
		z-index: 2;
		color: #FFFFFF;
		text-align: center;
		transform: scale(0.8, 0.8);
		-webkit-transform: scale(0.8, 0.8);
		z-index: 8;
	}
	
	.album .album-mv .album-div-gold p {
		background: url(../../static/image/space/zhuyejinbi.png) no-repeat center left;
		font-size: 0.375rem;
		background-size: 0.375rem;
		padding-left: 0.42rem;
		margin-bottom: 6px;
		display: inline;
	}
	
	.album .album-mv {
		position: relative;
	}
	
	.album .album-mv:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../static/image/space/bofanganniu.png) center center no-repeat rgba(0, 0, 0, 0.3);
		background-size: 1.4rem;
		border-radius: 6px;
		z-index: 2;
	}
	
	.userinfo {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.375rem;
		z-index: 8;
	}
	
	.userinfo-list {
		position: relative;
		left: 0;
		height: 2rem;
		width: 100%;
	}
	
	.userinfo-list ul {
		line-height: 0.65rem;
		overflow: hidden;
		color: #FFFFFF;
		text-align: left;
		font-size: 0.4rem;
	}
	
	.userinfo-list ul li {
		width: 33.33%;
		float: left;
	}
	
	.userinfo-list ul li div {
		transform: scale(0.75, 0.75);
		-webkit-transform: scale(0.75, 0.75);
		white-space: nowrap;
	}
	/*.userinfo-list ul li div span {}*/
	
	.userinfo-list ul li div em {
		margin-left: 3px;
		opacity: 0.6;
	}
	
	.userinfo .userimg {
		/*width: 2rem;
		height: 2rem;
		display: block;
		border-radius: 50%;
		border: 2px solid #ffffff;*/
		float: left;
	}
	
	.userimgbg {
		position: relative;
		height: 8.8rem;
		width: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
	}
	
	.userimgbg:before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 6;
		background: url(../../static/image/space/zhuyejianbian.png) 50%/cover;
		height: 3.8rem;
	}
	
	.swiper-container {
		width: 100%;
		height: 3.6rem;
		/*padding-left: 0.8rem;*/
		/*padding-right: 2.8rem;*/
	}
	
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		width: 1.5625rem;
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