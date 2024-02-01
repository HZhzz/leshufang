import request from '@/utils/request'

let AuctionApi = {
    /* 商品列表 */
    getDataList(data, errorback) {
        return request._post('/supplier/auction.goods/index', data, errorback);
    },

    /* 公共配置参数 */
    getBaseData(data,errorback){
        return request._get('/supplier/auction.goods/config', data, errorback);
    },

    /* 新增商品 */
    postGoodsAdd(data, errorback){
        return request._post('/supplier/auction.goods/create', data, errorback);
    },

    /* 查询商品信息 */
    getGoodsInfo(data,errorback){
        return request._get('/supplier/auction.goods/edit', data, errorback);
    },

    /* 编辑商品信息 */
    postGoodsEdit(data,errorback){
        return request._post('/supplier/auction.goods/edit', data, errorback);
    },

    /* 新增期数 */
    postIssuesAdd(data, errorback){
        return request._post('/supplier/auction.issues/create', data, errorback);
    },

    /* 期数列表 */
    getIssuesList(data, errorback){
        return request._post('/supplier/auction.issues/index', data, errorback);
    },

    /* 查询期数信息 */
    getIssuesInfo(data,errorback){
        return request._get('/supplier/auction.issues/edit', data, errorback);
    },

    /* 编辑期数信息 */
    postIssuesEdit(data,errorback){
        return request._post('/supplier/auction.issues/edit', data, errorback);
    },


    /* 竞拍订单列表 */
    postAuctionList(data,errorback){
        return request._get('/supplier/auction.order/index', data, errorback);
    },
}

export default AuctionApi;