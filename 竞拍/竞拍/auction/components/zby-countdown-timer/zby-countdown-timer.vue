<template>
	<view class="flex" :style="{width:2*radius+'rpx',height:2*radius+'rpx'}">
		<text v-if="type == 'circle' && showCountNumber" class="second" :style="{fontSize:fontSize+'rpx'}" style="font-size: 48upx;color:#333333 ;">{{tit}}</text>
		<view v-if="type == 'circle'" class="circleWrapper">
			<view class="wrapper right" :style="{width:radius+'rpx',height:radius*2+2+'rpx'}">
				<view class="circleProgress rightcircle" 
					:style="{borderWidth:lineWidth+'rpx',
						borderColor:bgcolor,
						borderTopColor:color,
						borderRightColor:color,
						width:(2*(radius - lineWidth)+2)+'rpx',
						height:(2*(radius - lineWidth)+2)+'rpx',
						transform: 'rotate('+(rotateDeg <= 45 ? rotateDeg : 45 )+'deg)'
					}"></view>
			</view>
			<view class="wrapper left" :style="{width:radius+'rpx',height:radius*2+2+'rpx'}">
				<view class="circleProgress leftcircle" 
					:style="{borderWidth:lineWidth+'rpx',
						borderColor:bgcolor,
						borderTopColor:color,
						borderRightColor:color,
						width:(2*(radius - lineWidth)+2)+'rpx',
						height:(2*(radius - lineWidth)+2)+'rpx',
						transform: 'rotate('+(rotateDeg > 45 ? rotateDeg : 45 )+'deg)'
					}"></view>
			</view>
		</view>
		<view class="lineWrapper" v-else :style="{background:bgcolor,height: lineWidth+'rpx'}">
			<view style="height:100%;border-radius: 10rpx;" :style="{width: 100*persent+'%',background:color}"></view>
			<view v-if="desc" class="descShow" style="background-color: #000000ab; " :style="{fontSize:fontSize+'rpx'}">
				{{desc.split('{%s}')[0]}} <text class="secondCountTxt">{{second1}}</text> {{desc.split('{%s}')[1]}}
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		props:{
			type:{
				type:String,
				default:'circle' //可选circle，line
			},
			tit:{
				type:String,
				default:'支付中'
			},
			radius:{
				type:Number,
				default:74
			},
			second:{
				type:Number,
				default:5
			},
			fontSize:{
				type:Number,
				default:24
			},
			color:{
				type:String,
				default:'#FF0000'
			},
			bgcolor:{
				type:String,
				default:'#E5E5E5'
			},
			lineWidth:{
				type:Number,
				default:10
			},
			desc:{
				type:String,
				default:'浏览{%s}秒得奖励'
			},
			showCountNumber:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				second1:this.second,
				second_copy:this.second,
				index:1,
				time:null,
				time1:null,
				rotateDeg: -135,
				persent:0,
				is_stop:true,
			}
		},
		created(){
			this.init()
		},
		methods:{
			init(){
				// console.log(that.second)
				// console.log(that.second1)
				// console.log(that.index)
				this.start()
			},
			start(){
				let that = this
				let millisecond = that.second*5
				let process = 1/millisecond
				
				if( this.is_stop ==false ){
					return
				}
				if(that.second1<=0){
					this.second1=this.second_copy
					this.index=1
				}
				this.is_stop =false
				that.time = setInterval(()=>{
					if(that.index*process>=1){
						clearInterval(that.time)
						this.is_stop = true
					}
					this.persent = that.index*process
					this.rotateDeg = that.index*process * 360 -135
					// console.log(this.rotateDeg)
					that.index++
				},200)
				that.time1 = setInterval(()=>{
					that.second1--
					if(that.second1<=0){
						clearInterval(that.time1)
						this.is_stop = true
						that.$emit('end')
					}
				},1000)
			},
			stop(){
				clearInterval(this.time)
				clearInterval(this.time1)
				this.is_stop = true
			},
			refresh(){
				this.stop()
				this.second=this.second_copy
				this.second1=this.second_copy
				this.index=1
				this.init()
			}
		}
	}
</script>
<style lang="scss">
.flex{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}
.second{
	font-size: 24rpx;
	color:#000000;
	position: absolute;
}
.wrapper{
    width: 200rpx;
    height: 400rpx;
    position: absolute;
    top:0;
    overflow: hidden;
}
.right{
    right:0;
}
.left{
    left:0;
}
.circleProgress{
    width: 200rpx;
    height: 200rpx;
    border:10rpx solid #00000038;
    border-radius: 50%;
    position: absolute;
    top:0;
	transform: rotate(-135deg);
}

.rightcircle{
    border-top:10rpx solid green;
    border-right:10rpx solid green;
    right:0;
}
.leftcircle{
    border-top:10rpx solid green;
    border-right:10rpx solid green;
	transform: rotate(45deg);
}
.lineWrapper{
	width: 100%;
	border-radius: 10rpx;
	.descShow{
		border-radius: 0 0 20rpx 20rpx;
		margin: 0 7rpx; color: #fff; 
		font-size: $uni-font-size-sm; 
		text-align: center;
		line-height: 1.2;
		padding: 10rpx;
	}
}
</style>
