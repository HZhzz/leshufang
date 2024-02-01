import request from '@/utils/request'

let BannerApi = {
    /*列表*/
    bannerList(data, errorback) {
        return request._post('/supplier/banner.banner/index', data, errorback);
    },
    /*添加*/
    bannerAdd(data, errorback) {
        return request._post('/supplier/banner.banner/add', data, errorback);
    },
    /*编辑*/
    bannerEdit(data, errorback) {
        return request._post('/supplier/banner.banner/edit', data, errorback);
    },
    /*删除*/
    bannerDel(data, errorback) {
        return request._post('/supplier/banner.banner/delete', data, errorback);
    },
}
export default BannerApi;
