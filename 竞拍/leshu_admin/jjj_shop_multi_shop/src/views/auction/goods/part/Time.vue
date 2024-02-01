<template>
    <div>
        <div class="common-form">时间信息</div>
        <div class="basic-setting-content">
            <el-form-item label="竞拍日期">
                <el-date-picker v-model="form.model.day" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change="controllStartTime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="竞拍时间">
                <el-time-picker
                    v-model="form.model.starttime"
                    format="HH:mm"
                    placeholder="选择开始时间"
                    value-format="HH:mm"
                    @change="controllEndTime"
                ></el-time-picker>
                -
                <el-time-picker v-model="form.model.endtime" format="HH:mm" placeholder="选择结束时间" value-format="HH:mm"></el-time-picker>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['form'],
    data() {
        return {
            changeStartTime: new Date(),
            changeEndTime: new Date(),
        }
    },

    created() {
        this.form.model.day = this.formatDate(new Date(), 'yyyy-MM-dd')
    },

    methods: {
        controllEndTime() {
            if (this.form.model.starttime !== '' && this.form.model.starttime !== null) {
                // 当开始时间不为空;不加判断当清除开始时间时控制台会报错
                this.changeEndTime = new Date(new Date(this.form.model.starttime.getTime() + 30 * 60 * 1000)) // 选择开始时间后使结束时间永远比开始时间多30分钟，此处可根据需求自行设置
                this.form.model.endtime = this.changeEndTime
            }
        },
        controllStartTime() {
            this.handleTime()
        },
        handleTime() {
            var tempTime = new Date()
            const toStringTempTime = this.formatDate(tempTime, 'yyyy-MM-dd') // 将获取到的当前时间转化为年-月-日字符串
            //const formSelectedTime = this.formatDate(this.form.model.day, 'yyyy-MM-dd') // 日期选择器的时间,字符串型
            const formSelectedTime = this.form.model.day // 日期选择器的时间,字符串型
            console.log(formSelectedTime)
            if (formSelectedTime === toStringTempTime) {
                // 当前日期等于时间选择器选中的日期
                this.changeStartTime = new Date()
                this.form.model.starttime = this.changeStartTime // 时间段开始时间设置为当前时间
            } else {
                this.changeStartTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000) // 变为0点
                this.form.model.starttime = this.changeStartTime // 时间段开始时间为0点
            }
            this.controllEndTime() // 调用此函数，控制结束时间
        },
        formatDate(date, type) {
            var now = date
            var newTime
            if (type === 'yyyy-MM-dd') {
                var year = now.getFullYear()
                var month = now.getMonth() + 1
                month = month < 10 ? '0' + month : month
                var day = now.getDate()
                day = day < 10 ? '0' + day : day
                newTime = year + '-' + month + '-' + day
            }
            if (type === 'HH:ss') {
                var getHour = now.getHours()
                getHour = getHour < 10 ? '0' + getHour : getHour
                var minutes = now.getMinutes()
                minutes = minutes < 10 ? '0' + minutes : minutes
                newTime = getHour + ':' + minutes
            }
            return newTime
        },
    },
}
</script>
<style></style>
