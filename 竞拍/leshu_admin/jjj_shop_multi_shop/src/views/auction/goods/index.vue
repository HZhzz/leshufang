<template>
    <div class="p10 product-list">
        <!--添加产品-->
        <div class="common-level-rail">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick" v-auth="'/auction/goods/add'">添加商品</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="goods_id" label="ID"> </el-table-column>
            <el-table-column prop="issues.title" label="期数"> </el-table-column>
            <el-table-column prop="goods_name" label="名称"> </el-table-column>
            <el-table-column prop="goods_image" label="图片">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.goods_image" :fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="margin_price" label="保证金"> </el-table-column>
            <el-table-column prop="is_new_text" label="新人专享"> </el-table-column>
            <el-table-column prop="weigh" label="排序"> </el-table-column>
            <el-table-column prop="update_time" label="更新时间"> </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="editClick(scope.row.goods_id)">编辑</el-button>
                    <el-button type="text" size="mini" @click="spaceClick(scope.row.goods_id)">仓位</el-button>
                    <el-button type="text" size="mini" @click="giftClick(scope.row.goods_id)">奖品</el-button>
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
            page: 1,
            tableData: [],
            total: 120,
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
            AuctionApi.getDataList(params, true)
                .then((res) => {
                    that.tableData = res.data.list.data
                    that.total = res.data.list.total
                })
                .catch((err) => {})
        },
        addClick() {
            this.$router.push('/auction/goods/add')
        },
        editClick(id) {
            this.$router.push({
                path: '/auction/goods/edit',
                query: {
                    goods_id: id,
                    scene: 'edit',
                },
            })
        },

        spaceClick(id) {
            this.$router.push({
                path: '/auction/goods/space',
                query: {
                    goods_id: id,
                },
            })
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
        giftClick(id) {
            this.$router.push({
                path: '/auction/goods/gift',
                query: {
                    goods_id: id,
                },
            })
        },
    },
}
</script>
<style></style>
