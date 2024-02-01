<script>
	export default {
		onLaunch: function() {
			let that=this
			console.log('App Launch')
			var url = window.location.href
			// console.log(url)
			var theRequest = new Object();
			// if (url.indexOf("?") != -1) {
			// 	var str = url.substr(1);
			// 	var strs = str.split("?");
			// 	let aa = strs[1]
			// 	let bb = aa.split("#")
			// 	let cc = bb[0]
			// 	// console.log(bb[0])
			// 	// console.log(cc)
			// 	let jwt = ''
			// 	jwt = cc.substring(cc.indexOf("=") + 1)
			// 	console.log(jwt)
				let jwt='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjU4OTc4NTEsInRva2VuIjoiMWU5OTkwZWY1MjY2ZGM2ZTIyZDg2NzY5ODY1YTRiMjdlOWU2MzI3MSJ9.WbJUcAIrzhTr9CyUEhlf5RU6fMy8yCRJybLFEbFFst8'
				// let postdata={
				// 	jwt:jwt
				// }
				//  uni.removeStorageSync('token');
				// that.$api.getPullUserInfo(postdata).then(res=>{
				// 	if(res.code=='1'){
				// 		let token=res.data.token
				// 		uni.setStorageSync('token', token);
				// 		uni.reLaunch({
				// 			url:'/pages/tabbar/home'
				// 		})
				// 	}
				// })
			
				// console.log(token)
			// }
		},
		onLoad: function() {
			// console.log('App onLoad',e)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.imgfle{
		display: flex;align-items: center;justify-content: center;
	}
</style>
