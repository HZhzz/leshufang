<template>
    <div class="user">
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="ID"><el-input v-model="formInline.game_user_id" placeholder="请输入ID号"></el-input></el-form-item>
                <el-form-item label="预约时间">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                            v-model="formInline.reg_date"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item><el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button></el-form-item>
            </el-form>
        </div>
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="log_no" label="预约单号" width="160"></el-table-column>
                    <el-table-column prop="goods.goods_name" label="商品名称"></el-table-column>
                    <el-table-column prop="price" label="保证金"></el-table-column>
                    <el-table-column prop="user.game_user_id" label="用户"></el-table-column>
                    <el-table-column prop="user_vip" label="用户等级">
                        <template slot-scope="scope">
                            {{ scope.row.user_vip ? 'VIP会员' : '普通会员' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="预约时间"></el-table-column>
                    <el-table-column prop="order_no" label="关联订单号"></el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :current-page="curPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="totalDataNumber"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
export default {
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            tableData: [],
            formInline: {},
        }
    },
    created() {
        this.getTableList()
    },
    methods: {
        /*选择第几页*/
        handleCurrentChange(val) {
            let self = this
            self.curPage = val
            self.loading = true
            self.getTableList()
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.curPage = 1
            this.pageSize = val
            this.getTableList()
        },
        /*获取列表*/
        getTableList() {
            let self = this
            let Params = self.formInline
            Params.page = self.curPage
            Params.list_rows = self.pageSize
            AuctionApi.getMakeList(Params, true)
                .then((data) => {
                    self.loading = false
                    self.tableData = data.data.list.data
                    self.totalDataNumber = data.data.list.total
                })
                .catch((error) => {
                    self.loading = false
                })
        },

        /*搜索查询*/
        onSubmit() {
            let self = this
            self.loading = true
            self.getTableList()
        },
    },
}
</script>
<style></style>
