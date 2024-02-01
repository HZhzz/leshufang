<template>
	<view>
		<view>
			<view :style="'height:'+height+'px;'"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view @click="fanhui" class="imgfle">
					<image src="../../static/img/1010.png" style="width:64rpx;height:64rpx" class=""></image>
				</view>
				<view style="font-size: 32rpx;color: #333;font-weight: bold;">订单详情</view>
				<view style="width: 88rpx;height: 88rpx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				height:0
			}
		},
		created() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.statusBarHeight
					console.log(that.height);
				}
			});
		},
		onLoad(){
			console.log(uni.getStorageSync('orderItem'));
		},
		onHide() {
			uni.setStorageSync('orderItem','')
		},
		methods:{
			fanhui(){
				uni.navigateBack({})
			},
		}
	}
</script>

<style>
</style>