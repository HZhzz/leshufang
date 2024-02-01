import request from '@/utils/request'

let SupplierApi = {
  /*供应商列表*/
  supplierList(data, errorback) {
    return request._post('/shop/supplier.supplier/index', data, errorback);
  },
  /*添加供应商*/
  toaddSupplier(data, errorback) {
    return request._get('/shop/supplier.supplier/add', data, errorback);
  },
  /*添加供应商*/
  addSupplier(data, errorback) {
    return request._post('/shop/supplier.supplier/add', data, errorback);
  },
  /*供应商编辑*/
  toEditSupplier(data, errorback) {
    return request._get('/shop/supplier.supplier/edit', data, errorback);
  },
  /*供应商编辑*/
  editSupplier(data, errorback) {
    return request._post('/shop/supplier.supplier/edit', data, errorback);
  },
  /*删除供应商*/
  deleteSupplier(data, errorback) {
    return request._post('/shop/supplier.supplier/delete', data, errorback);
  },
  /*提现记录*/
  cashList(data, errorback) {
    return request._post('/shop/supplier.cash/index', data, errorback);
  },
  /*提现审核*/
  cashSubmit(data, errorback) {
    return request._post('/shop/supplier.cash/submit', data, errorback);
  },
  /*提现确认打款*/
  cashMoney(data, errorback) {
    return request._post('/shop/supplier.cash/money', data, errorback);
  },
  /*供应商待审核列表*/
  supplierPendList(data, errorback) {
    return request._post('/shop/supplier.supplier/apply', data, errorback);
  },
  /*获取主营分类*/
  Category(data, errorback) {
    return request._post('/shop/supplier.Category/index', data, errorback);
  },
  /*添加分类*/
  addCategory(data, errorback) {
    return request._post('/shop/supplier.Category/add', data, errorback);
  },
  /*编辑分类*/
  editCategory(data, errorback) {
    return request._post('/shop/supplier.Category/edit', data, errorback);
  },
  /*删除分类*/
  deleteCategory(data, errorback) {
    return request._post('/shop/supplier.Category/delete', data, errorback);
  },
  /*开启禁止*/
  supplierRecycle(data, errorback) {
    return request._post('/shop/supplier.supplier/recycle', data, errorback);
  },
}
export default SupplierApi;
