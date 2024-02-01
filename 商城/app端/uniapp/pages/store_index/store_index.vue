<template>
	<view class="store-index">
		<view class="store-header" :style="{ 'background-image': `url(${shopInfo.background})`}">
			<u-navbar :border-bottom="false" :background="{ 'background-image': `url(${shopInfo.background})`, 'background-repeat': 'no-repeat', 'background-size': '100% auto'}"
				:back-bg="'rgba(255, 255, 255, 0.45)'" :back-icon-color="'rgb(255,255,255)'" :is-fixed="true">
				<view class="store-search flex-1">
						<u-search v-model="keyword" bg-color="white" shape="round" placeholder="搜索店内商品" wrap-bg-color="transparent" @search="refresh">
						</u-search>
				</view>
			</u-navbar>
			<view class="store-info m-t-20">
				<view class="flex row-between">
					<view class="flex">
						<u-image width="100rpx" height="100rpx" border-radius="50%" :src="shopInfo.logo" />
						<view class="m-l-20 flex-col col-top">
							<router-link :to="{path: '/pages/store_detail/store_detail', query: {id: shopInfo.id}}">
								<view class="lg white line-1 bold" style="width: 420rpx;">
									{{shopInfo.name}}
									<u-icon name="arrow-right"></u-icon>
								</view>
							</router-link>
							<view class="store-tag xxs m-t-10 white" v-if="shopInfo.type == 1">
							    自营
							</view>
						</view>
					</view>
					<view class="flex row-center white br60 sm flex-none subscribe-btn" :class="{'gray': shopInfo.shop_follow_status === 1}" @tap="changeShopFollowFun">
						{{shopInfo.shop_follow_status === 1 ? '已关注' : '+ 关注'}}
					</view>
				</view>
				<view class="sale-info flex row-between m-t-10">
					<view class="flex">
						<view style="width: 100rpx;" />
						<view class="white m-l-20 xs">
							在售商品：{{shopInfo.on_sale_count}}件
						</view>
					</view>
					<view class="white xs">
						{{shopInfo.visited_num}}人进店
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="content-wrap">
				<view>
					<get-coupon :wrap-style="{'border-bottom': '1px solid #E5E5E5'}" :shop-id="shopInfo.id"></get-coupon>
				</view>
				<view class="store-hot-goods bg-white m-b-20" v-if="shopInfo.goods_list.length">
					<view class="store-hot-header flex">
						<view class="column-line m-r-20" />
						<view class="md" style="font-weight: 500;">
							店铺推荐
						</view>
					</view>
					<view class="store-hot-content">
						<scroll-view :scroll-x="true">
							<view class="goods p-l-20 p-r-20">
								<goods-list :list="shopInfo.goods_list" type="row"></goods-list>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="goods-display flex bg-body">
				<view class="category-aside">
					<u-sticky bg-color="rgba(255, 255, 255, 0)" :enable="enableFix" :offset-top="navHeight" :h5-nav-height="0">
						<scroll-view :scroll-y="true" :style="{'height': aslideH + 'px'}">
							<view class="aside-item flex row-center" :class="{active: active == -1}" @click="changeActive(-1)">
								<view class="xs text-center" style="width: 60rpx" :class="{primary: active == -1}">全部商品</view>
							</view>
							<view class="aside-item flex row-center" :class="{active: active == index}"
								v-for="(item, index) in category" :key="index" @click="changeActive(index)">
								<view class="xs text-center" style="width: 60rpx" :class="{primary: active == index}">{{item.name}}</view>
							</view>
						</scroll-view>
					</u-sticky>
				</view>
				<view class="category-row flex-1">
					<u-sticky bg-color="rgba(255, 255, 255, 0)" :enable="enableFix" :offset-top="navHeight" :h5-nav-height="0">
						<sort-nav v-model="sortConfig" :show-type="false"></sort-nav>
					</u-sticky>
					<mescroll-body ref="mescrollRef" @init="mescrollInit" :height="meScrollH"  @down="downCallback" @up="upCallback"
						:up="upOption" :down="{use: false}">
						<view class="bg-white">
							<goods-list :list="goodsList" width="285rpx"></goods-list>
						</view>
					</mescroll-body>
				</view>
			</view>

		</view>
		<loading-view v-if="isFirstLoading"></loading-view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getShopInfo,
		getShopGoodsCategory,
		changeShopFollow
	} from '@/api/shop'
	import {getGoodsList} from '@/api/store'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				isFirstLoading: true,
				navOpacity: 0,
				shopInfo: {
					goods_list: []
				},
				category: [],
				active: -1,
				upOption: {
					auto: false,
					empty: {
						icon: '/static/images/goods_null.png',
						tip: "暂无商品",
					}
				},
				goodsList: [],
				sortConfig: {
					priceSort: '',
					saleSort: '',
				},
				keyword: '',
				sys: {},
				enableFix: true,
				id: ''
			}
		},
		async onLoad() {
			this.id = this.$Route.query.id
			this.sys = uni.getSystemInfoSync()
			await this.getShopInfoFun()
			await this.getShopGoodsCategoryFun()
			this.isFirstLoading = false
			this.mescroll.resetUpScroll();
		},
		onHide() {
			// #ifdef H5
			this.enableFix = false
			// #endif
		},
		onShow() {
			// #ifdef H5
			this.enableFix = true
			// #endif
		},
		onShareAppMessage() {
			return {
				title: this.shopInfo.name,
				path: `pages/store_index/store_index?invite_code=${this.inviteCode}&id=${this.id}`
			};
		},
		methods: {
			async changeShopFollowFun() {
				if (!this.isLogin) return this.$Router.push('/pages/login/login')
				const {code, msg} = await changeShopFollow({
					shop_id: this.id
				})
				if(code == 1) {
					this.$toast({
						title: msg
					})
					this.getShopInfoFun()
				}
			},
			async getShopInfoFun() {
				const {
					data,
					code
				} = await getShopInfo({
					shop_id: this.id
				})
				if (code == 1) {
					this.shopInfo = data
				}
			},
			async getShopGoodsCategoryFun() {

				const {
					data,
					code
				} = await getShopGoodsCategory({
					shop_id: this.id
				})
				if (code == 1) {
					this.category = data
				}
			},
			changeActive(index) {
				this.active = index
				this.refresh()
			},
			refresh() {
				this.goodsList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				let {
					goodsList,
					keyword,
					sortConfig: {
						priceSort,
						saleSort,
					},
					active,
					category
				} = this;
				const pageNum = page.num; // 页码, 默认从1开始
				const pageSize = page.size; // 页长, 默认每页10条
				const cateId = active == -1 ? '' : category[active].id
				getGoodsList({
					page_size: pageSize,
					page_no: pageNum,
					shop_id: this.id,
					shop_cate_id: cateId,
					sort_by_price: priceSort,
					sort_by_sales: saleSort,
					keyword
				}).then(({
					data
				}) => {
					let curPageData = data.lists;
					let curPageLen = curPageData.length;
					let hasNext = !!data.more;
					if (page.num == 1) this.goodsList = [];
					this.goodsList = this.goodsList.concat(curPageData);
					this.mescroll.endSuccess(curPageLen, hasNext);
				})
			},
		},
		computed: {
			...mapGetters(['sysInfo']),
			navHeight() {
				return this.sysInfo.navHeight + 'px'
			},
			aslideH() {
				const {
					windowHeight,
					navHeight,
					safeArea
				} = this.sys
				if(!safeArea) return 0
				return windowHeight - this.sysInfo.navHeight
			},
			meScrollH() {
				return this.aslideH - uni.upx2px(80) + 'px'
			}
		},
		watch:{
			sortConfig: {
				deep: true,
				handler(val) {
					
					console.log(val)
					this.refresh()
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}
	.store-index {
		.store-header {
			padding-bottom: 60rpx;
			background-repeat: no-repeat;
			background-size: 100% auto;
			.store-info {
				padding-right: 30rpx;
				padding-left: 24rpx;

				.store-tag {
					background: linear-gradient(267deg, #FF2C3C 0%, #F52E99 100%);
					border-radius: 6rpx;
					padding: 4rpx 9rpx;
				}

				.subscribe-btn {
					background: linear-gradient(97deg, #FF5784 0%, #FF2C3C 100%);
					height: 52rpx;
					width: 128rpx;
					&.gray {
						background: #ccc;
					}
				}
			}
		}

		.content {
			margin-top: -30rpx;
			.content-wrap {
				border-radius: 20rpx 20rpx 0px 0px;
				overflow: hidden;
			}
			.store-hot-goods {
				overflow: hidden;
				.store-hot-header {
					padding: 20rpx;

					.column-line {
						width: 6rpx;
						height: 32rpx;
						background-color: $-color-primary;
					}
				}

				.store-hot-content {
					.goods {
						display: inline-block;
					}
					.hot-goods-item {
						width: 200rpx;
						
						.hot-goods-info {
							.hot-goods-price {
								margin-top: 5rpx;
							}
						}
					}
				}
			}

			.goods-display {
				.category-aside {
					width: 120rpx;
					align-self: flex-start;
					.aside-item {
						width: 120rpx;
						padding: 20rpx 0;
						&.active {
							position: relative;
							background-color: $-color-white;

							&::before {
								content: '';
								width: 3rpx;
								height: 80rpx;
								background-color: $-color-primary;
								position: absolute;
								left: 0;
							}
						}
					}
				}

				.category-row {
					align-self: flex-start;
					width: 630rpx;

					.sort-tool-bar {
						.sort-item {
							flex: 1;
							height: 80rpx;
						}
					}

					.goods-lists {
						padding: 20rpx;

						.item {
							width: 285rpx;
							border-radius: 10rpx;
							overflow: hidden;

							&:nth-of-type(2n) {
								margin-left: 20rpx;
							}

							.goods-info {
								padding: 10rpx;
							}
						}
					}
				}
			}

		}
	}
</style>
