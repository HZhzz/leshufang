// 开发环境域名

const host_development = 'https://likeshopb2b2c.yixiangonline.com'

export default {
    // 版本
    version: '2.1.2.20221108',
    baseURL: process.env.NODE_ENV == 'production' ? '' : host_development,
    // ChatWss: 'wss://likeshopb2b2cchat.yixiangonline.com'
}


