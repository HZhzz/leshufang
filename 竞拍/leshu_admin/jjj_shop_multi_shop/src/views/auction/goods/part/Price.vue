<template>
    <div>
        <div class="common-form">价格信息</div>
        <div class="basic-setting-content">
            <el-form-item label="保证金" v-if="this.form.model.is_new == 0">
                <el-input v-model="form.model.margin_price" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <div class="basic-setting-content">
            <el-form-item :label="this.form.model.is_new == 0 ? '最低价格':'价格'">
                <el-input v-model="form.model.min_price" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <div class="basic-setting-content" v-if="this.form.model.is_new == 0">
            <el-form-item label="最高价格">
                <el-input v-model="form.model.max_price" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <div class="basic-setting-content">
            <el-form-item label="溢价天数">
                <el-input v-model="form.model.daynum" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <div class="basic-setting-content">
            <el-form-item label="溢价(%)">
                <el-input v-model="form.model.appreciation" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <div class="basic-setting-content">
            <el-form-item label="静态溢价(%)">
                <el-input v-model="form.model.static_price" class="max-w460"></el-input>
            </el-form-item>
        </div>
        <div class="basic-setting-content">
            <el-form-item label="动态溢价(%)">
                <el-input v-model="form.model.dynamic_price" class="max-w460"></el-input>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {

    inject: ['form'],
    data() {
        return {
            
        }
    },

    created() {},

    methods: {
        
    },
}
</script>
<style>