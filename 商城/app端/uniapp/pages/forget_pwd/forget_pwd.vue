<template>
	<view class="forget-pwd bg-white">
		<view class="input-container">
			<view class="input-item flex">
				<view class="input-label flex normal">手机号</view>
				<u-input v-model="mobile" class="input" placeholder="请输入手机号码" />
			</view>
			<view class="input-item flex">
				<view class="input-label flex normal">短信验证码</view>
				<u-input v-model="smsCode" style="width: 300rpx" placeholder="请输入验证码" />
				<button class="bd-primary xs primary br60 flex row-center" @click="sendSmsFun">
					<!-- 获取验证码 -->
					<u-verification-code unique-key="forget-pwd" ref="uCode" @change="codeChange">
					</u-verification-code>
					<view class="xs">{{codeTips}}</view>
				</button>
			</view>
			<view class="input-item flex">
				<view class="input-label flex normal">重置密码</view>
				<u-input type="password" v-model="resetPwd" placeholder="6-20位数字+字母或符号组合" />
			</view>
			<view class="input-item flex">
				<view class="input-label flex normal">确认密码</view>
				<u-input type="password" v-model="comfirmPwd" placeholder="请再次输入密码" />
			</view>
		</view>
		<view class="btn white bg-primary br60 flex row-center" @click="forgetPwdFun">
			确认
		</view>
	</view>
</template>

<script>
	import {
		forgetPwd,
		sendSms
	} from '@/api/app.js'
	import {
		ACCESS_TOKEN
	} from '@/config/app.js'
	import {
		SMSType
	} from '@/utils/type.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: 'forgetPwd',
		data() {
			return {
				mobile: '',
				smsCode: '',
				resetPwd: '',
				comfirmPwd: '',
				time: 59,
				codeTips: '',
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['login']),
			codeChange(tip) {
				this.codeTips = tip
			},
			forgetPwdFun() {
				let {
					mobile,
					smsCode,
					resetPwd,
					comfirmPwd
				} = this;
				if (!mobile) {
					this.$toast({
						title: '请填写手机号'
					});
					return;
				}
				if (!smsCode) {
					this.$toast({
						title: '请填写短信验证码'
					});
					return;
				}
				if (!resetPwd) {
					this.$toast({
						title: '请填写重置密码'
					});
					return;
				}
				if (!comfirmPwd) {
					this.$toast({
						title: '请填写确认密码'
					});
					return;
				}
				if (resetPwd != comfirmPwd) {
					this.$toast({
						title: '两次密码输入不一致'
					});
					return;
				}
				let data = {
					mobile: mobile,
					code: smsCode,
					password: resetPwd,
					repassword: comfirmPwd
				};
				forgetPwd(data).then(res => {
					if (res.code == 1) {
						this.login(data);
						this.$toast({
							title: res.msg
						});
						//  跳转到登录页
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					}
				})
			},
			sendSmsFun() {
				if(!this.$refs.uCode.canGetCode) return
				if (!this.mobile) {
					this.$toast({
						title: '请填写手机号信息'
					})
					return;
				}
				sendSms({
					mobile: this.mobile,
					key: SMSType.FINDPWD
				}).then(res => {
					if (res.code == 1) {
						this.$toast({title:res.msg});
						this.$refs.uCode.start();
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		padding: 0;
	}
	.forget-pwd {
		min-height: 100vh;
		padding: 40px 20px 0;
		padding: 80rpx 40rpx 0;

		.input-container {
			.input-item {
				padding: 0 20rpx;
				height: 88rpx;
				margin-bottom: 30rpx;
				border-bottom: 1px solid #D7D7D7;

				.input-label {
					width: 180rpx;
					flex: none;
				}

				.bd-primary {
					height: 56rpx;
					width: 176rpx;
					flex: none;
					border: 1px solid $-color-primary;

					.seconds {
						color: $-color-primary;
					}
				}
			}
		}

		.btn {
			margin-top: 60rpx;
			padding: 20rpx 0;
		}
	}
</style>
