<template>
	<view class="coupon-list">
		<view v-for="(item, index) in list" :key="index" class="m-t-20">
			<view :class="'coupon-item flex ' + (btnType == 1 || btnType == 2 ? 'gray': '')">
				<view class="price white flex-col col-center">
					<view class="xl">
						<price-format :first-size="60" :second-size="50" :subscript-size="34" :price="item.money"
							:weight="500" />
					</view>
					<view class="sm text-center">{{item.condition_type_desc}}</view>
				</view>
				<view class="info m-l-20">
					<view class="lg m-b-20">{{item.coupon_name}}</view>
					<view class="xs lighter m-b-20">{{item.user_time_desc}}</view>
					<view class="xs lighter">{{item.use_scene_desc}}</view>
				</view>
				<button type="primary" :class="'btn br60 white xs ' + (btnType != 3 ? 'plain': '')"
					@tap="onHandle(item.id)">
					{{getBtn}}
				</button>
				<image v-if="item.is_get" class="receive" src="/static/images/coupon_receive.png"></image>
			</view>
			<view style="padding: 14rpx 20rpx" class="bg-white" v-if="item.use_goods_desc" @tap="onShowTips(index)">
				<view class="flex row-between">
					<view class="xs">使用说明</view>
					<u-icon :class="showTips[index] ? 'rotate' : ''" name="arrow-down" />
				</view>
				<view v-show="showTips[index]" class="m-t-10 xs">{{item.use_goods_desc}}</view>
			</view>
		</view>
	</view>
</template>


<script>
	import {
		getCoupon
	} from '@/api/activity';

	export default {
		data() {
			return {
				showTips: []
			};
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			btnType: {
				// 0 去使用  1已使用 2已过期 3领取
				type: Number
			}
		},
		watch: {
			list: {
				handler: function(val) {
					let arr = val.map(item => {
						return 0;
					});
					this.showTips = arr
				},
				immediate: true,
				deep: true
			}
		},
		computed: {},
		computed: {
			getBtn() {
				var text = ''
				switch (this.btnType) {

					case 0:
						text = '去使用';
						break;
					case 1:
						text = '已使用';
						break;
					case 2:
						text = '已过期';
						break;
					case 3:
						text = '领取';
						break;
				}
				return text
			}
		},
		methods: {
			onHandle(id) {
				this.id = id;
				const {
					btnType
				} = this;

				switch (btnType) {
					case 0:
						uni.switchTab({
							url: '/pages/index/index'
						});
						break;

					case 1:
						// text = '去使用';
						break;

					case 2:
						// text = '已使用';
						break;

					case 3:
						this.getCouponFun();
						break;
				}
			},

			onShowTips(index) {
				const {
					showTips
				} = this;

				this.showTips[index] = showTips[index] ? 0 : 1
				// 拷贝数组
				this.showTips = Object.assign([], this.showTips);
			},

			getCouponFun() {
				if (!this.isLogin) return this.$Router.push('/pages/login/login')
				getCoupon(this.id).then(res => {
					if (res.code == 1) {
						this.$toast({
							title: res.msg
						})
						setTimeout(() => {
							this.$emit('refresh');
						},1500)
					}
				});
			}

		}
	};
</script>
<style lang="scss">
	.coupon-list {
		padding: 0 24rpx;
		overflow: hidden;
		.coupon-item {
			position: relative;
			height: 200rpx;
			background-image: url(../../static/images/coupon_bg.png);
			background-size: 100% 100%;

			&.gray {
				background-image: url(../../static/images/coupon_bg_grey.png);

				.btn {
					&.plain {
						color: #CCCCCC;
					}
				}
			}

			.price {
				width: 200rpx;
			}

			.btn {
				line-height: 52rpx;
				height: 52rpx;
				position: absolute;
				right: 20rpx;
				bottom: 20rpx;
				width: 120rpx;
				text-align: center;
				padding: 0;

				&.plain {
					background-color: #fff;
					color: $-color-primary;
					border: 1px solid currentColor;
				}
			}

			.receive {
				position: absolute;
				right: 30rpx;
				top: 0rpx;
				width: 99rpx;
				height: 77rpx;
			}
		}

		.icon {
			transition: all 0.4s;
		}

		.rotate {
			transform: rotateZ(-180deg);
		}
	}
</style>
