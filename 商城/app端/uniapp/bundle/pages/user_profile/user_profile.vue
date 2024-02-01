<template>
	<view class="user-profile p-t-10">
		<view class="content">
			<view class="bg-white">
				<view class="user-avatar-box flex-col col-center">
					<uploader @after-read="afterRead" use-slot preview-size="120rpx">
						<image class="user-avatar" :src="userInfo.avatar || '/static/images/portrait_empty.png'" />
					</uploader>
					<!-- #ifdef MP-WEIXIN -->
					<view class="xs muted flex row-center m-t-20" @tap="getUserProfileFun">更新微信头像</view>
					<!-- #endif -->
				</view>
				<view class="row-info flex bdb-line" @tap="changeName">
					<view class="label md">昵称</view>
					<view class="md flex-1">{{ userInfo.nickname }}</view>
					<u-icon name="arrow-right" />
				</view>
				<view class="row-info flex bdb-line" @tap="changeSex">
					<view class="label md">性别</view>
					<view class="md flex-1" :class="userInfo.sex == 0 ? 'muted' : ''">{{ userInfo.sex }}</view>
					<u-icon name="arrow-right" />
				</view>
				<view class="row-info flex bdb-line">
					<view class="label md">手机号</view>
					<view
						class="md flex-1"
						:class="{ 'muted': !userInfo.mobile }"
					>{{ userInfo.mobile ? userInfo.mobile : "未绑定" }}</view>
					<!-- #ifdef H5 || APP-PLUS -->
					<view
						class="bd-btn br60 flex row-center"
						@tap="showModifyMobile"
					>{{ userInfo.mobile ? '更换手机号' : '绑定手机号' }}</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button
						class="bd-btn br60 flex row-center"
						size="sm"
						open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber"
					>{{ userInfo.mobile ? '更换手机号' : '绑定手机号' }}</button>
					<!-- #endif -->
				</view>
				<!-- #ifndef MP-WEIXIN-->
				<view class="row-info flex row-between" @tap="showPwdPop">
					<view class="label md">登录密码</view>
					<view class="flex">
						<view class="muted">点击设置</view>
						<u-icon name="arrow-right" />
					</view>
				</view>
				<!-- #endif -->
				<view class="row-info flex row-between bdb-line mt10" @tap="goToExplain(0)">
					<view class="label md">服务协议</view>
					<u-icon name="arrow-right" />
				</view>
				<view class="row-info flex row-between bdb-line" @tap="goToExplain(1)">
					<view class="label md">隐私政策</view>
					<u-icon name="arrow-right" />
				</view>
				<view class="row-info flex row-between bdb-line" @tap="goLicense()">
					<view class="label md">资质信息</view>
					<u-icon name="arrow-right" />
				</view>
				<view class="row-info flex row-between">
					<view class="label md">关于我们</view>
					<view>v{{ version }}</view>
				</view>
			</view>
		</view>

		<!-- #ifndef MP-WEIXIN -->
		<view class="bg-primary white save-btn flex row-center lg" @tap="logout">退出登录</view>
		<!-- #endif -->
		<!-- 版权信息 -->
		<view class="license xs text-center" v-if="appConfig.copyright_info">
			<view>{{ appConfig.copyright_info }}</view>
			<view>{{ appConfig.icp_number }}</view>
		</view>

		<!-- #ifndef MP-WEIXIN -->
		<u-popup type="center" closeable v-model="showMobile" mode="center" border-radius="14">
			<view class="modify-container bg-white" v-show="showMobile">
				<view class="title xl text-center">{{ userInfo.mobile ? '更换手机号' : '绑定手机号' }}</view>
				<u-field
					label="+86"
					v-if="userInfo.mobile"
					label-width="100"
					disabled
					v-model="userInfo.mobile"
				></u-field>
				<u-field label="+86" v-else label-width="140" v-model="new_mobile" placeholder="请输入手机号"></u-field>
				<u-field v-model="mobileCode" label="验证码" label-width="140" placeholder="请输入验证码">
					<view slot="right" class="primary send-code-btn br60 flex row-center" @tap="sendSmsFun">
						<u-verification-code
							:keep-running="true"
							unique-key="mobile"
							ref="uCode"
							@change="codeChange"
						></u-verification-code>
						<view class="sm">{{ codeTips }}</view>
					</view>
				</u-field>
				<u-field
					label="新手机号"
					v-if="userInfo.mobile"
					label-width="140"
					placeholder="请输入新的手机号码"
					v-model="new_mobile"
				></u-field>
				<view class="primary m-t-10 xs">{{ userInfo.mobile ? '更改' : '绑定' }}手机号码成功后，您的账号将会变更为该设置号码</view>
				<view class="btn bg-primary white flex row-center" @tap="changeUserMobileFun">确定</view>
			</view>
		</u-popup>
		<!-- #endif -->
		<u-popup v-model="showNickName" :closeable="true" mode="center" border-radius="14">
			<view class="modify-container bg-white" v-show="showNickName">
				<view class="title xl text-center">修改用户名</view>
				<u-field v-model="newNickname" label="新昵称" placeholder="请输入新的昵称"></u-field>
				<view class="btn bg-primary white flex row-center" @tap="changeNameConfirm">确定</view>
			</view>
		</u-popup>
		<!-- #ifndef MP-WEIXIN -->
		<u-popup v-model="showPwd" closeable mode="center" border-radius="14">
			<view class="modify-container bg-white">
				<view class="title xl text-center">设置密码</view>
				<u-field label="+86" disabled label-width="100" v-model="userInfo.mobile"></u-field>
				<u-field v-model="pwdCode" label="验证码" label-width="140" placeholder="请输入验证码">
					<view slot="right" class="primary send-code-btn br60 flex row-center" @tap="sendSmsFun">
						<u-verification-code
							unique-key="password"
							:keep-running="true"
							ref="uCode"
							@change="codeChange"
						></u-verification-code>
						<view class="sm">{{ codeTips }}</view>
					</view>
				</u-field>
				<u-field label="设置密码" label-width="140" type="password" placeholder="请输入新密码" v-model="pwd"></u-field>
				<u-field
					label="确认密码"
					label-width="140"
					type="password"
					placeholder="再次输入新密码确认"
					v-model="comfirmPwd"
				></u-field>
				<view class="btn bg-primary white flex row-center" @tap="forgetPwdFun">确定</view>
			</view>
		</u-popup>
		<!-- #endif -->
		<u-picker
			mode="selector"
			v-model="showPicker"
			:default-selector="[0]"
			:range="sexList"
			@confirm="onConfirm"
		/>
	</view>
</template>

<script>
import {
	userLogout,
	getUserInfo,
	getWxMnpMobile,
	setUserInfo,
	setWechatInfo,
	changeUserMobile
} from "@/api/user";
import {
	baseURL,
	version
} from '@/config/app';
import {
	sendSms,
	forgetPwd,
} from '@/api/app'
import {
	SMSType
} from '@/utils/type'
import {
	mapGetters
} from 'vuex'
import {
	uploadFile,
	isWeixinClient,
	trottle,

} from '@/utils/tools'
import {
	getWxCode,
	getUserProfile
} from '@/utils/login'

const FieldType = {
	NONE: '',
	SEX: 'sex',
	NICKNAME: 'nickname',
	AVATAR: 'avatar',
	MOBILE: 'mobile'
}
export default {
	name: 'userProfile',
	data() {
		return {
			action: baseURL + '/api/file/formimage',
			fileList: [],
			userInfo: {},
			new_mobile: '',
			pwdCode: '',
			mobileCode: '',
			newNickname: '',
			sexList: ['男', '女'],
			fieldType: FieldType.NONE,
			showPicker: false,
			showMobile: false,
			showPwd: false,
			showNickName: false,
			codeTips: '',
			canSendSms: true,
			pwd: '',
			comfirmPwd: '',
			smsType: '',
			code: '',
			version
		}
	},
	methods: {
		codeChange(text) {
			this.codeTips = text;
		},
		onSuccess(e) {
			console.log(e)
		},
		// 文件上传读取
		afterRead(e) {
			const file = e
			console.log(file)
			uni.showLoading({
				title: '正在上传中...',
				mask: true
			});
			file.forEach(item => {
				uploadFile(item.path).then(res => {
					uni.hideLoading();
					this.fieldType = FieldType.AVATAR
					this.setUserInfoFun(res.base_uri)
				});
			})
		},
		// 更新小程序头像信息
		async getUserProfileFun() {
			const {
				userInfo
			} = await getUserProfile()
			const {
				avatarUrl,
				nickName,
				gender
			} = userInfo
			const {
				msg,
				code
			} = await setWechatInfo({
				nickname: nickName,
				avatar: avatarUrl,
				sex: gender
			})
			if (code == 1) {
				this.$toast({
					title: msg
				});
				this.getUserInfoFun()
			}
		},

		// end
		logout() {
			//  退出登录
			userLogout().then(res => {
				if (res.code == 1) {
					this.$store.commit("logout");
					this.$toast({
						title: '退出成功'
					})
					setTimeout(() => {
						this.$Router.replaceAll('/pages/index/index')
					}, 500)
				}
			})
		},
		goToExplain(value) {
			this.$Router.push({
				path: '/bundle/pages/server_explan/server_explan',
				query: {
					type: value
				}
			})
		},
		goLicense() {
			this.$Router.push({
				path: '/bundle/pages/license/license',
				query: {
					id: ''
				}
			})
		},

		// 发送短信
		sendSmsFun(type) {
			if (!this.$refs.uCode.canGetCode) return
			sendSms({
				mobile: this.userInfo.mobile || this.new_mobile,
				key: this.smsType
			}).then(res => {
				if (res.code == 1) {
					this.$toast({
						title: res.msg
					});
					this.$refs.uCode.start();
				}
			})
		},
		getUserInfoFun() {
			getUserInfo().then(res => {
				if (res.code == 1) {
					this.userInfo = res.data;
				}
			})
		},
		// 更换手机号
		showModifyMobile() {
			this.new_mobile = '';
			this.showMobile = true
			this.smsType = this.userInfo.mobile ? SMSType.CHANGE_MOBILE : SMSType.BIND
		},
		changeUserMobileFun() {
			if (!this.mobileCode) {
				this.$toast({
					title: '请输入验证码'
				})
				return;
			}
			if (!this.new_mobile) {
				this.$toast({
					title: '请输入新的手机号码'
				})
				return;
			}

			changeUserMobile({
				mobile: this.userInfo.mobile,
				new_mobile: this.new_mobile,
				code: this.mobileCode,
				action: this.userInfo.mobile ? 'change' : 'binding'
			}).then(res => {
				if (res.code == 1) {
					this.showMobile = false;
					this.$toast({
						title: res.msg
					})
					this.getUserInfoFun();
				}
			})
		},
		// 修改用户信息
		setUserInfoFun(value) {
			setUserInfo({
				field: this.fieldType,
				value: value
			}).then(res => {
				if (res.code == 1) {
					this.$toast({
						title: res.msg
					});
					this.getUserInfoFun()

				}
			})
		},
		onConfirm(value) {
			this.setUserInfoFun(value[0] + 1);
			this.showPicker = false;
		},
		changeSex(e) {
			this.showPicker = true;
			this.fieldType = FieldType.SEX;
		},

		// 修改密码
		showPwdPop() {
			if (!this.userInfo.mobile) {
				this.$toast({
					title: '请绑定手机后再设置密码'
				})
				return;
			}
			this.smsType = SMSType.FINDPWD
			this.showPwd = true
		},
		forgetPwdFun() {
			let {
				pwdCode,
				pwd,
				comfirmPwd
			} = this;
			if (!pwdCode) {
				this.$toast({
					title: '请输入短信验证码'
				});
				return;
			}
			if (!pwd) {
				this.$toast({
					title: '请输入新密码'
				});
				return;
			}
			if (!comfirmPwd) {
				this.$toast({
					title: '再次输入新密码确认'
				});
				return;
			}
			if (pwd != comfirmPwd) {
				this.$toast({
					title: '两次密码输入不一致'
				});
				return;
			}
			let data = {
				mobile: this.userInfo.mobile,
				code: pwdCode,
				password: pwd,
				repassword: comfirmPwd
			};
			forgetPwd(data).then(res => {
				if (res.code == 1) {
					this.showPwd = false;
					this.$toast({
						title: '设置密码成功'
					});
					this.getUserInfoFun();
				}
			})
		},
		// 修改昵称
		changeName() {
			this.fieldType = FieldType.NICKNAME;
			this.newNickname = '';
			this.showNickName = true;
		},
		changeNameConfirm() {
			this.setUserInfoFun(this.newNickname);
			this.showNickName = false;
		},
		// 微信获取手机号
		// #ifdef MP-WEIXIN
		async getPhoneNumber(e) {
			console.log(e, this.code)
			const {
				encryptedData,
				iv
			} = e.detail;
			const params = {
				code: this.code,
				encrypted_data: encryptedData,
				iv
			}
			this.fieldType = FieldType.MOBILE
			if (encryptedData) {
				const {
					data,
					code,
					msg
				} = await getWxMnpMobile(params)
				if (code == 1) {
					this.$toast({
						title: msg
					});
					// #ifdef MP-WEIXIN
					getWxCode().then(res => {
						this.code = res
					})
					// #endif
					this.getUserInfoFun()
				}
			}
		},
		// #endif
	},
	onLoad() {
		this.getUserInfoFun()
		// #ifdef MP-WEIXIN
		getWxCode().then(res => {
			this.code = res
		})
		// #endif
		this.getUserProfileFun = trottle(this.getUserProfileFun, 500, this)
	},
	computed: {
		...mapGetters(['token', 'appConfig'])
	}
}
</script>

<style lang="scss">
.user-profile {
	min-height: calc(100vh - env(safe-area-inset-bottom));
	display: flex;
	flex-direction: column;
	.content {
		// flex: 1;
		border-top-left-radius: 28rpx;
		border-top-right-radius: 28rpx;

		.user-avatar-box {
			padding: 30rpx;

			.user-avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}

		.row-info {
			padding: 30rpx 20rpx;

			.label {
				width: 180rpx;
			}

			.bd-btn {
				padding: 8rpx 24rpx;
				border: 1px solid $-color-primary;
				color: $-color-primary;
			}
		}

		.bdb-line {
			border-bottom: 1rpx solid #e5e5e5;
		}
	}
	.license {
		margin-top: 80rpx;
		color: #a7a7a7;
	}

	.save-btn {
		margin: 40rpx 54rpx 0;
		height: 88rpx;
		border-radius: 10rpx;
	}
	.modify-container {
		padding: 30rpx;
		width: 620rpx;
		border-radius: 30rpx;

		.title {
			padding: 26rpx 0rpx;
		}

		.btn {
			height: 80rpx;
			border-radius: 20rpx;
			margin: 60rpx 50rpx 0;
		}
	}
}
</style>
