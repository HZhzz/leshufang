
// 本地访问域名
const testUrl = "http://newshop.leshufang.cn"
//线上域名
const productUrl = ''
const config = {
  baseUrl:  process.env.NODE_ENV == 'production' ? productUrl : testUrl
}

export default config
