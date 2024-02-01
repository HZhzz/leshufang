<template>
    <div class="product-add">
        <el-form size="small" ref="form" :model="form" label-width="180px">
            <GiftForm></GiftForm>
            <div class="common-button-wrapper">
                <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">确定</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
import GiftForm from './part/GiftForm.vue'
export default {
    components: {
        GiftForm,
    },
    data() {
        return {
            form: {
                model: {
                    gift_type: 1,
                    status: 1,
                    gift_image: '',
                    gift_wid: '',
                    goods_id: '',
                },
            },
        }
    },
    provide: function() {
        return {
            form: this.form,
        }
    },
    created() {
        this.form.model.goods_id = this.$route.query.goods_id
    },

    methods: {
        onSubmit() {
            let that = this
            let params = that.form.model
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(valid)
                    //that.loading = true
                    AuctionApi.postGiftAdd({ params: JSON.stringify(params) }, true)
                        .then((res) => {
                            that.$message({
                                message: '添加成功',
                                type: 'success',
                            })
                            that.$router.push({
                                path: '/auction/goods/gift',
                                query: {
                                    goods_id: that.form.model.goods_id,
                                },
                            })
                        })
                        .catch((err) => {})
                }
            })
        },
    },
}
</script>
<style></style>
