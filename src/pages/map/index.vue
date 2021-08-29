<template>
	<div>
    <div  v-for=" (item,index) in mapList" :key="item.id">
      <div class="map-card"v-if="item.onOff"  @click="start(item,index,1)">
        <div class="is-ing">历练中 <span v-if="time > 0">第{{time}}年</span></div>
        <div class="map-name">{{item.name}}</div>
        <div class="map-item">
          <span class="get">掉落</span>
          <span class="master-goods" v-for="v in item.goods" :key="v.id" >{{v.name}}</span>
        </div>
      </div>
      <div class="map-card" v-else @click="start(item,index)">
        <div class="map-name">{{item.name}}</div>
        <div class="map-item">
          <span class="get">掉落</span>
          <span class="master-goods" v-for="v in item.goods" :key="v.id" >{{v.name}}</span>
        </div>
      </div>
      <div class="ware-place" v-if="userInfo && userInfo.lifeValue && item.onOff" @click="start(item,index,1)">
        <div class="self">
          <div class="self-img"></div>
          <div class="self-attr">
            <div class="self-blood-volume">
              <div class="life" :style="life"></div>
            </div>
          </div>
        </div>
        <div class="master">
          <div class="self-img"></div>
          <div class="self-attr">
            <div class="self-blood-volume">
              <div class="life" :style="masterLife"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import { mixins } from "../../common/mixins";
import mapList from "../../mock/map";
export default {
  mixins: [mixins],
  data() {
    return {
      time: null,
      timer: null,
      timeData: this.$Utils.localDate({ name: "startTime" }) || {},
      mapList,
      master: {
        lifeValue: 50, // 生命值
        aggressivity: 10,
        getExperience:1,
        now: 50,
      },
      user: {
        lifeValue: 50, // 生命值
        aggressivity: 10,
        now: 50,
      },
      life: {
        width: "100%",
      },
      masterLife: {
        width: "100%",
      },
      timer: null,
    };
  },
  mounted() {
    this.clearTime();
    this.init();
  },
  onHide() {
    this.clearTime();
  },
  methods: {
    init() {
      this.setMaster();
    },
    // 初始化怪物参数
    setMaster(grade = 1) {
      for (const key in this.user) {
        // this.master[key] = this.userInfo[key] * grade;
        this.user[key] = this.userInfo[key];
      }
      this.user.now = this.user.lifeValue;
    },
    startWare() {
      this.setLifeValue(this.user, this.masterLife);
      this.setLifeValue(this.master, this.life);
      if (this.timeData.id) {
        let index = this.mapList.findIndex((v) => v.id == this.timeData.id);
        if (index != -1) {
          this.mapList[index].onOff = true;
        }
      }
      if (this.master.now >= 0) {
        if (this.user.now <= 0 || this.master.now <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        this.getResult(this.master, this.user, this.masterLife);
        this.setLifeValue(this.user, this.masterLife);
      }
      if (this.user.now >= 0) {
        if (this.user.now <= 0 || this.master.now <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.master.goods.map((v) => {
            this.getGoods(v);
          })
          setTimeout(() => {
            this.start(this.item, this.index);
            this.life.width = "100%";
            this.masterLife.width = "100%";
          }, 2000);
          return;
        }
        setTimeout(() => {
          this.getResult(this.user, this.master, this.life);
          this.setLifeValue(this.master, this.life);
        }, 400);
      }
    },
     getGoods(v) {
      console.log("getGoods",v);
      let num = Math.random();
      // if(v.probability <= num){
      v.id = this.$Utils.setID( this.userInfo.bage);
      if (!this.userInfo.bage) {
        this.userInfo.bage = [];
      }
      // if (v.id) {
      this.userInfo.bage.push(v);
		  this.userInfo.bage = this.$Utils.addFood(this.userInfo.bage);
      // }
      this.userInfo.getExperience += this.master.experience - 0;
      this.$Utils.localDate({
        name: "userInfo",
        data: this.userInfo,
      });
    },
    getResult(user, master, life) {
      // 玩家/怪物 战斗后的生命值
      user.now = user.now - master.aggressivity;
      // 玩家/怪物 战斗后的生命值
      let result = user.now / user.lifeValue;
      life.width = result * 100 + "%";
    },
    setLifeValue(user, userLife) {
      // 获取 玩家/怪物 当前生命值比例
      let width = userLife.width.split("%")[0] / 100;
      // 获取 玩家/怪物 总生命值
      let life = user.lifeValue * width;
      if (life < 0) life = 0;
      // 页面展示的宽度
      userLife.width = (life / user.lifeValue) * 100 + "%";
      // masterLife.width = userLife.width;
    },
    start(item, index, onOff) {
      this.master = item.masterList[0];
      this.timeData = this.$Utils.localDate({ name: "startTime" }) || {};
      if (onOff) {
        // 结束 获得物品
        item.onOff = false;
        let isTrue = Math.random() < item.probability;
        let list = [];
        if (isTrue) {
          item.masterList.map((v) => {
            let itemIsTrue = Math.random() < v.probability;
            if (itemIsTrue) {
              list.push(v);
            }
          });
        }
        this.$Utils.localDate({ name: "startTime", type: "remove" });
        this.clearTime();
        return;
      }
      item.onOff = true;
      this.item = item;
      this.index = index;
      this.timeShow(item, index, onOff);
    },
    timeShow(item, index, onOff) {
      if (onOff) {
        this.$Utils.localDate({ name: "startTime", type: "remove" });
        this.clearTime();
        return;
      }
      this.master = item.masterList[0];
      this.master.now = this.master.lifeValue;
      this.setMaster(index);
      let time = new Date().getTime();
      if (!this.timeData.time) {
        this.$Utils.localDate({
          name: "startTime",
          data: { time: time, id: item.id },
        });
      }
      let endTime = time;
      this.timer = setInterval(() => {
        endTime = endTime + 1000;
        let ime = this.$Utils.setTime(time, endTime);
        this.time = ime.dateText.toFixed(0);
        this.startWare();
      }, 1000);
    },
    clearTime() {
      clearInterval(this.timer);
      clearInterval(this.time);
      this.timer = null;
      this.time = null;
    },
  },
};
</script>
<style scoped lang="less">
.map-card {
  width: 90%;
  margin: 20upx auto;
  height: 180upx;
  border: 1px solid #ccc;
  border-radius: 20upx;
  display: flex;
  align-items: center;
  box-shadow: 2upx 2upx 2upx #ccc;
  position: relative;
  .is-ing {
    position: absolute;
    top: 2px;
    left: 10px;
    color: red;
  }
  .map-name {
    width: 40%;
    text-align: center;
  }
  .map-item {
    .get {
      margin-right: 8upx;
    }
    .master-goods {
      color: blue;
    }
  }
}
.ware-place {
  display: flex;
  width: 90%;
  margin: 20upx auto;
  height: 180upx;
  border: 1px solid #ccc;
  border-radius: 20upx;
  display: flex;
  align-items: center;
  box-shadow: 2upx 2upx 2upx #ccc;
  .self {
    display: flex;
    align-items: center;
    width: 50%;
    height: 100%;
    .self-img {
      width: 30%;
      height: 100%;
    }
    .self-attr {
      .self-blood-volume {
        width: 200upx;
        border: 2upx solid red;
        border-radius: 15upx;
        height: 30upx;
        .life {
          height: 100%;
          background: red;
        }
      }
    }
  }
  .master {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 50%;
    height: 100%;
    .self-img {
      width: 30%;
      height: 100%;
    }
    .self-attr {
      .self-blood-volume {
        width: 200upx;
        border: 2upx solid red;
        border-radius: 15upx;
        height: 30upx;
        .life {
          height: 100%;
          background: red;
        }
      }
    }
  }
}
</style>