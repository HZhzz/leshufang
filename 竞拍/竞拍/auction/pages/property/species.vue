<template>
	<view>
		<view style="height:20rpx;background-color: #F8F8F8;"></view>
		<view v-if="total>0" style="padding: 20rpx;">
			<view class="boxitem" v-for="(item,index) in goodList" :key="index">
				<view>
					<view style="font-size: 28rpx;color: #333;font-weight: bold;">{{item.scene}}</view>
					<view style="padding-top: 32rpx;">{{item.create_time}}</view>
					
				</view>
				<view>
					<text style="font-size: 36rpx;color: #EF4F4F;font-weight: bold;" v-if="item.type=='1'">+{{item.money}}</text>
					<text style="font-size: 36rpx;color:#65B56D ;font-weight: bold;" v-if="item.type=='2'">-{{item.money}}</text>
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
		onLoad() {
			
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
				this.$api.getUserGoldLog(this.queryData).then(res=>{
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
	/* page{
		width: 100%;height: 100vh;background: #F3F3F3;
	} */
	.boxitem{
		padding: 32rpx;
		background: #FAFAFA;
		border-radius: 24rpx 24rpx 24rpx 24rpx;
		margin-bottom: 20rpx;display: flex;align-items: center;justify-content: space-between;font-size: 24rpx;color: #999;
	}
</style>