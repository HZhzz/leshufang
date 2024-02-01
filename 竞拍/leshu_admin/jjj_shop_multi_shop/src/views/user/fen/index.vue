<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="乐豆明细" name="first">
                <Fen></Fen>
            </el-tab-pane>
            <el-tab-pane label="金币明细" name="second">
                <Gold></Gold>
            </el-tab-pane>
            <el-tab-pane label="爱心值明细" name="third">
                <Love></Love>
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import Fen from './part/fen.vue'
import Gold from './part/gold.vue'
import Love from './part/love.vue'
export default {
    components: {
        Fen,
        Gold,
        Love,
    },
    data() {
        return {
            activeName: 'first',
        }
    },

    created() {},

    methods: {},
}
</script>
<style></style>
