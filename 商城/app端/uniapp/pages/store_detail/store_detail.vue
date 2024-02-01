<template>
	<view class="store-detail" v-show="shopInfo.name">
		<view class="store-header bg-white">
			<view class="flex store-info">
				<u-image width="100rpx" height="100rpx" border-radius="50%" :src="shopInfo.logo" />
				<view class="flex-col m-l-20">
					<view class="lg bold">
						{{shopInfo.name}}
					</view>
					<view class="flex m-t-10">
						<view class="tag xxs m-r-10 white" v-if="type == 1">
							自营
						</view>
						<view class="xs">
							在售商品 {{shopInfo.on_sale_count}}件
						</view>
					</view>
				</view>
			</view>
			<view class="store-row flex row-between">
				<view class="muted m-r-20">
					店铺星级 :
				</view>
				<u-rate :size="38" :value="shopInfo.star" disabled inactive-icon="star-fill" active-color="#FFA200"
					inactive-color="#e1e1e1"></u-rate>
			</view>
			<view class="store-row flex row-between">
				<view class="muted m-r-20">
					店铺评分 :
				</view>
				<view class="nr" style="color: #FFA200;">
					{{shopInfo.score}}分
				</view>
			</view>
            
            <view class="store-row muted flex row-between" @tap="goLicense">
            	<view class="">资质信息</view>
            	<u-icon name="arrow-right" />
            </view>
		</view>
		<view class="store-desc m-t-20 flex bg-white">
			<view class="muted m-r-20 flex-none" style="align-self: flex-start;">
				店铺简介 :
			</view>
			<view class="nr" style="align-self: flex-start;">
				{{shopInfo.intro}}
			</view>
		</view>
		<router-link :to="{path: '/bundle/pages/chat/chat', 
			query: {shop_id: shopInfo.id}
		}">
			<view class="contact-offical flex row-center bg-white m-t-20">
				<u-icon name="kefu-ermai" size="42" class="m-r-10" color="#5b5b5b" />
				联系客服
			</view>
		</router-link>

	</view>
</template>

<script>
	import {
		getShopInfo
	} from '@/api/shop'
	export default {
		data() {
			return {
				shopInfo: {}
			};
		},
		onLoad() {
			this.getShopInfoFun()
		},
		methods: {
			async getShopInfoFun() {
				const {
					id
				} = this.$Route.query
				const {
					data,
					code
				} = await getShopInfo({
					shop_id: id
				})
				if (code == 1) {
					this.shopInfo = data
				}
			},
            
            goLicense() {
                this.$Router.push({
                    path: '/bundle/pages/license/license',
                    query: {
                        id: this.shopInfo.id
                    }
                })
            }
		},
	}
</script>

<style lang="scss">
	.store-detail {
		.store-header {
			padding: 0rpx 30rpx;

			.store-info {
				width: 100%;
				padding: 40rpx 0;
				border-bottom: 1rpx solid #E5E5E5;

				.tag {
					background: linear-gradient(267deg, #FF2C3C 0%, #F52E99 100%);
					border-radius: 6rpx;
					padding: 2rpx 9rpx;
				}
			}

			.store-row {
				padding: 24rpx 0rpx;
			}
		}

		.store-desc {
			padding: 20rpx 30rpx;
			min-height: 300rpx;
		}

		.contact-offical {
			height: 88rpx;
		}
	}
</style>
