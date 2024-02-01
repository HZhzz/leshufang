<template>
    <view class="order-goods">

        <view v-for="(item, index) in list" :key="index" class="item-wrap">
            <view class="item flex" @click="jumpGoods(item)">
                <view class="goods-img">
                    <u-image width="180rpx" border-radius="10rpx" height="180rpx" lazy-load
                        :src="item.image_str || item.image"></u-image>
                </view>
                <view class="goods-info m-l-20 flex-1">
                    <view class="goods-name line-2 m-b-10">
                        <u-tag class="m-r-10" v-if="item.people_num" :text="item.people_num + '人团'" size="mini"
                            type="primary" mode="plain" />
                        {{item.goods_name || item.name}}
                    </view>
                    <view class="goods-spec xs muted m-b-20">{{item.spec_value || item.spec_value_str}}</view>
                    <view class="flex row-between">
                        <view class="goods-price ">
                            <view class="primary flex">
                                <price-format weight="500" :subscript-size="24" :first-size="32" :second-size="24"
                                    :price="item.price || item.goods_price" />
                                <!-- 会员价 -->
                                <view class="vip-price flex" v-if="item.is_member">
                                    <view class="price-name xxs">会员价</view>
                                    <view style="padding: 0 10rpx">
                                        <price-format :price="item.member_amount" :first-size="22" :second-size="22"
                                            :subscript-size="22" :weight="500" color="#7B3200" />
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="goods-num sm ">x{{item.num || item.goods_num || item.count}}</view>
                    </view>
                </view>
            </view>
            <view class="goods-footer flex" v-if="link && item.comment_btn || item.refund_btn">
                <view class="flex-1"></view>
                <router-link v-if="item.comment_btn" class="m-r-20"
                    :to="{path: '/bundle/pages/goods_reviews/goods_reviews', query:{id: item.id}}">
                    <button size="xs" class="plain br60" hover-class="none">
                        评价晒图
                    </button>
                </router-link>
                <router-link v-if="item.refund_btn"
                    :to="{path: '/bundle/pages/apply_refund/apply_refund', query:{id: item.id, order_id: item.order_id, item_id: item.item_id}}">
                    <button size="xs" class="plain br60" hover-class="none">
                        申请退款
                    </button>
                </router-link>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {};
        },

        components: {},
        props: {
            list: {
                type: Array,
                default: () => []
            },
            link: {
                type: Boolean,
                default: false
            },
            // 是否点击商品跳转
            isJumpGoods: {
                type: Boolean,
                default: false
            }
        },

        created() {
            setTimeout(() => {
                console.log(this.list)
            }, 700)
        },

        methods: {
            jumpGoods(item) {
                if (!this.isJumpGoods) return
                this.$Router.push({
                    path: '/pages/goods_details/goods_details?id=',
                    query: {
                        id: item.goods_id
                    }
                })
            }
        }
    };
</script>
<style lang="scss" scoped>
    .order-goods {

        .item {
            padding: 20rpx 24rpx;

            .vip-price {
                margin: 0 10rpx;
                background-color: #FFE9BA;
                line-height: 30rpx;
                border-radius: 6rpx;
                overflow: hidden;

                .price-name {
                    background-color: #101010;
                    padding: 3rpx 10rpx;
                    color: #FFD4B7;
                    position: relative;
                    overflow: hidden;

                    &::after {
                        content: '';
                        display: block;
                        width: 20rpx;
                        height: 20rpx;
                        position: absolute;
                        right: -15rpx;
                        background-color: #FFE9BA;
                        border-radius: 50%;
                        top: 50%;
                        transform: translateY(-50%);
                        box-sizing: border-box;
                    }
                }
            }
        }

        .goods-footer {
            height: 70rpx;
            align-items: flex-start;
            padding: 0 24rpx;

            .plain {
                border: 1px solid #999;
                height: 52rpx;
                line-height: 52rpx;
                font-size: 26rpx;
            }
        }
    }
</style>
