<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-优惠券-优惠券列表-添加优惠券
      -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <!--添加门店-->
      <div class="common-form">添加优惠券</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
        <el-tab-pane label="商品限制" name="product"></el-tab-pane>
      </el-tabs>
      <template v-if="activeName == 'basic'">
        <el-form-item label="优惠券名称" prop="name" :rules="[{ required: true, message: ' ' }]">
          <el-input v-model="form.name" placeholder="请输入优惠券名称"></el-input>
          <div class="tips">例如：满100减10</div>
        </el-form-item>
        <el-form-item label="优惠券颜色">
          <el-radio-group v-model="form.color">
            <el-radio label="10">蓝色</el-radio>
            <el-radio label="20">红色</el-radio>
            <el-radio label="30">紫色</el-radio>
            <el-radio label="40">黄色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券类型">
          <el-radio-group v-model="form.coupon_type">
            <el-radio label="10">满减券</el-radio>
            <el-radio label="20">折扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.coupon_type == 10">
          <el-form-item label="减免金额"><el-input v-model="form.reduce_price" placeholder="请输入减免金额" type="number"></el-input></el-form-item>
        </div>
        <div v-else>
          <el-form-item label="折扣率 ">
            <el-input v-model="form.discount" placeholder="请输入折扣率" type="number"></el-input>
            <div class="tips">折扣率范围0-10，9.5代表9.5折，0代表不折扣</div>
          </el-form-item>
        </div>
        <el-form-item label="最低消费金额"><el-input v-model="form.min_price" placeholder="请输入最低消费金额" type="number"></el-input></el-form-item>
        <el-form-item label="到期类型">
          <el-radio-group v-model="form.expire_type">
            <el-radio label="10">领取后生效</el-radio>
            <el-radio label="20">固定时间</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.expire_type == 10">
          <el-form-item label="有效天数"><el-input v-model="form.expire_day" placeholder="请输入有效天数" type="number"></el-input></el-form-item>
        </div>
        <div v-else>
          <el-form-item label="有效时间">
            <el-date-picker
              v-model="form.active_time"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="发放总数量 " prop="total_num" :rules="[{ required: true, message: ' ' }]">
          <el-input v-model="form.total_num" placeholder="请输入发放总数量" type="number"></el-input>
          <div class="tips">限制领取的优惠券数量，-1为不限制</div>
        </el-form-item>
        <el-form-item label="使用条件">
          <el-radio-group v-model="form.free_limit">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">不可与促销同时使用</el-radio>
            <el-radio :label="2">不可与等级优惠同时使用</el-radio>
            <el-radio :label="3">不可于促销和等级优惠同时使用</el-radio>
          </el-radio-group>
          <div class="tips">促销是指满减，等级优惠券值商品的会员等级折扣</div>
        </el-form-item>
        <el-form-item label="排序"><el-input type="number" v-model="form.sort" placeholder="请输入排序"></el-input></el-form-item>
      </template>
      <template v-if="activeName == 'product'">
        <el-form-item label="指定商品">
          <el-radio-group v-model="form.apply_range">
            <el-radio :label="10">不限制</el-radio>
            <el-radio :label="20">限制商品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="form.apply_range == 20">
          <el-button type="primary" @click="addProduct()">添加</el-button>
          <el-table :data="prodcutData" style="width: 40%">
            <el-table-column prop="product_name" label="商品">
            </el-table-column>
            <el-table-column prop="product_" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click='delProduct(scope.row)'> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </template>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button type="info" size="small" @click="cancelFunc">取消</el-button>
        <el-button type="primary" size="small" @click="onSubmit" :loading="loading">提交</el-button>
       </div>
    </el-form>
    <!--选择商品-->
    <Product :isproduct="isproduct" :excludeIds="exclude_ids" :islist="true" @closeDialog="closeProductFunc"></Product>
  </div>
</template>

<script>
import CouponApi from '@/api/coupon.js';
import Product from '@/components/product/Product.vue';
export default {
  components: {
    Product
  },
  data() {
    return {
      activeName: 'basic',
      /*form表单数据*/
      form: {
        color: '10',
        coupon_type: '10',
        expire_type: '10',
        sort: 100,
        active_time: '',
        /*优惠限制0不显示1不可与促销同时2不可与等级优惠同时3不可于促销和等级同*/
        free_limit: 0,
        apply_range: 10,
        product:[],
      },
      loading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      prodcutData: [],
      exclude_ids: [],
      isproduct: false
    };
  },
  created() {},

  methods: {
    /*添加用户*/
    onSubmit() {
      let self = this;
      let form = self.form;
      self.$refs.form.validate(valid => {
        if (valid) {
          self.loading = true;
          CouponApi.addCoupon(form, true)
            .then(data => {
              self.loading = false;
              self.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
              self.$router.push('/coupon/coupon/index');
            })
            .catch(error => {
              self.loading = false;
            });
        }
      });
    },

    /*取消*/
    cancelFunc(){
      this.$router.push({
        path:'/coupon/coupon/index',
      });
    },
    /*添加商品*/
    addProduct() {
      this.isproduct = true;
    },
    /*关闭商品*/
    closeProductFunc(e) {
      let self = this;
      self.isproduct = e.openDialog;
      if (e.type == 'success') {
        e.params.forEach((item)=>{
          self.form.product.push(item.product_id);
          self.prodcutData.push(item);
        });
      }
      self.exclude_ids = self.form.product;
    },
    delProduct(item) {
      let self = this;
      let n = self.prodcutData.indexOf(item);
      self.prodcutData.splice(n, 1);
      self.form.product.splice(n, 1);
    },
  }
};
</script>

<style lang="scss" scoped>
.product-add {
  padding-bottom: 50px;
}

.tips {
  color: #ccc;
}
</style>
