<template>
	<div v-show="videos.show" class="videoplayer" :id="btnid">
		<!--x5-video-player-type="h5" x5-video-player-fullscreen="true"-->
		<video :id="videoid" x-webkit-airplay="true" :src="videos.url" playsinline webkit-playsinline="true" x5-video-player-type="h5" preload="auto" :style="{'margin-top':videoMarginTop +'px'}" class="video" type="video/mp4"></video>
	</div>
</template>

<script>
	import enableInlineVideo from 'iphone-inline-video';

	export default {
		name: 'VideoPlayer',
		props: {
			videos: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				btnid: 'videoplayer_' + parseInt(Math.random() * 1000000 + 1),
				videoid: 'videoid_' + parseInt(Math.random() * 1000000),
				videoMarginTop: 0,
				video: null,
			}
		},
		mounted() {
			let self = this
			//			self.$nextTick(function() {
			//				self.playerVideo()
			//			})
		},
		methods: {
			//			playerVideo() {
			//
			//			},
			init() {
				let self = this
				$loading.show('拼命加载中..')
				self.video = document.querySelector("#" + self.videoid);
				self.$nextTick(function() {
					//video.click();
					//					console.log(self.videos)
					//					enableInlineVideo(self.video);
					self.video.play();
					self.handleResize()
				})
				//				self.video.addEventListener('touchstart',
				//					function() {
				//						self.video.play();
				//				});
				self.video.addEventListener('timeupdate', function(e) {
					$loading.hide();
				})

				self.video.addEventListener('ended', function(e) {
					// 播放结束时触发
					self.$emit('onEnded')
					self.videos.show = false
				})
			},
			play() {
				let self = this
				if(self.video != null) {
					self.video.play();
				}
			},
			pause() {
				let self = this
				if(self.video != null) {
					self.video.pause();
				}
			},
			handleResize() {
				var sWidth = 9
				var sHeight = 16
				var width = window.innerWidth
				var height = window.innerHeight
				var marginTop = height - (width * sHeight) / sWidth

				marginTop = Math.round(marginTop)
				if(marginTop < -2) {
					self.videoMarginTop = marginTop / 2
				} else {
					self.videoMarginTop = 0
				}
			}
		}
	}
</script>

<style>
	.videoplayer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		z-index: 886;
		padding: 0;
		/*background-color: #000000;*/
		overflow: hidden;
	}
	
	.IIV::-webkit-media-controls-play-button,
	.IIV::-webkit-media-controls-start-playback-button {
		opacity: 0;
		pointer-events: none;
		width: 5px;
	}
	
	.video {
		width: 100%;
		height: auto;
		/*position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 888;*/
	}
</style>