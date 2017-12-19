<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<div class="personal">
				<Scrub ref="scrub" :images="userImageScrub"></Scrub>
				<div class="personal-userImg">
					<UserImage class="personal-userImg-img" :images="userImage"></UserImage>
					<p>{{personalInfo.name}}</p>
				</div>
			</div>

			<div class="personal-item">
				<div>
					<span>交往对象</span>
					<em>{{personalInfo.girlname}}</em>
				</div>
				<div @click="goSelectObject">更换交往对象</div>
			</div>

			<div class="personal-item">
				<div>
					<span>交往时间</span>
					<em>{{personalInfo.choicetime}}天</em>
				</div>
				<div style="display: none;"></div>
			</div>
			<div class="personal-item">
				<div>
					<span>金币</span>
					<em>{{personalInfo.amount}}</em>
				</div>
				<div @click="recharge=true">充值</div>
			</div>
			<div class="personal-item">
				<div>
					<span>VIP会员</span>
					<em>
						{{personalInfo.vip==1?'会员':'普通用户'}}
					</em>
				</div>
				<div @click="isShowOpenVIP=true">{{personalInfo.vip==1?'续期':'开通'}}</div>
			</div>
			<div class="personal-item">
				<div>
					<span style="float: left;">VIP特权</span>
					<i>
						<p v-for="item in privilege">{{item}}</p>
					</i>
				</div>
				<div style="display: none;"></div>
			</div>
		</div>
		<Recharge :isShow="recharge" @onClose="onClose"></Recharge>
		<OpenVIP :isShow="isShowOpenVIP" @onClose="onClose"></OpenVIP>
	</div>
</template>
<script>
	import UserImage from './common/UserImage'
	import Scrub from './common/Scrub'
	import Recharge from './common/Recharge'
	import OpenVIP from './common/OpenVIP'

	export default {
		components: {
			UserImage,
			Scrub,
			Recharge,
			OpenVIP
		},
		data() {
			return {
				title: '',
				userInfo: {},
				personalInfo: {},
				recharge: false,
				isShowOpenVIP: false,
				privilege:[],
				userImage: {
					"url": "",
					"border": "2px solid #ffffff",
					"width": "2.2rem",
					"height": "2.2rem",
					"borderRadius": "50%",
				},
				userImageScrub: {
					"url": "",
					"width": "100%",
					"height": "5rem",
					"borderRadius": "0",
					"filter": 2.5
				}
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.title = self.userInfo != null ? self.userInfo.girlname : ''
			self.search()
		},
		methods: {
			search() {
				var self = this
				let data = self.getBasicData(self)
				self.$http.post(self.API.myhome, data).then(response => {
					if(response.data.code == 200) {
						self.personalInfo = response.data.content
						self.privilege = response.data.privilege
						self.userImageScrub.url = response.data.content.headurl
						self.userImage.url = response.data.content.headurl
						self.$refs.scrub.initScrub()
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
			onClose() {
				this.recharge = false
				this.isShowOpenVIP = false
			},
			back() {
				$router.go(-1);
			},
			goSelectObject() {
				var self = this
				$router.forward({
					path: '/selectobject',
					query: self.getBasicData(self)
				});
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
	.page.has-navbar .page-content {
		padding: 0;
	}
	
	.personal-item {
		position: relative;
		padding: 0.375rem;
		overflow: hidden;
		padding-left: 0.375rem;
		padding-right: 0.375rem;
		background-color: #FFFFFF;
		margin-bottom: 0.125rem;
	}
	
	.personal-item div:first-child {
		text-align: left;
		font-size: 0.375rem;
	}
	
	.personal-item div:first-child span {
		width: 1.6rem;
		text-align: justify;
		text-align-last: justify;
		display: inline-block;
	}
	
	.personal-item div:first-child em {
		margin-left: 0.375rem;
		opacity: 0.6;
	}
	
	.personal-item div:first-child i {
		margin-left: 0.375rem;
		float: left;
	}
	
	.personal-item div:first-child i p {
		margin-bottom: 6px;
		opacity: 0.6;
	}
	
	.personal-item div:last-child {
		position: absolute;
		right: 0.375rem;
		top: 50%;
		margin-top: -14px;
		color: #ff5155;
		font-size: 0.375rem;
		border: 1px solid #FF5155;
		padding: 3px 12px;
		border-radius: 20px;
	}
	
	.personal {
		position: relative;
	}
	
	.personal:after {
		content: '';
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 6;
	}
	
	.personal-userImg {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -1.1rem;
		margin-left: -1.1rem;
		color: #FFFFFF;
		z-index: 8;
	}
	
	.personal-userImg-img {
		position: relative;
	}
	
	.personal-userImg-img:after {
		content: '';
		position: absolute;
		top: -0.35rem;
		right: 0;
		background: url(../../static/image/index/crown.png) no-repeat 50%/cover;
		width: 0.7rem;
		height: 0.7rem;
		z-index: 6;
	}
	
	.personal-userImg p {
		font-size: 0.375rem;
		margin-top: 3px;
	}
</style>