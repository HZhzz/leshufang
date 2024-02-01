<template>
	<view>

		<view class="box-4">
			<view class="box-4-tit">更多功能</view>
			<view class="box-4-list">
				<view @click="tixian" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1005.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">提现</view>
				</view>
				<view @click="duihuanQAopen" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1006.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">兑换</view>
				</view>
				<view @click="balanceDetails('2')" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1008.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">总收益</view>
				</view>
				<view @click="kefu" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1013.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">客服热线</view>
				</view>						
				<view @click="myTeam" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1009.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">我的团队</view>
				</view>
				<view @click="InviteFriends" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1010.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">邀请注册</view>
				</view>
				<view @click="bankList" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1014.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">银行卡</view>
				</view>
				<view @click="addressList" class="box-4-list-item">
					<view class="imgfle">
						<image src="http://thdsh.xsyopin.com/static/user/1012.png" style="width:116rpx;height:116rpx" class=""></image>
					</view>
					<view class="box-4-list-item-name">我的地址</view>
				</view>
				
				
			</view>
		</view>
<!-- 		<view>{{phone}}</view> -->
		<view style="height: 200rpx;"></view>
		<uni-popupfu ref="duihuanqa" type="center"  :maskClick="false">
				<view style="width: 564upx;height: 742upx;border-radius: 24upx;background-color: #FFFFFF;position: relative;">
					<view style="width:88rpx;height:88rpx;position: absolute;top: 0rpx;right: 0rpx;">
						<view @click="guanbi('duihuanqa')" class="imgfle">
							<image src="../../static/img/guanbi.png" style="width:88rpx;height:88rpx" class=""></image>
						</view>				
					</view>
				<view style="padding: 40rpx;">
					<view class="yp-tit">兑换</view>
					<view class="box-up-box">
						<view class="box-up-box-tit">TMC数量</view>
						<view class="box-up-box-inp">
							<input type="text" placeholder="请输入" style="line-height: 34rpx;"class="" />
						</view>
					</view>
					<view style="padding: 24rpx 18rpx;font-size: 28rpx;color: #999;">手续费:0.00</view>
					<view class="box-up-box">
						<view class="box-up-box-tit">预计获得余额</view>
						<view class="box-up-box-inp">
							<input type="text" placeholder="请输入" style="line-height: 34rpx;" class="" />
						</view>
					</view>
					<view style="padding: 24rpx 0;text-align: center;font-size: 28rpx;color: #999;">(兑换比例1:1 , TMC需为100的整倍数)</view>
					<view class="box-pup-btn">
						确认兑换
					</view>
				</view>
				
				</view>
				
		</uni-popupfu>

	</view>
</template>

<script>
	import uniPopupfu from '../../components/uni-popupfu/uni-popupfu.vue'
	import uniPopup from '../../components/uni-popup/uni-popupse.vue'
	export default{
		props:{
			phone:{
				type:String,
				default:''
			}
		},
		components: {
			uniPopup,
			uniPopupfu,
		},
		data(){
			return{
				phone:'10086'
			}
		},
		onShow() {
			// console.log(this.phone)
		},
		onReady() {
			this.getinfo()
			// console.log(this.phone)
		},
		onLaunch() {
			// this.getinfo()
			// console.log(this.phone)
		},
		methods:{
			getinfo(){
				console.log('121212')
				let postdata={}
				this.$requests2('index/setting','post',postdata).then(res=>{
					if(res.data.code=='1'){
					 console.log(res)
					}
				})
			},
			// 
			duihuanQAopen(){
				// uni.showToast({
				// 	title: '暂未开放，敬请期待！',
				// 	icon: 'none',
				// 	duration: 1500
				// });
				// return
				this.$refs.duihuanqa.open()
			},
			duihuanYXKopen(){
				this.$refs.duihuanyxk.open()
			},
			guanbi(e){
				this.$refs[e].close()
			},
			kefu(){
				// console.log()
				// console.log(e)
					let cell =this.phone.toString()
				plus.android.requestPermissions(
					["android.permission.CALL_PHONE"], 
					function(resultObj) {
						var result = 0;
						for (var i = 0; i < resultObj.granted.length; i++) {
							var grantedPermission = resultObj.granted[i];
							console.log('已**的权限：' + grantedPermission);
							result = 1
						}
						for (var i = 0; i < resultObj.deniedPresent.length; i++) {
							var deniedPresentPermission = resultObj.deniedPresent[i];
							console.log('拒绝本次申请的权限：' + deniedPresentPermission);
							result = 0
						}
						for (var i = 0; i < resultObj.deniedAlways.length; i++) {
							var deniedAlwaysPermission = resultObj.deniedAlways[i];
							console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
							result = -1
						}
						console.log(result);
						if(result == 1){
							uni.makePhoneCall({
								 phoneNumber: cell,//电话号码
								success(ress) {
									console.log("拨打电话成功",ress)
								},
								fail(err) {
									console.log("拨打电话失败",'err')
								}
							});
						}else{
							uni.showToast({
								title:"请开启拨号权限",
								icon:"error",
							})
						}
					},
					function(error) {
						console.log('申请权限错误：' + error.code + " = " + error.message);
					}
				);
			},
			// 银行卡
			bankList(){
				uni.showToast({
					title: '暂未开放，敬请期待！',
					icon: 'none',
					duration: 1500
				});
				return
				// uni.navigateTo({
				// 	url:'/pages/wallet/bankList'
				// })
			},
			// 提现
			tixian(){
				uni.showToast({
					title: '暂未开放，敬请期待！',
					icon: 'none',
					duration: 1500
				});
				return
				// uni.navigateTo({
				// 	url:'/pages/wallet/tixian'
				// })
			},
			// 我的团队
			myTeam(){
				// uni.showToast({
				// 	title: '暂未开放，敬请期待！',
				// 	icon: 'none',
				// 	duration: 1500
				// });
				// return
				uni.navigateTo({
					url:'/pages/userCenter/myTeam'
				})
			},
			// 易购金明细
			balanceDetails(e){
				uni.navigateTo({
					url:'/pages/wallet/balanceDetails?type='+e
				})
			},
			// 社区专区
			communityMall(){
				uni.navigateTo({
					url:'/pages/zone/communityMall'
				})
			},
			// 邀请好友
			InviteFriends(){
				uni.navigateTo({
					url:'/pages/userCenter/InviteFriends'
				})
			},
			addressList(){
				uni.navigateTo({
					url:'/pages/address/addressList'
				})
			}
		}
	}
</script>

<style>
	
	.box-4{
		margin-top: 24rpx;border-radius: 16rpx;background-color: #ffffff;
	}
	.box-4-tit{
		padding: 28rpx 0 32rpx 28rpx;font-size: 32rpx;color: #333;
	}
	.box-4-list{
		display: flex;align-items: center;flex-wrap: wrap;
	}
	.box-4-list-item{
		width: 25%;text-align: center;padding-bottom: 36rpx;
	}
	.box-4-list-item-name{
		font-size: 24rpx;color: #666666;padding: 8rpx 0 4rpx 0;
	}
	.yp-tit{
		font-size: 32rpx;color: #333;font-weight: bold;padding: 9rpx 0;text-align: center;
	}
	.box-up-box{
		padding-top: 32rpx;
	}
	.box-up-box-tit{
		font-size: 28rpx;color: #333;font-weight: bold;
	}
	.box-up-box-inp{
		padding: 8rpx;border: 2rpx solid #EEEEEE;margin-top: 12rpx;line-height: 34rpx;
	}
	.box-pup-btn{
		width: 464rpx;
		height: 94rpx;
		background: linear-gradient(173deg, #2AA137 0%, #D3E30C 100%);
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		text-align: center;line-height: 94rpx;margin: 24rpx auto 0;font-size: 32rpx;color: #ffffff;
	}
</style>