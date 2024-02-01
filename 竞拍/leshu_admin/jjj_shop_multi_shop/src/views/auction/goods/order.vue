<template>
    <div class="p10 product-list">
        <!-- 搜索栏 -->
        <div class="common-level-rail">
            <el-select v-model="rounds" placeholder="请选择" @change="search">
                <el-option v-for="item in roundsData" :key="item" :label="'第' + item + '轮'" :value="item"> </el-option>
            </el-select>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="order_id" label="ID"> </el-table-column>
            <el-table-column prop="order_no" label="订单号"> </el-table-column>
            <el-table-column prop="rounds" label="参与轮数"> </el-table-column>
            <el-table-column prop="total_price" label="竞拍价"> </el-table-column>
            <el-table-column prop="status_text" label="状态"> </el-table-column>
            <el-table-column prop="pay_time" label="支付时间"> </el-table-column>
            <el-table-column prop="source_text" label="来源"> </el-table-column>
            <el-table-column prop="margin_status_text" label="保证金状态"> </el-table-column>
            <el-table-column prop="create_time" label="下单时间"> </el-table-column>
        </el-table>
        <div class="page-right">
            <el-pagination background current-page.sync="20" :page-size="20" layout="prev, pager, next" :total="total"> </el-pagination>
        </div>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
export default {
    data() {
        return {
            goods_id: '',
            rounds: 1,
            tableData: [],
            total: 0,
            roundsData: [],
        }
    },
    created() {
        this.goods_id = this.$route.query.goods_id
        this.getInit()
    },
    methods: {
        getInit() {
            this.page = 1
            this.getData()
        },
        getData() {
            let that = this
            let params = {
                page: that.page,
                goods_id: that.goods_id,
                rounds: that.rounds,
            }
            AuctionApi.postAuctionList(params, true)
                .then((res) => {
                    that.tableData = res.data.list.data
                    that.total = res.data.list.total
                    that.roundsData = res.data.rounds_list
                })
                .catch((err) => {})
        },
        search(e) {
            this.rounds = e
            this.page = 1
            this.getData()
        },
    },
}
</script>
<style></style>
