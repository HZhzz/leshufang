<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="{use: false}">
		<view class="index index-bg" :style="[headerStyle]">
			<u-sticky offset-top="0" h5-nav-height="0" bg-color="transparent">
				<view class="index-bg" :style="[headerStyle]">
					<u-navbar :is-fixed="false" :border-bottom="false" :background="{ background: 'transparent', }"
						:is-back="false">
						<view class="flex-1 flex row" style="position: relative;">
							<!-- 城市 -->
							<router-link v-if="appConfig.is_open_nearby" class="m-l-16 flex white row-center" to="/bundle_b/pages/city/city">
								<text class="m-r-6">{{ cityInfo.name || '选择' }}</text>
								<u-icon name="arrow-down" size="24" color="#FFFFFF"></u-icon>
								<!-- <image class="icon-md m-l-30" src="/static/images/icon_news.png">
								</image> -->
							</router-link>
							<view class="flex-1">
								<router-link to="/pages/goods_search/goods_search">
									<u-search wrap-bg-color="transparent" bg-color="#fff" :disabled="true" :height="62">
									</u-search>
								</router-link>
							</view>
							
							<!-- #ifdef MP -->
							<view class="capsule-tips flex row-between" v-if="offPrompt">
								<text class="m-r-10">添加到”我的小程序”，红包、优惠不错过</text>
								<u-icon name="close" color="#FFFFFF" @click="clearIntervalFunc"></u-icon>
							</view>
							<!-- #endif -->
						</view>
					</u-navbar>
					<view class="flex">
						<view class="flex-1" style="min-width:600rpx">
							<u-tabs active-color="#fff" inactive-color="#fff" :current="active" :list="cateList"
								bg-color="transparent" :active-item-style="{fontSize:'32rpx'}" :bar-width="64"
								:bold="false"
								:barStyle="{background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49%, rgba(255, 255, 255, 0) 100%)'}"
								@change="changeActive">
							</u-tabs>
						</view>
						<router-link to="/pages/goods_cate/goods_cate" navType="pushTab">
							<view class="white flex cate-btn m-l-10">
								<image class="icon-xs m-r-4" src="/static/images/icon_cate.png" alt="">
									分类
							</view>
						</router-link>
					</view>
				</view>
			</u-sticky>
			<view class="tab-con">
				<view  v-show="active == 0">
					<index-home ref="indexHome" :home-data="homeData" :nav-list="navList">
					</index-home>
					<goods-column ref="mescrollItem" :autoGetData="false"></goods-column>
				</view>
				<template v-for="(item, index) in cateList">
					<view v-if="index > 0" class="tab-item" v-show="active == index" :key="index">
						<view>
							<cate-home v-if="showCateList[index]" :top="cateTop" ref="cateItem" :i="index"
								:index="active" :cate="item">
							</cate-home>
						</view>
					</view>
				</template>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<lyg-popup v-if="appConfig.app_agreement" title="服务协议和隐私政策"
			protocolPath='/bundle/pages/server_explan/server_explan?type=0'
			policyPath='/bundle/pages/server_explan/server_explan?type=1' policyStorageKey="has_read_privacy">
		</lyg-popup>
		<!-- #endif -->
	</mescroll-body>
	
</template>

<script>
	import MescrollCompMixin from "@/components/mescroll-uni/mixins/mescroll-comp";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins";
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getMenu,
		getHome,
		getHotGoods,
		getLevelOneList
	} from "@/api/store"
	import {
		pullUser
	} from "@/api/app"
	import {
		getRect,
		setTabbar
	} from '@/utils/tools'
	const app = getApp()
	const homeItem = {
		name: '首页'
	}
	export default {
		mixins: [MescrollMixin, MescrollCompMixin],
		data() {
			return {
				offPrompt: true,
				active: 0,
				navBg: 0,
				goodsList: [],
				homeData: {},
				navList: [],
				enable: true,
				cateList: [homeItem],
				showCateList: []
			}
		},
		async onLoad(options) {
			// 设置底部导航样式
			setTabbar()
			// 选择城市后是否刷新
			if(options?.refresh) await this.getHomeFun()
			// 监听是否刷新页面，目前秒杀时会用到
			uni.$on('refreshhome', () => { this.getHomeFun() })
			
			// if(options?.jwt) await this.getPullUser(options.jwt)
			await this.getPullUser('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjY2MjYyOTMsInRva2VuIjoiNWU5YjI5ZmRhNDJiODI2YWMzM2RhYzEwMGFjYmRhYTI0YzQwMmUxYiJ9.LOA3A0Ft4wGcPxQznQbLTkDeD7YYn2UT_OuGEFsT6Wc')
		},
		onUnload() {
			uni.$off('refreshhome')
		},
		onShow() {
			this.enable = this.active == 0 ? true : false
			this.getCartNum()
			
		},
		onHide() {
			// #ifdef H5
			this.enable = false
			// #endif
		},
		onReady() {
			// #ifdef MP
			// 关闭胶囊提示
			this.offPromptFunc();
			// #endif
		},
		methods: {
			...mapActions(['getCartNum']),
			...mapMutations(['login']),
			// #ifdef MP
			offPromptFunc() {
				let time = 8;
				this.offPrompt = setInterval(() => {
					time -= 1;
					if( time <= 0 ) this.clearIntervalFunc()
				}, 1000)
			},
			clearIntervalFunc() {
				clearInterval(this.offPrompt);
				this.offPrompt = false;
			},
			// #endif
			// 获取1级分类
			async getLevelOneListFun() {
				const {
					code,
					data
				} = await getLevelOneList();
				if (code == 1) {
					this.cateList = [homeItem, ...data]
					this.showCateList = []
				}
			},
			// 同步获取用户信息
			async getPullUser(jwt){
				let {code,data} = await pullUser({jwt:jwt});
				if(code==1){
					console.log(data);
					this.login(data)
				}
			},
			// 获取菜单
			async getMenuFun() {
				const {
					code,
					data
				} = await getMenu({
					type: 1
				});
				if (code == 1) {
					this.navList = data
				}
			},
			// 获取首页数据
			async getHomeFun() {
				const {
					code,
					data
				} = await getHome({ city_id: this.cityInfo.id });
				if (code == 1) {
					this.homeData = data
				}
			},
			changeActive(index) {
				this.active = index
				this.enable = index == 0
				this.mescroll.optDown.use = index == 0
				this.showCateList[index] = true
			},
			async downCallback() {
				await this.getLevelOneListFun()
				await this.getMenuFun()
				await this.getHomeFun()
				this.$refs.mescrollItem.getData()
				this.mescroll.endSuccess(0, false)
			}
		},
		computed: {
			...mapGetters(['sysInfo', 'inviteCode', 'appConfig', 'cityInfo']),
			navH() {
				return this.sysInfo.navHeight + 'px'
			},
			// 分类栏悬浮高度
			cateTop() {
				return this.sysInfo.navHeight + uni.upx2px(80) + 'px'
			},
			headerStyle() {
				const {
					active,
					cateList,
					appConfig
				} = this
				let bg = cateList[active].bg_image
				if (active == 0) {
					bg = appConfig.index_setting.top_bg_image
				}
				return bg ? {
					'background-image': `url(${bg})`
				} : {}

			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}
	.index-bg {
		background-image: url('../../static/images/index_bg.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}

	.index {
		min-height: calc(100vh - var(--window-bottom));
		
		.u-navbar {
			::v-deep .u-search {
				padding: 0 30rpx;
			}
		}
		
		// 胶囊提示
		.capsule-tips {
			width: 584rpx;
			color: #FFFFFF;
			padding: 12rpx 18rpx;
			border-radius: 14rpx;
			background: rgba(0, 0, 0, 0.7);
			position: relative;
			position: absolute;
			z-index: 9999;
			bottom: -80rpx;
			right: -150rpx;
		}
		.capsule-tips::after {
			content: '';
			border-bottom: 14rpx solid rgba(0, 0, 0, 0.7);
			border-right: 14rpx solid transparent;
			border-left: 14rpx solid transparent;
			position: absolute;
			top: -14rpx;
			right: 88rpx;
		}

		.cate-btn {
			padding: 12rpx 16rpx 12rpx 20rpx;
			border-radius: 60rpx 0 0 60rpx;
			background-color: rgba(256, 256, 256, .4);
		}
	}
</style>
