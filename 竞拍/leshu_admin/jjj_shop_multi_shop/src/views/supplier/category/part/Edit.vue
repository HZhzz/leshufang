<template>
  <el-dialog title="编辑分类" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form size="small" :model="form" :rules="formRules" ref="form">
      <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="editCategory" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import SupplierApi from '@/api/supplier.js';
  export default {
    data() {
      return {
        formRules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }],
          deposit_money: [{
            required: true,
            message: '请输入保证金',
            trigger: 'blur'
          }],
        },
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        loading: false,
      };
    },
    props: ['open_edit', 'form'],
    created() {
      this.dialogVisible = this.open_edit;
    },
    methods: {
      /*修改分类*/
      editCategory() {
        let self = this;
        let params = this.form;
        self.loading = true;
        SupplierApi.editCategory(params, true)
          .then(data => {
            self.loading = false;
            self.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            });
            self.dialogFormVisible(true);

          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*关闭弹窗*/
      dialogFormVisible(e) {
        if (e) {
          this.$emit('closeDialog', {
            type: 'success',
            openDialog: false
          })
        } else {
          this.$emit('closeDialog', {
            type: 'error',
            openDialog: false
          })
        }
      }

    }
  };
</script>

<style></style>
