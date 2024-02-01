<template>
    <div>
        <div class="common-form">基本信息</div>
        <div class="basic-setting-content">
            <el-form-item label="活动名称">
                <el-input v-model="form.title" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <el-form-item label="状态" prop="resource">
            <el-radio-group v-model="form.status">
                <el-radio :label="0">取消</el-radio>
                <el-radio :label="1">正常</el-radio>
            </el-radio-group>
        </el-form-item>
        <div class="basic-setting-content">
            <el-form-item label="排序">
                <el-input v-model="form.weigh" type="number" class="max-w460"></el-input>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['form'],
    data() {
        return {}
    },

    created() {},

    methods: {},
}
</script>
<style></style>
