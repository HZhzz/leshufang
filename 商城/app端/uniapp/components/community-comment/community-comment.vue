<template>
    <u-mask :show="show" @click="show = false" duration="0">
        <view class="comment-popup bg-white" :style="{'bottom': !isFocus?'0':height+'px'}" @click.stop>
            <view class="comment-popup-header flex row-between">
                <view class="lg normal" @click="show = false">取消</view>
                <view class="lg bold">评论</view>
                <view class="primary lg" @click="handleComment">确定</view>
            </view>
            
            <view class="comment-popup-content">
                <textarea class="comment-popup-textarea" cols="30" rows="10" v-model="content" :focus="show" :placeholder="commentPlaceholder" disable-default-padding :show-confirm-bar="false" @focus="handleFocus" @blur="handleBlur" fixed :adjust-position="false"></textarea>
            </view>
        </view>
    </u-mask>
</template>

<script>
    import {
        apiCommunityCommentAdd
    } from '@/api/community.js';
    import { currentPage, trottle } from "@/utils/tools.js"
    export default {
        name: "community-comment",
        props: {
            value: {
                type: Boolean
            },
            communityId: {
                type: [Number, String]
            },
            pid: {
                type: [String, Number]
            },
            placeholder:{
                type: [String, Number],
                default: '发表你的想法吧...'
            },
        },
        data() {
            return {
                isFocus: false,// 是否触发键盘
                height: '', // 键盘高度
                content: '',// 评论内容
            }
        },
        computed: {
            commentPlaceholder() {
                return this.placeholder
            },
        	// 弹窗Popup显示状态
        	show: {
        		get: function() {
        			return this.value
        		},
        		set: function(value) {
        			this.$emit('input', value)
        		}
        	}
        },
        mounted() {
            this.handleComment = trottle(this.handleComment, 500, this)
        },
        methods: {
            // 需要输入时
            handleFocus(event) {
                this.isFocus = true
                if(currentPage().route == "pages/community/community") {
                    this.height = (event.detail.height - 54)
                } else {
                    this.height = event.detail.height
                }
                
            },
            // 失去焦点时
            handleBlur() {
                this.isFocus = false
            },
            // 评论
            handleComment() {
                if(!this.isLogin) return this.$Router.push('/pages/login/login')
                apiCommunityCommentAdd({
                    article_id: this.communityId,
                    pid: this.pid,
                    comment: this.content
                }).then(res => {
                    this.$toast({title: res.msg})
                    if( res.code == 1 ) {
                        this.show = false;
                        this.$emit('change', res.data)
                        this.content = ''
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-popup {
        width: 100%;
        height: 340rpx;
        border-radius: 20rpx 20rpx 0 0;
        position: absolute;
        z-index: 9999;
        bottom: 0;
        left: 0;
        padding-bottom: env(safe-area-inset-bottom);
        
        .comment-popup-header {
            view {
                padding: 28rpx 30rpx;
            }
        }
        
        .comment-popup-content {
            height: 240rpx;
            padding: 20rpx;
            
            .comment-popup-textarea {
                width: 100%;
                box-sizing: border-box;
                height: 200rpx;
                background: #f8f8f8;
                border-radius: 14rpx;
                padding: 20rpx;
            }
        }
    }
</style>