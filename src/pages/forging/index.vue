<template>
  <div class="box-page"  @click.stop="bagShow = false">
		<div class="box-width" v-for="item in list" :key="item.id" @click.stop="chooseMaterialScience(item)">
			{{item.text}}
		</div>
		<div class="box-width" @click.stop="addMaterialScience">合成</div>
		<div class="btn">
			<div class="item-btn" @click.stop="add('equipment')">装备</div>
			<div class="item-btn" @click.stop="add('singleDrug')">灵药</div>
			<div class="item-btn" @click.stop="add('materialScience')">材料</div>
			<!-- <div class="item-btn" @click="add('materialScience')">强化</div> -->
		</div>
		<div class="box" v-if="bagShow">
			<div class="box-width" v-for="item in bagList" :key="item.id" @click="chooseer(item)">
				{{item.name}} X {{item.num  }}
			</div>
		</div>
	</div>
</template>
<script>
import { mixins } from "../../common/mixins";
export default {
  mixins: [mixins],
  created() {
    // let bag = this.userInfo.bage || [];
    // this.bagList = this.$Utils.setJSON(bag);
    // this.oldList = Object.assign({},this.list);
    // this.oldBagList = Object.assign({},this.bagList);
    
      this.oldList = this.$Utils.setData(this.list);
      this.oldBagList = this.$Utils.setData(this.bagList);
  },
  data() {
    return {
      bagShow: false,
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
      item: null,
      bagList: [],
      type:'equipment',
      oldList:[],
      oldBagList:[],
    };
  },
  methods: {
    // 还原
    setInit(){
      this.list = this.$Utils.setData(this.oldList);
      this.bagList = this.$Utils.setData(this.oldBagList);
    },
    add(type) {
      this.list = Object.assign([],this.oldList);
      this.setInit();
      this.userInfo = this.$Utils.localDate('userInfo') || null;
      this.type = type;
      if(this.userInfo.bage){
        let list = this.userInfo.bage.filter(v=>v.type == type) || [];
      this.bagList = this.$Utils.setData(list);
      }
      this.oldBagList = this.$Utils.setData(this.bagList);
    },
    // 材料放入某一项
    chooseMaterialScience(item) {
      this.bagShow = true;
      this.item = item;
    },
    // 选择材料
    chooseer(item) {
      this.list.map((v) => {
        if (v.id === this.item.id) {
          v.text = item.name;
        }
      });
      this.bagList.map((v,k)=>{
        if (v.id === item.id ) {
          v.num--
        }
      })
      this.bagShow = false;
    },
    addMaterialScience() {
      switch (this.type) {
        case "equipment":
          break;
        case "singleDrug":
          break;
        case "materialScience":
          let list = this.list.filter((v) => v.text === "放入材料") || [];
          if (list.length < 5) {
            this.$UI.tip("合成成功");
            // v.id = this.$Utils.setID( this.userInfo.bage);
          } else {
            this.$UI.tip("材料不足");
          }
          break;

        default:
          break;
      }
      this.list.map((v) => {
        v.text = "放入材料";
      });
    },
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