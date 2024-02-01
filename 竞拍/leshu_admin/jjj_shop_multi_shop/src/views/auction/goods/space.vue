<template>
    <div class="p10 product-list">
        <!--添加仓位-->
        <div class="common-level-rail">
            <el-form size="small" :inline="true" class="demo-form-inline">
                <el-form-item label="仓位数"><el-input v-model="cangNum" placeholder="请输入仓位数"></el-input></el-form-item>
                <el-form-item><el-button type="primary" @click="onSubmit">提交</el-button></el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
            <el-table-column prop="rounds" label="当前轮数"> </el-table-column>
            <el-table-column prop="daynum" label="溢价天数"> </el-table-column>
            <el-table-column prop="people" label="预计人数"> </el-table-column>
            <el-table-column prop="orderNum" label="已竞拍人数"> </el-table-column>
            <el-table-column prop="orderNotNum" label="未竞拍数"> </el-table-column>
            <el-table-column prop="status_text" label="状态"> </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="orderClick(scope.row.goods_id)">竞拍订单</el-button>
                    <el-button type="text" size="mini" @click="deleteClick(scope.row.goods_id)">删除</el-button>
                </template>
            </el-table-column>
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
            tableData: [],
            total: 0,
            goods_id: '',
            cangNum: '',
            page: 1,
        }
    },
    created() {
        this.goods_id = this.$route.query.goods_id
        this.init()
    },
    methods: {
        init() {
            this.page = 1
            this.getData()
        },
        getData() {
            let that = this
            let params = {
                goods_id: that.goods_id,
                page: that.page,
            }
            AuctionApi.getSpaceList(params, true)
                .then((res) => {
                    that.tableData = res.data.list.data
                    that.total = res.data.list.total
                })
                .catch((err) => {})
        },
        orderClick(id) {
            this.$router.push({
                path: '/auction/goods/order',
                query: {
                    goods_id: id,
                },
            })
        },
        onSubmit() {
            let that = this
            let params = {
                cangNum: that.cangNum,
                goods_id: that.goods_id,
            }
            AuctionApi.postSpaceAdd(params, true)
                .then((res) => {
                    that.$message({
                        message: '恭喜你，增加成功',
                        type: 'success',
                    })
                    that.init()
                })
                .catch((err) => {})
        },
        deleteClick(id) {
            let that = this
            let params = {
                id: id,
            }
            that.$confirm('确定要删除了吗？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                AuctionApi.getGoodsDel(params, true)
                    .then((res) => {
                        that.$message({
                            message: '操作成功',
                            type: 'success',
                        })
                        that.getInit()
                    })
                    .catch((err) => {})
            })
        },
    },
}
</script>
<style></style>
