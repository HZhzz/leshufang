<template>
    <div class="p10 product-list">
        <div class="common-level-rail">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick" v-auth="'/auction/goods/gift_add'">添加奖品</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="gift_name" label="奖品名称"> </el-table-column>
            <el-table-column prop="gift_image" label="奖品图片">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.gift_image" :fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
            <el-table-column prop="gift_type" label="奖品来源"> </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="deleteClick(scope.row.gift_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
export default {
    data() {
        return {
            tableData: [],
            goods_id: '',
            page: 1,
        }
    },
    created() {
        this.goods_id = this.$route.query.goods_id
        this.getData()
    },
    methods: {
        getData() {
            let that = this
            let params = {
                goods_id: that.goods_id,
                page: that.page,
            }
            AuctionApi.getGiftList(params, true)
                .then((res) => {
                    that.tableData = res.data.list.data
                    that.total = res.data.list.total
                })
                .catch((err) => {})
        },
        addClick() {
            this.$router.push({
                path: '/auction/goods/gift_add',
                query: {
                    goods_id: this.goods_id,
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
                AuctionApi.getGiftDel(params, true)
                    .then((res) => {
                        that.$message({
                            message: '操作成功',
                            type: 'success',
                        })
                        that.getData()
                    })
                    .catch((err) => {})
            })
        },
    },
}
</script>
<style></style>
