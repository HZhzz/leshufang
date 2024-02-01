<template>
	<view>
		<view v-if="topbj" class="boxtopfle">
			<view :style="'height:'+height+'px;'"></view>
			<view style="font-size: 36rpx;color: #333;text-align: center;font-weight: bold;line-height: 88rpx;">乐拍拍</view>
		</view>
		<view class="boxtop">
			<view :style="'height:'+height+'px;'"></view>
			<view style="font-size: 36rpx;color: #333;text-align: center;font-weight: bold;line-height: 64rpx;">乐拍拍</view>
			<view style="padding: 48rpx 24rpx;">
				<view style="display: flex;align-items: flex-start;">
					<view class="imgfle">
						<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" style="width:96rpx;height:96rpx;border-radius: 50%;" class=""></image>
						<image v-else src="../../static/user/1001.png" style="width:96rpx;height:96rpx;border-radius: 50%;" class=""></image>
					</view>
					<view style="padding-left: 20rpx;">
						<view style="font-size: 38rpx;color: #333;font-weight: bold;">{{userInfo.nickName}}</view>
						<view style="font-size: 24rpx;color: #333;padding-top: 10rpx;">ID: {{userInfo.game_user_id}}</view>
						<view class="group" v-if="userInfo.groupid>1">
							<image src="../../static/img/tu.jpg" v-if="userInfo.groupid==2"></image>
							<image src="../../static/img/jin.jpg" v-if="userInfo.groupid==3"></image>
							<image src="../../static/img/shui.jpg" v-if="userInfo.groupid==4"></image>
							<image src="../../static/img/mu.jpg" v-if="userInfo.groupid==5"></image>
							<image src="../../static/img/huo.jpg" v-if="userInfo.groupid==6"></image>
						</view>
					</view>
					<view v-if="config.new_buy=='1'" class="imgfle vip" style="margin-left: 16rpx;">
						<image @click="kaitongClick" src="../../static/user/1013.png" style="width:202rpx;height:64rpx" class=""></image>
						<view class="viptime">VIP到期时间：{{userInfo.vip_time}}</view>
					</view>
				</view>
				<view style="height: 40rpx;"></view>
				<view class="box1bj" v-if="config.new_buy=='0'">
					<view style="font-size: 24rpx;color: #fff;position: absolute;left: 144rpx;bottom: 36rpx;">开通竞拍月卡会员，享自动抢单</view>
					<view  @click="kaitongClick" class="box1btn">立即开通</view>
				</view>
				<view class="box2">
					<view class="imgfle">
						<image src="../../static/user/1004.png" style="width:302rpx;height:62rpx" class=""></image>
					</view>
					<view style="padding-top: 32rpx;display: flex;align-items: center;justify-content: space-between;">
						<view style="width: 50%;font-size: 24rpx;color: #FFE0A3;">
							<view style="padding-left: 32rpx;">
								<view>我的资产</view>
								<view @click="leDou" style="padding-top: 8rpx;font-size: 36rpx;font-weight: bold;">{{userInfo.fen ? userInfo.fen : '0.00'}}乐豆 </view>
							</view>
						</view>
						<view style="width: 50%;font-size: 24rpx;color: #FFE0A3;">
							<view style="padding-left: 32rpx;">
								<view>我的金币</view>
								<view @click="species" style="padding-top: 8rpx;font-size: 36rpx;font-weight: bold;">{{userInfo.goldcoin ? userInfo.goldcoin : '0.00'}}</view>
							</view>
						</view>
					</view>
					<view style="padding:32rpx 16rpx 16rpx 16rpx;">
						<view class="box2-box">
							<view class="box2item">
								<view>持有资产</view>
								<view style="font-size: 28rpx;font-weight: bold;padding-top: 8rpx;">{{userInfocount.hold_price ? userInfocount.hold_price : '0.00'}}</view>
							</view>
							<view class="box2item">
								<view>预计收益</view>
								<view style="font-size: 28rpx;font-weight: bold;padding-top: 8rpx;">{{userInfocount.expected_price ? userInfocount.expected_price : '0.00'}}</view>
							</view>
							
							<view @click="cumulativeGain" class="box2item">
								<view style="display: flex;align-items: center;">
									<view>个人收益</view>
									<view class="imgfle" style="margin-left: 8rpx;">
										<image src="../../static/user/1002.png" style="width:16rpx;height:16rpx" class=""></image>
									</view>
								</view>
								
								<view style="font-size: 28rpx;font-weight: bold;padding-top: 8rpx;">{{userInfocount.total_price ? userInfocount.total_price : '0.00'}}</view>
							</view>
							<view class="box2item">
								
								<view style="display: flex;align-items: center;">
									<view>团队总收益</view>
									<!-- <view class="imgfle" style="margin-left: 8rpx;">
										<image src="../../static/user/1002.png" style="width:16rpx;height:16rpx" class=""></image>
									</view> -->
								</view>
								<view style="font-size: 28rpx;font-weight: bold;padding-top: 8rpx;">{{userInfocount.team_shouyi ? userInfocount.team_shouyi : '0.00'}}</view>
							</view>
							<view @click="directPush" class="box2item">
								
								<view style="display: flex;align-items: center;">
									<view>当月直推收益</view>
									<view class="imgfle" style="margin-left: 8rpx;">
										<image src="../../static/user/1002.png" style="width:16rpx;height:16rpx" class=""></image>
									</view>
								</view>
								<view style="font-size: 28rpx;font-weight: bold;padding-top: 8rpx;">{{userInfocount.push_price ? userInfocount.push_price : '0.00'}}</view>
							</view>
							<view @click="teamList" class="box2item">
								<view style="display: flex;align-items: center;">
									<view>当月团队收益</view>
									<view class="imgfle" style="margin-left: 8rpx;">
										<image src="../../static/user/1002.png" style="width:16rpx;height:16rpx" class=""></image>
									</view>
								</view>
								<view style="font-size: 28rpx;font-weight: bold;padding-top: 8rpx;">{{userInfocount.team_price ? userInfocount.team_price : '0.00'}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box3">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="font-size: 32rpx;color: #333;font-weight: bold;">我的订单</view>
						<view @click="orderClick('60')" style="display: flex;align-items: center;justify-content: flex-end;">
							<view style="font-size: 24rpx;color: #999;">全部订单</view>
							<view class="imgfle">
								<image src="../../static/user/1003.png" style="width:20rpx;height:20rpx" class=""></image>
							</view>
						</view>
					</view>
					<view style="padding: 40rpx 0 16rpx 0;display: flex;align-items: center;justify-content: space-between;">
						<view @click="orderClick('10')" style="width: 25%;text-align: center;">
							<view class="imgfle">
								<image src="../../static/user/1006.png" style="width:64rpx;height:64rpx" class=""></image>
							</view>
							<view style="font-size: 24rpx;color: #333;padding-top: 12rpx;">待付款</view>
						</view>
						<view @click="orderClick('20')" style="width: 25%;text-align: center;">
							<view class="imgfle">
								<image src="../../static/user/1007.png" style="width:64rpx;height:64rpx" class=""></image>
							</view>
							<view style="font-size: 24rpx;color: #333;padding-top: 12rpx;">持有中</view>
						</view>
						<view @click="orderClick('30')" style="width: 20%;text-align: center;">
							<view class="imgfle">
								<image src="../../static/user/1008.png" style="width:64rpx;height:64rpx" class=""></image>
							</view>
							<view style="font-size: 24rpx;color: #333;padding-top: 12rpx;">转售中</view>
						</view>
						
						<view @click="orderClick('40')" style="width: 25%;text-align: center;">
							<view class="imgfle">
								<image src="../../static/user/1009.png" style="width:64rpx;height:64rpx" class=""></image>
							</view>
							<view style="font-size: 24rpx;color: #333;padding-top: 12rpx;">交割中</view>
						</view>
						<view @click="orderClick('50')" style="width: 25%;text-align: center;">
							<view class="imgfle">
								<image src="../../static/user/1010.png" style="width:64rpx;height:64rpx" class=""></image>
							</view>
							<view style="font-size: 24rpx;color: #333;padding-top: 12rpx;">已完成</view>
						</view>
					</view>
				</view>
				<view class="box4">
					<view @click="reservation" class="box4item">
						<view class="box4itemleft">
							<view class="imgfle">
								<image src="../../static/user/1012.png" style="width:32rpx;height:32rpx" class=""></image>
							</view>
							<view style="padding-left: 10rpx;">预约记录</view>
						</view>
						<view>
							<view class="imgfle">
								<image src="../../static/user/1003.png" style="width:24rpx;height:24rpx" class=""></image>
							</view>
						</view>
					</view>
					<view class="box4item" @click="daifuk">
						<view class="box4itemleft">
							<view class="imgfle">
								<image src="../../static/user/1011.png" style="width:32rpx;height:32rpx" class=""></image>
							</view>
							<view style="padding-left: 10rpx;">未付款次数</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: flex-end;">
							<view style="padding-right: 10rpx;">{{userInfocount.not_pay}}</view>
							<view class="imgfle">
								<image src="../../static/user/1003.png" style="width:24rpx;height:24rpx" class=""></image>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 200rpx;"></view>
			</view>
		</view>
		<!-- 开通VIP -->
		<uni-popupfu ref="kaitongvip" type="bottom" >
			<view style="width:100%;height: 600rpx;background-color: #fff;border-radius: 48rpx 48rpx 0 0;">
				<view style="width:100%;height:378rpx;position: relative;">
					<view class="imgfle">
						<image src="../../static/img/1014.png" style="width:100%;height:378rpx" class=""></image>
					</view>
					<view v-if="config.new_buy=='0'" style="width: 166rpx;height: 62rpx;position: absolute;top: 156rpx;right: 74rpx;">
						<image src="../../static/img/1016.png" style="width:166rpx;height:62rpx" class=""></image>
					</view>
					<view style="width:100%;height:378rpx;position:absolute;left: 0;top: 0;">
						<view style="padding: 176rpx 0 0 118rpx;">
							<view style="display: flex;align-items: center;">
								<view class="imgfle">
									<image src="../../static/img/1015.png" style="width:90rpx;height:90rpx" class=""></image>
								</view>
								<view style="font-size: 32rpx;color: #fff;font-weight: bold;padding-left: 8rpx;">竞拍月卡会员</view>
							</view>
						</view>
						<view style="padding:0 92rpx 0 126rpx ;display: flex;align-items: center;justify-content: space-between;color: #fff;font-size: 24rpx;">
							<view>*仅限未购买过的用户所享</view>
							<view>
								<text style="font-size: 52rpx;font-weight: bold;">{{config.new_buy=='0' ? config.first_price : config.second_price}}</text>金币
							</view>
						</view>
					</view>
				</view>
				<view style="padding: 24rpx 0;display: flex;align-items: center;justify-content: center;">
					<view style="padding: 6rpx 24rpx;font-size: 28rpx;color: #693918;background: #FFF4DD;border-radius: 8rpx;">开通竞拍会员享抢单自动付款，无需二次抢单</view>
				</view>
				<view style="padding: 24rpx 32rpx;display: flex;align-items: center;justify-content: space-between;margin-top: 8rpx;">
					<view>
						<text style="font-size: 28rpx;color: #333;">实付</text>
						<text style="font-size: 48rpx;color: #EB5757;font-weight: bold;">{{config.new_buy=='0' ? config.first_price : config.second_price}}</text>
						<text style="font-size: 28rpx;color: #EB5757;">金币</text>
					</view>
					<view @click="zhifuClick" class="popbtn1">去付款</view>
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
					height:0,
					topbj:false,
					userInfo:'',
					config:'',
					userInfocount:''
			
			}
		},
		created() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.statusBarHeight
				}
			});
		},
		onLoad() {
			
		},
		onShow() {
			this.getUserinfo()
			this.getconfig()
		},
		methods:{
			daifuk(){
				uni.navigateTo({
					url:'/pages/order/daifuk'
				})
			},
			getUserinfo(){
				this.$api.getUserInfo().then(res=>{
					this.userInfo=res.data.info
					this.userInfocount=res.data.info.count
				})
			},
			leDou(){
				uni.navigateTo({
					url:'/pages/property/leDou'
				})
			},
			species(){
				uni.navigateTo({
					url:'/pages/property/species'
				})
			},
			cumulativeGain(){
				uni.navigateTo({
					url:'/pages/property/cumulativeGain'
				})
			},
			directPush(){
				uni.navigateTo({
					url:'/pages/property/directPush'
				})
			},
			teamList(){
				uni.navigateTo({
					url:'/pages/property/teamList'
				})
			},
			orderClick(e){
				uni.navigateTo({
					url:'/pages/order/orderIndex?type='+e
				})
			},
			reservation(){
				uni.navigateTo({
					url:'/pages/order/reservation'
				})
			},
			// 开通会员
			getconfig(){
				this.$api.getConfig().then(res=>{
					this.config=res.data.VipInfo
				})
			},
			
			kaitongClick(){
				this.$refs.kaitongvip.open()
			},
			zhifuClick(){
				this.$api.postUserVipServer().then(res=>{
					this.$refs.kaitongvip.close()
					uni.showToast({
						title:'续费成功'
					})
					this.getUserinfo()
					this.getconfig()
				})
			},
			onPageScroll(res) {
				if (res.scrollTop > 200) {
					this.topbj = true
				} else {
					this.topbj = false
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;height: 100vh;background: #F3F3F3;
	}
	.boxtopfle{
		width: 100%;background-color:#FFD8A2 ;position: fixed;left: 0;top: 0;z-index: 999;
	}
	.boxtop{
			width: 100%;height: 448rpx;
	background: linear-gradient(180deg, #FFD8A2 0%, #F3F3F3 100%);
		}
		.box1bj{
			width: 100%;height: 168rpx;
			background: url(../../static/user/1005.png) no-repeat;
			background-size: 100% 100%;box-sizing: border-box;
			margin-top: 20rpx;position: relative;
		}
	.box1btn{
		width: 154rpx;
		height: 58rpx;
		background: linear-gradient(90deg, #F7E3CB 0%, #FDEFE0 48%, #F1D2B3 100%);
		border-radius: 44rpx 44rpx 44rpx 44rpx;
		text-align: center;line-height: 58rpx;font-size: 28rpx;color: #333;position: absolute;
		top: 54rpx;right: 32rpx;
	}
	.box2{
		width: 100%;
		height: 498rpx;
		background: linear-gradient(90deg, #4E4C49 0%, #353027 100%);
		border-radius: 16rpx 16rpx 16rpx 16rpx;margin: 20rpx auto 0;
	}
	.box2-box{
		padding: 32rpx 32rpx 0 32rpx;
		background: linear-gradient(180deg, #FFF8EC 0%, #FFF5E6 100%);
		border-radius: 16rpx;
		display: flex;align-items: center;flex-wrap: wrap;
	}
	.box2item{
		width: 33.3%;font-size:24rpx;color: #333;
		padding-bottom: 32rpx;
	}
	.box3{
		padding: 32rpx;border-radius: 16rpx;background-color: #fff;margin-top: 20rpx;
	}
	.box4item{
		padding: 32rpx;border-radius: 16rpx;background-color: #fff;margin-top: 20rpx;display: flex;align-items: center;justify-content: space-between;
	}
	.box4itemleft{
		display: flex;align-items: center;font-size: 28rpx;color: #333;
	}
	.popbtn1{
		width: 184rpx;
		height: 68rpx;
		background: linear-gradient(133deg, #231E1D 0%, #454442 100%, #464443 100%, #464543 100%);
		border-radius: 16rpx;text-align: center;line-height: 68rpx;
		font-size: 28rpx;color: #fff;
	}
	.vip{
		flex-direction: column;
		align-items: flex-start;
		margin-left: 40rpx;
	}
	.viptime{
		font-size: 24rpx;
		padding-top: 30rpx;
	}
	.group{
		width: 50rpx;
		height: 50rpx;
		image{
			width: 45rpx;
			height: 45rpx;
			border-radius: 100%;
		}
	}
</style>