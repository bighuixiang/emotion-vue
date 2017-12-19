<template>
	<div :style="{'background':'url(' +images.url+ ') 50%/ cover rgba(0,0,0,0.2)','border':images.border,'width':images.width,'height':images.height,'border-radius':images.borderRadius}" :id="btnid"></div>
</template>
<!--用户头像组件-->
<script>
	export default {
		name: 'UserImage',
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
					url: '',
					border: "none",
					width: "1rem",
					height: "1rem",
					borderRadius: "50%",
				},
				imageStyleObj: {},
			}
		},
		mounted() {
			let self = this
			if(!self.images.border)
				self.images.border = self.imageObj.border
			if(!self.images.width)
				self.images.width = self.imageObj.width
			if(!self.images.height)
				self.images.height = self.imageObj.height
			if(!self.images.borderRadius)
				self.images.borderRadius = self.imageObj.borderRadius

		},
	}
</script>