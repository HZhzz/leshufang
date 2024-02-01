<template>
	<!--  -->
	<view>
		<view v-if="topbj" class="boxtopfle">
			<view :style="'height:'+height+'px;'"></view>
			<view style="font-size: 36rpx;color: #333;text-align: center;font-weight: bold;line-height: 88rpx;">乐拍拍</view>
		</view>
		<view class="boxtop">
			<view :style="'height:'+height+'px;'"></view>
			<view style="font-size: 36rpx;color: #333;text-align: center;font-weight: bold;line-height: 64rpx;">乐拍拍</view>
			<view style="padding: 32rpx 24rpx;">
				<view class="box1">
					<view class="box-con">
						<view style="padding: 44rpx 0;display: flex;align-items: center;justify-content: space-between;">
							<view @click="leDou" style="width: 50%;">
								<view style="padding-left: 32rpx;">
									<view style="display: flex;align-items: center;">
										<view style="font-size: 28rpx;color: #333;">我的乐豆</view>
										<view class="imgfle">
											<image src="../../static/img/1013.png" style="width:28rpx;height:28rpx" class=""></image>
										</view>
									</view>
									
									<view style="font-size:42rpx;color: #333;font-weight: bold;">{{userInfo.fen ? userInfo.fen : '0.00'}}</view>
								</view>
							</view>
							<view @click="species" style="width: 50%;">
								<view style="padding-left: 32rpx;">
									<view style="display: flex;align-items: center;">
										<view style="font-size: 28rpx;color: #333;">我的金币</view>
										<view class="imgfle">
											<image src="../../static/img/1013.png" style="width:28rpx;height:28rpx" class=""></image>
										</view>
									</view>
									<view style="font-size: 42rpx;color: #333;font-weight: bold;">{{userInfo.goldcoin ? userInfo.goldcoin :'0.00'}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="box1-bj">
						<view style="padding: 24rpx 0 16rpx 0;display: flex;align-items: center;justify-content: space-between;">
							<view @click="leDouZhuanClick" style="width: 49.5%;text-align: center;font-size: 28rpx;color: #fff;">乐豆划转 </view>
							<view style="width: 2rpx;background: #FFFFFF;height: 44rpx;"></view>
							<view @click="goldCoinTransferClick" style="width: 49.5%;text-align: center;font-size: 28rpx;color: #fff;">金币划转 </view>
						</view>
					</view>
					
				</view>
				<view class="box2" v-if="xinglist">
					<view style="padding: 24rpx;">
						<view style="display: flex;align-items: center;">
							<view class="imgfle">
								<image src="../../static/img/1011.png" style="width:136rpx;height:40rpx" class=""></image>
							</view>
							<view class="box2btn">新用户七日内可参与</view>
						</view>
						<view class="box2-con" v-for="(item,index) in xinglist" :key="index">
							<view class="imgfle">
								<image :src="item.goods_image" style="width:176rpx;height:176rpx" class=""></image>
							</view>
							<view style="width: 68%;">
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<view style="font-size: 28rpx;color: #333;font-weight: bold;">{{item.goods_name}}</view>
									<view style="font-size: 28rpx;color: #333;">
										<text style="font-size: 28rpx;color: #EF3F3F;font-weight: bold;">{{item.min_price}}</text>
										<text>乐豆</text>
									</view>
								</view>
								<view style="padding-top: 20rpx;display: flex;align-items: flex-end;justify-content: space-between;">
									<view style="font-size: 26rpx;color: #666666;">
										<!-- <view><text>预约金：</text><text style="color: #333;">{{item.margin_price}}</text> <text>乐豆</text></view> -->
										<view style="padding: 10rpx 0;"><text>总增值：</text><text style="color: #333;">{{item.static_price}}</text>%/<text style="color: #333;">{{item.daynum}}</text> <text>天</text></view>
										<view><text>竞拍时间：</text><text style="color: #333;">全天</text> </view>
										<!-- {{item.starttime}}-{{item.endtime}} -->
									</view>
									<view @click="yuyueClick(item)" v-if="item.status=='1'" class="qingpai">预约</view>
									<view @click="qiangpais(item)" v-if="item.status=='6'" class="qingpai">抢拍</view>
									<view  v-if="item.status=='3'" class="qingpais">待开始</view>
									<view  v-if="item.status=='4'" class="qingpais">已预约</view>
									<view  v-if="item.status=='5'" class="qingpais">已参与</view>
									<view  v-if="item.status=='7'" class="qingpais">抢拍</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="box3">
					<view style="padding: 38rpx 0 28rpx 0;display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">	
							<view class="imgfle">
								<image src="../../static/img/1012.png" style="width:222rpx;height:42rpx" class=""></image>
							</view>
							<view @click="guizheClick" class="guizhe">规则</view>
						</view>
						
						<!-- <view v-if="config.new_buy=='1'">
							<switch :checked="checkeds" @change="switch1Change" color="#2C2C2C" style="transform:scale(0.7)"/>
						</view> -->
					</view>
					<view class="" v-if="total>0">
						<view class="box3-item" v-for="(item,index) in goodList" :key="index">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view class="imgfle" style="width: 156rpx;height: 156rpx;position: relative;">
									<image :src="item.goods_image" style="width:156rpx;height:156rpx" class=""></image>
									<view class="box3qishu">{{item.issues.title}}</view>
								</view>
								<view style="width: 73%;">
									<view style="display: flex;align-items: center;justify-content: space-between;">
										<view style="font-size: 28rpx;color: #333;font-weight: bold;">{{item.goods_name}}</view>
										<view style="font-size: 28rpx;color: #333;">
											<text style="font-size: 28rpx;color: #EF3F3F;font-weight: bold;">{{item.min_price}}-{{item.max_price}}</text>
											<text>乐豆</text>
										</view>
									</view>
									<view style="padding-top: 20rpx;display: flex;align-items: center;justify-content: space-between;">
										<view style="font-size: 26rpx;color: #666666;">
											<view><text>预约金：</text><text style="color: #333;">{{item.margin_price}}</text> <text>乐豆</text></view>
											<view style="padding: 10rpx 0;"><text>总增值：</text><text style="color: #333;">{{item.static_price}}</text>%/<text style="color: #333;">{{item.daynum}}</text> <text>天</text></view>
											<view><text>竞拍时间：</text><text style="color: #333;">{{item.starttime}}-{{item.endtime}}</text> </view>
										</view>
										<view @click="yuyueClick(item)" v-if="item.status=='1'" class="imgfle">
											<image src="../../static/img/1004.png" style="width:176rpx;height:70rpx" class=""></image>
										</view>
										<view @click="qiangpai(item)" v-if="item.status=='6'" class="imgfle">
											<image  src="../../static/img/1005.png" style="width:176rpx;height:70rpx" class=""></image>							
										</view>
										<view  v-if="item.status=='3'" class="imgfle">
											<image  src="../../static/img/1006.png" style="width:176rpx;height:70rpx" class=""></image>							
										</view>
										<view  v-if="item.status=='4'" class="imgfle">
											
											<image src="../../static/img/1007.png" style="width:176rpx;height:70rpx" class=""></image>	
										</view>
										<view v-if="item.status=='5'" class="imgfle">
											<image  src="../../static/img/1008.png" style="width:176rpx;height:70rpx" class=""></image>
										</view>
										<view v-if="item.status=='7'" class="imgfle">
											<image  src="../../static/img/1021.png" style="width:176rpx;height:70rpx" class=""></image>
										</view>
										
									</view>
								</view>
							</view>
						
						</view>
					</view>
					<view v-else>
						<view class="imgfle" style="padding: 5vh 0;">
							<image src="../../static/img/1017.png" style="width:372rpx;height:372rpx" class=""></image>
						</view>
					</view>
				</view>
				<view style="height: 200rpx;"></view>
			</view>
		</view>
		<!-- 乐豆划转 -->
		<uni-popupfu ref="leDouZhuan" type="center" >
				<view style="width: 668rpx;height: 574rpx;background-color: #fff;border-radius: 32rpx;">
					<view style="padding: 32rpx;">
						<view style="padding-top: 12rpx;font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">乐豆划转</view>
						<view class="boxbtn">
							<view @click="ledouTypeClick('1')" :class="formdata.op=='1' ? 'btnsels' : 'btnsel'">转入</view>
							<view @click="ledouTypeClick('2')" :class="formdata.op=='2' ? 'btnsels' : 'btnsel'">转出</view>
						</view>
						<view style="margin-top: 32rpx;">
							<view style="font-size: 28rpx;color: #333;font-weight: bold;">乐豆数量</view>
							<view class="popinput">
								<input type="number" v-model="formdata.num" placeholder="请输入" style="" class="" />
							</view>
						</view>
						<view class="popbtn1" @click="ledousubmitClick">确认划转</view>
					</view>
					
				</view>
		</uni-popupfu>
		<!-- 金币划转 -->
		<uni-popupfu ref="goldCoinTransfer" type="center" >
				<view style="width: 668rpx;height: 574rpx;background-color: #fff;border-radius: 32rpx;">
					<view style="padding: 32rpx;">
						<view style="padding-top: 12rpx;font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">金币划转</view>
						<view class="boxbtn">
							<view @click="jingbiTypeClick('1')" :class="formdata2.op=='1' ? 'btnsels' : 'btnsel'">转入</view>
							<view @click="jingbiTypeClick('2')" :class="formdata2.op=='2' ? 'btnsels' : 'btnsel'">转出</view>
						</view>
						<view style="margin-top: 32rpx;">
							<view style="font-size: 28rpx;color: #333;font-weight: bold;">金币数量</view>
							<view class="popinput">
								<input type="number" v-model="formdata2.num" placeholder="请输入" style="" class="" />
							</view>
						</view>
						<view class="popbtn1" @click="jingbisubmitClick">确认划转</view>
					</view>
					
				</view>
		</uni-popupfu>
		<!-- 预约 -->
		<uni-popupfu ref="yuyueopen" type="center" >
			<view style="width: 668rpx;height: 474rpx;border-radius: 32rpx;background-color: #fff;">
				<view style="padding: 64rpx 52rpx;">
					<view style="font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">预约成功</view>
					<view style="font-size: 28rpx;color: #333;text-align: center;padding-top: 32rpx;">
						已从本账户扣除{{items.margin_price}}乐豆，本场竞拍将于
						<text style="color: #CDA457;">{{items.starttime}}</text>开始，
						<text style="color: #CDA457;">{{items.endtime}}</text>结束
					</view>
					<view @click="guanbi('yuyueopen')" class="popbtn2">我知道了</view>
				</view>
			</view>

		</uni-popupfu>
		<!-- 抢单成功待付款 -->
		<uni-popupfu ref="qingpaiopen" type="center" >
			<view style="width: 668rpx;height: 596rpx;border-radius: 32rpx;background-color: #fff;">
				<view style="padding: 64rpx 52rpx;">
					<view style="font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">抢单成功</view>
					<view style="font-size: 28rpx;color: #333;text-align: center;padding-top: 32rpx;">
						您当前所竞拍期数已成功抢单，请于两小时内支付订单，支付成功将退回预约金。
					</view>
					<view style="text-align: center;font-size: 28rpx;color: #333;padding-top: 32rpx;">
						<text style="font-size: 64rpx;font-weight: bold;color: #CDA457;">{{items.margin_price}}</text>乐豆
					</view>
				<!-- 	<view style="text-align:center;font-size: 28rpx;color: #333;padding-top: 12rpx;">
						当前剩余时间:<text style="font-size: 32rpx;color: CDA457;font-weight: bold;">1:23:23</text>
					</view> -->
					<view @click="querenpay" class="popbtn2">确认支付</view>
				</view>
			</view>
		
		</uni-popupfu>
		<!-- 抢单成功 -->
		<uni-popupfu ref="qingpaiopen2" type="center" >
			<view style="width: 668rpx;height: 596rpx;border-radius: 32rpx;background-color: #fff;">
				<view style="padding: 64rpx 52rpx;">
					<view style="font-size: 40rpx;color: #333;font-weight: bold;text-align: center;">抢单成功</view>
					<view style="font-size: 28rpx;color: #333;text-align: center;padding-top: 32rpx;">
						您当前所竞拍期数已成功抢单，已从当前账户扣除相应乐豆，预约金已退回账户。
					</view>
					<view style="text-align: center;font-size: 28rpx;color: #333;padding-top: 32rpx;">
						<text style="font-size: 64rpx;font-weight: bold;color: #CDA457;">{{items.margin_price}}</text>乐豆
					</view>
					
					<view @click="guanbi('qingpaiopen2')" class="popbtn2">知道了</view>
				</view>
			</view>
		
		</uni-popupfu>
		<!-- 预约确认 -->
		<uni-popupfu ref="yyqropen" type="center" >
			<view class="" style="width: 668rpx;height:434rpx;background-color: #fff;border-radius: 32rpx;">
				<view style="padding: 52rpx;">
					<view style="font-size: 40rpx;text-align: center;color: #333;font-weight: bold;">预约确认</view>
					<view style="text-align: center;font-size: 28rpx;color: #333;padding: 32rpx 0;">是否确认预约</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 32rpx;">
						<view @click="guanbi('yyqropen')" class="yyqrbtn1">取消</view>
						<view @click="yuyuesubcitClick" class="yyqrbtn2">确认预约</view>
					</view>
				</view>
			</view>
		</uni-popupfu>
		<!-- 抢单失败 -->
		<uni-popupfu ref="qiandanerr" type="center" >
			<view class="" style="width: 668rpx;height:474rpx;background-color: #fff;border-radius: 32rpx;">
				<view style="padding: 52rpx;">
					<view style="font-size: 40rpx;text-align: center;color: #333;font-weight: bold;">抢单失败</view>
					<view style="text-align: center;font-size: 28rpx;color: #333;padding: 32rpx 0;">您当前所竞拍期数抢单失败，预约金已退回账户。</view>
					<view @click="guanbi('qiandanerr')" class="popbtn2">知道了</view>
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
				xinglist:[],
				items:'',
				height:0,
				topbj:false,
				userInfo:'',
				formdata:{
					op:'1',//1 增加 2 减少
					num:'',
				},
				formdata2:{
					op:'1',//1 增加 2 减少
					num:'',
				},
				queryData: {
					list_rows: '10',	//显示数量
					page: 1, // 当前页码
				
				},
				per_page:'',
				total: 0,
				goodList:[],
				checkeds:false,
				order_no:'',
				jwt:'',
				config:''
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
		onLoad(e) {
			// this.jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE4MTQ3MzAsInRva2VuIjoiZWRjNTY2Njc4ZWNlNzk4ZWJkNmNmZmM1ZDg5NDE2MmE3MmQzYzczYSJ9.XDVEAAfHsgqjHh430EaUPLN4WnDHbsQ1bGn7XysGG40'
			if(e.jwt){
			// if(this.jwt){
		
				this.jwt=e.jwt
				this.getinfo()
			}else{
				this.getUserinfo()
				this.infolist()
				this.onRefresh();
				this.getconfig()
			}
		},
		onShow() {
			// this.getUserinfo()
			
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.onRefresh();
			this.getUserinfo()
			this.infolist()
			
		},
		// 上拉加载
		onReachBottom() {
			if (this.queryData.page * this.per_page < this.total) {
				this.queryData.page++;
				this.homeinfoList();
			}
		},
		methods:{
			ledouTypeClick(e){
				this.formdata.op=e
			},
			jingbiTypeClick(e){
				this.formdata2.op=e
			},
			getconfig(){
				this.$api.getConfig().then(res=>{
					this.config=res.data.VipInfo
				})
			},
			getinfo(){
				let postdata={
					jwt:this.jwt
				}
				console.log(postdata.jwt);
				 // uni.removeStorageSync('token');
				this.$api.getPullUserInfo(postdata).then(res=>{
					if(res.code=='1'){
						let token=res.data.token
						uni.setStorageSync('token', token);
						this.$nextTick(()=>{
							this.getUserinfo()
							this.infolist()
							this.onRefresh();
							this.getconfig()
						})
					}
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
			 switch1Change(e) {
			    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				this.$api.setUserAutoPay().then(res=>{
					this.getUserinfo()
				})
			},
			onRefresh() {
				this.queryData.page = 1;
				this.goodList = [];
				this.total = 0;
				this.homeinfoList();
			},
			homeinfoList(){
				this.$api.getListAll(this.queryData).then(res=>{
					this.goodList = this.goodList.concat(res.data.list.data);
					this.total = res.data.list.total;
					this.per_page = res.data.list.per_page;
					uni.stopPullDownRefresh()
				})
			},
			getUserinfo(){
				this.$api.getUserInfo().then(res=>{
					this.userInfo=res.data.info
					this.$forceUpdate()
					if(this.userInfo.auto_pay=='1'){
						this.checkeds=true
					}else{
						this.checkeds=false
					}
				})
				// this.$api.setUserUpdate().then(res=>{
				// 	// this.userInfo=res.data.info
				// })
			},
			infolist(){
				let postdata={
					list_rows:'1',
					page:'1'
				}
				this.$api.getNewUserListAll(postdata).then(res=>{
					this.xinglist=res.data.list.data
					// this.userInfo=res.data.info
				})
			},
			// 乐豆划转
			leDouZhuanClick(){
				this.$refs.leDouZhuan.open()
			},
			ledousubmitClick(){
				if(this.formdata.num==''){
					uni.showToast({
						title: '请输入转入乐豆数量',
						icon: 'none',
						duration: 1500
					});
					return
				}
				this.$api.getHanldUserFen(this.formdata).then(res=>{
					if(res.code=='1'){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						this.formdata.num=''
						this.getUserinfo()
						this.$refs.leDouZhuan.close()
					}
				})
			},
			// 金币划转
			goldCoinTransferClick(){
				this.$refs.goldCoinTransfer.open()
			},
			jingbisubmitClick(){
				if(this.formdata2.num==''){
					uni.showToast({
						title: '请输入转入乐豆数量',
						icon: 'none',
						duration: 1500
					});
					return
				}
				this.$api.getHanldUserGold(this.formdata2).then(res=>{
					if(res.code=='1'){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						this.formdata2.num=''
						this.getUserinfo()
						this.$refs.goldCoinTransfer.close()
					}
				})
			},
			// 预约
			yuyueClick(e){
				let that = this
				that.items=e
				that.$refs.yyqropen.open()
				
				// uni.showModal({
				// 	title: '预约确认',
				// 	content: '是否确认预约？',
				// 	success: function(res) {
				// 		if (res.confirm) {
							
				// 			let postdata={
				// 				goods_id:e.goods_id							
				// 			}
				// 			that.$api.postMakeOrder(postdata).then(res=>{
				// 				if(res.code=='1'){
				// 					uni.showToast({
				// 						title: res.msg,
				// 						icon: 'none',
				// 						duration: 2000
				// 					});
				// 					that.$refs.yuyueopen.open()
				// 					that.getUserinfo()
				// 					that.infolist()
				// 					that.onRefresh();
				// 				}else{
				// 					uni.showToast({
				// 						title: res.msg,
				// 						icon: 'none',
				// 						duration: 2000
				// 					});
				// 				}
				// 			})
							
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				// let postdata={
				// 	goods_id:e.goods_id
				// }
				// this.$api.postMakeOrder(postdata).then(res=>{
				// 	if(res.code=='1'){
				// 		this.$refs.yuyueopen.open()
				// 		this.getUserinfo()
				// 		this.infolist()
				// 		this.onRefresh();
				// 	}
				// })
			},
			yuyuesubcitClick(){
				let postdata={
					goods_id:this.items.goods_id
				}
				
				this.$api.postMakeOrder(postdata).then(res=>{
					if(res.code=='1'){
						this.$refs.yyqropen.close()
						this.$refs.yuyueopen.open()
						this.getUserinfo()
						this.infolist()
						this.onRefresh();
					}
				})
			},
			guanbi(e){
				this.$refs[e].close()
			},
			qiangpais(e){
				this.items=e
				let postdata={
					goods_id:e.goods_id
				}
				this.$api.postCreateOrder(postdata).then(res=>{
					if(res.code=='1'){
						
						this.$refs.qingpaiopen2.open()
						this.getUserinfo()
						this.infolist()
						this.onRefresh();
						// this.$refs.yuyueopen.open()
						// this.getUserinfo()
						// this.infolist()
						// this.onRefresh();
					}
				})
			},
			qiangpai(e){
				this.items=e
				this.querenpay()
				// // this.$refs.qingpaiopen.open()
				// // this.$refs.qingpaiopen2.open()
				// let postdata={
				// 	goods_id:e.goods_id
				// }
				// this.$api.postCreateOrder(postdata).then(res=>{
				// 	if(res.code=='1'){
				// 		if(res.data.order_no){
				// 			this.order_no=res.data.order_no
				// 			this.$refs.qingpaiopen.open()
				// 		}else{
				// 			this.$refs.qingpaiopen2.open()
				// 			this.getUserinfo()
				// 			this.infolist()
				// 			this.onRefresh();
				// 		}
				// 		// this.$refs.yuyueopen.open()
				// 		// this.getUserinfo()
				// 		// this.infolist()
				// 		// this.onRefresh();
				// 	}
				// })
			},
			querenpay(){
				// this.$refs.qingpaiopen.close()
				let postdata={
					order_no:this.items.order_no
				}
				this.$api.getOrderPay(postdata).then(res=>{
					if(res.code=='1'){
						if(res.data.is_refund=='1'){
							this.$refs.qiandanerr.open()
							this.getUserinfo()
							this.infolist()
							this.onRefresh();
						}else{
							this.$refs.qingpaiopen2.open()
							this.getUserinfo()
							this.infolist()
							this.onRefresh();
						}
						
					}
				})
			},
			guizheClick(){
				uni.navigateTo({
					url:'/pages/property/guizhe'
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

<style>
	page{
		width: 100%;height: 100vh;background: #F3F3F3;
	}
	.boxtopfle{
		width: 100%;background-color:#FFD8A2 ;position: fixed;left: 0;top: 0;z-index: 999;
	}
	.boxtop{
		width: 100%;height: 730rpx;
background: linear-gradient(180deg, #FFD8A2 0%, #F3F3F3 100%);
	}
	.box1{
		width: 100%;height: 302rpx;border-radius: 20rpx;position: relative;
		background-color: #fff;
	}
	.box-con{
		width: 100%;height: 226rpx;
/* background: #FFFFFF;
border-radius: 20rpx 20rpx 20rpx 20rpx;
z-index: 99; */
	}
	.box1-bj{
		width: 100%;height: 94rpx;
		background: url(../../static/img/1001.png) no-repeat;
		background-size: 100% 100%;box-sizing: border-box;
		position: absolute;bottom: 0;left: 0;
	
	}
	.box2{
		width:100%;
		height: 348rpx;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		background: linear-gradient(180deg, #414140 0%, #4F4E4D 3%, #333132 100%, #4F4E4C 100%);
		margin-top: 24rpx;
	}
	.box2btn{
		padding: 4rpx 26rpx;
		background: #F3E5BF;
		border-radius: 44rpx 44rpx 44rpx 44rpx;
		font-size: 22rpx;color: #DC914B;
		margin-left: 16rpx;
	}
	.box2-con{
		padding: 28rpx;background: #FFFFFF;border-radius: 16rpx;margin-top: 18rpx;display: flex;align-items: center;justify-content: space-between;
	}
	.qingpai{
		width: 112rpx;
		height: 56rpx;
		background: linear-gradient(90deg, #282828 0%, #2C2B2A 99%, #6A6A6A 99%, #F6C67F 99%, #333333 99%);
		border-radius: 6rpx 6rpx 6rpx 6rpx;
		font-size: 28rpx;color: #fff;text-align: center;line-height: 56rpx;
	}
	.qingpais{
		width: 112rpx;
		height: 56rpx;
		background-color: #666;
		border-radius: 6rpx 6rpx 6rpx 6rpx;
		font-size: 28rpx;color: #fff;text-align: center;line-height: 56rpx;
	}
	.box3-item{
		padding: 40rpx 24rpx 24rpx 24rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 40rpx 40rpx;
		margin-bottom: 20rpx;
	}
	.box3qishu{
		position: absolute;left: 9rpx;bottom: 0rpx;
		width: 138rpx;
		height: 38rpx;
		background: #333333;
		/* background-color: ; */
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		text-align: center;line-height: 38rpx;font-size: 30rpx;color: #fff;
	}
	.popinput{
		margin-top: 20rpx;padding: 28rpx;border-radius: 12rpx 12rpx 12rpx 12rpx;border: 2rpx solid #C9C9C9;
	}
	.popbtn1{
		width: 562rpx;
		height: 98rpx;
		background: linear-gradient(90deg, #231E1D 0%, #454442 100%, #AD76FF 100%);
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		margin: 48rpx auto 0;font-size: 32rpx;color: #fff;font-weight: bold;text-align: center;line-height: 98rpx;
	}
	.popbtn2{
		width: 562rpx;
		height: 98rpx;
		background: linear-gradient(90deg, #231E1D 0%, #454442 100%, #AD76FF 100%);
		border-radius: 12rpx 12rpx 12rpx 12rpx;text-align: center;line-height: 98rpx;
		font-size: 32rpx;color: #fff;font-weight: bold;margin: 64rpx auto 0;
	}
	.guizhe{
		padding: 6rpx 12rpx;
		background: #292929;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		font-size: 20rpx;color: #fff;margin-left: 10rpx;
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
	.boxbtn{
		width: 336rpx;
		height: 60rpx;
		background: #DEDDDD;
		border-radius: 72rpx 72rpx 72rpx 72rpx;margin: 28rpx auto 0;
		display: flex;align-items: center;justify-content: space-between;
	}
	.btnsels{
		width: 168rpx;
		height: 60rpx;
		background: linear-gradient(90deg, #333333 0%, #4E4D4C 100%);
		border-radius: 72rpx 72rpx 72rpx 72rpx;
		text-align: center;line-height: 60rpx;font-size: 32rpx;color: #fff;
	}
	.btnsel{
		width: 168rpx;
		height: 60rpx;
		/* background: linear-gradient(90deg, #333333 0%, #4E4D4C 100%); */
		border-radius: 72rpx 72rpx 72rpx 72rpx;
		text-align: center;line-height: 60rpx;font-size: 32rpx;color: #999999;
	}
</style>