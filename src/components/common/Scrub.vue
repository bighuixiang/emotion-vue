<template>
	<div :style="imageStyleObj" class="scrub" :id="btnid"></div>
</template>
<!--图片磨砂效果组件-->
<script>
	export default {
		name: 'Scrub',
		props: {
			images: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				btnid: 'userimage_' + parseInt(Math.random() * 1000000),
				imageObj: {
					border: "none",
					width: "1rem",
					height: "1rem",
					borderRadius: "50%",
					filter: 20
				},
				imageStyleObj: {},
			}
		},
		mounted() {
			this.initScrub();
		},
		methods: {
			initScrub() {
				let self = this
				if(self.images.border)
					self.imageObj.border = self.images.border
				if(self.images.width)
					self.imageObj.width = self.images.width
				if(self.images.height)
					self.imageObj.height = self.images.height
				if(self.images.borderRadius)
					self.imageObj.borderRadius = self.images.borderRadius
				if(self.images.url)
					self.imageObj.url = self.images.url;
				if(self.images.filter)
					self.imageObj.filter = self.images.filter;
				self.imageStyleObj = {
					"border": self.imageObj.border,
					"width": self.imageObj.width,
					"height": self.imageObj.height,
					"border-radius": self.imageObj.borderRadius,
				}
				if(self.imageObj.url) {
					var style = window.document.createElement('style');
					window.document.getElementById(self.btnid).appendChild(style);
					var sheet = style.sheet;
					var styleStr = "background:url(" + self.imageObj.url + ") 50%/cover;";
					styleStr += "filter: blur(" + self.imageObj.filter + "px);";
					sheet.addRule("#" + self.btnid + '::before', styleStr);
				}
			}
		}
	}
</script>

<style scoped>
	.scrub {
		position: relative;
		background: hsla(0, 0%, 100%, .3);
		overflow: hidden;
		border-radius: 50px;
		height: 100%;
		width: 100%;
	}
	
	.scrub::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		filter: blur(20px);
		margin: -30px;
	}
</style>