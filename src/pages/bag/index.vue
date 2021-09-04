<template>
  <div class="bag-page">
		<div class="bag-role">
			<div class="">
				<img class="img" :src="userDara.arms">
				<img class="img" :src="userDara.clothes">
				<img class="img" :src="userDara.trousers">
				<img class="img" :src="userDara.shoes">
			</div>
			<div></div>
			<div></div>
		</div>
		<div class="bag-big-box">
			<div class="btn-box" v-for=" item in btnList" :key="item.id" @click="chooseBag(item)">
				<img class="btn-img" >
				<span :class="[ 'btn-text', item.status? 'btn-active' : '' ]">背包</span>
			</div>
			<div class="bag-box" v-for=" item in list" :key="item.id">
				<img v-if="item.img" class="img" :src="item.img">
				<span class="img-alt" v-if="item.num > 1">X{{item.num}}</span>
			</div>
		</div>
    <bottom-bat></bottom-bat>
	</div>
</template>
<script>
import { mixins } from "../../common/mixins";
export default {
  mixins: [mixins],
	data(){
		return{
			list:[],
			btnList:[],
			userDara:{
				arms:'',
				clothes:'',
				trousers:'',
				shoes:''
			}
		}
	},
  created() {
		for (let i = 0; i < 4; i++) {
			let obj = {
				id:'bag' + i,
				status:false,
			}
			if(i == 0){
				obj.status = true;
			}
			this.btnList.push(obj)
		}
		for (let i = 0; i < 24; i++) {
			let obj = {
				id:i,
				type:'',
				num:0,
				name:'',
				img:''
			}
			if(this.userInfo?.bage && this.userInfo.bage[i]){
				obj.type = this.userInfo.bage[i].type;
				obj.num = this.userInfo.bage[i].num;
				obj.name = this.userInfo.bage[i].name;
				obj.img = this.userInfo.bage[i].img;
			}
			this.list.push(obj)
		}
		console.log(this.list);
	},
	methods:{
		chooseBag(item){
			this.btnList.map(v=>{
				v.status = false;
			})
			item.status = true;
		}
	}
};
</script>
<style scoped lang="less">
.bag-page{
		width: 100%;
		height: 90%;
		background-image: url("./image/bag_meta.png");
		background-size: 100% 100%;
		.bag-role{
			height: 300upx;
		}
		.bag-big-box{
			width: 80%;
			margin: 300upx auto;
			display: flex;
			flex-wrap: wrap;
		}
		.btn-box{
			display: flex;
			position: relative;
			.btn-img{
				width: 150upx;
				height: 60upx;
				background-image: url("./image/btn.png");
				background-size: 100% 100%;
			}
			.btn-text{
				position: absolute;
				left: 0;
				width: 150upx;
				height: 60upx;
				text-align: center;
				line-height: 60upx;
				font-size: 28upx;
				color: rgb(250, 236, 236);
			}
			.btn-active{
				color: rgb(178, 170, 250);
			}
		}
		.bag-box{
			width: 100upx;
			height: 100upx;
			background-image: url("./image/box.png");
			background-size: 100% 100%;
			position: relative;
			.img{
				width: 100upx;
				height: 100upx;
				background-image: url("./image/wuqi.png");
				background-size: 100% 100%;
			}
			.img-alt{
				position: absolute;
				bottom: 6upx;
				right: 10upx;
				font-size: 28upx;
				color: #fff;
			}
		}
	.map-card {
		width: 90%;
		height: 180upx;
		border: 1px solid #ccc;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		box-shadow: 2upx 2upx 2upx #ccc;
		position: relative;
		.map-name {
			width: 40%;
			text-align: center;
		}
		.map-item {
			.get {
				margin-right: 8upx;
			}
		}
	}
}
</style>