<template>
    <div>
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="ID"><el-input v-model="formInline.game_user_id" placeholder="请输入ID号"></el-input></el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formInline.type" placeholder="请选择">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="增加" value="1"></el-option>
                        <el-option label="减少" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item><el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button></el-form-item>
            </el-form>
        </div>
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="user.game_user_id" label="用户"></el-table-column>
                    <el-table-column prop="scene_text" label="场景"></el-table-column>
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.type == 1 ? 'success' : 'danger'"> {{ scope.row.type == 1 ? '增加' : '减少' }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="变动金额"></el-table-column>
                    <el-table-column prop="describe" label="管理员备注"></el-table-column>
                    <el-table-column prop="new_money" label="变动后金额"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间"></el-table-column>
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
import FinancialApi from '@/api/financial.js'
export default {
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*列表数据*/
            tableData: [],
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            formInline: {},
        }
    },

    created() {
        this.getData()
    },

    methods: {
        /*选择第几页*/
        handleCurrentChange(val) {
            let self = this
            self.curPage = val
            self.loading = true
            self.getData()
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.curPage = 1
            this.pageSize = val
            this.getData()
        },
        getData() {
            let that = this
            let params = that.formInline
            params.page = that.curPage
            params.list_rows = that.pageSize

            FinancialApi.getFenDataList(params, true)
                .then((data) => {
                    that.loading = false
                    that.tableData = data.data.list.data
                    that.totalDataNumber = data.data.list.total
                })
                .catch((err) => {
                    that.loading = false
                })
        },
        /*搜索查询*/
        onSubmit() {
            let self = this
            self.loading = true
            self.getData()
        },
    },
}
</script>
<style></style>
