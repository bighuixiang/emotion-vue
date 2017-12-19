<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<div class="imgbg"></div>
			<div class="message" @click="goChat">
				<div class="message-userimg">
					<UserImage class="userimg-img" :images="userImage"></UserImage>
				</div>
				<div class="message-text">
					佳佳给你发来一条消息
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
				title: '佳佳',
				gold: 2000,
				userImage: {
					"url": "/static/meinv.jpg",
					"border": "2px solid #ffffff",
					"width": "1.3rem",
					"height": "1.3rem",
				}
			}
		},
		mounted() {
			let self = this
			self.search()
		},
		methods: {
			search() {
				var self = this
				self.$http.post(self.API.fileUpload, {}).then(response => {
					// success callback
				}, response => {
					// error callback
					//					pars
				})
			},
			goChat() {
				var self = this
				$router.forward({
					path: "chat",
					query: self.getBasicData(self)
				})
			},
			back() {
				$router.go(-1);
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
	.message {
		position: absolute;
		bottom: 0.86rem;
		left: 0.375rem;
		z-index: 86;
	}
	
	.message .message-userimg {
		background-color: rgba(255, 255, 255, 0.4);
		display: table;
		padding: 0.1rem;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: -0rem;
		margin-top: -0.75rem;
	}
	
	.message .message-text {
		color: #222222;
		font-size: 0.375rem;
		background-color: rgba(255, 255, 255, 0.5);
		border: 2px solid #FFFFFF;
		height: 1rem;
		line-height: 0.9rem;
		border-radius: 120px;
		padding-left: 1.475rem;
		padding-right: 0.375rem;
		margin-left: 0.175rem;
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
		z-index: 1;
	}
</style>