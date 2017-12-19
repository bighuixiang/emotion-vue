<template>
	<div class="button-div" id="btnid">
		<span :style="">{{btns.title}}</span>
	</div>
</template>

<script>
	export default {
		name: 'Btn',
		props: {
			btns: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				btnid: 'button_' + Math.random() * 1000000
			}
		},
	}
</script>

<style>
	.button-div {
		border: 2px solid #FFFFFF;
		padding: 0.125rem 0.25rem;
		background-color: #FF5356;
		color: #FFFFFF;
		display: table;
		border-radius: 50rem;
	}
	
	.button-div span {
		font-size: 0.375rem;
		background: url(/static/meinv.jpg) no-repeat center left;
		background-size: 0.375rem;
		padding-left: 0.6rem;
	}
</style>