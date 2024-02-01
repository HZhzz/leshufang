import request from '@/utils/request'

let AuctionApi = {
    /* 商品列表 */
    getDataList(data, errorback) {
        return request._post('/shop/auction.goods/index', data, errorback);
    },

    /* 公共配置参数 */
    getBaseData(data,errorback){
        return request._get('/shop/auction.goods/config', data, errorback);
    },

    /* 新增商品 */
    postGoodsAdd(data, errorback){
        return request._post('/shop/auction.goods/create', data, errorback);
    },

    /* 删除商品 */
    getGoodsDel(data, errorback){
        return request._post('/shop/auction.goods/delete', data, errorback);
    },

    /* 查询商品信息 */
    getGoodsInfo(data,errorback){
        return request._get('/shop/auction.goods/edit', data, errorback);
    },

    /* 编辑商品信息 */
    postGoodsEdit(data,errorback){
        return request._post('/shop/auction.goods/edit', data, errorback);
    },

    /* 新增期数 */
    postIssuesAdd(data, errorback){
        return request._post('/shop/auction.issues/create', data, errorback);
    },

    /* 期数列表 */
    getIssuesList(data, errorback){
        return request._post('/shop/auction.issues/index', data, errorback);
    },

    /* 查询期数信息 */
    getIssuesInfo(data,errorback){
        return request._get('/shop/auction.issues/edit', data, errorback);
    },

    /* 编辑期数信息 */
    postIssuesEdit(data,errorback){
        return request._post('/shop/auction.issues/edit', data, errorback);
    },


    /* 竞拍订单列表 */
    postAuctionList(data,errorback){
        return request._get('/shop/auction.order/index', data, errorback);
    },

    /* 金蟾列表 */
    getGoodsList(data,errorback){
        return request._get('/shop/auction.goods/getGoodsList', data, errorback);
    },

    /* 商城商品列表 */
    getShopGoodsList(data,errorback){
        return request._get('/shop/auction.goods/getShopGoodsList', data, errorback);
    },

    /*仓位列表 */
    getSpaceList(data,errorback){
        return request._get('/shop/auction.goods/spacelist', data, errorback);
    },

    /*增加仓位 */
    postSpaceAdd(data,errorback){
        return request._get('/shop/auction.goods/spaceadd', data, errorback);
    },

    /*增加奖品*/
    postGiftAdd(data,errorback){
        return request._post('/shop/auction.GoodsGift/create', data, errorback);
    },

    getGiftList(data,errorback){
        return request._get('/shop/auction.GoodsGift/index', data, errorback);
    },

    getGiftDel(data,errorback){
        return request._get('/shop/auction.GoodsGift/delete', data, errorback);
    },

    /* 预约列表 */
    getMakeList(data,errorback){
        return request._get('/shop/auction.MakeLog/index', data, errorback);
    },

}

export default AuctionApi;