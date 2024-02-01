<template>
    <div>
        <div class="common-form">基本信息</div>
        <el-form-item label="奖品来源" prop="resource">
            <el-radio-group v-model="form.model.gift_type" @change="getData">
                <el-radio :label="1">游戏</el-radio>
                <el-radio :label="2">商城</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="奖品名称" :rules="[{ required: true, message: '请选择奖品' }]" prop="model.gift_wid">
            <el-select v-model="form.model.gift_wid" placeholder="请选择" @change="optionsBtn">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="活动图片：" :rules="[{ required: true, message: '请上传活动图片' }]" prop="model.gift_image">
            <div class="draggable-list">
                <div class="item">
                    <img :src="form.model.gift_image" alt="" srcset="" />
                </div>
            </div>
        </el-form-item>

        <el-form-item label="状态" prop="resource">
            <el-radio-group v-model="form.model.status">
                <el-radio :label="0">下架</el-radio>
                <el-radio :label="1">上架</el-radio>
            </el-radio-group>
        </el-form-item>
    </div>
</template>

<script>
import AuctionApi from '@/api/auction.js'
export default {
    inject: ['form'],
    data() {
        return {
            options: [],
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let gift_type = this.form.model.gift_type

            this.form.model.gift_wid = ''
            this.form.model.gift_image = ''

            if (gift_type == 1) {
                this.getList()
            } else {
                this.getShopList()
            }
        },
        getList() {
            let that = this
            let params = {}
            AuctionApi.getGoodsList(params, true)
                .then((res) => {
                    that.options = res.data.list.data.list
                    //that.form.model.gift_image = res.data.list.data.list[0].url
                })
                .catch((err) => {})
        },

        getShopList() {
            let that = this
            let params = {}
            AuctionApi.getShopGoodsList(params, true)
                .then((res) => {
                    that.options = res.data.data
                    //that.form.model.gift_image = res.data.list.data.list[0].url
                })
                .catch((err) => {})
        },

        optionsBtn(e) {
            let len = this.options.length
            for (let index = 0; index < len; index++) {
                if (this.options[index].id == e) {
                    this.form.model.gift_name = this.options[index].name
                    this.form.model.gift_image = this.options[index].url
                }
            }
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
