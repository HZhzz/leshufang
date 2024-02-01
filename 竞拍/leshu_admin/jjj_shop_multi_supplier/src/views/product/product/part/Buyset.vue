<template>
    <!--
    	作者：luoyiming
    	时间：2019-10-26
    	描述：商品管理-商品编辑-高级设置
    -->
    <div class="buy-set-content pl16 pr16">
        <!--其他设置-->
        <div class="common-form mt50">其他设置</div>
        <el-form-item label="商品属性：">
            <el-radio-group v-model="form.model.is_virtual">
                <el-radio :label="0">实物商品</el-radio>
                <el-radio :label="1">虚拟商品(无需发货)</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item
            label="运费模板："
            :rules="[{ required: true, message: '选择运费模板' }]"
            prop="model.delivery_id"
            v-if="form.model.is_virtual == 0"
        >
            <el-select v-model="form.model.delivery_id">
                <el-option v-for="item in form.delivery" :value="item.delivery_id" :key="item.delivery_id" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="初始销量：">
            <el-input type="number" min="0" v-model="form.model.sales_initial" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="商品排序：" :rules="[{ required: true, message: ' ' }]" prop="model.product_sort">
            <el-input type="number" min="0" v-model="form.model.product_sort" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="限购数量：" :rules="[{ required: true, message: ' ' }]" prop="model.limit_num">
            <el-input type="number" min="0" v-model="form.model.limit_num" class="max-w460"></el-input>
            <div class="gray9">每个会员购买的最大数量，0为不限购</div>
        </el-form-item>
        <el-form-item label="发货类型：" v-if="form.model.is_virtual == 1">
            <el-radio-group v-model="form.model.virtual_auto">
                <el-radio :label="1">自动</el-radio>
                <el-radio :label="0">手动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item
            label="虚拟内容："
            :rules="[{ required: true, message: '请填写虚拟内容' }]"
            prop="model.virtual_content"
            v-if="form.model.is_virtual == 1"
        >
            <el-input type="text" v-model="form.model.virtual_content" class="max-w460"></el-input>
            <div class="gray9">虚拟物品内容</div>
        </el-form-item>
        <!--积分设置-->
        <div class="common-form mt50">积分设置</div>
        <el-form-item label="是否开启积分赠送：">
            <el-radio-group v-model="form.model.is_points_gift">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许使用积分抵扣：">
            <el-radio-group v-model="form.model.is_points_discount">
                <el-radio :label="1">允许</el-radio>
                <el-radio :label="0">不允许</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item
            v-if="form.model.is_points_discount == 1"
            label="最大抵扣积分数量："
            :rules="[{ required: true, message: ' ' }]"
            prop="model.max_points_discount"
        >
            <el-input type="number" v-model="form.model.max_points_discount" class="max-w460"></el-input>
            <div class="gray9">最大抵扣积分数量，-1为使用通用设置</div>
        </el-form-item>
    </div>
</template>

<script>
export default {
    data() {
        return {
            unit: '%',
            grade_unit: '%',
        }
    },
    created() {
        if (this.form.model.alone_grade_type == '20') {
            this.grade_unit = '元'
        }
        if (this.form.model.agent_money_type == '20') {
            this.unit = '元'
        }
    },
    inject: ['form'],
    methods: {
        /*换算单位*/
        changeMoneyType: function(val) {
            if (val == '10') {
                this.unit = '%'
            } else {
                this.unit = '元'
            }
        },
        /*换算单位*/
        changeGradeType: function(val) {
            if (val == '10') {
                this.grade_unit = '%'
            } else {
                this.grade_unit = '元'
            }
        },
    },
}
</script>

<style></style>
