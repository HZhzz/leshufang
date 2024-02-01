<template>
    <div>
        <div class="common-form">会员升级设置</div>
        <div class="vipList" v-for="(item,index) in configList" :key="index">
            <!-- <div class="item">
                id: {{ item.id }}
            </div> -->
            <div class="title">
                {{ item.title }}
            </div>
            <div class="item">
                直推比例: <el-input clearable type="number" v-model="item.yongjin"></el-input>
            </div>
            <div class="item">
                平级比例: <el-input clearable type="number" v-model="item.yongjin2"></el-input>
            </div>
            <div class="item">
                直推AI人数: <el-input clearable type="number" v-model="item.zhituinum"></el-input>
            </div>
            <div class="item">
                小区业绩: <el-input clearable type="number" v-model="item.smallyeji"></el-input>
            </div>
            <div class="item">
                小区AI人数: <el-input clearable type="number" v-model="item.smallnum"></el-input>
            </div>
        </div>
        <div class="savebtn">
            <el-button type="primary" @click="setVip">保存</el-button>
        </div>
    </div>
</template>
<script>
    import SettingApi from '@/api/setting.js';
    export default{
        data() {
            return {
                /*是否正在加载*/
                loading: false,

                /*vip 设置列表*/ 
                configList:[],
                
            }
        },
        created(){
            let self = this;
            SettingApi.getVipSetting({}, true).then(res => {
                // console.log(res)
                self.configList = res.data.configList
                
            })
            .catch(error => {

            });
        },
        methods:{
            setVip(){
                SettingApi.setVipSetting(this.configList,true).then(res=>{
                    console.log(res)
                    this.$message({
                    message: res.msg,
                    type: 'success'
                    });
                }).catch(error=>{
                    this.$message.error('保存失败')
                })
            }
        }
    }
</script>
<style lang="scss">
    .vipList{
        display: flex;
        font-size: 14px;
        align-items: center;
        .item{
            flex: 1;
            margin: 20px;
        }
        .title{
            font-size: 14px;
            font-weight: bold;
            width: 5%;
            text-align: center;
        }
    }
</style>