<template>
	<view>
	
		<view>
				<!-- <view :style="'height:'+height+'px;'"></view>
				<view style="height: 180rpx;"></view> -->
				<view v-if="total>0" style="padding: 16rpx;">
					<view class="boxitem" v-for="(item,index) in orderlist" :key="index">
						<view style="padding: 32rpx;display: flex;align-items: center;justify-content: space-between;border-bottom: 1rpx solid #EEEEEE;">
							<view style="font-size: 32rpx;color: #333;font-weight: bold;">{{item.goods.goods_name}}</view>
							<view style="font-size:26rpx;color: #EB5757;">{{item.status_text}}</view>
						</view>
						<view style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;border-bottom: 1rpx solid #EEEEEE;">
							<view class="imgfle" style="width: 188rpx;height: 188rpx;position: relative;">
								<image :src="item.goods.goods_image" style="width:188rpx;height:188rpx;border-radius: 12rpx;" class=""></image>
								<view class="box3qishu">{{item.goods.issues_text}}</view>
							</view>
							<view style="width: 68%;height: 188rpx;display: flex;align-content: space-between;flex-wrap: wrap;">
								<view style="width: 100%;font-size: 26rpx;color: #666;">预约金：{{item.margin_price}} 乐豆</view>
								<view style="width: 100%;font-size: 26rpx;color: #666;" v-if="item.is_deal=='0'">总增值：{{item.goods.static_price}}%/ {{item.goods.daynum}} 天</view>
								<view style="width: 100%;font-size: 26rpx;color: #666;">竞拍时间：{{item.goods.starttime}}-{{item.goods.endtime}}</view>
								<view style="width: 100%;font-size: 26rpx;color: #666;" v-if="item.show_pay=='1'">竞拍价：{{item.total_price}}乐豆</view>
							</view>
						</view>
						<view style="padding: 24rpx 0;display: flex;align-items: center;justify-content: space-between;" v-if="item.show_pay=='1'">
							<view style="font-size: 32rpx;color: #333;font-weight: bold;"><text style="color: #EF3F3F;" >{{item.total_price}}</text>乐豆</view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<!-- <view v-if="item.status=='10'" @click="quxiao(item.order_no)" class="imgfle" style="margin-left: 32rpx;">
									<image src="../../static/img/1018.png" style="width:172rpx;height:68rpx" class=""></image>
								</view> -->
								<view @click="fukuan(item)" v-if="item.status=='10'" class="imgfle" style="margin-left: 32rpx;">
									<image src="../../static/img/1019.png" style="width:172rpx;height:68rpx" class=""></image>
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
		<!-- 抢单成功 -->
		<uni-popupfu ref="qingpaiopen2" type="center" >
			<view style="width: 668rpx;height: 596rpx;border-radius: 32rpx;background-color: #fff;">
				<view style="padding: 64rpx 52rpx;">
					<view style="font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">抢单成功</view>
					<view style="font-size: 28rpx;color: #333;text-align: center;padding-top: 32rpx;">
						您当前所竞拍期数已成功抢单，已从当前账户扣除相应乐豆，预约金已退回账户。
					</view>
					<view style="text-align: center;font-size: 28rpx;color: #333;padding-top: 32rpx;">
						<text style="font-size: 64rpx;font-weight: bold;color: #CDA457;">{{items.total_price}}</text>乐豆
					</view>
					
					<view @click="guanbi('qingpaiopen2')" class="popbtn2">知道了</view>
				</view>
			</view>
		
		</uni-popupfu>
	</view>
</template>

<script>
	import uniPopupfu from '../../components/uni-popupfu/uni-popupfu.vue'
	import uniPopup from '../../components/uni-popup/uni-popupse.vue'
	export default{
		components:{
			uniPopup,
			uniPopupfu,
		},
		data(){
			return{
				items:'',
				height: '0',
				type:'all',
				queryData: {
				
					page: 1, // 当前页码
				},
				per_page:'',
				total: 0,
				orderlist:[]
			}
		},
		onLoad() {
			// if(e.type){
			// 	this.queryData.status=e.type
			// }
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
		onShow() {
			this.onRefresh()
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
			fukuan(e){
				this.items=e
				this.querenpay()
			},
			querenpay(){
				// this.$refs.qingpaiopen.close()
				let postdata={
					order_no:this.items.order_no
				}
				this.$api.getOrderPay(postdata).then(res=>{
					if(res.code=='1'){
						this.$refs.qingpaiopen2.open()

						this.onRefresh();
					}
				})
			},
			guanbi(e){
				this.$refs[e].close()
			},
			onRefresh() {
				this.queryData.page = 1;
			    this.orderlist=[]
				this.total = 0;
				this.orderinfoList();
			},
			orderinfoList(){
				
				this.$api.getUserNotPayOrder(this.queryData).then(res=>{
					this.orderlist = res.data.list.data;
					this.total = res.data.list.total;
					this.per_page = res.data.list.per_page;
					uni.stopPullDownRefresh()
				})
			},
			fanhui(){
				uni.navigateBack({})
			},
			typeClick(e){
				this.queryData.status=e
				this.onRefresh()
			},
			quxiao(e){
				let that = this
				uni.showModal({
					title: '提示',
					content: '确认要取消该订单吗？',
					success: function(res) {
						if (res.confirm) {
							
							let postdata={
								order_no:e,								
							}
							that.$api.getUserOrderCancel(postdata).then(res=>{
								if(res.code=='1'){
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									});
									that.onRefresh()
								}else{
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									});
								}
							})
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style>
	page{
		width: 100%;height: 100vh;background: #F3F3F3;
	}
	.popbtn2{
		width: 562rpx;
		height: 98rpx;
		background: linear-gradient(90deg, #231E1D 0%, #454442 100%, #AD76FF 100%);
		border-radius: 12rpx 12rpx 12rpx 12rpx;text-align: center;line-height: 98rpx;
		font-size: 32rpx;color: #fff;font-weight: bold;margin: 64rpx auto 0;
	}
	.box-top{
		width: 100%;background-color:#ffffff;position: fixed;left: 0;top: 0;z-index: 99;
	}
	.box-navBar-tit{
		width:20%;text-align: center;padding-top: 10rpx;
	}
	.box-navBar-s{
		color:#333333 ;font-size: 28upx;
	}
	.box-navBar-b{
		color: #999999;font-size: 28upx;
	}
	.bors{
		width: 52upx;height: 8upx;border-radius: 4upx;background: #333333;
	}
	.bor{
		width: 52upx;height: 8upx;border-radius: 4upx;background-color: ;
	}
	.box-con{
			width: 100%;min-height: 95vh;background-color: #FFFFFF;border-radius: 32upx 32upx 0 0;
		}
		.bor-bon{
		width: 100%;height:16upx;background-color:#F5F5F5;
	}
	.boxitem{
		padding: 0 32rpx;background-color: #fff;border-radius: 16rpx;margin-bottom: 20rpx;
	}
	.box3qishu{
		position: absolute;left: 18rpx;bottom: 20rpx;
		width: 138rpx;
		height: 38rpx;
		background: #333333;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		text-align: center;line-height: 38rpx;font-size: 30rpx;color: #fff;
	}
</style>