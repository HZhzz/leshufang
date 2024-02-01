<template>
    <div class="product-add">
        <el-form size="small" ref="form" :model="form" label-width="180px">
            <!-- 基本信息 -->
            <Basic></Basic>
            <!-- 价格信息 -->
            <Price></Price>

            <div v-if="this.form.model.is_new == 0">
                <!-- 时间信息 -->
                <Time></Time>
            </div>

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
                    starttime: new Date(),
                    endtime: new Date(),
                    day: '',
                    is_new: 0,
                    goods_type: 1,
                    goods_wid: '',
                },
                issuesList: [],
            },
        }
    },
    provide: function() {
        return {
            form: this.form,
        }
    },

    created() {
        this.getBaseData()
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
        onSubmit() {
            let that = this
            let params = that.form.model
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(valid)
                    //that.loading = true
                    AuctionApi.postGoodsAdd({ params: JSON.stringify(params) }, true)
                        .then((res) => {
                            that.$message({
                                message: '添加成功',
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
