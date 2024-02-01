import request from "./request.js"
var api = {};
//基本信息-基本信息
api.getPullUserInfo = (data) => request('user.Usergame/getPullUserInfo', 'post', data);
//用户-同步用户信息
api.setUserUpdate = (data) => request('user.Usergame/setUserUpdate', 'get', data);
//用户-获取用户金融信息
api.getUserInfo = (data) => request('user.Usergame/getUserInfo', 'get', data);
//用户-用户乐豆操作
api.getHanldUserFen = (data) => request('user.Usergame/getHanldUserFen', 'post', data);
//用户-用户金币操作
api.getHanldUserGold = (data) => request('user.Usergame/getHanldUserGold', 'post', data);
//用户-购买VIP服务
api.postUserVipServer = (data) => request('user.Usergame/postUserVipServer', 'post', data);
//用户-设置用户自动付款
api.setUserAutoPay = (data) => request('user.Usergame/setUserAutoPay', 'get', data);
//用户-配置信息
api.getConfig = (data) => request('user.Usergame/getConfig', 'get', data);
//用户-用户消费乐豆明细
api.getUserFenLog = (data) => request('user.Usergame/getUserFenLog', 'post', data);
//用户-用户消费金币明细
api.getUserGoldLog = (data) => request('user.Usergame/getUserGoldLog', 'post', data);
//用户-用户预约明细
api.getUserMakeLog = (data) => request('user.Usergame/getUserMakeLog', 'post', data);
//用户-用户预约明细
api.getUserTotalPriceLog = (data) => request('user.Usergame/getUserTotalPriceLog', 'post', data);
//用户-用户直推或间推明细
api.getUserPraiseList = (data) => request('user.Usergame/getUserPraiseList', 'post', data);

////竞拍商品-商品列表
api.getListAll = (data) => request('auction.goods/getListAll', 'post', data);
////竞拍商品-用户下单
api.postCreateOrder = (data) => request('auction.GoodsOrder/postCreateOrder', 'post', data);
////竞拍商品-支付订单
api.getOrderPay = (data) => request('auction.GoodsOrder/getOrderPay', 'post', data);
////竞拍商品-用户预约
api.postMakeOrder = (data) => request('auction.GoodsOrder/postMakeOrder', 'post', data);
////竞拍商品-新用户专属商品
api.getNewUserListAll = (data) => request('auction.goods/getNewUserListAll', 'post', data);
////竞拍商品-订单列表
api.getOrderList = (data) => request('user.Usergame/getOrderList', 'post', data);
////竞拍商品-竞拍规则
api.getRule = (data) => request('auction.Goods/getRule', 'post', data);
////竞拍商品-用户取消订单
api.getUserOrderCancel = (data) => request('user.Usergame/getUserOrderCancel', 'post', data);
////竞拍商品-未付款订单
api.getUserNotPayOrder = (data) => request('user.Usergame/getUserNotPayOrder', 'post', data);
////竞拍商品-获取竞拍兑换商品
api.getGoodsGiftList = (data) => request('auction.GoodsGift/getGoodsGiftList', 'post', data);
////竞拍商品-兑换奖品
api.setUserOrderExchange = (data) => request('auction.GoodsGift/setUserOrderExchange', 'post', data);
////竞拍商品-团队数据
api.getTeam = (data) => request('user.Usergame/myTeam', 'post',data)
export default api;