import base from './baseUrl.js';
import md5 from './md5.js';


const request = (url, method, data, isLoading = false) => {
	// if (isLoading) {
	// 	uni.showLoading({
	// 		mask: true,
	// 		title: '加载中'
	// 	});
	// }
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
	let postdata = {}
	let deviceId=''
	if (data) {
		postdata = data && JSON.parse(JSON.stringify(data));
	}
	// postdata.app_id = '10001'; // 微信id
	if (uni.getStorageSync('token')) {
		postdata.token = uni.getStorageSync('token');
		
	}
	uni.getSystemInfo({
		success: function(res) {
			deviceId=res.deviceId
			// console.log(deviceId)
		}
	});
	postdata.app_id='10001'
	postdata.deviceid=deviceId
	const baseUrl = base.baseUrl
	// console.log(postdata)
	let sign = creatSign(postdata)
	postdata.sign = sign
	let headers = {};
	headers['Content-Type'] = 'application/x-www-form-urlencoded'
	// headers['Sign'] = md5.md5(base.apikey) 
	// // console.log('data-----------', data)
	// console.log(base)
	
	return new Promise((resolve, reject) => {
		
		uni.request({
			url: baseUrl + url,
			data: postdata,
			header: headers,
			method: method,
			success: (res) => {
				uni.hideLoading()
				// console.log('success--------', res);
				if (res.data.code == '-1') {
					// uni.$showMsg('登录过期');
					uni.showToast({
						icon: 'none',
						title: '登录过期,请重新登陆',
						duration: 1000
					})
					// uni.removeStorageSync('token');
					// setTimeout(function() {
					// 	uni.reLaunch({
					// 		url: '/pages/index/login'
					// 	})
					// 	return;
					// }, 1000);
				} else if (res.data.code == '-2') {
					uni.showToast({
						icon: 'none',
						title: '您的账号在别的地方登陆,请重新登陆',
						duration: 1000
					})
					// uni.removeStorageSync('accessToken')
					// setTimeout(function() {
					// 	uni.reLaunch({ //跳转到登录页面
					// 		url: '/pages/index/login'
					// 	})
					// 	return;
					// }, 1000);
				} else if (res.data.code == '-8888') {
					uni.setStorageSync('gMsg', res.data.msg);
					setTimeout(function() {
						uni.reLaunch({ //系统维护公共
							url: '/pages/index/updateMaintenance'
						})
						return;
					}, 1000);
				} else if (res.data.code != 1) {
					// uni.$showMsg(res.data.msg);
					uni.showToast({
						icon: 'none',
						title: res.data.msg,
						duration: 1000
					})
					reject(res.data)
				} else {
					resolve(res.data);
				}
			},
			fail: (err) => {
				uni.hideLoading()
				// console.log('fail-----', err);
				// uni.$showMsg('网络请求失败');
				reject(err);
			}

		})
		// .then((response) => {
		// 	// -8888 系统维护
		// 	// // console.log('response-----', response);
		// 	if (response.statusCode == 200) {
		// 		if (response.data.code == '-8888') {
		// 			uni.setStorageSync('gMsg', response.data.msg);
		// 			setTimeout(function() {
		// 				uni.reLaunch({ //系统维护公共
		// 					url: '/pages/maintenance/maintenance'
		// 				})
		// 				return;
		// 			}, 1000);
		// 			// uni.reLaunch({
		// 			// 	url: '/pages/maintenance/maintenance'
		// 			// });
		// 		} else if (response.data.code != 1) {
		// 			uni.$showMsg({
		// 				title: response.data.msg,
		// 				icon: 'none',
		// 				duration: 1500
		// 			});
		// 			return;
		// 		} else {
		// 			resolve(response.data);
		// 		}

		// 	} else {
		// 		showError(response)
		// 	}
		// }).catch(error => {
		// 	reject(error)
		// })
	});
}
const showError = error => {
	let errorMsg = ''
	switch (error.statusCode) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = '请求地址出错'
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.$showMsg(errorMsg);
}

export default request;