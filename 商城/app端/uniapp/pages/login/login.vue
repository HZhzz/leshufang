<template>

	<view class="login">
		<!-- #ifdef MP-WEIXIN -->
		<view class="mpwx-login flex-col col-center row-center">
			<view class="avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="user-name mt20">
				<open-data type="userNickName"></open-data>
			</view>
			<view class="title xxl m-t-20 bold">微信授权登录</view>
			<button size="lg" class="white br60 flex row-center btn" @click="mnpLoginFun">
				<image class="m-r-10 image" src="/static/images/icon_wechat.png"></image>
				<text>微信一键授权</text>
			</button>
			<view class="muted m-t-20">微信授权登录后才可进行更多操作哦</view>
		</view>
		<!--  #endif -->
		<!-- #ifdef H5 || APP-PLUS -->
		<view class="acount-login">
			<image class="logo" :src="appConfig.shop_login_logo" mode="heightFix"></image>
			<view v-if="loginType == 0">
				<view class="input">
					<u-input v-model="mobile" style="width: 100%;" placeholder="请输入账户/手机号" :input-border="false" />
				</view>
				<view class="input flex" style="padding: 15rpx 0;">
					<u-input v-model="password" type="password" style="flex: 1;" :password-icon="false"
						placeholder="请输入密码" :input-border="false" />
					<navigator style="width: 132rpx;border-left: 1rpx solid #CCC;" url="/pages/forget_pwd/forget_pwd"
						hover-class="none">忘记密码</navigator>
				</view>
			</view>
			<view v-if="loginType == 1">
				<view class="input">
					<u-input v-model="telephone" style="width: 100%;" placeholder="手机号" :input-border="false" />
				</view>
				<view class="input flex" style="padding: 15rpx 0;">
					<u-input v-model="smsCode" style="flex: 1;" placeholder="请输入验证码" :input-border="false" />
					<view class="flex">
						<view class="sms-btn primary flex row-center br60" @click="$sendSms">
							<!-- 获取验证码 -->
							<u-verification-code unique-key="login" ref="uCode" @change="codeChange">
							</u-verification-code>
							<view class="xs">{{codeTips}}</view>
						</view>
					</view>
				</view>
			</view>
			<button style="margin: 80rpx 0 50rpx;width: 680rpx;" size="lg" class="br60" type="primary"
				@click="loginFun">登录</button>
			<view class="flex row-between" style="width: 680rpx;">
				<view class="lighter" @click="changeLoginType">{{loginType == 0 ? "短信验证码登录" : "账号登录"}}</view>
				<navigator class="lighter" url="/pages/register/register" hover-class="none">注册账号</navigator>
			</view>
			<view class="flex-1 wx-login">
				<!-- #ifdef APP-PLUS -->
				<view v-if="appConfig.app_wechat_login">
					<u-divider>其他登录方式</u-divider>
					<view @click="appWxLogin">
						<image class="image" src="/static/images/icon_wechat.png"></image>
						<view class="sm">微信登录</view>
						<text selectable>{{text}}</text>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5-->
				<view>
					<u-divider>其他登录方式</u-divider>
					<view @click="getCodeUrl">
						<image class="image" src="/static/images/icon_wechat.png"></image>
						<view class="sm">微信登录</view>
						<text selectable>{{text}}</text>
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<!--  #endif -->
		
		<view class="m-b-30 sm flex row-center">
			<u-checkbox v-model="isAgreement" shape="circle">
				<div class="flex">
					已阅读并同意
					<router-link to="/bundle/pages/server_explan/server_explan?type=0">
						<view class="primary">《服务协议》</view>
					</router-link>
					和
					<router-link to="/bundle/pages/server_explan/server_explan?type=1">
						<view class="primary">《隐私协议》</view>
					</router-link>
				</div>
			</u-checkbox>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		accountLogin,
		codeLogin,
		sendSms,
		wxpLogin,
		smsCodeLogin,
		opLogin,
		authLogin
	} from '@/api/app';
	import {
		bindSuperior
	} from '@/api/user'
	import wechath5 from '@/utils/wechath5'
	import {
		isWeixinClient,
		currentPage,
		client,
		trottle
	} from '@/utils/tools'
	import {
		SMSType
	} from "@/utils/type"
	import Cache from "@/utils/cache"
	import {
		BACK_URL,
		INVITE_CODE
	} from '@/config/cachekey'
	import {
		getWxCode,
		getUserProfile
	} from '@/utils/login'
	const loginType = {
		ACCOUNT_LOGIN: 0,
		SMS_CODE_LOGIN: 1,
	}
	export default {
		data() {
			return {
				isAgreement: false,
				password: '',
				mobile: '',
				code: '',
				isWeixin: '',
				loginType: 0,
				smsCode: '',
				codeTips: '',
				telephone: "",
				text: ''
			};
		},

		async onLoad(option) {
			this.mnpLoginFun = trottle(this.mnpLoginFun)
			this.appWxLogin = trottle(this.appWxLogin)
			this.getCodeUrl = trottle(this.getCodeUrl)
			// H5微信登录
			// #ifdef H5
			this.oaAutoLogin()
			// #endif
		},
		onUnload() {

		},
		methods: {
			...mapMutations(['login']),
			...mapActions(['getUser']),
			codeChange(tip) {
				this.codeTips = tip
			},
			getCodeUrl() {
				wechath5.getWxUrl()
			},
			// 公众号微信登录
			async oaLogin(code) {
				const data = await wechath5.authLogin(code)
				this.loginHandle(data)
			},
			oaAutoLogin() {
				// H5微信登录
				const {
					code
				} = this.$Route.query
				this.isWeixin = isWeixinClient()
				if (this.isLogin) {
					// 已经登录 => 首页
					uni.switchTab({
						url: '/pages/index/index'
					})
					return
				}
				if (code) {
					// 带有code => 登录
					return this.oaLogin(code)
				}
				if (this.isWeixin && this.isOaWxAutoLogin) {
					// 开启自动授权登录
					this.getCodeUrl()
				}
			},
			// 小程序登录
			async mnpLoginFun() {
				if(!this.isAgreement) return this.$toast({ title: '请先勾选\"已阅读并同意《服务协议》和《隐私协议》\"' })
				const {
					userInfo: {
						avatarUrl,
						nickName,
						gender
					}
				} = await getUserProfile()
				uni.showLoading({
					title: '登录中...',
					mask: true
				});
				const wxCode = await getWxCode()
				const {
					code,
					data,
					msg
				} = await authLogin({
					code: wxCode,
					nickname: nickName,
					headimgurl: avatarUrl,
				})
				if (code == 1) {
					this.loginHandle(data)
				} else {
					this.$toast({
						title: msg
					})
				}
			},
			// 账号登录
			async loginFun() {
				if(!this.isAgreement) return this.$toast({ title: '请先勾选\"已阅读并同意《服务协议》和《隐私协议》\"' })
				const {
					mobile,
					password,
					telephone,
					smsCode
				} = this
				if (this.loginType == 0) {
					if (!mobile) {
						this.$toast({
							title: '请输入账户/手机号'
						});
						return;
					}
					if (!password) {
						this.$toast({
							title: '请输入密码'
						});
						return;
					}
					const {
						code,
						data
					} = await accountLogin({
						mobile,
						password,
						client: client
					})
					if (code == 1) {
						this.loginHandle(data)
					}
				} else {
					if (!telephone) {
						this.$toast({
							title: '请输入手机号'
						});
						return;
					}
					if (!smsCode) {
						this.$toast({
							title: '请输入验证码'
						});
						return;
					}
					smsCodeLogin({
						mobile: telephone,
						code: smsCode,
					}).then(res => {
						if (res.code == 1) {
							this.loginHandle(res.data)
						}
					})
				}
			},
			// 登录结果处理
			async loginHandle(data) {
				console.log(data);
				this.login(data)
				uni.hideLoading()
				// 绑定邀请码
				const inviteCode = Cache.get(INVITE_CODE)
				if (inviteCode) {
					bindSuperior({
						code: inviteCode
					})
					Cache.remove(INVITE_CODE)
				}

				if (getCurrentPages().length > 1) {
					uni.navigateBack({
						success() {
							const {
								onLoad,
								options
							} = currentPage()
							onLoad && onLoad(options)
						}
					})
				} else if (Cache.get(BACK_URL)) {
					this.$Router.replace(Cache.get(BACK_URL))
				} else {
					this.$Router.pushTab('/pages/index/index')
				}
				Cache.remove(BACK_URL)
			},
			changeLoginType() {
				if (this.loginType == loginType.ACCOUNT_LOGIN) {
					this.loginType = loginType.SMS_CODE_LOGIN
				} else if (this.loginType == loginType.SMS_CODE_LOGIN) {
					this.loginType = loginType.ACCOUNT_LOGIN
				}
			},
			// 发送验证码
			$sendSms() {
				if (!this.$refs.uCode.canGetCode) return
				if (!this.telephone) {
					this.$toast({
						title: '请输入手机号'
					})
					return;
				}

				sendSms({
					mobile: this.telephone,
					key: SMSType.LOGIN
				}).then(res => {
					if (res.code == 1) {
						this.$refs.uCode.start();
						this.$toast({
							title: res.msg
						});
					}
				})
			},
			// app微信登录
			async appWxLogin() {
				if(!this.isAgreement) return this.$toast({ title: '请先勾选\"已阅读并同意《服务协议》和《隐私协议》\"' })
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.showLoading({
							title: '登录中...',
							mask: true
						});
						const {
							openid,
							access_token,
						} = res.authResult
						opLogin({
							openid,
							access_token
						}).then(res => {
							uni.hideLoading()
							if (res.code == 1) {
								this.loginHandle(res.data)
							}
						}).catch(() => {
							uni.hideLoading()
						})
					}
				})


			}
		},
		computed: {
			...mapGetters(['appConfig']),
			isOaWxAutoLogin() {
				return this.appConfig.wechat_h5
			}
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #fff;
		text-align: center;
		padding: 0;
		.login {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			.mpwx-login {
				min-height: 0;
				flex: 1;

				.avatar {
					display: inline-block;
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					border: 1px solid #eee;
					overflow: hidden;
				}

				.user-name {
					height: 40rpx;
				}

				.image {
					width: 50rpx;
					height: 50rpx;
				}

				.btn {
					background-color: #09BB07;
					width: 580rpx;
					margin: 80rpx auto 0;
				}
			}


			.acount-login {
				padding-top: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				min-height: 0;
				flex: 1;
				.logo {

					height: 80rpx;
					margin-bottom: 50rpx;
				}

				.input {
					width: 670rpx;
					border-bottom: $-solid-border;
					margin-top: 30rpx;
				}

				.sms-btn {
					border: 1px solid $-color-primary;
					width: 176rpx;
					height: 60rpx;
					box-sizing: border-box;
				}

				.wx-login {
					margin-top: 60rpx;

					.image {
						margin-top: 40rpx;
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
		}
	}
</style>
