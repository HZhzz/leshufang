<template>
	<view>
		<view style="padding: 20rpx;">
			<view v-html="content" style="font-size: 32rpx;color: #333;line-height: 36rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:''
			}
		},
		onLoad() {
			this.getinfo()
		},
		methods:{
			getinfo(){
				this.$api.getRule().then(res=>{
					this.content=res.data.data.content
				})
			}
		}
	}
</script>

<style>
	page{
		width: 100%;height: 100vh;background: #F3F3F3;
	}
</style>