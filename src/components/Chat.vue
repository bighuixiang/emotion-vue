<template>
	<div>
		<von-header theme="light">
			<button @click="back" class="button button-icon ion-ios-arrow-back" slot="left"></button>
			<span slot="title">{{title}}</span>
		</von-header>
		<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back,hideNavbar:true}">
			<!--<div class="page-content text-center" :style="{'padding-bottom':paddingBottom + 'px'}">-->
			<scroll class="page-content" :on-refresh="onRefresh">
				<div class="chat" :style="{'padding-bottom':paddingBottom + 'px'}">
					<p class="chat-time">{{new Date().getTime() | dateFormat('hh:mm')}}</p>
					<div v-for="(item,index) in msgList">
						<div v-if="item.msgtype==3" class="chat-item" :class="{'chat-item-left':item.sender==0,'chat-item-right':item.sender==1}">
							<UserImage class="userimg" :images="item.sender==0?userSystemImage:userImage"></UserImage>
							<div class="msg">
								{{item.msg}}
							</div>
						</div>
						<div @click="videoPlay(item.msg)" v-if="item.msgtype==0||item.msgtype==1||item.msgtype==2||item.msgtype==7" class="chat-item chat-item-left chat-item-live">
							<UserImage class="userimg" :images="userSystemImage"></UserImage>
							<div class="msg">
								<UserImage class="userimg" :images="item.userLiveImage"></UserImage>
							</div>
						</div>
						<div v-if="item.msgtype==5" class="chat-item chat-item-left chat-item-img">
							<UserImage class="userimg" :images="userSystemImage"></UserImage>
							<div class="msg">
								<UserImage class="userimg" :images="item.userLiveImage"></UserImage>
							</div>
						</div>
						<div @click="playAudioUrl(item.msg)" v-if="item.msgtype==4" class="chat-item chat-item-left chat-item-voice">
							<UserImage class="userimg" :images="userSystemImage"></UserImage>
							<div class="msg">
								<img src="../../static/image/chat/yuying.png" />
							</div>
						</div>

						<div @click="goPage(item.msg)" v-if="item.msgtype==6" class="chat-item chat-item-left chat-item-game">
							<UserImage class="userimg" :images="userSystemImage"></UserImage>
							<div class="msg">
								<div class="gameinfo">
									<img v-if="item.msg==1" src="../../static/image/common/shaizi1.png" />
									<p v-if="item.msg==1">要不要来玩一局“猜骰子”的游戏啊？</p>
									<img v-if="item.msg==2" src="../../static/image/common/jiandao.png" />
									<p v-if="item.msg==2">要不要来玩一局“猜剪刀”的游戏啊？</p>
									<img v-if="item.msg==3" src="../../static/image/common/yingbizheng.png" />
									<p v-if="item.msg==3">要不要来玩一局“猜硬币”的游戏啊？</p>
								</div>
								<div class="gametitle"><span>互动小游戏</span></div>
							</div>
						</div>
					</div>
				</div>
			</scroll>
			<footer class="footer" id="footerchat">
				<div class="footer-chat">
					<div class="footer-chat-input" @click="send">{{havenxt>0?next.msg[selectMsg]:''}}</div>
					<img class="footer-chat-send" @click="send" v-show="!showMsg" src="../../static/image/chat/fasongmoren.png" />
					<img class="footer-chat-send" @click="send" v-show="showMsg" src="../../static/image/chat/fasongdianji.png" />
					<img class="footer-chat-send" @click="more" v-show="!showGame" src="../../static/image/chat/jiahaomoren.png" />
					<img class="footer-chat-send" @click="more" v-show="showGame" src="../../static/image/chat/jiahaodianji.png" />
				</div>
				<div class="footer-msg" v-show="showMsg">
					<div v-if="havenxt>0" v-for="(item,index) in next.msg" class="footer-msg-item" @click="changeMsg(item,index)" :class="{'footer-msg-item-cur':selectMsg==index}">
						{{item}}
					</div>
				</div>
				<div class="game" v-show="showGame">
					<div class="game-item" @click="goPage(3)">
						<div class="game-item-guess"></div>
						<p>猜拳</p>
					</div>
					<div class="game-item" @click="goPage(2)">
						<div class="game-item-coin"></div>
						<p>猜硬币</p>
					</div>
					<div class="game-item" @click="goPage(1)">
						<div class="game-item-dice"></div>
						<p>玩骰子</p>
					</div>
					<div class="game-item" @click="goPage(4)">
						<div class="game-item-expect"></div>
						<p>敬请期待</p>
					</div>
				</div>
			</footer>
			<VideoPlayer ref="videoplayer" @onEnded="onEnded" :videos="videos"></VideoPlayer>
			<div v-show="interaction" class="centerFixed">
				<div class="interaction">
					<div class="interaction-userimg">
						<UserImage class="userimg-img" :images="userInteractiveImage"></UserImage>
					</div>
					<p class="interaction-title">{{interactiveInfo.ivmsg}}</p>
					<div class="interaction-btn">
						<div v-for="item in interactiveInfo.ivselect" @click="interactivePlay(item.url)">{{item.msg}}</div>
					</div>
				</div>
			</div>
			<audio ref="playAudios" preload :src="audioUrl" style=""></audio>
		</div>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import VideoPlayer from './common/VideoPlayer'
	import VideoChatModal from './common/VideoChatModal'

	export default {
		components: {
			UserImage,
			VideoPlayer,
		},
		data() {
			return {
				title: '',
				showGame: false,
				showMsg: false,
				selectMsg: 0,
				page: 1,
				paddingBottom: 0,
				userInfo: {},
				havenxt: 0,
				next: {},
				msgList: [],
				interaction: false,
				interactiveInfo: {},
				modal: undefined,
				audioUrl: '',
				userImage: {
					"url": "",
					"width": "1.5rem",
					"height": "1.5rem",
					"borderRadius": "50%",
				},
				userInteractiveImage: {
					"url": "",
					"width": "1.8rem",
					"height": "1.8rem",
					"borderRadius": "50%",
				},
				userSystemImage: {
					"url": "",
					"width": "1.5rem",
					"height": "1.5rem",
					"borderRadius": "50%",
				},
				videos: {
					url: "",
					show: false
				},
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.title = self.userInfo != null ? self.userInfo.girlname : ''
			self.title = "和" + self.title + "聊天中"
			self.userSystemImage.url = self.userInfo.girlheadurl
			self.userImage.url = self.userInfo.userImage
			self.searchNew()
			self.searchHistory()
			$modal.fromComponent(VideoChatModal, {
				title: '',
				theme: 'default',
				destroyOnHide: true
			}).then((modal) => {
				self.modal = modal
			})
			self.$nextTick(function() {
				setTimeout(() => {
					let down = document.querySelector('.scroll-inner>.pull-to-refresh-layer>.label-down')
					if(down)
						down.textContent = "加载更多"
					let up = document.querySelector('.scroll-inner>.pull-to-refresh-layer>.label-up')
					if(up)
						up.textContent = "释放加载"
					let refresh = document.querySelector('.scroll-inner>.pull-to-refresh-layer>.label-refresh')
					if(refresh)
						refresh.textContent = "正在加载.."
				}, 50)
			})
		},
		destroyed() {
			if(this.modal)
				$modal.destroy(this.modal)
		},
		methods: {
			onRefresh(done) {
				let self = this
				self.searchHistory(done)
			},
			searchNew() {
				//查询最新记录
				let self = this
				let data = self.getBasicData(self)
				data.reqtype = 2
				self.$http.post(self.API.talk, data).then(response => {
					if(response.data.code == 200) {
						if(response.data.content.length > 0) {
							response.data.content.forEach((item, index) => {
								if(self.uniqeByKeys(item.id))
									self.msgList.push(self.fromatData(item))
								switch(item.msgtype) {
									case 0:
										//普通视频  直接播放视频  
										self.videoPlay(item.msg)
										break;
									case 1:
										//交互视频  播放视频 后有交互操作  
										self.videoPlay(item.msg)
										self.interactiveInfo = {
											ivmsg: item.ivmsg,
											ivselect: item.ivselect,
											ivheadurl: item.ivheadurl
										}
										self.userInteractiveImage.url = item.ivheadurl
										break;
									case 2:
										//电话视频 
										self.modal.show()
										self.modal.$el.querySelectorAll(".footer div").forEach((btnItem, i) => {
											btnItem.onclick = function() {
												if(i == 0) { //hide  modal 
													self.modal.hide()
												} else {
													//接受视频
													self.modal.hide()
													self.videoPlay(item.msg)
												}
											}
										})
										break;
									default:
										break;
								}
							})
						}
						if(response.data.havenxt) {
							self.havenxt = response.data.havenxt
							self.next = response.data.next
						} else {
							self.havenxt = 0
							self.next = []
						}
					} else {
						$toast.show(response.data.msg, 1500)
					}
					self.$nextTick(function() {
						self.paddingBottom = document.getElementById('footerchat').offsetHeight;
					});
				}, response => {
					$toast.show('网络错误', 1500)
				})
			},
			interactivePlay(url) {
				let self = this
				self.videoPlay(url);
				self.interaction = false
				self.$nextTick(function() {
					setTimeout(() => {
						self.interactiveInfo = {};
						self.searchNew()
					}, 50)
				})

			},
			onEnded() {
				//视频播放结束  该干嘛了
				let self = this
				if(typeof(self.interactiveInfo.ivmsg)!="undefined") {
					self.interaction = true
				}
			},
			playAudioUrl(url) {
				let self = this
				self.audioUrl = url
				self.$nextTick(function() {
					setTimeout(() => {
						self.$refs.playAudios.play()
					}, 50)
				})
			},
			uniqeByKeys(id) {
				let self = this
				for(var i = 0, j = self.msgList.length; i < j; i++) {
					if(self.msgList[i].id == id)
						return false
				}
				return true;
			},
			searchHistory(done) {
				//查询历史记录
				let self = this
				let data = self.getBasicData(self)
				data.page = self.page
				data.reqtype = 3
				self.$http.post(self.API.talk, data).then(response => {
					if(response.data.code == 200) {
						if(response.data.content.length > 0) {
							response.data.content.forEach((item, index) => {
								if(self.uniqeByKeys(item.id))
									self.msgList.unshift(self.fromatData(item))
							})
							self.page++;
						}
					} else {
						$toast.show(response.data.msg, 1500)
					}
					if(done)
						done()
				}, response => {
					$toast.show('网络错误', 1500)
					if(done)
						done()
				})
			},
			send() {
				let self = this
				if(self.havenxt > 0) {
					self.showGame = false;
					if(self.showMsg) {
						//发送消息
						let data = self.getBasicData(self)
						data.id = self.msgList[self.msgList.length - 1].id
						data.msg = self.next.msg[self.selectMsg]
						data.reqtype = 1
						self.$http.post(self.API.talk, data).then(response => {
							if(response.data.code == 200) {
								self.showMsg = false;
								var newMsg = {
									msgtype: 3,
									sender: 1,
									msg: self.next.msg[self.selectMsg]
								}
								self.msgList.push(newMsg)
								self.searchNew()
							} else {
								$toast.show(response.data.msg, 1500)
							}
						}, response => {
							$toast.show('网络错误', 1500)
						})
					} else
						self.showMsg = true;
					self.$nextTick(function() {
						self.paddingBottom = document.getElementById('footerchat').offsetHeight;
					});
				}
			},
			fromatData(data) {
				switch(data.msgtype) {
					case 0:
					case 1:
					case 2:
					case 5:
					case 7:
						data.userLiveImage = {
							"url": data.thumbnail,
							"width": "4.1rem",
							"height": "5.6rem",
							"borderRadius": "0",
						}
						break;
					default:
						break;
				}
				return data;
			},
			videoPlay(url) {
				var self = this
				//播放视频
				self.videos.url = url
				self.videos.show = true
				self.$nextTick(function() {
					self.$refs.videoplayer.init();
					//				self.$refs.videoplayer.play();
				})
			},
			changeMsg(item, index) {
				let self = this
				self.selectMsg = index
			},
			more() {
				let self = this
				self.showMsg = false;
				self.showGame = !self.showGame;
				self.$nextTick(function() {
					self.paddingBottom = document.getElementById('footerchat').offsetHeight;
				});
			},
			goPage(type) {
				let self = this
				switch(parseInt(type)) {
					case 1:
						$router.forward({
							path: "/dicegame",
							query: self.getBasicData(self)
						})
						break;
					case 2:
						$router.forward({
							path: "/tossacoingame",
							query: self.getBasicData(self)
						})
						break;
					case 3:
						$router.forward({
							path: "/guessgame",
							query: self.getBasicData(self)
						})
						break;
					case 4:
						$toast.show('更多游戏敬请期待..', 1500)
						break;
					default:
						break;
				}
			},
			back() {
				$router.go(-1);
			}
		},
	}
</script>
<style>
	.bar-light .button.button-icon {
		color: #000000 !important;
	}
</style>
<style scoped>
	.page.has-navbar .page-content {
		padding-top: 44px;
	}
	
	.footer .footer-msg {
		padding-left: 0.375rem;
		padding-right: 0.375rem;
		text-align: left;
		color: #565655;
		border-top: 1px solid #F0F0F1;
	}
	
	.footer .footer-msg .footer-msg-item {
		background: url(../../static/image/chat/huifumoren.png) no-repeat center left;
		background-size: 0.475rem;
		padding-left: 0.675rem;
		padding-top: 0.375rem;
		padding-bottom: 0.375rem;
		/*font-size: 0.375rem;*/
		position: relative;
	}
	
	.footer .footer-msg .footer-msg-item:first-child:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: -0.375rem;
		right: -0.375rem;
		z-index: 8;
		height: 1px;
		background-color: #4B4B4B;
	}
	
	.footer .footer-msg .footer-msg-item-cur {
		background: url(../../static/image/chat/huifuyuxuanxiang.png) no-repeat center left;
		background-size: 0.475rem;
		color: #000000;
	}
	
	.footer .game {
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-top: 1px solid #F0F0F1;
		padding: 0.375rem;
		color: #545454;
	}
	
	.footer .game .game-item div {
		background-color: #F4F5F9;
		height: 1.4rem;
		width: 1.4rem;
		border-radius: 12px;
		border: 1px solid #F0F0F1;
	}
	
	.footer .game .game-item p {
		text-align: center;
	}
	
	.game-item-guess {
		background: url(../../static/image/chat/shouzhang.png) center center no-repeat;
		background-size: 0.68rem;
	}
	
	.game-item-coin {
		background: url(../../static/image/chat/zheng.png) center center no-repeat;
		background-size: 0.68rem;
	}
	
	.game-item-dice {
		background: url(../../static/image/chat/shaizitubiao.png) center center no-repeat;
		background-size: 0.68rem;
	}
	
	.game-item-expect {
		background: url(../../static/image/chat/qidaigengduo.png) center center no-repeat;
		background-size: 0.68rem;
	}
	
	.footer .game .game-item p {
		margin-bottom: 0;
	}
	
	.footer-chat-input {
		background-color: #F4F5F9;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 0.375rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border-radius: 50px;
		font-size: 0.375rem;
		color: #565655;
		width: 6rem;
		float: left;
	}
	
	.footer-chat-send {
		height: 0.88rem;
		float: left;
	}
	
	.footer-chat {
		position: relative;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		padding-left: 0.375rem;
		padding-right: 0.375rem;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		/*width: 100%;*/
		background-color: #FFFFFF;
		border-top: 1px solid #F0F0F1;
		/*transition: all 0.5s;
		-webkit-transition: all 0.5s;*/
		z-index: 8;
	}
	
	.chat-time {
		margin-top: 0.375rem;
		margin-bottom: -0.275rem;
		color: #C7C5C6;
		text-align: center;
	}
	
	.chat-item {
		padding: 0.375rem;
		overflow: auto;
	}
	
	.chat-item-left {
		position: relative;
	}
	
	.chat-item-left .userimg {
		float: left;
	}
	
	.chat-item .msg {
		width: 5.5rem;
		font-size: 0.375rem;
		padding: 0.375rem;
		border-radius: 12px;
		text-align: left;
		margin-top: 0.175rem;
		position: relative;
	}
	
	.chat-item-left .msg {
		background-color: #FFFFFF;
		color: #000000;
		margin-left: 0.375rem;
		border-top-left-radius: 0;
		box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.08);
		-webkit-box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.08);
		float: left;
	}
	
	.chat-item-left .msg:after {
		content: '';
		position: absolute;
		left: -1px;
		top: -1px;
		background: url(../../static/image/chat/que.png) 0/cover;
		width: 0.15rem;
		height: 0.375rem;
		z-index: 8;
	}
	
	.chat-item-right {
		position: relative;
	}
	
	.chat-item-right .userimg {
		float: right;
	}
	
	.chat-item-right .msg {
		background-color: #FF6162;
		color: #FFFFFF;
		margin-right: 0.375rem;
		border-top-right-radius: 0;
		box-shadow: -6px 6px 12px rgba(255, 97, 98, 0.2);
		-webkit-box-shadow: -6px 6px 12px rgba(255, 97, 98, 0.2);
		float: right;
	}
	
	.chat-item-right .msg:after {
		content: '';
		position: absolute;
		right: -1px;
		top: -1px;
		background: url(../../static/image/chat/que.png) 0/cover;
		width: 0.15rem;
		height: 0.375rem;
		z-index: 8;
		-moz-transform: scaleX(-1);
		-webkit-transform: scaleX(-1);
		-o-transform: scaleX(-1);
		transform: scaleX(-1);
		/*IE*/
		filter: FlipH;
	}
	
	.chat-item-live .msg,
	.chat-item-img .msg {
		padding: 0;
		width: 4.1rem;
		overflow: hidden;
	}
	
	.chat-item-live .msg:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../static/image/space/bofanganniu.png) center center no-repeat rgba(0, 0, 0, 0.2);
		background-size: 1.4rem;
		border-radius: 12px;
		border-top-left-radius: 0;
		z-index: 8;
	}
	
	.chat-item-voice .msg {
		width: 4.1rem;
		padding: 0.2rem 0.375rem;
		/*border-radius: 50px;
		border-top-left-radius: 0;*/
	}
	
	.chat-item-voice .msg img {
		width: 0.5rem;
		height: auto;
		display: block;
	}
	
	.chat-item-game .msg {
		background: url(../../static/image/chat/xiaoyouxijianbian.png) no-repeat center center;
		background-size: 160% 160%;
		padding-bottom: 0.68rem;
	}
	
	.chat-item-game .msg .gameinfo {
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
	
	.chat-item-game .msg .gameinfo img {
		width: 1rem;
		height: auto;
		display: block;
	}
	
	.chat-item-game .msg .gameinfo p {
		padding-left: 0.275rem;
		color: #FFFFFF;
	}
	
	.chat-item-game .gametitle {
		position: absolute;
		background-color: #FFFFFF;
		color: #949494;
		bottom: 0;
		width: 100%;
		left: 0;
		overflow: hidden;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		text-align: left;
	}
	
	.chat-item-game .gametitle span {
		display: block;
		transform: scale(0.6);
		-webkit-transform: scale(0.6);
		float: left;
	}
	
	.centerFixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 886;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-content: center;
		background-color: rgba(0, 0, 0, 0.8);
	}
	
	.interaction {
		position: relative;
		background-color: rgba(255, 255, 255, 0.9);
		width: 8rem;
		padding-bottom: 0.55rem;
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .15);
	}
	
	.interaction .interaction-title {
		font-size: 0.375rem;
		margin-top: 1.286rem;
		margin-bottom: 0.575rem;
		text-align: center;
	}
	
	.interaction .interaction-btn {
		margin: auto;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		width: 6.4rem;
	}
	
	.interaction .interaction-btn img {
		height: 1.286rem;
		width: auto;
	}
	
	.interaction .interaction-btn div:first-child {
		height: 1rem;
		width: 2.8rem;
		text-align: center;
		line-height: 1rem;
		display: table;
		background-color: #FF5455;
		color: #FFE5E5;
		border-radius: 50px;
	}
	
	.interaction .interaction-btn div:last-child {
		height: 1rem;
		width: 2.8rem;
		text-align: center;
		line-height: 1rem;
		display: table;
		background-color: #FFFFFF;
		border-radius: 50px;
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
</style>