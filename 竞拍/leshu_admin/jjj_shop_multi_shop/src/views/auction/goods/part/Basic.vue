<template>
    <div>
        <div class="common-form">基本信息</div>

        <el-form-item label="新人专场" prop="resource">
            <el-radio-group v-model="form.model.is_new">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
            </el-radio-group>
        </el-form-item>

        <div v-if="form.model.is_new == 0">
            <!-- <el-form-item label="商品来源">
                <el-radio-group v-model="form.model.goods_type" @input="BtnInput">
                    <el-radio :label="1">自定义商品</el-radio>
                    <el-radio :label="2">游戏商品</el-radio>
                    <el-radio :label="3">商城商品</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item
                label="商品名称"
                v-if="form.model.goods_type == 2"
                :rules="[{ required: true, message: '请选择商品' }]"
                prop="model.goods_wid"
            >
                <el-select v-model="form.model.goods_wid" placeholder="请选择" @change="optionsBtn">
                    <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="商品名称"
                v-if="form.model.goods_type == 3"
                :rules="[{ required: true, message: '请选择商品' }]"
                prop="model.goods_wid"
            >
                <el-select v-model="form.model.goods_wid" placeholder="请选择" @change="optionsBtn">
                    <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="活动名称"
                v-if="form.model.goods_type == 1"
                :rules="[{ required: true, message: '请填写活动名称' }]"
                prop="model.goods_name"
            >
                <el-input v-model="form.model.goods_name" class="max-w460"></el-input>
            </el-form-item>

            <el-form-item label="竞拍期数" :rules="[{ required: true, message: '请选择期数' }]" prop="model.issues">
                <el-select v-model="form.model.issues" placeholder="请选择">
                    <el-option v-for="(item, ind) in form.issuesList" :key="ind" :label="item.title" :value="item.issues_id"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <el-form-item label="活动图片：" :rules="[{ required: true, message: '请上传活动图片' }]" prop="model.goods_image">
            <div class="draggable-list">
                <draggable class="wrapper" v-model="form.model.goods_image">
                    <transition-group>
                        <div class="item" v-for="(item, index) in form.model.goods_image" :key="item.file_path">
                            <img v-img-url="item.file_path" />
                            <a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)"><i class="el-icon-close"></i></a>
                        </div>
                    </transition-group>
                </draggable>
                <div class="item img-select" @click="openProductUpload"><i class="el-icon-plus"></i></div>
            </div>
            <!-- <div class="draggable-list">
                    <div class="item">
                        <img :src="form.model.goods_image" alt="" srcset="" />
                    </div>
                </div> -->
        </el-form-item>

        <!-- <div v-if="form.model.is_new == 1">
            <el-form-item label="商品图片：" :rules="[{ required: true, message: '请上传商品图片' }]" prop="model.goods_image">
                <div class="draggable-list">
                    <draggable class="wrapper" v-model="form.model.goods_image">
                        <transition-group>
                            <div class="item" v-for="(item, index) in form.model.goods_image" :key="item.file_path">
                                <img v-img-url="item.file_path" />
                                <a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)"><i class="el-icon-close"></i></a>
                            </div>
                        </transition-group>
                    </draggable>
                    <div class="item img-select" @click="openProductUpload"><i class="el-icon-plus"></i></div>
                </div>
            </el-form-item>
        </div> -->

        <!-- <el-form-item label="状态" prop="resource">
            <el-radio-group v-model="form.status">
                <el-radio :label="0">取消</el-radio>
                <el-radio :label="1">正常</el-radio>
            </el-radio-group>
        </el-form-item>
        <div class="basic-setting-content">
            <el-form-item label="排序">
                <el-input v-model="form.weigh" type="number" class="max-w460"></el-input>
            </el-form-item>
        </div> -->

        <!--商品图片组件-->
        <Upload v-if="isProductUpload" :config="{ total: 1 }" :isupload="isProductUpload" @returnImgs="returnProductImgsFunc">上传图片</Upload>
    </div>
</template>

<script>
import Upload from '@/components/file/Upload'
import draggable from 'vuedraggable'
import AuctionApi from '@/api/auction.js'
export default {
    components: {
        Upload,
        draggable,
    },
    inject: ['form'],
    data() {
        return {
            isProductUpload: false,
            options1: [],
            options2: [],
        }
    },

    created() {
        this.getList()
        this.getShopList()
    },

    methods: {
        getList() {
            let that = this
            let params = {}
            AuctionApi.getGoodsList(params, true)
                .then((res) => {
                    that.options1 = res.data.list.data.list
                })
                .catch((err) => {})
        },

        getShopList() {
            let that = this
            let params = {}
            AuctionApi.getShopGoodsList(params, true)
                .then((res) => {
                    that.options2 = res.data.data
                })
                .catch((err) => {})
        },

        /*打开上传图片*/
        openProductUpload: function() {
            this.isProductUpload = true
        },

        /*上传商品图片*/
        returnProductImgsFunc(e) {
            if (e != null) {
                let imgs = this.form.model.goods_image.concat(e)
                this.$set(this.form.model, 'goods_image', imgs)
            }
            this.isProductUpload = false
        },
        /*删除商品图片*/
        deleteImg(index) {
            this.form.model.goods_image.splice(index, 1)
        },

        optionsBtn(e) {
            let type_id = this.form.model.goods_type

            if (type_id == 2) {
                let len = this.options1.length
                for (let index = 0; index < len; index++) {
                    if (this.options1[index].id == e) {
                        this.form.model.goods_name = this.options1[index].name
                        this.form.model.goods_image = this.options1[index].url
                    }
                }
            }

            if (type_id == 3) {
                let len = this.options2.length
                for (let index = 0; index < len; index++) {
                    if (this.options2[index].id == e) {
                        this.form.model.goods_name = this.options2[index].name
                        this.form.model.goods_image = this.options2[index].url
                    }
                }
            }
        },

        BtnInput(e) {
            this.form.model.goods_name = ''
            this.form.model.goods_image = ''
            this.form.model.goods_wid = ''
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
    line-height: 20px;
    color: #2c3e50;
}

.ql-editor {
    height: 400px;
}

.draggable-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.draggable-list .wrapper > span {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.draggable-list .item {
    position: relative;
    width: 110px;
    height: 110px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #dddddd;
}

.draggable-list .delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background: red;
    line-height: 16px;
    font-size: 16px;
    color: #ffffff;
    display: none;
}

.draggable-list .item:hover .delete-btn {
    display: block;
}

.draggable-list .item img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-height: 100%;
    max-width: 100%;
}

.draggable-list .img-select {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #dddddd;
    font-size: 30px;
}

.draggable-list .img-select i {
    color: #409eff;
}
</style>
