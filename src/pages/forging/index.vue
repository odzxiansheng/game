<template>
  <div class="box-page">
    <!-- 按钮 -->
		<div class="btn">
			<div class="item-btn" @click.stop="add('equipment')">
        <span :class="['text',type == 'equipment' ? 'btn-active' : '']">装备</span>
      </div>
			<div class="item-btn" @click.stop="add('singleDrug')">
        <span :class="['text',type == 'singleDrug' ? 'btn-active' : '']">灵药</span>
      </div>
			<div class="item-btn" @click.stop="add('materialScience')">
        <span :class="['text',type == 'materialScience' ? 'btn-active' : '']">材料</span>
      </div>
			<!-- <div class="item-btn" @click="add('materialScience')">强化</div> -->
		</div>
    <div class="material-science">
      <div class="first-row the-row">
        <div class="row-box" @click="chooseMaterialScience(0)"></div>
        <div class="row-box" @click="chooseMaterialScience(1)"></div>
      </div>
      <div class="second-row the-row">
        <div class="row-box second-left" @click="chooseMaterialScience(2)"></div>
        <div class="row-box big-box"></div>
        <div class="row-box second-right" @click="chooseMaterialScience(3)"></div>
      </div>
      <div class="three-row the-row">
        <div class="row-box" @click="chooseMaterialScience(4)"></div>
      </div>
    </div>
		<div class="add-btn" @click.stop="addMaterialScience">
      <span class="btn-text">合成</span>
    </div>
    <!-- 背包 -->
    <div class="info-window" v-if="bagShow">
      <div class="close"   @click="bagShow = false"></div>
      <div class="info-box">
        <div class="btn-box" v-for=" item in btnList" :key="item.id" @click="chooseBag(item)">
          <img class="btn-img" >
          <span :class="[ 'btn-text', item.status? 'btn-active' : '' ]">背包</span>
        </div>
        <div class="big-bag-box">
          <div class="bag-box" v-for=" item in list" :key="item.id">
            <img v-if="item.img" class="img" :src="item.img">
            <span class="img-alt" v-if="item.num > 1">X{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
		<!-- <div class="box-width" v-for="item in list" :key="item.id" @click.stop="chooseMaterialScience(item)">
			{{item.text}}
		</div> -->
		<!-- <div class="box-width" @click.stop="addMaterialScience">合成</div> -->
		<!-- <div class="box" v-if="bagShow">
			<div class="box-width" v-for="item in bagList" :key="item.id" @click="chooseer(item)">
				{{item.name}} X {{item.num  }}
			</div>
		</div> -->
    <bottom-bat></bottom-bat>
	</div>
</template>
<script>
import { mixins } from "../../common/mixins";
export default {
  mixins: [mixins],
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
        text: "放入材料",
			}
			this.list.push(obj)
		}
    this.oldList = this.$Utils.setData(this.list);
    this.oldBagList = this.$Utils.setData(this.bagList);
  },
  data() {
    return {
      bagShow: false,
      list: [],
      item: null,
      bagList: [],
      type: "equipment",
      oldList: [],
      oldBagList: [],
			btnList:[],
    };
  },
  methods: {
    // 还原
    setInit() {
      this.list = this.$Utils.setData(this.oldList);
      this.bagList = this.$Utils.setData(this.oldBagList);
    },
    add(type) {
      this.list = Object.assign([], this.oldList);
      this.setInit();
      this.userInfo = this.$Utils.localDate("userInfo") || null;
      this.type = type;
      if (this.userInfo.bage) {
        let list = this.userInfo.bage.filter((v) => v.type == type) || [];
        this.bagList = this.$Utils.setData(list);
      }
      this.oldBagList = this.$Utils.setData(this.bagList);
    },
    // 材料放入某一项
    chooseMaterialScience(index) {
      this.bagShow = true;
      this.item = this.$Utils.setData(this.list[index])
    },
    // 选择材料
    chooseer(item) {
      this.list.map((v) => {
        if (v.id === this.item.id) {
          v.text = item.name;
        }
      });
      this.bagList.map((v, k) => {
        if (v.id === item.id) {
          v.num--;
        }
      });
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
  overflow: hidden;
  .btn {
    display: flex;
    justify-content: space-around;
    margin: 20upx auto 0;
    // height: 200upx;
    .item-btn {
      text-align: center;
      line-height: 76upx;
      width: 240upx;
      height: 84upx;
      background-image: url("./image/btn.png");
      background-size: 100% 100%;
      .text {
        color: #fff;
      }
      .btn-active {
        background-image: linear-gradient(to bottom, #fff, #ffff52, #ff8d00);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        text-shadow: 2upx 2upx 2upx #ffff52;
      }
    }
  }
  .material-science{
    .the-row{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80%;
      margin: 0 auto;
      height: 200upx;
    }
    .first-row{
      width: 50%;
    }
    .second-row{
      width: 70%;
      margin-top: -40upx;
      .second-left , .second-right{
        margin-top: 80upx;
      }
    }
    .three-row{
      margin-top: -20upx;
    }
    .row-box{
        width: 100upx;
        height: 100upx;
        background-image: url("./image/box.png");
        background-size: 100% 100%;
    }
    .big-box{
        width: 130upx;
        height: 130upx;
    }
  }
  .add-btn{
      width: 330upx;
      height: 108upx;
      line-height: 100upx;
      font-size: 45upx;
      letter-spacing: 10upx;
      background-image: url("./image/btn.png");
      background-size: 100% 100%;
      text-align: center;
      margin: 0 auto;
      .btn-text{
        background-image: linear-gradient(to bottom, #fff, #ffff52, #ff8d00);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        text-shadow: 2upx 2upx 2upx #ffff52;
      }
  }
  .info-window {
    width: 600upx;
    height: 600upx;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url('./image/info_meta.png');
    background-size: 100% 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    .close{
      position: absolute;
      right: 24upx;
      top: 4upx;
      width: 55upx;
      height: 55upx;
      background-image: url('./image/close.png');
      background-size: 100% 100%;
    }
    .info-box{
      width: 90%;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      flex-wrap: wrap;
      .big-bag-box{
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        margin: 40upx auto;
      }
      .btn-box{
        display: flex;
        position: relative;
        width: 22%;
        height: 60upx;
        margin-top: 100upx;
        .btn-img{
          width: 120upx;
          height: 60upx;
          background-image: url("./image/btn.png");
          background-size: 100% 100%;
        }
        .btn-text{
          position: absolute;
          left: 0;
          width: 120upx;
          height: 60upx;
          text-align: center;
          line-height: 60upx;
          font-size: 28upx;
          color: #fff;
        }
        .btn-active{
          /* 文字渐变 */
            background-image: linear-gradient(to bottom, #fff, #ffff52, #ff8d00);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            text-shadow: 2upx 2upx 2upx #ffff52;
        }
      }
      .bag-box{
        width: 80upx;
        height: 80upx;
        background-image: url("./image/box.png");
        background-size: 100% 100%;
        position: relative;
        .img{
          width: 80upx;
          height: 80upx;
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

    }
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
</style>