<template>
    <div>
        <input type="hidden" name="" :value="form.article_content" />
        <el-form size="small" :model="form" ref="form" label-width="100px">
            <el-form-item label="规则内容">
                <div class="edit_container">
                    <Uediter :text="form.article_content" :config="ueditor.config" ref="ue" @contentChange="contentChangeFunc"> </Uediter>
                </div>
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
import Uediter from '@/components/UE.vue'
import Upload from '@/components/file/Upload'
export default {
    components: {
        /*编辑器*/
        Uediter,
        /*图片上传*/
        Upload: Upload,
    },
    data() {
        return {
            loading: false,
            form: {
                article_content: '',
            },
            /*是否上传图片*/
            isupload: false,
            isImg: false,
            /*富文本配置*/
            ueditor: {
                text: '',
                config: {
                    initialFrameWidth: 600,
                    initialFrameHeight: 500,
                },
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
                id: 1,
            }
            SettingApi.getAucton(params, true)
                .then((res) => {
                    // that.ueditor.text = res.data.data.content
                    that.form.article_content = res.data.data.content
                })
                .catch((err) => {})
        },
        /*获取富文本框内容*/
        getContent: function() {
            //return this.$refs.ue.getUEContent();
        },

        /*获取富文本内容*/
        contentChangeFunc(e) {
            this.form.article_content = e
        },
        onSubmit() {
            let that = this
            let params = {
                id: 1,
                text: this.$refs.ue.getUEContent(),
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
<style>
.edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.ql-editor {
    height: 400px;
}
</style>
