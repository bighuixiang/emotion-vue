<template>
	<div v-if="isShow" class="recharge" :id="btnid">
		<div class="close" @click="close"></div>
		<h3 class="title">充值金币</h3>
		<div class="recharge-postage">
			<div class="recharge-postage-item">
				<h1 class="recharge-postage-item-title">1000金币</h1>
				<div class="recharge-postage-item-pire">
					<p>原价10</p>
					<p>现价9.9</p>
				</div>
			</div>
			<div class="recharge-postage-item">
				<h1 class="recharge-postage-item-title">5000金币</h1>
				<div class="recharge-postage-item-pire">
					<p>原价50</p>
					<p>现价45</p>
				</div>
			</div>
			<div class="recharge-postage-item">
				<h1 class="recharge-postage-item-title">10000金币</h1>
				<div class="recharge-postage-item-pire">
					<p>原价100</p>
					<p>现价80</p>
				</div>
			</div>
			<div class="recharge-postage-item">
				<h1 class="recharge-postage-item-title">20000金币</h1>
				<div class="recharge-postage-item-pire">
					<p>原价200</p>
					<p>现价150</p>
				</div>
			</div>
			<div class="recharge-postage-item">
				<h1 class="recharge-postage-item-title">50000金币</h1>
				<div class="recharge-postage-item-pire">
					<p>原价500</p>
					<p>现价350</p>
				</div>
			</div>
			<div class="recharge-postage-item">
				<h1 class="recharge-postage-item-title">100000金币</h1>
				<div class="recharge-postage-item-pire">
					<p>原价1000</p>
					<p>现价600</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Recharge',
		props: {
			isShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				btnid: 'recharge_' + parseInt(Math.random() * 1000000)
			}
		},
		methods: {
			close() {
				this.$emit('onClose')
			}
		}
	}
</script>

<style scoped>
	.recharge {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 86;
		background-color: rgba(255, 255, 255, 0.9);
		width: 8.86rem;
		margin-left: -4.43rem;
		margin-top: -3.5rem;
		/*height: 7rem;*/
		padding-bottom: 0.375rem;
		border-radius: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .15);
	}
	
	.recharge .recharge-postage {
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
	
	.recharge .recharge-postage .recharge-postage-item {
		border-radius: 6px;
		border: 1px solid #FF5155;
		padding: 0.2rem 0.375rem;
		margin-bottom: 0.375rem;
		width: 3.7125rem;
	}
	
	.recharge .recharge-postage .recharge-postage-item .recharge-postage-item-title {
		color: #FF5155;
		margin-bottom: 0;
		font-weight: normal;
		font-size: 0.438rem;
	}
	
	.recharge .title {
		/*font-size: 0.375rem;*/
		text-align: center;
		margin: 0.375rem;
	}
	
	.recharge .recharge-postage .recharge-postage-item .recharge-postage-item-pire {
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
	}
	
	.recharge .recharge-postage .recharge-postage-item .recharge-postage-item-pire p {
		margin-bottom: 0;
	}
	
	.recharge .recharge-postage .recharge-postage-item .recharge-postage-item-pire p:first-child {
		padding-right: 3px;
	}
	
	.recharge .recharge-postage .recharge-postage-item .recharge-postage-item-pire p:last-child {
		padding-left: 3px;
	}
	
	.recharge .close {
		position: absolute;
		right: 0;
		top: 0;
		width: 0.8rem;
		height: 0.8rem;
		background: url(../../../static/image/selectobject/guanbi.png) no-repeat center center;
		background-size: 0.375rem;
	}
</style>