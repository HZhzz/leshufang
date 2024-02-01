<template>
    <view class="comment">
        <!-- 评论一级 -->
        <view class="comment--item">
            <view class="flex col-top row-between">
                <!-- 用户头像 -->
                <navigator hover-class="none" open-type="navigate"
                    :url="'/bundle_b/pages/community_user/community_user?id=' + commentInfo.user_id">
                    <u-image :src="commentInfo.avatar" width="88" height="88" borderRadius="50%"></u-image>
                </navigator>
                <view class="m-l-16 flex-1" @click="onComment(commentInfo.id, commentInfo.nickname)">
                    <!-- 用户名称 -->
                    <view class="lighter sm flex">
                        {{ commentInfo.nickname }}
                        <text v-if="commentInfo.is_author" class="lighter xxs author">作者</text>
                    </view>
                    <!-- 评论内容 -->
                    <view class="m-t-10 nr normal content">{{ commentInfo.comment }}</view>
                    <!-- 评论时间 -->
                    <view class="muted xs m-t-10">{{ commentInfo.create_time }}</view>
                </view>
                <!-- 点赞 -->
                <view class="good text-center m-l-30"
                    @click="handleCommentLike(commentInfo.id, commentInfo.is_like, commentInfo)">
                    <image
                        :src="commentInfo.is_like ? '/static/images/icon_good_s.png' : '/static/images/icon_good.png'">
                    </image>
                    <view class="xxs muted">{{ commentInfo.like }}</view>
                </view>
            </view>
        </view>
        <!-- 评论二级 -->
        <view v-if="commentInfo.child.length">

            <block v-for="(commentItem2, commentIndex2) in commentInfo.child" :key="commentItem2.id">
                <view class="comment--item sons m-t-20">
                    <view class="flex col-top row-between">
                        <navigator hover-class="none" open-type="navigate"
                            :url="'/bundle_b/pages/community_user/community_user?id=' + commentItem2.user_id">
                            <u-image :src="commentItem2.avatar" width="88" height="88" borderRadius="50%"></u-image>
                        </navigator>
                        <view class="m-l-16 flex-1" @click="onComment(commentItem2.id, commentItem2.nickname)">
                            <!-- 用户名称 -->
                            <view class="lighter sm flex">
                                {{ commentItem2.nickname }}
                                <text v-if="commentItem2.is_author" class="lighter xxs author">作者</text>
                            </view>
                            <!-- 评论内容 -->
                            <view class="m-t-10 nr normal content">
                                <text v-if="commentItem2.is_second == 0">
                                    回复<text class="primary m-l-6 m-r-6">@{{commentItem2.reply_nickname}}</text>
                                </text>
                                {{ commentItem2.comment }}
                            </view>
                            <!-- 评论时间 -->
                            <view class="muted xs m-t-10">{{ commentItem2.create_time }}</view>
                            <!-- 展开更多 -->
                        </view>
                        <!-- 点赞 -->
                        <view class="good text-center m-l-30"
                            @click="handleCommentLike(commentItem2.id, commentItem2.is_like, commentItem2)">
                            <image
                                :src="commentItem2.is_like ? '/static/images/icon_good_s.png' : '/static/images/icon_good.png'">
                            </image>
                            <view class="xxs muted">{{ commentItem2.like }}</view>
                        </view>
                    </view>
                </view>
            </block>
            <!-- 是否有更多评论 -->
            <view class="sons primary xs m-t-10 flex" @click="handleLoadingMore"
                v-if="commentInfo.more != 0 && (commentInfo.more+2) > commentInfo.child.length && more && !commentInfo.loading">
                展开更多回复
                <u-icon name="arrow-down" size="22" :color="colorConfig.primary"></u-icon>
            </view>
            <!-- 加载中 -->
            <view class="sons primary xs" v-if="commentInfo.loading">
                <u-loading :color="colorConfig.primary" :size="30" mode="circle"></u-loading>
                <text class="m-l-20">加载中</text>
            </view>
        </view>
        <view class="border-b"></view>
    </view>
</template>

<script>
    import {
        apiCommunityCommentLike,
        getCommunityCommentChildLists
    } from '@/api/community.js';
    import { debounce } from "@/utils/tools.js"
    export default {
        name: "community-comment-list",
        props: {
            comment: {
                type: Object
            }
        },
        data() {
            return {
                more: 1,
                page: 1,
                pageSize: 5,
                commentInfo: {}
            }
        },
        watch: {
            comment: {
                handler: function(val) {
                    if ( this.commentInfo.hasOwnProperty('child') ) {
                        this.commentInfo.child.push(...JSON.parse(JSON.stringify(val.child)))
                        this.commentInfo.child = this.removeDiffrent(this.commentInfo.child, 'id')
                    } else {
                        this.commentInfo = val;
                    }
                },
                deep: true,
                immediate: true
            },
        },
        mounted() {
            this.handleCommentLike = debounce(this.handleCommentLike, 100)
        },
        methods: {
            // 点击评论-commentId是评论的id，index是这个组件在父组件中的第几个
            onComment(commentId, commentUserName) {
                if(!this.isLogin) return this.$Router.push('/pages/login/login')
                this.$emit('reply', {
                    commentId: commentId,
                    parentId: this.commentInfo.id,
                    commentUserName: commentUserName
                })
            },
            /**
             * 点赞评论
             * @constructor
             * @param {number} commentId - 评论的ID
             * @param {boolean} status - 点赞评论状态
             * @param {object} isParent - 是否是一级评论
             */
            handleCommentLike(commentId, status, item) {
                if(!this.isLogin) return this.$Router.push('/pages/login/login')
                // 点赞因为请求的话后端会重新排序导致混乱，所以目前点赞成功后会在本地更改状态不会重新请求
                switch (status) {
                    case 0:
                        this.$set(item, 'like', item.like += 1)
                        this.$set(item, 'is_like', 1)
                        break;
                    case 1:
                        this.$set(item, 'like', item.like -= 1)
                        this.$set(item, 'is_like', 0)
                        break;
                }
                apiCommunityCommentLike({
                    id: commentId,
                    status: status ? 0 : 1,
                    type: 2
                }).then(res => {
                    if (res.code !== 1) {
                        // 不成功把它们改回去
                        switch (status) {
                            case 0:
                                this.$set(item, 'like', item.like -= 1)
                                this.$set(item, 'is_like', 1)
                                break;
                            case 1:
                                this.$set(item, 'like', item.like += 1)
                                this.$set(item, 'is_like', 0)
                                break;
                        }
                        this.$toast({
                            title: res.msg
                        })
                    }
                })
            },
            // 加载更多
            handleLoadingMore() {
                if(!this.isLogin) return this.$Router.push('/pages/login/login')
                this.commentInfo.loading = true;
                getCommunityCommentChildLists({
                    comment_id: this.commentInfo.id,
                    page_no: this.page,
                    page_size: this.pageSize
                }).then(res => {
                    if (res.code === 1) {
                        this.more = res.data.more;
                        this.commentInfo.child.push(...res.data.list)
                        // 去除重复评论
                        this.commentInfo.child = this.removeDiffrent(this.commentInfo.child, 'id')
                        if (res.data.more === 1) this.page += 1
                    } else {
                        this.$toast({
                            title: res.msg
                        })
                    }
                    this.commentInfo.loading = false;
                })
            },
            /**
             * 去重
             * @constructor
             * @param {Array} arr - 需要去重的数组对象
             * @param {string} key - 需要去重的对象key值
             * @returns {Array} Array
             */
            removeDiffrent(arr, key = 'id') {
                let obj = {};
                return arr.reduce((setArr, item) => {
                    obj[item[key]] ? '' : obj[item[key]] = true && setArr.push(item);
                    return setArr;
                }, []);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        transition: all .5s;
        padding: 24rpx 24rpx 0 24rpx;

        .border-b {
            margin-left: 104rpx;
            padding-bottom: 18rpx;
            border-bottom: 1px solid $-color-border;
        }

        .sons {
            margin-left: 104rpx;
        }

        &--item {
            transition: all .5s;
            
            .author {
                padding: 0 16rpx;
                margin-left: 10rpx;
                background-color: #eee;
                border-radius: 18rpx;
            }

            .content {
                white-space: pre-line;
            }

            .good {
                image {
                    width: 26rpx;
                    height: 26rpx;
                }
            }
        }
    }
</style>
