// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------


import axios from '../js_sdk/xtshadow-axios/axios.min'
import store from '../store'
import {
	paramsToStr,
	currentPage,
	toast
} from './tools'
import Cache from './cache'
import {
	TOKEN
} from '../config/cachekey'
import {baseURL} from '../config/app'
import {
	toLogin
} from './login'
import {router} from '../router'
import md5 from './md5.js';
let index = 0;

function checkParams(params) {
	if (typeof params != 'object') return params
	for (let key in params) {
		const value = params[key];
		if (value === null || value === undefined || value === "") {
			delete params[key];
		}
	}
	return params;
}

let creatSign=function(postdata){
	let timestamp = Math.ceil((new Date()).getTime()/1000)
	postdata.tamp = timestamp
	// const apikey = base.apikey
	let wait_sign = 'leshufang2024!!!'
	for(let i in postdata){
		// console.log(postdata[i])
		wait_sign+=i+'='+postdata[i]+'&';
	}
	// console.log(wait_sign)
	wait_sign = wait_sign.substr(0,wait_sign.length-1)
	// console.log(wait_sign)
	return md5.md5(wait_sign)
}
// uni.getSystemInfo({
// 	success: function(res) {
// 		deviceId=res.deviceId
// 		// console.log(deviceId)
// 	}
// });
// postdata.app_id='10001'
// postdata.deviceid=deviceId
const service = axios.create({
	baseURL: baseURL + '/api/',
	timeout: 10000,
	header: {
		'content-type': 'application/json',
		// 'content-type':'application/x-www-form-urlencoded'
	},

});


// request拦截器
service.interceptors.request.use(
	config => {
		let deviceId=''
		uni.getSystemInfo({
			success: function(res) {
				deviceId=res.deviceId
				// console.log(deviceId)
			}
		});
		if(!config.data){
			config.data = {}
		}
		config.data.app_id='10001'
		config.data.deviceid=deviceId
		let sign = creatSign(config.data)
		config.data.sign = sign
		
		config.data = checkParams(config.data)

		config.params = checkParams(config.params)
		let strurl = config.url.split('/')[1]
		if(config.method == "POST"&&strurl=='getPullUserInfo'){
			// config.params.s = '/api/user/getPullUserInfo'
			config.url +=paramsToStr({s:'/api/user/getPullUserInfo'})
		}
		if (config.method == 'GET') {
			config.url += paramsToStr(config.params)
		}
		config.header.token = store.getters.token
	
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	async (response) => {
		
			if (response.data) {
				const {
					code,
					show,
					msg
				} = response.data;
				if (code == 0 && show) {
					toast({
						title: msg,
					})
				} else if (code == -1) {
					store.commit('logout')
					toLogin()
				} else if(code == 301) {
					// 返回上一页
					toast({
						title: msg,
					},{
						tab: 3,
						url: 1
					})
				}
			}

			return Promise.resolve(response.data)
		},
		error => {
			uni.showToast({
				title: "系统错误",
				icon: "none"
			})
			console.log(error)
			console.log('err' + error) // for debug
			return Promise.reject(error)
		}
)

export default service
