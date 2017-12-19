<template>
	<div v-if="isShow" class="dailyprizes" :id="btnid">
		<div class="dailyprizes-center">
			<img class="dailyprizes-center-lingqu" src="../../../static/image/common/lingqulibao.png" />
			<ul class="dailyprizes-ul">
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
						<div class="dailyprizes-mask">已领</div>
					</div>
					<p class="dailyprizes-week">周一</p>
				</li>
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
					</div>
					<p class="dailyprizes-week">周二</p>
				</li>
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
					</div>
					<p class="dailyprizes-week">周三</p>
				</li>
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
					</div>
					<p class="dailyprizes-week">周四</p>
				</li>
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
					</div>
					<p class="dailyprizes-week">周五</p>
				</li>
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
					</div>
					<p class="dailyprizes-week">周六</p>
				</li>
				<li>
					<div class="dailyprizes-userimg">
						<UserImage class="userimg-img" :images="userImage"></UserImage>
						<div class="userimg-price-div">
							<p class="userimg-price">10</p>
							<p class="userimg-vip-price">VIP(20)</p>
						</div>
					</div>
					<p class="dailyprizes-week">周日</p>
				</li>
			</ul>
			<img class="kaitong" src="../../../static/image/common/kaitongvip.png" />
		</div>
	</div>
</template>

<script>
	import UserImage from './UserImage'

	export default {
		components: {
			UserImage
		},
		name: 'DailyPrizes',
		props: {
			isShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				btnid: 'dailyprizes_' + parseInt(Math.random() * 1000000),
				userImage: {
					"url": "/static/image/common/vipgold.png",
					"width": "1.68rem",
					"height": "1.68rem",
				}
			}
		},
	}
</script>

<style scoped>
	.kaitong{
		width: 3.58rem;
		display: block;margin: auto;
	}
	.dailyprizes-userimg{
		position: relative;
		overflow: hidden;
		border-radius: 50%;
	}
	.userimg-price-div{
		position: absolute;
		top: 0;
		left: 0;
		text-align: center;
		height: 100%;
		width: 100%;
		font-size: 0.375rem;
		text-shadow:1px 1px 2px rgba(0,0,0,0.4);
	}
	.dailyprizes-mask{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.68);
		line-height: 1.68rem;
		text-align: center;
		font-size: 0.375rem;
		color: #322C25;
	}
	.userimg-vip-price{
		margin-top: 0;
	}
	.userimg-price{
		margin-top: 0.258rem;
		margin-bottom: 0;
	}
	.dailyprizes-ul{
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		color: #FFFFFF;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.dailyprizes-ul li{
		padding-left: 0.175rem;
		padding-right: 0.175rem;
	}
	.dailyprizes {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 999;
	}
	
	.dailyprizes-center {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 8.86rem;
		margin-left: -4.43rem;
		margin-top: -6rem;
		height: 12rem;
	}
	
	.dailyprizes-center-lingqu {
		width: 4.168rem;
		height: auto;
		margin: auto;
		display: block;
	}
	.dailyprizes-week{
		margin:0.275rem auto 0.375rem auto;
		color: #FFFFFF;
		background-color: rgba(255,255,255,0.2);
		border: 1px solid #FFFFFF;
		border-radius: 20px;
		display: table;
		padding: 0rem 0.375rem;
	}
</style>