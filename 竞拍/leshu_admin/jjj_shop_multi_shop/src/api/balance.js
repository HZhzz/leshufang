import request from '@/utils/request'

let BalanceApi = {
    /*积分设置*/
    setSettings(data, errorback) {
        return request._post('/shop/user.balance/setting', data, errorback);
    },
    /*获取设置*/
    getSettings(data, errorback) {
        return request._get('/shop/user.balance/setting', data, errorback);
    },
    /*获取积分列表*/
    getBalanceLog(data, errorback) {
        return request._get('/shop/user.balance/log', data, errorback);
    },
    /*充值套餐*/
    listPlan(data, errorback) {
        return request._post('/shop/user.plan/index', data, errorback);
    },
    /*添加套餐*/
    addPlan(data, errorback) {
        return request._get('/shop/user.plan/add', data, errorback);
    },
    /*修改套餐*/
    editPlan(data, errorback) {
        return request._post('/shop/user.plan/edit', data, errorback);
    },
    /*删除套餐*/
    deletePlan(data, errorback) {
        return request._get('/shop/user.plan/delete', data, errorback);
    },
    /*充值记录*/
    log(data, errorback) {
        return request._post('/shop/user.plan/log', data, errorback);
    },
}
export default BalanceApi;
