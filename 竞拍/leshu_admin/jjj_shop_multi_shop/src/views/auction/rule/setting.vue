<template>
    <div class="product-add pb50" v-loading="loading">
        <el-form size="small" :model="form" ref="form" label-width="100px">
            <div class="common-form">基本信息</div>
            <el-form-item label="不可预约时间（分钟）" prop="article_title">
                <el-input v-model="form.not_tome" placeholder="请输入竞拍前不可预约时间" class="max-w460"></el-input>
                <div class="gray9">竞拍开始前限制时间</div>
            </el-form-item>
            <div class="common-form">分配信息</div>
            <el-form-item label="上级可获利" prop="article_title">
                <el-input v-model="form.parent1" placeholder="单位（%）" class="max-w460"></el-input>
            </el-form-item>
            <el-form-item label="上上级可获利" prop="article_title">
                <el-input v-model="form.parent2" placeholder="单位（%）" class="max-w460"></el-input>
            </el-form-item>
            <div class="common-form">VIP信息</div>
            <el-form-item label="vip首次价格（金币）" prop="article_title">
                <el-input v-model="form.vip_first_price" placeholder="请输入" class="max-w460"></el-input>
            </el-form-item>
            <el-form-item label="vip非首次价格（金币）" prop="article_title">
                <el-input v-model="form.vip_second_price" placeholder="请输入" class="max-w460"></el-input>
            </el-form-item>
            <el-form-item label="有效时间（天）" prop="article_title">
                <el-input v-model="form.vip_valid_time" placeholder="请输入" class="max-w460"></el-input>
            </el-form-item>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import SettingApi from '@/api/setting.js'
export default {
    data() {
        return {
            loading: false,
            id: 2,
            form: {
                not_tome: '',
            },
        }
    },

    created() {
        this.getData()
    },

    methods: {
        getData() {
            let that = this
            let params = {
                id: that.id,
            }
            SettingApi.getAucton(params, true)
                .then((res) => {
                    that.form = res.data.data.content
                })
                .catch((err) => {})
        },
        onSubmit() {
            let that = this
            let params = {
                id: that.id,
                text: that.form,
            }
            SettingApi.setAucton(params, true)
                .then((res) => {
                    that.loading = false
                    that.$message({
                        message: '保持成功',
                        type: 'success',
                    })
                })
                .catch((err) => {})
        },
    },
}
</script>
<style></style>
