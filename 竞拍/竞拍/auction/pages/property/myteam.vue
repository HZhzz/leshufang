<template>
	<view>
		<view v-if="topbj" class="boxtopfle">
			<view :style="'height:'+height+'px;'"></view>
			<view style="font-size: 36rpx;color: #333;text-align: center;font-weight: bold;line-height: 88rpx;">我的团队
			</view>
		</view>
		<view class="boxtop">
			<view :style="'height:'+height+'px;'"></view>
			<view style="font-size: 36rpx;color: #333;text-align: center;font-weight: bold;line-height: 64rpx;">我的团队
			</view>
			<view class="teamvip">
				<view class="vip">
					<view class="vipitem">
						<view>{{info.zhituirenshu||0}}</view>
						<view>直推Ai人数</view>
						<text class="border"></text>
						<text class="border-b"></text>
					</view>
					<!-- <view class="vipitem">
						<view>{{info.zhituiviprenshu||0}}</view>
						<view>直推vip人数</view>
					</view> -->
					<view class="vipitem">
						<view>{{info.totalnumber||0}}</view>
						<view>团队总Ai人数</view>
						<text class="border-b"></text>
					</view>
					<view class="vipitem">
						<view>{{info.benyuetongjidata||0}}</view>
						<view>本月新增业绩</view>
						<text class="border"></text>
						<!-- <text class="border-b"></text> -->
					</view>
					<view class="vipitem">
						<view>{{info.shangyuetongjidata||0}}</view>
						<view>上月累计业绩</view>
						<!-- <text class="border-b"></text> -->
					</view>
				</view>
			</view>

			<!-- <view class="tag">
				<view @click="chekTag(1)" :class="tag==1?'select':''">直推</view>
				<view @click="chekTag(2)" :class="tag==2?'select':''">团队</view>
			</view> -->
			<view class="title">我的粉丝</view>
			<view class="teamsum">
				<view class="sum">
					<view class="sumitem">
						<view>{{info.tucount||0}}</view>
						<image src="../../static/img/tu.jpg"></image>
						<!-- <view>土</view> -->
					</view>
					<view class="sumitem">
						<view>{{info.jincount||0}}</view>
						<image src="../../static/img/jin.jpg"></image>
						<!-- <view>金</view> -->
					</view>
					<view class="sumitem">
						<view>{{info.shuicount||0}}</view>
						<image src="../../static/img/shui.jpg"></image>
						<!-- <view>水</view> -->
					</view>
					<view class="sumitem">
						<view>{{info.mucount||0}}</view>
						<image src="../../static/img/mu.jpg"></image>
						<!-- <view>木</view> -->
					</view>
					<view class="sumitem">
						<view>{{info.huocount||0}}</view>
						<image src="../../static/img/huo.jpg"></image>
						<!-- <view>火</view> -->
					</view>
				</view>
			</view>

			<view class="teamuser">
				<scroll-view :scroll-top="scrollTop" @scrolltolower="scrolltolower" lower-threshold="10" scroll-y="true"
					class="scroll-Y list" v-if="list.length>0">
					<!-- <view class="list">
							
						</view> -->
					<view class="listitem" v-for="(item,index) in list" :key="index">
						<view class="img">
							<image :src="item.avatarUrl" mode="widthFix"></image>
						</view>
						<view class="name">
							<view class="name1">{{item.nickName}}</view>
							<view class="leave">
								<image v-if="item.vip" src="../../static/img/vip.png"></image>
								<view class="wuxing" v-if="item.groupid==1">
									<image src="../../static/img/tu.jpg" v-if="item.groupid==2"></image>
									<image src="../../static/img/jin.jpg" v-if="item.groupid==3"></image>
									<image src="../../static/img/shui.jpg" v-if="item.groupid==4"></image>
									<image src="../../static/img/mu.jpg" v-if="item.groupid==5"></image>
									<image src="../../static/img/huo.jpg" v-if="item.groupid==6"></image>
								</view>
							</view>
						</view>

						<view class="yeji">
							<view>
								总业绩：{{ConvertNum(item.tongjidata)}}
							</view>
							<view>
								总AI：{{item.aicount}}
							</view>
						</view>
					</view>

				</scroll-view>

				<view v-else>
					<view class="imgfle" style="padding: 5vh 0;">
						<image src="../../static/img/1017.png" style="width:372rpx;height:372rpx" class=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: 0,
				topbj: false,
				triggered: false,
				tag: 1,
				info: {},
				list: [],
				scrollTop: 0,
				page: 1,
				total: 0
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
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)
			this.getTeam()

		},
		methods: {
			ConvertNum(num) {
				//let p = /^[0-9]+?$/.test(place) ? place : 2;
				//小数点位数
				let _ws = Math.pow(10, 2);
				//基础单位值
				let _b = 1e4;
				//小于最低值，直接返回
				if (num < _b) {
					return num.toFixed(2).toString();
				}
				//返回值
				let _r = '';


				let _strArg = ['', '万', '亿', '万亿'];
				let _i = Math.floor(Math.log(num) / Math.log(_b));
				if (_i > 3) {
					_i = 3;
				}
				_r = Math.floor(num / Math.pow(_b, _i) * _ws) / _ws + _strArg[_i];
				return _r

			},
			getTeam() {
				this.$api.getTeam({
					page: this.page,
					list_rows: 10
				}).then((res) => {
					console.log(res);
					this.info = res.data.result
					this.list = this.list.concat(this.info.xiajiuser.list.data)
					this.total = this.info.xiajiuser.list.total
				})

			},
			chekTag(value) {
				this.tag = value
				this.page = 1
				this.getTeam()
			},
			scrolltolower(e) {
				// console.log(e,11111);
				this.page++;
				if (this.page * 10 >= this.total) {
					console.log(444)
					return
				} else {
					this.getTeam()
				}
			}

		},
		onPageScroll(res) {
			if (res.scrollTop > 200) {
				this.topbj = true
			} else {
				this.topbj = false
			}
		},
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		// height: 100vh;
		background: #F3F3F3;
	}

	.boxtopfle {
		width: 100%;
		background-color: #FFD8A2;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.boxtop {
		width: 100%;
		height: 730rpx;
		background: linear-gradient(180deg, #FFD8A2 0%, #F3F3F3 100%);
	}

	.teamvip,
	.teamsum {
		padding: 32rpx 24rpx;
		background: linear-gradient(180deg, #414140 0%, #4F4E4D 3%, #333132 100%, #4F4E4C 100%);
		// height: 150rpx;
		margin: 0 40rpx;
		border-radius: 40rpx;

		.vip,
		.sum {
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			width: 100%;
			height: 100%;
			border-radius: 40rpx;

			.vipitem{
				width: 50%;
				height: 80rpx;
				position: relative;
				// border-right: 1rpx solid #dedede;
				text-align: center;
				font-size: 28rpx;
				padding: 10rpx 0;
				// margin: 10rpx 0;
				// border-bottom: 1rpx solid #dedede;
				&:nth-of-type(2n) {
					border-right: none;
				}
				&:nth-of-type(3),&:nth-of-type(4){
					border-bottom: none;
				}
				.border{
					width: 3rpx;
					height: 100%;
					position: absolute;
					background-color: #dedede;
					top: 0rpx;
					right: 0rpx;
				}
				.border-b{
					width:100%;
					height: 3rpx;
					position: absolute;
					background-color: #dedede;
					bottom: 0;
					left: 0rpx;
				}
			}

		}
		.vip {
			flex-wrap: wrap;
		}
	}

	.vip {
		padding: 15rpx 0;
	}

	.title {
		margin: 40rpx;
		font-weight: bold;
		font-size: 34rpx;
	}

	.teamsum {

		// height: 220rpx;
		.sum {
			flex-wrap: wrap;
			justify-content: flex-start;
			padding: 10rpx 0;
			height: auto;

			.sumitem {
				// width: 28.5%;
				flex: 1;
				// height: 70rpx;
				border-right: 1rpx solid #dedede;
				text-align: center;
				font-size: 24rpx;
				padding: 0 15rpx;
				margin-bottom: 10rpx;

				image {
					width: 45rpx;
					height: 45rpx;
					border-radius: 100%;
				}

				&:last-of-type,
				&:nth-of-type(3) {
					border: none;
				}
			}
		}
	}

	.teamuser {
		margin: 40rpx;
		// padding-bottom: 40rpx;
		max-height: 1200rpx;
		padding-bottom: 140rpx;
		overflow-y: scroll;

		.list {
			height: 100%;

			// margin-bottom: 160rpx;
			.listitem {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				border-radius: 80rpx;
				background-color: #fff;
				padding: 20rpx 40rpx;

				.img {
					height: 70rpx;
					width: 70rpx;
				}

				image {
					height: 70rpx;
					width: 70rpx;
					border-radius: 100%;
					margin-right: 10rpx;
				}

				view {
					margin-right: 10rpx;
				}

				.name {
					font-size: 28rpx;
					width: 35%;

					.name1 {
						word-break: break-all;
						width: 100%;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}

				.leave {
					// margin-left: auto;
					// width: 45rpx;
					display: flex;

					image {
						width: 45rpx;
						height: 45rpx;
					}
				}

				.wuxing {
					width: 45rpx;

					image {
						width: 45rpx;
						height: 45rpx;
					}
				}

				.yeji {
					font-size: 24rpx;
					margin-left: auto;
				}
			}
		}
	}

	.tag {
		display: flex;
		margin: 40rpx;
		font-weight: bold;
		font-size: 34rpx;

		view {
			padding: 10rpx 30rpx;
			border-radius: 20rpx;
			margin-right: 20rpx;
			background-color: #fff;
			color: #4F4E4D;
		}

		.select {
			color: #fff;
			background: linear-gradient(180deg, #414140 0%, #4F4E4D 3%, #333132 100%, #4F4E4C 100%);
		}
	}
</style>