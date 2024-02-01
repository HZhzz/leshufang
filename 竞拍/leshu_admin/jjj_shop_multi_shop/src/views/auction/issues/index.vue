<template>
    <div class="p10 product-list">
        <!--添加产品-->
        <div class="common-level-rail">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick" v-auth="'/auction/issues/add'">添加期数</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="issues_id" label="ID"> </el-table-column>
            <el-table-column prop="title" label="名称"> </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status_color">{{ scope.row.status_text }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="weigh" label="排序"> </el-table-column>
            <el-table-column prop="create_time" label="创建时间"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="240">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="editClick(scope.row.issues_id)" icon="el-icon-edit"></el-button>
                    <el-button type="danger " size="mini" @click="deleteClick(scope.row.issues_id)" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-right">
            <el-pagination
                background
                current-page.sync="15"
                @current-change="handleCurrentChange"
                :page-size="20"
                layout="prev, pager, next"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
export default {
    data() {
        return {
            page: 1,
            tableData: [],
            total: 0,
        }
    },

    created() {
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
            }
            AuctionApi.getIssuesList(params, true)
                .then((res) => {
                    that.tableData = res.data.list.data
                    that.total = res.data.list.total
                })
                .catch((err) => {})
        },
        addClick() {
            this.$router.push('/auction/issues/add')
        },
        editClick(id) {
            this.$router.push({
                path: '/auction/issues/edit',
                query: {
                    issues_id: id,
                    scene: 'edit',
                },
            })
        },
        deleteClick(id) {
            let self = this
            self.$confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
                type: 'warning',
            }).then(() => {
                AuctionApi.postIssuesEdit({
                    id: id,
                    is_show: 0,
                }).then((data) => {
                    self.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                    self.getData()
                })
            })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getData()
        },
    },
}
</script>
<style></style>
