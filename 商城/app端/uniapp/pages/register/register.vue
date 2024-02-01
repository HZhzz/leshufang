<template>
    <view class="register">
        <view class="input-container">
            <view class="input-item flex">
                <view class="input-label flex normal">手机号</view>
                <u-input v-model="mobile" class="input" placeholder="请输入手机号码" />
            </view>
            <view class="input-item flex" v-if="appConfig.register_setting">
                <view class="input-label flex normal">短信验证码</view>
                <u-input v-model="smsCode" style="width: 300rpx" placeholder="请输入验证码" />
                <button class="bd-primary xs primary br60 flex row-center" hover-class="none" @click="sendSmsFun">
                    <!-- 获取验证码 -->
                   	<u-verification-code unique-key="register" ref="uCode" @change="codeChange" >
                   	</u-verification-code>
                   	<view class="xs">{{codeTips}}</view>
                </button>
            </view>
            <view class="input-item flex">
                <view class="input-label flex normal">设置密码</view>
                <u-input type="password" v-model="password" placeholder="6-20位数字+字母或符号组合" />
            </view>
            <view class="input-item flex">
                <view class="input-label flex normal">确认密码</view>
                <u-input type="password" v-model="passwordConfirm" placeholder="6-20位数字+字母或符号组合" />
            </view>
        </view>
        <view class="btn white bg-primary br60 flex row-center" @click="registerFun">
            立即注册
        </view>
		<view class="m-t-40 sm flex row-center">
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
    </view>
</template>

<script>
    import {register, sendSms} from '@/api/app.js'
    import { ACCESS_TOKEN } from '@/config/app.js'
    import {SMSType} from '@/utils/type.js'
    import {
    	mapMutations,
		mapGetters
    } from 'vuex'
    
    export default {
        name: 'register',
        created() {
    
        },
        data() {
            return {
                isAgreement: false,
                mobile: '',
                smsCode: '',
                password: '',
                passwordConfirm: "",
                canSendSms: true,
                codeTips: ''
            }
        },
        onLoad() {
			// console.log(this.appConfig)
        },
        methods: {
           
            ...mapMutations(['login']),
			codeChange(tip) {
				this.codeTips = tip
			},
            registerFun() {
                let {isAgreement, mobile, password, smsCode, passwordConfirm} = this;
				if(!isAgreement) return this.$toast({ title: '请先勾选\"已阅读并同意《服务协议》和《隐私协议》\"' })
                if(!mobile) {
                    this.$toast({title: '请填写手机号'});
                    return;
                }
                if(!password) {
                    this.$toast({title: "请设置密码"})
                    return;
                }
                if(password != passwordConfirm) {
                    this.$toast({title: "两次密码输入不一致"})
                    return;
                }
               
                let data = {mobile: mobile, password: password, code: smsCode, client: 2}
                register(data).then(res => {
                    if(res.code == 1) {
                        this.login(data)
                        this.$toast({title: res.msg});
                        //  跳转到登录页
                        setTimeout(() => {
                            uni.navigateBack()
                        }, 1000)
                    }
                })
            },
    
            countDownFinish() {
                this.canSendSms = true;
            },
    
 
    
            sendSmsFun() {
				if(!this.$refs.uCode.canGetCode) return
                if(!this.mobile) {
                    this.$toast({title: '请填写手机号信息～'})
                    return; 
                }
                sendSms({mobile: this.mobile, key: SMSType.REGISTER}).then(res => {
                    if(res.code == 1) {
                        this.$toast({title:res.msg});
                        this.$refs.uCode.start();
                    }
                })
            }
        },
		computed: {
			...mapGetters(['appConfig']),
		}
    }
</script>

<style lang="scss">
	page {
		background-color: white;
	}
    .register {
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
