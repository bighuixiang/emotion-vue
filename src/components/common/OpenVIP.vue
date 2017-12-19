<template>
	<div v-if="isShow" class="vip" :id="btnid">
		<div class="close" @click="close"></div>
		<h3 class="title">开通VIP会员</h3>
		<div class="vip-postage">
			<div v-for="item in vipList" class="vip-postage-item" @click="open(item)">
				<h1 class="vip-postage-item-title">{{item.title}}</h1>
				<div class="vip-postage-item-pire">
					<p>{{item.desc}}</p>
				</div>
			</div>
		</div>
		<div class="vip-info">
			<h3>VIP特权</h3>
			<p v-for="item in privilege">{{item}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OpenVIP',
		props: {
			isShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				btnid: 'openvip_' + parseInt(Math.random() * 1000000),
				vipList: [],
				privilege: [],
				howText: '',
				isShowText: false,
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
				self.$http.post(self.API.viplist, data).then(response => {
					if(response.data.code == 200) {
						self.vipList = response.data.content
						self.privilege = response.data.privilege
					}
				}, response => {

				})
			},
			open(item) {
				var self = this
				let data = self.getBasicData(self)
				data.id = item.id
				self.$http.post(self.API.vip, data).then(response => {
					if(response.data.code == 200) {
						$toast.show('恭喜您开通VIP成功！', 1500)
					} else {
						$toast.show(response.data.msg, 1500)
					}
				}, response => {
					$toast.show('网络错误', 1500)
				})
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
			close() {
				this.$emit('onClose')
			}
		}
	}
</script>

<style scoped>
	.vip {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 86;
		background-color: rgba(255, 255, 255, 0.9);
		width: 8.86rem;
		margin-left: -4.43rem;
		margin-top: -5.1rem;
		/*height: 10.2rem;*/
		padding-bottom: 0.375rem;
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .15);
	}
	
	.vip .vip-info {
		border-top: 1px solid #C7C5C6;
		width: 7.8rem;
		margin: auto;
	}
	
	.vip .vip-info h3 {
		margin: auto;
		padding-left: 0.686rem;
		text-align: center;
		margin-top: 0.375rem;
		margin-bottom: 0.266rem;
		font-weight: normal;
		font-size: 0.48rem;
		background: url(../../../static/image/common/viptequanhuangguan.png) no-repeat center left;
		background-size: 0.6rem;
		display: table;
	}
	
	.vip .vip-info p {
		margin-bottom: 0;
		opacity: 0.6;
		width: 5.68rem;
		margin: auto;
	}
	
	.vip .vip-postage {
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		color: #FF5155;
		text-align: center;
		width: 7.8rem;
		margin: auto;
	}
	
	.vip .vip-postage .vip-postage-item {
		border-radius: 6px;
		border: 1px solid #FF5155;
		padding: 0.2rem 0.375rem;
		margin-bottom: 0.375rem;
		width: 3.7125rem;
	}
	
	.vip .vip-postage .vip-postage-item .vip-postage-item-title {
		color: #FF5155;
		margin-bottom: 0;
		font-weight: normal;
		font-size: 0.538rem;
	}
	
	.vip .title {
		/*font-size: 0.375rem;*/
		text-align: center;
		margin: 0.375rem;
	}
	
	.vip .vip-postage .vip-postage-item .vip-postage-item-pire {
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
	}
	
	.vip .vip-postage .vip-postage-item .vip-postage-item-pire p {
		margin-bottom: 0;
	}
	/*.vip .vip-postage .vip-postage-item .vip-postage-item-pire p:first-child {
		padding-right: 3px;
	}
	
	.vip .vip-postage .vip-postage-item .vip-postage-item-pire p:last-child {
		padding-left: 3px;
	}*/
	
	.vip .close {
		position: absolute;
		right: 0;
		top: 0;
		width: 0.8rem;
		height: 0.8rem;
		background: url(../../../static/image/selectobject/guanbi.png) no-repeat center center;
		background-size: 0.375rem;
	}
</style>