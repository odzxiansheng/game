<template>
  <div class="box-page">
		<div class="box-width" v-for="item in list" :key="item.id" @click="chooseMaterialScience(item)">
			{{item.text}}
		</div>
		<div class="box-width" @click="addMaterialScience">合成</div>
		<div class="btn">
			<div class="item-btn" @click="add('equipment')">装备</div>
			<div class="item-btn" @click="add('singleDrug')">灵药</div>
			<div class="item-btn" @click="add('materialScience')">材料</div>
			<!-- <div class="item-btn" @click="add('materialScience')">强化</div> -->
		</div>
		<div class="box" v-if="bagShow">
			<div class="box-width" v-for="item in bagList" :key="item.id" @click="chooseer(item)">
				{{item.title}}
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
			bagShow:false,
      list: [
        {
          id: 1,
          text: "放入材料",
        },
        {
          id: 2,
          text: "放入材料",
        },
        {
          id: 3,
          text: "放入材料",
        },
        {
          id: 4,
          text: "放入材料",
        },
        {
          id: 5,
          text: "放入材料",
        },
      ],
			item:null,
      bagList: [
        {
          id: "cl-01",
          title: "野猪牙",
					type:'materialScience'
        },
      ],
    };
  },
  methods: {
    add(type) {
      switch (type) {
        case "equipment":
          break;
        case "singleDrug":
          break;
        case "materialScience":
          break;

        default:
          break;
      }
    },
		// 选择材料
		chooseMaterialScience(item){
			this.bagShow = true;
			this.item = item;
		},
		chooseer(item){
			this.list.map(v=>{
				if(v.id === this.item.id){
					v.text = item.title
				}
			})
			this.bagShow = false;
		},
		addMaterialScience(){
			this.list.map(v=>{
				v.text = '放入材料'
			})
		}
  },
};
</script>
<style scoped lang="less">
.box-page {
  .box-width {
    height: 120upx;
    margin: 20upx;
    border: 1px solid #ccc;
    border-radius: 20upx;
    box-shadow: 2upx 2upx 2upx #ccc;
    line-height: 120upx;
    padding: 0 50upx;
  }
  .btn {
    display: flex;
    justify-content: space-around;
  }
  .box {
		width: 80%;
		height: 80%;
    border: 2upx solid red;
    position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: #fff;
		.box-width {
			height: 120upx;
			margin: 20upx;
			border: 1px solid #ccc;
			border-radius: 20upx;
			box-shadow: 2upx 2upx 2upx #ccc;
			line-height: 120upx;
			padding: 0 50upx;
		}
  }
  .item-btn {
    width: 25%;
    height: 60upx;
    text-align: center;
    line-height: 60upx;
    border: 2upx solid red;
    border-radius: 20upx;
  }
}
</style>