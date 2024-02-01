<template>
	<view class="boxitem">
		<view @click="detailsClick(data.product_id)"  style="padding: 28rpx;">
			<view class="imgfle">
				<image :src="data.product_image" style="width:290rpx;height:290rpx;border-radius: 12rpx;" class=""></image>
			</view>
			<view class="itemTit">{{data.product_name}}</view>
			<view class="itemprice">
				<view  style="font-size: 26rpx;color: #EB5757;">
					<text style="font-size: 40rpx;font-weight: bold;">{{data.swap_price}}</text>
					<text>置换积分</text>
				</view>
				<view style="display: flex;align-items: center;margin-top: 16rpx;">
					<view class="tihuo">提货</view>
					<view class="jis">寄售</view>
				</view>

<!-- 				<view v-if="data.tmc_price>0" style="display: flex;">
					<view class="itembtn">赠{{data.tmc_price}}TMC</view>
				</view>
				<view v-if="data.bonus_price>0" style="display: flex;">
					<view class="itembtn">赠{{data.bonus_price}}权益积分</view>
				</view>
				<view v-if="data.consume>0" style="display: flex;">
					<view class="itembtn">赠{{data.consume}}消费积分</view>
				</view> -->
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data(){
			return{
				// detailsClick(e)
			}
		},
		methods:{
			detailsClick(e){
				uni.navigateTo({
					url:'/pages/jishou/details?product_id='+e
				})
			}
		}
	}
</script>

<style>
	.boxitem{
		width: 346rpx;
		/* height: 522rpx; */
		background-color: #fff;border-radius: 16rpx;margin-bottom: 20rpx;
	}
	.itemTit{
		font-size: 30rpx;color: #333;padding-top:20rpx ;font-weight: 400;
	}
	.itemprice{
		margin-top: 10rpx;
	}
	.itembtn{
		margin-top: 12rpx;background: linear-gradient(134deg, #21E04B 0%, #179467 100%);
       border-radius: 4rpx 4rpx 4rpx 4rpx;height: 42rpx;line-height: 42rpx;padding: 0 10rpx;
	   font-size: 24rpx;color: #fff;
	}
	.tihuo{
		width: 88rpx;
		height: 50rpx;
		background: linear-gradient(90deg, #FEDA58 0%, #FF993A 100%);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		text-align: center;line-height: 50rpx;font-size: 24rpx;color: #fff;
	}
	.jis{
		width: 88rpx;
		height: 50rpx;
		background: linear-gradient(90deg, #FF6948 0%, #EF5080 100%);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		text-align: center;line-height: 50rpx;font-size: 24rpx;color: #fff;margin-left: 32rpx;
	}
</style>