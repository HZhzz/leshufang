<template>
	<view>
		<view v-if="total>0" style="padding: 24rpx;">
			<view class="boxitem" v-for="(item,index) in goodList" :key="index">
				<view class="boxtop">
					<view class="boxtit">{{item.goods.goods_name}}</view>
					<view class="f289">{{item.create_time}}</view>
				</view>
				<view style="padding: 32rpx 0;display:flex;align-items: flex-start;justify-content: space-between;">
					<view class="imgfle" style="width:160rpx;height:160rpx;border-radius: 12rpx;border: 2rpx solid #333333;">
						<image :src="item.goods.goods_image" style="width:160rpx;height:160rpx;border-radius: 12rpx;" class=""></image>
					</view>
					<view style="width: 72%;">
						<view style="padding: 12rpx 12rpx;background: #F8F8F8;border-radius: 16rpx;">
							<!-- <view class="boxconitem">
								<view class="imgfle">
									<image :src="item.goods.goods_image" style="width:60rpx;height:60rpx;" class=""></image>
								</view>
								<view>{{item.goods.goods_name}}</view>
							</view> -->
							<view class="boxconitem">
								<view>预约金</view>
								<view class="f289" style="color: #333;">{{item.goods.margin_price}} 乐豆</view>
							</view>
							<view class="boxconitem">
								<view>总增值</view>
								<view class="f289" style="color: #333;">{{item.goods.static_price}}%/ {{item.goods.daynum}} 天</view>
							</view>
							<view class="boxconitem">
								<view>竞拍时间</view>
								<view class="f289" style="color: #333;">{{item.goods.starttime}}-{{item.goods.endtime}}</view>
							</view>
							<view class="boxconitem">
								<view>预约时间</view>
								<view class="f289" style="color: #333;">{{item.update_time}}</view>
							</view>
							<view class="boxconitem-orderon">
								<view>订单号</view>
								<view class="f289" style="color: #333;">{{item.order_no}}</view>
							</view>
						</view>
						
					</view>
					
				</view>
			</view>
		</view>
		<view v-else>
			<view class="imgfle" style="padding-top: 20vh;">
				<image src="../../static/img/1017.png" style="width:372rpx;height:372rpx" class=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				queryData: {
					list_rows: '10',	//显示数量
					page: 1, // 当前页码
				
				},
				per_page:'',
				total: 0,
				goodList:[],
			}
		},
		onShow() {
			this.onRefresh();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.onRefresh();
		},
		// 上拉加载
		onReachBottom() {
			if (this.queryData.page * this.per_page < this.total) {
				this.queryData.page++;
				this.homeinfoList();
			}
		},
		methods:{
			onRefresh() {
				this.queryData.page = 1;
				this.goodList = [];
				this.total = 0;
				this.homeinfoList();
			},
			homeinfoList(){
				this.$api.getUserMakeLog(this.queryData).then(res=>{
					this.goodList = this.goodList.concat(res.data.list.data);
					this.total = res.data.list.total;
					this.per_page = res.data.list.per_page;
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>

<style>
	page{
		width: 100%;height: 100vh;background: #F3F3F3;
	}
	.boxitem{
		padding: 0 28rpx;background-color: #fff;border-radius: 16rpx;margin-bottom: 20rpx;
	}
	.boxtop{
		display: flex;align-items: center;justify-content: space-between;padding: 32rpx;border-bottom: 2rpx solid #F2F2F2;
	}
	.boxtit{
		font-size: 32rpx;color: #333;font-weight: bold;
	}
	.f289{
		font-size: 28rpx;color: #999;
	}
	.boxconitem{
		display: flex;align-items: center;justify-content: space-between;
		padding: 16rpx 0;font-size: 22rpx;color: #666;
	}
	.boxconitem-orderon{
		display: flex;align-items: center;justify-content: space-between;
		padding: 16rpx 0;font-size: 22rpx;color: #666;
	}
</style>