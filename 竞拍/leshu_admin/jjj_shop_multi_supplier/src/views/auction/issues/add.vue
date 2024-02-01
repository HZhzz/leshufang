<template>
    <div class="product-add">
        <el-form size="small" ref="form" :model="form" label-width="180px">
            <Basic></Basic>
            <div class="common-button-wrapper">
                <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">发布</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
import Basic from './part/Basic.vue'
export default {
    components: {
        Basic,
    },
    data() {
        return {
            /*是否正在加载*/
            loading: false,
            form: {
                title: '',
                status: 1,
                weigh: 10,
            },
        }
    },
    provide: function() {
        return {
            form: this.form,
        }
    },
    created() {},

    methods: {
        cancelFunc() {
            this.$router.push('/auction/issues/index')
        },
        onSubmit() {
            let that = this
            let params = that.form
            console.log(params)
            AuctionApi.postIssuesAdd(params, true)
                .then((res) => {
                    that.loading = false
                    that.$message({
                        message: '添加成功',
                        type: 'success',
                    })
                    that.cancelFunc()
                })
                .catch((err) => {})
        },
    },
}
</script>
<style></style>
