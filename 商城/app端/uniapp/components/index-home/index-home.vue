<template>
	<view class="index-home p-t-20">
        
		<!-- 轮播 -->
		<ad-swipers :pid="7" height="312rpx" padding="0 30rpx" radius="20rpx"></ad-swipers>
        
        <bubble-tips top="280rpx" :discharge="isDischarge"></bubble-tips>
        
		<view class="content">
			<!-- 导航入口 -->
			<view class="nav bg-white m-t-20" v-if="newNavList.length">
				<swiper :style="'height:' + navSwiperH + 'rpx;'" @change="swiperChange">
					<swiper-item v-for="(items, index) in newNavList" :key="index">
						<view class="nav-list flex flex-wrap">
							<view v-for="(item, index2) in items" :key="index2"
								class="nav-item m-t-30" @tap="menuJump(item)">
								<view class="flex-col col-center">
									<image class="nav-icon m-b-15" :src="item.image"></image>
									<view class="name xs">{{item.name}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="dots" v-if="newNavList.length > 1">
					<view v-for="(item, index) in newNavList" :key="index"
						:class="'dot ' + (index == currentSwiper ? 'active' : '')"></view>
				</view>
			</view>
			<!-- 中部广告 -->
			<ad-swipers :pid="8" height="165rpx" :is-swiper="false" padding="20rpx 0 0" radius="20rpx">
			</ad-swipers>
			<!-- 资讯 -->
			<router-link v-if="newsList.length" class="" :to="{path: '/pages/news_list/news_list'}">
				<view class="information bg-white flex m-t-20">
					<image class="icon-toutiao" src="/static/images/icon_toutiao.png"></image>
					<text class="gap-line"></text>
					<view class="news flex-1 flex">
						<view class="shade"></view>
						<swiper class="flex-1" autoplay="true" style="height: 76rpx;" vertical="true" circular="true"
							:interval="3000">
							<swiper-item v-for="(item, index) in newsList" :key="index" class="flex">
								<view class="flex-none">
									<u-tag v-if="item.is_new" shape="circle" text="最新" size="mini" type="primary"
										mode="plain" />
								</view>
								<view class="text-swiper m-l-10 line-1">{{item.title }}</view>
							</swiper-item>
						</swiper>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</router-link>
			<!-- 活动专区 -->
			<view class="activity-zone m-t-20" v-if="activityArea.length">
				<view class="flex p-20 row-center xxl bold white">
					活动专区
				</view>
				<view class="list flex flex-wrap row-between">
					<router-link :to="{path: '/bundle/pages/activity_detail/activity_detail', query: {name: item.name, title: item.title, id: item.id}}" v-for="(item, index) in activityArea" :key="index">
						<view class="item flex bg-white m-b-20">
							<u-image width="120rpx" height="120rpx" :src="item.image"></u-image>
							<view class="m-l-20 flex-1">
								<view class="bold lg line-1 desc">{{item.name}}</view>
								<view class="primary sm m-t-5 line-1 desc">{{item.title}}</view>
								<view class="br60 bg-primary white xxs m-t-10 btn">前往查看</view>
							</view>
						</view>
					</router-link>
				</view>
			</view>
			<!-- 秒杀 -->
			<view class="seckill m-t-20" v-if="seckillGoods.length">
				<home-seckill :list="seckillGoods"></home-seckill>
			</view>
			
			<!-- 附近店铺 -->
			<view class="m-t-20"  v-if=" nearbyShop.length">
				<shop-recommend type="nearby-shops" title="附近店铺" :list="nearbyShop" url="/bundle_b/pages/nearby_shops/nearby_shops"></shop-recommend>
			</view>

			<view class="m-t-20" v-if="appConfig.index_setting.host_show && hotGoods.length">
				<active-area :list="hotGoods" type="hot" title="热销榜单" url="/pages/active_list/active_list?type=hot"></active-area>
			</view>
			<view class="m-t-20" v-if="appConfig.index_setting.new_show && newGoods.length">
				<active-area :list="newGoods" type="new" title="新品推荐" url="/pages/active_list/active_list?type=new"></active-area>
			</view>
            
            <!-- 种草社区  -->
            <view class="m-t-20" v-if="appConfig.index_setting.community_show && communityArticle.length">
            	<community-recommend :list="communityArticle" title="种草社区" url="/pages/community/community"></community-recommend>
            </view>

			<!-- 店铺 -->
			<view class="m-t-20"  v-if="appConfig.index_setting.shop_show && shopLists.length">
				<shop-recommend type="shop-recommends"  title="店铺推荐" :list="shopLists"></shop-recommend>
			</view>

			<view class="m-t-20"  v-if="appConfig.index_setting.shop_show && shopRecommend.length" v-for="(item, index) in shopRecommend" :key="index">
				<shop-item :item="item"></shop-item>
			</view>
		
		</view>
	</view>
</template>

<script>

	import {
		arraySlice,
		menuJump
	} from '@/utils/tools'
	import {mapGetters} from 'vuex'
	export default {
		props: {
			navList: {
				type: Array,
				default:() => ([])
			},
			list: {
				type: Array,
				default:() => ([])
			},
			homeData: {
				type: Object,
				default:() => ({})
			}
		},
		data() {
			return {
				newNavList: [],
				navSwiperH: '',
				currentSwiper: 0,
                isDischarge: false,
				goodsList: []
			}
		},
		mounted() {
			this.isDischarge = false;
		},
        destroyed() {
			this.isDischarge = true;
        },
		methods: {
			swiperChange(e) {
				console.log(e)
				this.currentSwiper = e.detail.current
			},
			menuJump(item){
				menuJump(item)
			}
		},
		watch: {
			navList(val) {
				if (val.length <= 5) {
					this.navSwiperH = 200
				} else {
					this.navSwiperH = 374
				}
				this.newNavList = arraySlice(val)
			},
			list(val) {
				this.goodsList = val
			}
		},
		computed: {
			...mapGetters(['appConfig']),
			newsList() {
				return this.homeData.headlines || []
			},
			nearbyShop() {
				return this.homeData.nearby_shops || []
			},
			hotGoods() {
				return this.homeData.hots || []
			},
			newGoods() {
				return this.homeData.news || []
			},
			communityArticle() {
				return this.homeData.community_article || []
			},
			activityList () {
				return this.homeData.activity_area || []
			},
			shopRecommend() {
				return this.homeData.shop_recommend || []
			},
			shopLists() {
				return this.homeData.shop_lists || []
			},
			seckillGoods() {
				return this.homeData.seckill_goods || []
			},
			activityArea() {
				return this.homeData.activity_area || []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-home {
		.content {
			padding: 0 30rpx 20rpx;

			.nav {
				position: relative;
				border-radius:20rpx;

				.nav-item {
					width: 20%;

					.nav-icon {
						width: 82rpx;
						height: 82rpx;
					}
				}

				.dots {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 20rpx;
					display: flex;

					.dot {
						width: 10rpx;
						height: 6rpx;
						border-radius: 6rpx;
						margin-right: 10rpx;
						background-color: rgba(255, 44, 60, 0.4);

						&.active {
							width: 20rpx;
							background-color: $-color-primary;
						}
					}

				}

			}

			.information {
				height: 76rpx;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
				padding: 0 20rpx;
				border-radius: 20rpx;

				.news {
					position: relative;

					.shade {
						position: absolute;
						width: 100%;
						height: 100%;
						z-index: 100;
					}
				}

				.icon-toutiao {
					width: 114rpx;
					height: 34rpx;
				}

				.gap-line {
					height: 28rpx;
					width: 1px;
					background-color: #DCDDDC;
					margin: 0 30rpx;
				}
			}


			
			.title-iamge {
				width: 200rpx;
				height: 100rpx;
			}

			.activity-zone {
				background-image: url(../../static/images/bg_activity_home.png);
				background-size: 100% auto;
				padding: 0 15rpx;
				border-radius: 14rpx;
				.item {
					border-radius: 14rpx;
					width: 324rpx;
					padding: 20rpx 16rpx;
					.desc {
						width: 160rpx;
					}
					.btn {
						display: inline-block;
						padding: 2rpx 20rpx;
					}
					
				}
			}
		}

	}
</style>
