<template>
    <div class="product-add">
        <el-form size="small" ref="form" :model="form" label-width="180px">
            <!-- 基本信息 -->
            <Basic></Basic>
            <!-- 价格信息 -->
            <Price></Price>
            <!-- 时间信息 -->
            <Time></Time>
            <div class="common-button-wrapper">
                <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">发布</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import Basic from './part/Basic.vue'
import Price from './part/Price.vue'
import Time from './part/Time.vue'
import AuctionApi from '@/api/auction.js'
export default {
    components: {
        Basic,
        Price,
        Time,
    },
    data() {
        return {
            /*是否正在加载*/
            loading: false,
            form: {
                model: {
                    issues: null,
                    goods_image: [],
                    goods_name: '',
                    margin_price: '',
                    min_price: '',
                    max_price: '',
                    appreciation: '',
                    static_price: '',
                    dynamic_price: '',
                    starttime: '',
                    endtime: '',
                    day: '',
                    is_new: 0,
                },
                issuesList: [],
                goods_id: '',
            },
        }
    },
    provide: function() {
        return {
            form: this.form,
        }
    },

    created() {
        this.form.goods_id = this.$route.query.goods_id
        this.getBaseData()
        this.getData()
    },

    methods: {
        getBaseData() {
            let that = this
            AuctionApi.getBaseData({}, true)
                .then((res) => {
                    Object.assign(that.form, res.data)
                })
                .catch((err) => {})
        },
        getData() {
            let that = this
            let params = {
                id: that.form.goods_id,
            }
            AuctionApi.getGoodsInfo(params, true)
                .then((res) => {
                    Object.assign(that.form, res.data)
                })
                .catch((err) => {})
        },
        onSubmit() {
            let that = this
            let params = {
                params: JSON.stringify(that.form.model),
                id: that.form.goods_id,
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //that.loading = true
                    AuctionApi.postGoodsEdit(params, true)
                        .then((res) => {
                            that.$message({
                                message: '保存成功',
                                type: 'success',
                            })
                            that.$router.push('/auction/goods/index')
                        })
                        .catch((err) => {})
                }
            })
        },
    },
}
</script>
<style></style>
