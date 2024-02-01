

<template>
	<mescroll-uni ref="mescrollRef" top="80rpx" @init="mescrollInit" @down="downCallback" @up="upCallback"
		:down="downOption" :up="upOption">
		<view class="order-list">
			<view v-for="(item, index) in orderList" :key="index" class="order-item bg-white m-t-20">
				<router-link :to="{path: '/bundle/pages/order_details/order_details', query: {id: item.id}}">
					<view class="order-header flex row-between">
						<view class="flex">
							<view v-if="item.order_type == 1" class="m-r-10">
								<u-tag text="秒杀" size="mini" type="primary" mode="plain" />
							</view>
							<view v-if="item.order_type == 2" class="m-r-10">
								<u-tag text="拼团" size="mini" type="primary" mode="plain" />
							</view>
							<view v-if="item.order_type == 3" class="m-r-10">
								<u-tag text="砍价" size="mini" type="primary" mode="plain" />
							</view>
							<view v-if="item.delivery_type == 2" class="m-r-10">
								<u-tag text="自提" size="mini" type="success" mode="dark" />
							</view>
						</view>
						<shop-title :shop="item.shop"></shop-title>
						<view :class="item.order_status == 4 ? 'muted' : 'primary'">
							<template v-if="item.delivery_type != 2">
								{{getOrderStatus(item.order_status)}}
							</template>
							<template v-else>
								{{ item.order_status_desc }} 
							</template>
						</view>
					</view>
					<view class="order-con">
						<order-goods :list="item.order_goods" :isJumpGoods="false"></order-goods>
						<view class="all-price flex row-right">
							<text class="muted xs">共{{item.goods_count}}件商品，实付款：</text>
							<price-format weight="500" :subscript-size="30" :first-size="30" :second-size="30"
								:price="item.order_amount"></price-format>
						</view>
					</view>
					<view class="order-footer flex"
						v-if="item.cancel_btn || item.delivery_btn || item.take_btn || item.del_btn || item.pay_btn || item.comment_btn || item.pickup_btn">
						<view style="flex: 1">
							<view class="primary flex sm" v-if="getCancelTime(item.order_cancel_time) > 0">
								<u-count-down separator="zh" 
									:timestamp="getCancelTime(item.order_cancel_time)" :separator-color="colorConfig.primary"
									:color="colorConfig.primary" :separator-size="26" :font-size="26" bg-color="transparent"
									@end="refresh"></u-count-down>
							</view>
						</view>
						<view v-if="item.cancel_btn">
							<button size="sm" class="plain br60 lighter" hover-class="none"
								@tap.stop="cancelOrder(item.id)">
								取消订单
							</button>
						</view>
						<view v-if="item.delivery_btn" @tap.stop="">
							<router-link
								:to="{path: '/bundle/pages/goods_logistics/goods_logistics', query: {id: item.id}}">
								<button size="sm" class="btn plain br60 lighter" hover-class="none">查看物流</button>
							</router-link>
						</view>
                        <view v-if="item.content_btn" @tap.stop="" class="m-l-20">
                        	<router-link
                        		:to="{path: '/bundle/pages/order_details/order_details', query: {id: item.id}}">
                        		<button size="sm" class="btn plain br60 lighter" hover-class="none">查看内容</button>
                        	</router-link>
                        </view>
                        <view v-if="item.pickup_btn" @tap.stop="" class="m-l-20">
                        	<router-link
                        		:to="{path: '/bundle/pages/order_details/order_details', query: {id: item.id}}">
                        		<button size="sm" class="btn bg-primary plain br60 white" style="border: none;" hover-class="none">查看取货码</button>
                        	</router-link>
                        </view>
						<view v-if="item.del_btn">
							<button size="sm" class="btn plain br60 lighter" hover-class="none"
								@tap.stop="delOrder(item.id)">删除订单</button>
						</view>
						<view v-if="item.pay_btn" class="m-l-20">
							<button size="sm" class="btn bg-primary br60 white" @tap.stop="payNow(item.id)">
								立即付款
							</button>
						</view>
						<view v-if="item.comment_btn" class="m-l-20">
							<button size="sm" hover-class="none" class="btn plain btn br60 primary red">
								去评价
							</button>
						</view>
						<view v-if="item.take_btn" class="m-l-20">
							<button size="sm" class="btn plain br60 primary red" hover-class="none"
								@tap.stop="comfirmOrder(item.id)">确认收货</button>
						</view>
					</view>
				</router-link>
			</view>
		</view>
		<order-dialog ref="orderDialog" :order-id="orderId" :type="type" @confirm="confirmDialog"></order-dialog>
		<loading-view v-if="showLoading" background-color="transparent" :size="50"></loading-view>
	</mescroll-uni>
</template>


<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	import {
		getOrderList,
		cancelOrder,
		delOrder,
		confirmOrder
	} from '@/api/order';
	
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
				orderList: [],
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						icon: '/static/images/order_null.png',
						tip: '暂无订单~', // 提示
						fixed: true
					}
				},
				showCancel: false,
				type: 0,
				orderId: "",
				showLoading: false
			};
		},
		props: {
			orderType: {
				type: String
			}
		},
		created() {
			uni.$on("refreshorder", () => {
				this.refresh()
			})
			
			uni.$on('payment', params => {
				setTimeout(() => {
					if (params.result) {
						this.$toast({ title: "支付成功" })
						this.refresh()
					} else {
						this.$toast({ title: "支付失败" })
					}
				}, 500)
			})
		},
		destroyed() {
			uni.$off("payment")
			uni.$off("refreshorder")
		},
		methods: {
			async confirmDialog() {
				const { type, orderId } = this
				let res = null
				switch (type) {
					case 0:
						res = await cancelOrder(orderId);
						break;
				
					case 1:
						res = await delOrder(orderId);
						break;
				
					case 2:
						res = await confirmOrder(orderId);
						break;
				}
				
				if (res.code == 1) {
					this.refresh()
					this.$toast({
						title: res.msg
					});
				}
			},
			dialogOpen() {
				this.$refs.orderDialog.open()
			},
			refresh() {
				this.mescroll.resetUpScroll() 
			},
			delOrder(id) {
				this.orderId = id
				this.type = 1
				this.$nextTick(() => {
					this.dialogOpen();
				});
			},

			comfirmOrder(id) {
				this.orderId = id
				this.type = 2
				this.$nextTick(() => {
					this.dialogOpen();
				});
			},

			cancelOrder(id) {
				this.orderId = id
				this.type = 0
				this.$nextTick(() => {
					this.dialogOpen();
				});
			},

			payNow(id) {
				uni.navigateTo({
					url: `/pages/payment/payment?from=${'order'}&order_id=${id}`
				})
			},
			
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				let {
					orderType,
				} = this;
				getOrderList({
					page_size: pageSize,
					page_no: pageNum,
					type: orderType
				}).then(({
					data
				}) => {
					let curPageData = data.list;
					let curPageLen = curPageData.length;
					let hasNext = !!data.more;
					if (page.num == 1) this.orderList = [];
					this.orderList = this.orderList.concat(curPageData);
					this.mescroll.endSuccess(curPageLen, hasNext);
				})
			},



		},
		computed: {
			getOrderStatus() {
				return (status) => {
					let text = ''
					switch (status) {
						case 0:
							text = '待支付';
							break;
						case 1:
							text = '待发货';
							break;
						case 2:
							text = '待收货';
							break;
						case 3:
							text = '已完成';
							break;
						case 4:
							text = '订单已关闭';
							break;
					}
					return text
				}
			},
			getCancelTime() {
				return (time) => time - Date.now() / 1000
			}
		}
	};
</script>
<style lang="scss">
	.order-list {
		min-height: calc(100vh - 80rpx);
		padding: 0 20rpx;
		overflow: hidden;

		.order-item {
			border-radius: 10rpx;

			.order-header {
				height: 80rpx;
				padding: 0 24rpx;
				border-bottom: 1px dotted #E5E5E5;
			}

			.all-price {
				text-align: right;
				padding: 0 24rpx 20rpx;
			}

			.order-footer {
				height: 100rpx;
				border-top: $-solid-border;
				padding: 0 24rpx;

				.plain {
					border: 1px solid #BBBBBB;

					&.red {
						border-color: $-color-primary;
					}

				}
			}
		}
	}
</style>
