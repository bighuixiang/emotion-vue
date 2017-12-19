<template>
	<div class="page-content">
		<Scrub class="imgbg" v-if="userImage.url!=''" :images="scrubImage"></Scrub>
		<div class="content">
			<UserImage class="userImg" v-if="scrubImage.url!=''" :images="userImage"></UserImage>
			<p class="name">佳佳</p>
			<p class="chat">邀请你视频聊天</p>
		</div>
		<div class="footer">
			<div>
				<img src="../../../static/image/chat/jujue.png" />
				<p>拒绝</p>
			</div>
			<div>
				<img src="../../../static/image/chat/jieting.png" />
				<p>接听</p>
			</div>
		</div>
	</div>
</template>
<script>
	import UserImage from './UserImage'
	import Scrub from './Scrub'
	export default {
		components: {
			UserImage,
			Scrub,
		},
		data() {
			return {
				userImage: {
					"url": "",
					"border": "2px solid #ffffff",
					"width": "3rem",
					"height": "3rem",
					"borderRadius": "50%",
				},
				scrubImage: {
					"url": "",
					"width": "100%",
					"height": "100%",
					"borderRadius": "0",
					"filter": 5
				},
				userInfo: null,
				showMore: false
			}
		},
		mounted() {
			let self = this
			self.userInfo = window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
			self.userImage.url = self.userInfo.girlheadurl
			self.scrubImage.url = self.userInfo.girlheadurl
		},
		methods: {
			more() {
				alert("test")
			}
		}
	}
</script>
<style scoped>
	.page-content {
		padding: 0;
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
	
	.content {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.8);
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		color: #FFFFFF;
	}
	
	.content .userImg {
		margin-top: -3.8rem;
	}
	
	.content .name {
		font-size: 0.6rem;
		margin-bottom: 6px;
		margin-top: 0.62rem;
	}
	.footer{
		position: absolute;
		height: 100%;
		/*width: 100%;*/
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		height: 3rem;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		color: #FFFFFF;
		text-align: center;
		padding: 0.375rem 1rem;
	}
	.footer div img{
		width: 1.5rem;
		height: auto;
		display: block;
		margin-bottom: 6px;
	}
</style>