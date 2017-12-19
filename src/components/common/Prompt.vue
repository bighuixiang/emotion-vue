<template>
	<div v-if="isShow" class="prompt" :id="btnid">
		<p class="prompt-title">剩余游戏次数不足，<br/>开通VIP不限游戏次数!</p>
		<div class="prompt-btn">
			<img @click="openVip" src="../../../static/image/common/kaitongvip.png" />
			<img @click="close" src="../../../static/image/common/quxiao.png" />
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Prompt',
		props: {
			isShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				//				title: '佳佳',
				btnid: 'prompt_' + parseInt(Math.random() * 1000000),
			}
		},
		mounted() {
			let self = this
			//			self.search()
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
			openVip(){
				this.$emit('onClose')
				this.$emit('openVip')
			},
			close() {
				this.$emit('onClose')
			}
		},
	}
</script>
<style scoped>
	.prompt {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 999;
		background-color: rgba(255, 255, 255, 0.9);
		width: 8rem;
		margin-left: -4rem;
		margin-top: -2.71875rem;
		height: 4.275rem;
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .15);
	}
	
	.prompt .prompt-title {
		font-size: 0.375rem;
		margin-top: 0.75rem;
		margin-bottom: 0.575rem;
		text-align: center;
	}
	
	.prompt .prompt-btn {
		margin: auto;
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		width: 6rem;
	}
	
	.prompt .prompt-btn img {
		height: 1.286rem;
		width: auto;
	}
</style>