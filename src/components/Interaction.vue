<template>
	<div class="page has-navbar" v-nav="{ title: title, showBackButton: true, onBackButtonClick: back}">
		<div class="page-content text-center">
			<div class="imgbg"></div>
			<div class="interaction">
				<div class="interaction-userimg">
					<UserImage class="userimg-img" :images="userImage"></UserImage>
				</div>
				<p class="interaction-title">佳佳邀请你去逛街</p>
				<div class="interaction-btn">
					<img src="../../static/image/interaction/quguangjie.png" />
					<img src="../../static/image/interaction/buqu.png" />
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
					"width": "1.8rem",
					"height": "1.8rem",
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
					path: "chat"
				})
			},
			back() {
				$router.back('/');
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
	.interaction {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 86;
		background-color: rgba(255, 255, 255, 0.9);
		width: 8rem;
		margin-left: -4rem;
		margin-top: -2.71875rem;
		height: 4.275rem;
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .15);
	}
	
	.interaction .interaction-title {
		font-size: 0.375rem;
		margin-top: 1.286rem;
		margin-bottom: 0.575rem;
	}
	
	.interaction .interaction-btn {
		margin: auto;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		width: 6rem;
	}
	
	.interaction .interaction-btn img {
		height: 1.286rem;
		width: auto;
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
		z-index: 1;
	}
</style>