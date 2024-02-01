<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-规格/库存-单规格
    -->
    <div>
        <el-form-item label="产品编码：" prop="model.sku.product_no">
            <el-input v-model="form.model.sku.product_no" class="max-w460"></el-input>
        </el-form-item>
        <!-- <el-form-item label="产品价格：" width="80"  prop="model.sku.product_price">
            <el-input type="number" v-model="form.model.sku.product_price" class="max-w460"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="产品划线价："  prop="model.sku.line_price">
            <el-input type="number" v-model="form.model.sku.line_price" class="max-w460"></el-input>
        </el-form-item> -->
        <el-form-item label="库存数量：" :rules="[{ required: true, message: '请填写库存数量' }]" prop="model.sku.stock_num">
            <el-input type="number" v-model="form.model.sku.stock_num" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="商品重量(Kg)：" :rules="[{ required: true, message: '请填写商品重量' }]" prop="model.sku.product_weight">
            <el-input type="number" v-model="form.model.sku.product_weight" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="爱心值" :rules="[{ required: true, message: '请填写商品爱心值' }]" prop="model.sku.love_price">
            <el-input type="number" v-model="form.model.sku.love_price" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="乐豆价" :rules="[{ required: true, message: '请填写商品乐豆价' }]" prop="model.sku.beans_price">
            <el-input type="number" v-model="form.model.sku.beans_price" class="max-w460"></el-input>
        </el-form-item>
    </div>
</template>

<script>
export default {
    inject: ['form'],
}
</script>

<style></style>
