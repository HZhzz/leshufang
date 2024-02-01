<template>
	<view>
		<view class="order-details">
			<view class="header-bg"></view>
			<view class="main">
				<view class="header">
					<view class="item" v-if="orderDetail.order_status == 0">
						<view class="white lg m-b-10">等待买家付款</view>
						<view class="white sm flex" v-if="cancelTime > 0">支付剩余 <u-count-down separator="zh"
								:timestamp="cancelTime" separator-color="#fff" color="#fff" :separator-size="26"
								:font-size="26" bg-color="transparent" @end="getOrderDetailFun"></u-count-down> 自动关闭
						</view>
					</view>
					<view class="item" v-if="orderDetail.order_status == 1 && !orderDetail.pickup_code">
						<view class="white lg m-b-10">等待商家发货</view>
						<view class="white sm">您的商品正在打包中，请耐心等待…</view>
					</view>
					<view class="item" v-if="orderDetail.order_status == 1 && orderDetail.pickup_code">
						<view class="white lg m-b-10">待取货</view>
						<view class="white sm">请前往门店取货</view>
					</view>
					<view class="item" v-if="orderDetail.order_status == 2">
						<view class="white lg m-b-10">已发货</view>
						<view class="white sm">您的商品正在路中，请耐心等待…</view>
					</view>
					<view class="item" v-if="orderDetail.order_status == 3">
						<view class="white lg m-b-10">已完成</view>
						<view class="white sm">商品已签收，期待再次购买！</view>
					</view>
					<view class="item" v-if="orderDetail.order_status == 4">
						<view class="white lg m-b-10">订单已关闭</view>
						<!-- <view class="white sm">原因：超时未支付</view> -->
					</view>
				</view>
				<view class="address-wrap flex contain">
					<image class="icon-md m-r-20" src="/static/images/icon_address.png"></image>
					<view class="address">
						<view>
							<text class="name md m-r-10">{{orderDetail.consignee}}</text>
							<text class="phone md">{{orderDetail.mobile}}</text>
							<view class="area sm m-t-10 lighter">{{orderDetail.delivery_address}}</view>
						</view>
					</view>
				</view>

				<view class="order-info contain" v-if="team.status_text">
					<view class="item flex" style="align-items: flex-start;">
						<view class="title">拼购状态</view>
						<view class="bt">{{team.status_text}}</view>
					</view>
				</view>

				<view class="goods contain">
					<view class="m-l-20">
						<shop-title :shop="orderDetail.shop"></shop-title>
					</view>

					<order-goods :team="team" :link="true" :isJumpGoods="true" :list="orderDetail.order_goods"></order-goods>
				</view>
                
                <!-- 虚拟发货内容 -->
                <template v-if="orderDetail.delivery_content">
                    <view class="order-info contain" @click="copy(orderDetail.delivery_content)">
                    	<view class="item">
                    		<view class="black" style="word-break: break-all;">{{orderDetail.delivery_content || '无'}}</view>
                            <view class="flex row-right m-t-30">
                                <view class="copy-btn">复制</view>
                            </view>
                    	</view>
                    </view>
                </template>
				
				<!-- 扫码收货 -->
				<view v-if="orderDetail.delivery_type == 2 " class="contain receive">
					<!-- <view v-if="orderDetail.verification_status" class="delivery--die">
						<u-image src="/static/images/delivery_die.png" width="134" height="98" mode="scaleFill" />
					</view>
				 -->
					
					<view class="receive-qr" v-if="orderDetail.show_pickup_code"> 
						<text class="xs lighter">请凭二维码取货</text>
						<view class="m-t-20 qr-contain" :class="{'qr-contain--die': orderDetail.verification_status}" ref="qr-image">
							<tki-qrcode
							  ref="qrcode"
							  uni="px"
							  :val="orderDetail.pickup_code"
							  :size="118 * 2"
							  :showLoading="false"
							/>
						</view>
						<view class="m-t-30 xs black qr-code">提货码：{{ orderDetail.pickup_code }}</view>
					</view>
					
					<view class="p-30 flex col-top">
						<view style="width: 140rpx;" class="bold">店铺地址: </view>
						<view style="width: 500rpx;">
							{{ orderDetail.shop_address }}
						</view>
					</view>
				</view>
                
				<view class="price contain">
					<view class="flex row-between">
						<view>商品金额</view>
						<view class="black">
							<price-format :price="orderDetail.goods_price"></price-format>
						</view>
					</view>
					<view class="flex row-between">
						<view>运费</view>
						<view class="black">+
							<price-format :price="orderDetail.shipping_price"></price-format>
						</view>
					</view>
					<view v-if="orderDetail.discount_amount != 0" class="flex row-between">
						<view>优惠券</view>
						<view class="primary">-
							<price-format :price="orderDetail.discount_amount"></price-format>
						</view>
					</view>
					<view v-if="orderDetail.member_amount" class="flex row-between">
						<view>会员抵扣</view>
						<view class="primary">-
							<price-format :price="orderDetail.member_amount"></price-format>
						</view>
					</view>
					<view class="flex row-right">
						<view class="lighter">实付金额：</view>
						<view class="primary xl">
							<price-format weight="500" :first-size="34" :second-size="34"
								:price="orderDetail.order_amount"></price-format>
						</view>
					</view>
				</view>
				<view class="order-info contain">
					<view class="item flex" style="align-items: flex-start;">
						<view class="title">买家留言</view>
						<view class="black">{{orderDetail.user_remark || '无'}}</view>
					</view>
				</view>
				<view class="order-info contain">
					<view class="item flex">
						<view class="title">订单编号</view>
						<view class="black">{{orderDetail.order_sn}}</view>
					</view>
					<view class="item flex">
						<view class="title">订单类型</view>
						<view class="black">{{orderDetail.order_type}}</view>
					</view>
					<view class="item flex">
						<view class="title">支付方式</view>
						<view class="black">{{orderDetail.pay_way}}</view>
					</view>
					<view class="item flex">
						<view class="title">下单时间</view>
						<view class="black">{{orderDetail.create_time}}</view>
					</view>
					<view v-if="orderDetail.pay_time" class="item flex">
						<view class="title">付款时间</view>
						<view class="black">{{orderDetail.pay_time}}</view>
					</view>
					<view v-if="orderDetail.shipping_time" class="item flex">
						<view class="title">发货时间</view>
						<view class="black">{{orderDetail.shipping_time }}</view>
					</view>
					<view v-if="orderDetail.confirm_take_time" class="item flex">
						<view class="title">成交时间</view>
						<view class="black">{{orderDetail.confirm_take_time }}</view>
					</view>
					<view v-if="orderDetail.cancel_time" class="item flex">
						<view class="title">关闭时间</view>
						<view class="black">{{orderDetail.cancel_time}}</view>
					</view>

				</view>
				<view class="footer bg-white flex fixed row-right"
					v-if="orderDetail.cancel_btn || orderDetail.delivery_btn || orderDetail.take_btn || orderDetail.del_btn || orderDetail.pay_btn || orderDetail.view_invoice_btn || orderDetail.save_invoice_btn">
                    <!-- 左侧更多 -->
					<!-- <view class="more">
                        <view class="flex" v-if="orderDetail.view_invoice_btn || orderDetail.save_invoice_btn" @click="moreStatus=!moreStatus">
                            <text class="m-r-10">更多</text>
                            <u-icon name="arrow-up" size="22"></u-icon>
                        </view>
                        
                        <view class="more-container bg-white" v-show="moreStatus">
                            <navigator v-if="orderDetail.view_invoice_btn" hover-class="none"
                            	:url="'/bundle/pages/invoice_detail/invoice_detail?id=' + orderDetail.id">
                            	<view class="more-item" >查看发票</view>
                            </navigator>
                            
                            <navigator v-if="orderDetail.save_invoice_btn" hover-class="none"
                            	:url="'/bundle/pages/invoice/invoice?shop_id=' + orderDetail.shop.id + '&order_id=' + orderDetail.id + '&type=' + invoiceType">
                            	<view class="more-item">申请开票</view>
                            </navigator>
                        </view>
                    </view> -->
                    <!-- 右侧订单操作按钮组 -->
					<view class="flex">
                        <view v-if="orderDetail.cancel_btn">
                        	<button size="sm" class="plain br60" hover-class="none" @tap="cancelOrder">取消订单</button>
                        </view>
                        <navigator v-if="orderDetail.view_invoice_btn && orderDetail.shop.open_invoice" hover-class="none" class="m-l-20"
                        	:url="'/bundle/pages/invoice_detail/invoice_detail?id=' + orderDetail.id">
                        	<button size="sm" class="plain br60" hover-class="none">查看发票</button>
                        </navigator>
                        <navigator v-if="orderDetail.save_invoice_btn && orderDetail.shop.open_invoice" hover-class="none" class="m-l-20"
                        	:url="'/bundle/pages/invoice/invoice?shop_id=' + orderDetail.shop.id + '&order_id=' + orderDetail.id + '&type=' + invoiceType">
                        	<button size="sm" class="plain br60" hover-class="none">申请开票</button>
                        </navigator>
                        <navigator v-if="orderDetail.delivery_btn" hover-class="none" class="m-l-20"
                        	:url="'/bundle/pages/goods_logistics/goods_logistics?id=' + orderDetail.id">
                        	<button size="sm" class="plain br60" hover-class="none">查看物流</button>
                        </navigator>
                        <view v-if="orderDetail.take_btn" class="m-l-20">
                        	<button size="sm" class="plain br60 primary red" hover-class="none"
                        		@tap.stop="comfirmOrder">确认收货</button>
                        </view>
                        <view v-if="orderDetail.del_btn" class="m-l-20">
                        	<button size="sm" class="plain br60" hover-class="none" @tap="delOrder">删除订单</button>
                        </view>
                        <view class="m-l-20" v-if="orderDetail.pay_btn">
                        	<button size="sm" class="bg-primary br60 white" @tap="payNow">立即付款</button>
                        </view>
                    </view>
				</view>
			</view>
		</view>
		<loading-view v-if="isFirstLoading"></loading-view>
		<order-dialog ref="orderDialog" :orderId="orderDetail.id" :type="type" @confirm="confirmDialog"></order-dialog>
		<loading-view v-if="showLoading" background-color="transparent" :size="50"></loading-view>
		<float-tab></float-tab>
	</view>
</template>

<script>
	import {
		getOrderDetail,
		cancelOrder,
		delOrder,
		confirmOrder
	} from '@/api/order';
    import {
        copy
    } from "@/utils/tools.js"
    import { invoiceType } from "@/utils/type.js"
	export default {
		data() {
			return {
				orderDetail: {
					shop: {}
				},
				team: {},
				isFirstLoading: true,
				type: 0,
				cancelTime: 0,
				showCancel: "",
				showLoading: false,
                moreStatus: false, // 更多
                invoiceType: invoiceType['ORDERDETAILADD']
			};
		},

		onLoad: function(options) {
			const {
				id
			} = this.$Route.query;
			this.id = id;
		},
        
        onShow() {
            this.moreStatus = false;
            this.getOrderDetailFun();
        },

		methods: {
			async confirmDialog() {
				const { type, id } = this
				let res = null
				switch (type) {
					case 0:
						res = await cancelOrder(id);
						break;
				
					case 1:
						res = await delOrder(id);
						break;
				
					case 2:
						res = await confirmOrder(id);
						break;
				}
				if(res.code == 1) {
					uni.$emit("refreshorder")
					
					if ([0, 2].includes(type)) {
						this.getOrderDetailFun();
					} else if (type == 1) {
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					}
				}
				
			},
            
            // 打开弹窗 
			dialogOpen() {
				this.$refs.orderDialog.open()
			},
            
            // 删除订单
			delOrder() {
				this.type = 1
				this.$nextTick(() => {
					this.dialogOpen();
				});
			},
            
            // 确认订单
			comfirmOrder() {
				this.type = 2
				this.$nextTick(() => {
					this.dialogOpen();
				});
			},
            
            // 取消订单
			cancelOrder() {
				this.type = 0
				this.$nextTick(() => {
					this.dialogOpen();
				});
			},
            
            // 支付
			payNow() {
				uni.$on('payment', params => {
					setTimeout(() => {
						if (params.result) {
							this.$toast({ title: "支付成功" })
							this.getOrderDetailFun();
							uni.$emit("refreshorder")
							uni.$off("payment")
						} else {
							this.$toast({ title: "支付失败" })
						}
					}, 500)
				})
				
				uni.navigateTo({
					url: `/pages/payment/payment?from=${'order'}&order_id=${this.id}`
				})
			},
            
            // 请求订单详情
			getOrderDetailFun() {
				getOrderDetail(this.id).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.cancelTime = res.data.order_cancel_time - Date.now() / 1000;
						this.orderDetail = res.data
						this.team = res.data.team || {}
						this.$nextTick(() => {
							this.isFirstLoading = false
							if (res.data.delivery_type === 2) {
								const refQR = this.$refs['qrcode']
								refQR._makeCode()
							}
						});
					} else {
						setTimeout(() => uni.navigateBack(), 1500)
					}
				});
			},
            
            // 复制内容
            copy(content) {
                copy(content)
            }
		}
	};
</script>
<style lang="scss">
	.bt {
		width: 100%;
		text-align: right;
	}

	.order-details {
		position: relative;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

	.order-details .header-bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 200rpx;
		background-color: $-color-primary;
		z-index: 0;
	}

	.order-details .goods .status {
		height: 88rpx;
		padding: 0 20rpx;
	}

	.order-details .main {
		position: relative;
		z-index: 1;
	}

	.order-details .contain {
		margin: 0 20rpx 20rpx;
		border-radius: 14rpx;
		background-color: #fff;
	}

	.order-details .header {
		padding: 24rpx 40rpx;
		box-sizing: border-box;
	}

	.order-details .img-line {
		height: 1.5px;
		width: 100%;
		display: block;
	}

	.order-details .address-wrap {
		height: 164rpx;
		padding: 0 24rpx;
	}

	.order-details .order-info {
		padding: 12rpx 0;
	}

	.order-details .order-info .item {
		padding: 12rpx 24rpx;
	}
    
    .order-details .order-info .copy-btn {
        font-size: 24rpx;
        padding: 6rpx 18rpx;
        border-radius: 8rpx;
        color: $-color-primary;
        background: rgba($color: $-color-primary, $alpha: .1);
    }

	.order-details .order-info .item .title {
		width: 180rpx;
		flex: none;
	}
	
	
	.receive-qr {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 460rpx;
	}
	
	.qr-contain {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 140px;
		height: 140px;
		padding: 8px;
		// border: 1px solid #CCCCCC;
		border-radius: 5px;
	}
	
	.qr-contain--die {
		position: relative;
	}
	
	.qr-contain--die::before {
		position: absolute;
		z-index: 99;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: block;
		content: '';
		background-color: rgba(255, 255, 255, .5);
	}
	
	.qr-code {
		padding: 8rpx 30rpx;
		border-radius: 60px;
		background-color: #F6F6F6;
	}
	

	.order-details .price>view {
		height: 60rpx;
		padding: 0 24rpx;
	}

	.order-details .footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		padding: 0 24rpx;
		box-sizing: content-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.footer .plain {
		border: 1px solid #BBBBBB;
	}

	.footer .plain.red {
		border: 1px solid $-color-primary;
	}

	.tips-dialog {
		height: 230rpx;
		width: 100%;
	}

	.order-details .invite-btn {
		background: linear-gradient(270deg, #FF2C3C 0%, #F95F2F 100%);
		margin: 30rpx 26rpx 40rpx;
	}
    
    // 点击更多
    .more {
        position: relative;
        .more-container {
            width: 200rpx;
            bottom: 70rpx;
            left: -20rpx;
            position: absolute;
            border: 1px solid #e9e9e9;
            .more-item {
                padding: 10rpx 20rpx;
                text-align: center;
                border-top: 1px solid #e9e9e9;
            }
            .more-item:first-child {
                border-top: 0;
            }
        }
    }
</style>
