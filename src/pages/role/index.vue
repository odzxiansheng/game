<template>
  <div class="content"  @click="showInfo = false">
    <div class="info">
        <div class="img"  @click.stop="showInfo = !showInfo"></div>
        <div class="blood-volume">
          <div class="show-blood-volume">
            <div class="get-show-blood-volume" :style="bloodVolume"></div>
          </div>
        </div>
    </div>
    <div class="ware-window">
      <div v-if="showGetExperience" class="start-ger" @click="startGet">开始修炼</div>
      <div v-else>
        <div class="blood-volume">
          <div class="show-blood-volume">
            <div class="get-show-blood-volume" :style="getExper"></div>
            <div @click="stop">停止</div>
          </div>
        </div>
      </div>
    </div>
    <bottom-bat></bottom-bat>
    <div class="info-window" v-if="showInfo">
      <div class="title">名字：{{ role.name }}</div>
      <div class="title">ID：{{ role.ID }}</div>
      <div class="title">境界：{{ role.state }}</div>
      <div class="title">经验：{{role.getExperience}}/{{ role.experience }} 
        <span @click.stop="setGrade" style="margin-left:10px;color:blue;">升级</span>
      </div>
      <div class="title">战力：{{ role.combatEffectiveness }}</div>
    </div>
  </div>
</template>

<script>
import { mixins } from "../../common/mixins";
export default {
  data() {
    return {
      role: {
        name: "",
        ID: "",
        state: "", // 境界
        experience: "",
        getExperience: "",
        combatEffectiveness: "",
      },
      userInfo: {},
      showInfo: false,
      showGetExperience: true,
      getExper: {
        width: "0%",
      },
      time: null,
      practice:{}
    };
  },
  computed: {
    bloodVolume() {
      let experience = (
        (this.role.getExperience / this.role.experience) *
        100
      ).toFixed(2);
      if (experience > 100) {
        experience = 100;
      }
      return {
        width: experience + "%",
      };
    },
  },
  watch: {
    // 开始修炼界面
    showGetExperience(val) {
      if (!val) {
        this.startTime();
        return
      }
      this.stopTime();
    },
  },
  onShow() {
    this.practice = this.$Utils.localDate({ name: "practice" }) || null;
    this.userInfo = this.$Utils.localDate({ name: "userInfo" }) || null;
    this.setUserInfo();
    if (!this.showGetExperience) {
      this.stopTime();
      this.startTime();
    } else {
      this.stopTime();
    }
  },
  mixins: [mixins],
  onLoad() {
    if (!this.userInfo) {
      uni.redirectTo({
        url: "/pages/home/index",
      });
      return;
    }
    this.setUserInfo();
  },
  onHide() {
    this.stopTime();
  },
  methods: {
    setGrade() {
      if (this.role.getExperience >= this.role.experience) {
        this.showGetExperience = true;
        this.stopTime();
        // 升级
        this.getGrade();
        return
      }
      this.$UI.tip('经验不足,无法升级');
    },
    setUserInfo() {
      let userInfo = this.$Utils.localDate({ name: "userInfo" }) || null;
      for (const key in this.role) {
        this.role[key] = userInfo[key];
      }
    },
    getGrade() {
      let userInfo = this.$Utils.localDate({ name: "userInfo" }) || null;
      let list = this.setStatte();
      let index = list.findIndex((v) => v.stateText === userInfo.state);
      console.log(userInfo);
      console.log(list);
      if (index == -1 || index >= list.length) return;
      userInfo.state = list[index + 1].stateText;
      userInfo.getExperience = userInfo.getExperience - userInfo.experience;
      userInfo.experience = list[index + 1].experience;
      userInfo.type++;
      userInfo.state = list[index + 1].stateText;
      userInfo.experience = list[index + 1].experience;
      userInfo.aggressivity += 10;
      userInfo.defensivePower += 5;
      userInfo.lifeValue += 50;
      userInfo.aggressivity += 10;
      userInfo.defensivePower += 5;
      userInfo.lifeValue += 50;
      userInfo.combatEffectiveness =
        userInfo.aggressivity +
        userInfo.defensivePower +
        userInfo.lifeValue / 10;
      if (userInfo.type > 4) {
        userInfo.type = 1;
      }
      this.$Utils.localDate({
        name: "userInfo",
        data: userInfo,
      });
      this.setUserInfo(userInfo);
    },
    getExperience() {
      let userInfo = this.$Utils.localDate({ name: "userInfo" }) || null;
      this.$Utils.localDate({
        name: "userInfo",
        data: userInfo,
      });
    },
    // 开始修炼
    startGet() {
      this.showGetExperience = false;
      this.$Utils.localDate({ name: "practice" ,data:{}})
    },
    // 停止修炼
    stop() {
      this.showGetExperience = true;
      this.stopTime();
    },
    stopTime() {
      console.log( '定时器停止');
      if(this.time){
        clearInterval(this.time);
        this.time = null;
      }
    },
    startTime() {
      console.log( '定时器开启');
      this.practice = true;
      this.time = setInterval(() => {
        let getExper = this.getExper.width.split("%")[0] - 0;
        this.userInfo.getExperience += 1;
        this.$Utils.localDate({ name: "userInfo" ,data:this.userInfo})
        this.setUserInfo()
        if (getExper >= 100) {
          this.getExper.width = "0%";
        } else {
          this.getExper.width = getExper + 1 + "%";
        }
      }, 50);
    },
  },
};
</script>

<style scoped lang="less">
.content {
  .info {
    display: flex;
    .img {
      width: 80upx;
      height: 80upx;
      border: 2upx solid red;
    }
    .blood-volume {
      height: 100%;
      margin: auto 20upx;
      .show-blood-volume {
        width: 200upx;
        height: 30upx;
        border-radius: 15upx;
        border: 2upx solid black;
        .get-show-blood-volume {
          background: chartreuse;
          height: 30upx;
        }
      }
    }
  }
  .ware-window {
    display: flex;
    width: 90%;
    margin: 20upx auto;
    height: 180upx;
    border: 1px solid #ccc;
    border-radius: 20upx;
    display: flex;
    align-items: center;
    box-shadow: 2upx 2upx 2upx #ccc;
    text-align: center;
    .start-ger {
      width: 100%;
      line-height: 200upx;
      color: blue;
    }
    .blood-volume {
      width: 100%;
      height: 100%;
      margin: auto 20upx;
      .show-blood-volume {
        width: 200upx;
        height: 30upx;
        border-radius: 15upx;
        border: 2upx solid black;
        margin: auto;
        .get-show-blood-volume {
          background: chartreuse;
          height: 30upx;
        }
      }
    }
  }
  .info-window {
    width: 70%;
    height: 70%;
    border: 4upx solid red;
    border-radius: 20upx;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    margin: auto;
  }
}
</style>
