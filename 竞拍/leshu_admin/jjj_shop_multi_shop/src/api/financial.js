import request from '@/utils/request'

let FinancialApi = {
    getFenDataList(data, errorback) {
        return request._post('/shop/user.fen/index', data, errorback);
    },
    getGoldDataList(data, errorback) {
        return request._post('/shop/user.gold/index', data, errorback);
    },
    getLoveDataList(data, errorback) {
        return request._post('/shop/user.love/index', data, errorback);
    },
}

export default FinancialApi;