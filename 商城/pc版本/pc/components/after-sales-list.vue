<template>
    <div class="after-sales-list">
        <div class="m-b-20" v-for="(items) in lists" :key="items.order_id">

            <div class="after-sales-header m-t-30 flex row-between" style="border:0">
                <div class="flex row-around">
                    <div class="lighter sm flex" style="margin-right:100px">
                        <img style="width:20px;height: 20px" class="m-r-5" :src="items.shop_logo" alt="">
                        {{items.shop_name}}
                    </div>
                    <div class="lighter sm" v-if="type == 'normal'">
                        申请时间：{{items.create_time}}
                    </div>
                    <div class="lighter sm" style="margin-left: 110px" v-else>
                        下单时间：{{items.after_sale.status_text}}
                    </div>
                    <div class="lighter sm" style="margin-left: 110px" v-if="type == 'normal'">
                        订单编号：{{items.after_sale.sn}}
                    </div>
                    <div class="lighter sm" style="margin-left: 110px" v-else>
                        退款编号：{{items.after_sale.sn}}
                    </div>
                </div>
                <div class="primary sm" style="margin-right: 12px">
                    {{items.after_sale.type_text}}
                </div>
            </div>
            <div class="after-sales-content" :class="{shadow: type != 'normal', border: type == 'normal'}">
                <div class="goods-item flex row-between" v-for="(item, index) in items.order_goods" :key="index">
                    <div class="flex">
                        <el-image style="width: 72px;height: 72px" :src="item.image" />
                        <div class="goods-info">
                            <div class="goods-name noraml line1">
                                {{item.goods_name}}
                            </div>
                            <div class="muted sm m-t-8 m-b-8">
                                {{item.spec_value_str}}
                            </div>
                            <price-formate :price="item.goods_price" showSubscript color="#FF2C3C" />
                        </div>
                    </div>
                    <div class="flex row-right" :style="{width: type != 'apply' ? null : '340px'}">
                        <el-button class="apply-btn row-center mr20 sm"
                            
                            @click.stop="goPage(items.order_id, item.item_id)" v-if="type == 'normal'" size="small">申请售后
                        </el-button>
                        <el-button class="apply-btn row-center mr20 sm" v-if="type != 'normal'" size="small"
                            @click="goToDetail(items.after_sale.after_sale_id)">查看详情</el-button>

                        <el-button class="apply-btn row-center mr20 sm" v-if="type == 'apply'" size="small"
                            @click.stop="cancelApply(items.after_sale.after_sale_id)">撤销申请</el-button>

                        <el-button class="apply-btn row-center mr20 sm" v-if="items.after_sale.status==2" size="small"
                            @click.stop="showInput(items.after_sale.after_sale_id)">填写快递单号</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AfterSaleType } from "@/utils/type";
export default {
    props: {
        type: {
            type: String,
            default: AfterSaleType.NORMAL,
        },
        lists: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
    methods: {
        goToDetail(id) {
            switch (this.type) {
                case AfterSaleType.NORMAL:
                    this.$router.push("/goods_details/" + id);
                    break;
                case AfterSaleType.HANDLING:
                case AfterSaleType.FINISH:
                    this.$router.push(
                        "/user/after_sales/after_sale_details?afterSaleId=" + id
                    );
                    break;
            }
        },

        goPage(orderId, itemId) {
            this.$router.push(
                "/user/after_sales/apply_sale?order_id=" +
                    orderId +
                    "&item_id=" +
                    itemId
            );
        },

        showInput(e) {
            this.$emit("show", e);
        },

        async cancelApply(afterSaleId) {
            let res = await this.$post("after_sale/cancel", {
                id: afterSaleId,
            });
            if (res.code == 1) {
                this.$message({
                    message: res.msg,
                    type: "success",
                });
                this.$emit("refresh");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.after-sales-list {
    .after-sales-header {
        border: 1px solid #e5e5e5;
        background-color: #f2f2f2;
        padding: 13px 16px;
    }
    .after-sales-content {
        .goods-item {
            padding: 10px 20px;
            .goods-info {
                margin-left: 10px;
                width: 500px;
            }
            .apply-btn {
                border: 1px solid #cccccc;
                border-radius: 2px;
                width: 100px;
                height: 32px;
                align-self: flex-start;
                &:nth-of-type(2n) {
                    margin-left: 10px;
                }
                &:nth-of-type(3) {
                    margin-left: 10px;
                }
                &:nth-of-type(4) {
                }
            }
        }
    }
    .shadow {
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.08);
    }
    .border {
        border-bottom: 1px solid #e5e5e5;
    }
}
</style>