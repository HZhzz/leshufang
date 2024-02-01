<template>
	<view>
		<view class="box-top">
			<view :style="'height:'+height+'px;'"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view @click="fanhui" class="imgfle">
					<image src="../../static/img/1010.png" style="width:64rpx;height:64rpx" class=""></image>
				</view>
				<view style="font-size: 32rpx;color: #333;font-weight: bold;">我的订单</view>
				<view style="width: 88rpx;height: 88rpx;"></view>
			</view>
			<view style="height: 88rpx;display: flex;align-items: center;justify-content: space-between;">
				<view @click="typeClick('60')" class="box-navBar-tit">
					<view :class="queryData.status=='60' ? 'box-navBar-s' :'box-navBar-b'">全部</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 25upx;">
						<view :class="queryData.status=='60' ? 'bors' : 'bor'"></view>
					</view>
				</view>
				<view @click="typeClick('10')" class="box-navBar-tit">
					<view :class="queryData.status=='10' ? 'box-navBar-s' :'box-navBar-b'">待付款</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 25upx;">
						<view :class="queryData.status=='10' ? 'bors' : 'bor'"></view>
					</view>
				</view>
				<view @click="typeClick('20')" class="box-navBar-tit">
					<view :class="queryData.status=='20' ? 'box-navBar-s' :'box-navBar-b'">持有中</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 25upx;">
						<view :class="queryData.status=='20' ? 'bors' : 'bor'"></view>
					</view>
				</view>
				<view @click="typeClick('30')" class="box-navBar-tit">
					<view :class="queryData.status=='30' ? 'box-navBar-s' :'box-navBar-b'">转售中</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 25upx;">
						<view :class="queryData.status=='30' ? 'bors' : 'bor'"></view>
					</view>
				</view>
				<view @click="typeClick('40')" class="box-navBar-tit">
					<view :class="queryData.status=='40' ? 'box-navBar-s' :'box-navBar-b'">交割中</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 25upx;">
						<view :class="queryData.status=='40' ? 'bors' : 'bor'"></view>
					</view>
				</view>
				<view @click="typeClick('50')" class="box-navBar-tit">
					<view :class="queryData.status=='50' ? 'box-navBar-s' :'box-navBar-b'">已完成</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 25upx;">
						<view :class="queryData.status=='50' ? 'bors' : 'bor'"></view>
					</view>
				</view>
			</view>
		</view>
		<view>
				<view :style="'height:'+height+'px;'"></view>
				<view style="height: 180rpx;"></view>
				<view v-if="total>0" style="padding: 16rpx;">
					<view class="boxitem" v-for="(item,index) in orderlist" :key="index">
						<view style="padding: 32rpx;display: flex;align-items: center;justify-content: space-between;border-bottom: 1rpx solid #EEEEEE;">
							<view style="font-size: 32rpx;color: #333;font-weight: bold;">{{item.goods.goods_name}}</view>
							<view style="font-size:26rpx;color: #EB5757;">{{item.status_text}}</view>
						</view>
						<view style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;border-bottom: 1rpx solid #EEEEEE;">
							<view class="imgfle" style="width: 188rpx;position: relative;">
								<image :src="item.goods.goods_image" style="width:188rpx;height:188rpx;border-radius: 12rpx;" class=""></image>
								<view class="box3qishu" v-if="item.source!='1'">{{item.goods.issues_text}}</view>
							</view>
							<view style="width: 68%;display: flex;align-content: space-between;flex-wrap: wrap;">
								<view style="width: 100%;font-size: 26rpx;color: #666;">拍到价格：{{item.total_price}} 乐豆</view>
								<view style="width: 100%;font-size: 26rpx;color: #666;">预计收益：{{item.income_price}} 乐豆</view>
								
								
								<view>
									<view style="width: 100%;font-size: 26rpx;color: #666;" v-if="item.source!='1'">付款时间：{{item.pay_time}}</view>
									<view style="width: 100%;font-size: 26rpx;color: #666;" v-if="item.source=='1'">竞拍时间：全天</view>
									<view style="width: 100%;font-size: 26rpx;color: #666;" v-else>预计到期：{{item.expire_time}}</view>
									
								</view>
								<view style="width: 100%;font-size: 26rpx;color: #666;" v-if="item.source!='1'">总价值：{{count(item.total_price,item.income_price).toFixed(2)}} 乐豆</view>
								<view style="width: 100%;font-size: 26rpx;color: #666;" >订单号：{{item.order_no}}</view>
								<!--  -->
							</view>
						</view>
						<view style="padding: 24rpx 0;display: flex;align-items: center;justify-content: space-between;" v-if="item.show_pay=='1'">
							<view style="font-size: 32rpx;color: #333;font-weight: bold;"><text style="color: #EF3F3F;" >{{item.total_price}}</text>乐豆</view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<!-- <view v-if="item.status=='10'" @click="quxiao(item.order_no)" class="imgfle" style="margin-left: 32rpx;">
									<image src="../../static/img/1018.png" style="width:172rpx;height:68rpx" class=""></image>
								</view> -->
								<view @click="jiaogeisel(item)" v-if="item.status=='40'" class="imgfle" style="margin-left: 32rpx;">
									<image src="../../static/img/1022.png" style="width:172rpx;height:68rpx" class=""></image>
								</view>
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
		<!-- 请选择交割物品 -->
		<uni-popupfu ref="jiaogeiselopen" type="center" >
			<view style="width: 668rpx;height: 842rpx;border-radius: 32rpx;background-color: #fff;">
				<view style="padding: 64rpx 32rpx;">
					<view style="font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">请选择交割物品</view>
					<view style="padding-top:40rpx;">
						<scroll-view style="height:500rpx;" scroll-y="true" class="scroll-Y">
							<view class="boxitempop" v-for="(item,index) in goodsList" :key="index">
								<view class="imgfle">
									<image :src="item.gift_image" style="width:180rpx;height:180rpx;border-radius: 12rpx;" class=""></image>
								</view>
								<view style="width: 60%;display: flex;align-items: center;justify-content: space-between;">
									<view style="font-size: 32rpx;color: #333;font-weight: bold;">{{item.gift_name}}</view>
									<view class="imgfle" @click="giftClick(item.gift_id)">
										<image v-if="gift_id==item.gift_id" src="../../static/img/1024.png" style="width:44rpx;height:44rpx" class=""></image>
										<image v-else src="../../static/img/1023.png" style="width:44rpx;height:44rpx" class=""></image>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 32rpx;">
						<view @click="guanbi('jiaogeiselopen')" class="yyqrbtn1">取消</view>
						<view @click="submitClick" class="yyqrbtn2">确认选择</view>
					</view>
					
					<!-- <view @click="guanbi('qingpaiopen2')" class="popbtn2">知道了</view> -->
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
					status:'60',
					page: 1, // 当前页码
				},
				per_page:'',
				total: 0,
				orderlist:[],
				goodsList:[],
				gift_id:''
			}
		},
		onLoad(e) {
			if(e.type){
				this.queryData.status=e.type
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
				this.orderinfoList();
			}
		},
		methods:{
			TimestampToDate(timestamp){
				    timestamp = timestamp ? timestamp : null;
				    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					console.log(date)
				    let Y = date.getFullYear() + '-';
				    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				    return Y + M + D + h + m + s;
				// let date1 = new Date(time);
				// console.log(date1)
				// return date1.toLocaleDateString().replace(/\//g,"-")+" "+date1.toTimeString().substr(0,8)
			},
			count(item,item1){
				return Number.parseFloat(item)+Number.parseFloat(item1)
			},
			// 
			jiaogeisel(e){
				this.items=e
				let postdata={
					goods_id:e.goods_id
				}
				this.$api.getGoodsGiftList(postdata).then(res=>{
					if(res.code=='1'){
						this.goodsList=res.data.list
						this.$refs.jiaogeiselopen.open()
						
					}
				})
				
			},
			handleOrderEdit(item){
				console.log(item,uni.getStorageSync('orderItem'),11111);
				if(uni.getStorageSync('orderItem')!=''&&uni.getStorageSync('orderItem')!='{}'){
					console.log(777777777)
					uni.setStorageSync('orderItem',{})
				}
				uni.navigateTo({
					url:'/pages/order/orderedit'
				})
				uni.setStorageSync('orderItem',item)
			},
			giftClick(e){
				this.gift_id=e
			},
			submitClick(){
				if(this.gift_id==''){
					uni.showToast({
						title: '请选择交割物品',
						icon: 'none',
						duration: 1500
					});
					return
				}
				let postdata={
					gift_id:this.gift_id,
					order_no:this.items.order_no
				}
				this.$api.setUserOrderExchange(postdata).then(res=>{
					if(res.code=='1'){
						uni.showToast({
							title:res.msg,
							icon: 'none',
							duration: 1500
						});
						this.gift_id=''
						this.items=''
						this.$refs.jiaogeiselopen.close()
						this.onRefresh();
						
					}
				})
			},
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
				this.gift_id=''
			},
			onRefresh() {
				this.queryData.page = 1;
			    this.orderlist=[]
				this.total = 0;
				this.orderinfoList();
			},
			orderinfoList(){
				let postdata={}
				if(this.queryData.status=='60'){
					postdata.status=''
					postdata.page=this.queryData.page
					
				}else{
					postdata.status=this.queryData.status
					postdata.page=this.queryData.page
				}
				this.$api.getOrderList(postdata).then(res=>{
					res.data.list.data.forEach((item,index)=>{
						let str = item.create_time.split(' ')
						item.create_time = str[0]
					})
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
	.boxitempop{
		padding: 20rpx;display: flex;align-items: center;justify-content: space-between;border-radius: 14rpx;margin-bottom: 32rpx;border: 2rpx solid #BABABA;
	}
	.boxitempops{
		padding: 20rpx;display: flex;align-items: center;justify-content: space-between;border-radius: 14rpx;margin-bottom: 32rpx;border: 2rpx solid #333;
	}
	.yyqrbtn1{
		width: 272rpx;
		height: 98rpx;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		border: 2rpx solid #999999;text-align: center;line-height: 98rpx;font-size: 32rpx;color: #999;
	}
	.yyqrbtn2{
		width: 272rpx;
		height: 98rpx;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		background: linear-gradient(90deg, #231E1D 0%, #454442 100%, #AD76FF 100%);
		text-align: center;line-height: 98rpx;font-size: 32rpx;color: #fff;
	}
</style>