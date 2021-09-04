<template>
  <div class="content"  @click="showInfo = false">
    <div class="info">
        <div class="img"  @click.stop="showInfo = !showInfo"></div>
        <div class="blood-volume">
          <div class="show-blood-volume">
            <div class="get-show-blood-volume" :style="bloodVolume"></div>
            <span class="blood-volume-text">{{bloodVolume.width}}</span>
          </div>
        </div>
    </div>
    <div class="role-box">
        <div class="role-img" ></div>
    </div>
    <div class="ware-window">
      <div class="blood-volume">
        <div class="show-blood-volume">
          <div class="get-show-blood-volume" :style="getExper"></div>
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
      getExper: {
        width: "0%",
      },
      time: null,
      lastTimeData:{}
    };
  },
  computed: {
    bloodVolume() {
      let experience = ((this.role.getExperience / this.role.experience) * 100).toFixed(2);
      if (experience > 100) {
        experience = 100;
      }
      return {
        width: experience + "%",
      };
    },
  },
  onShow() {
    this.userInfo = this.$Utils.localDate('userInfo') || {};
    this.lastTimeData = this.$Utils.localDate('lastTimeData') || {};
    if (!this.userInfo?.name) {
      uni.redirectTo({
        url: "/pages/home/index",
      });
      return;
    }
    // 进入页面计算经验
    if(this.lastTimeData.time){
      let time = new Date().getTime();
      this.userInfo.getExperience += (time - this.lastTimeData.time)/5000 * this.lastTimeData.grade;
      this.userInfo.getExperience = this.userInfo.getExperience.toFixed(0) - 0;
      this.$Utils.localDate('userInfo',this.userInfo);
      this.$Utils.localDate('lastTimeData',{})
    }
    // 角色赋值
    this.setUserInfo();
    this.startTime();
  },
  mixins: [mixins],
  onHide() {
    this.stopTime();
    this.setWareTime(1);
  },
  methods: {
    // 重置缓存时间
    setWareTime(grade = 1){
      let time = new Date().getTime();
      let data = {
        time,
        grade
      }
      this.$Utils.localDate('lastTimeData',data)
    },
    setGrade() {
      if (this.role.getExperience >= this.role.experience) {
        // 升级
        this.getGrade();
        return
      }
      this.$UI.tip('经验不足,无法升级');
    },
    // 角色赋值
    setUserInfo() {
      this.userInfo = this.$Utils.localDate('userInfo') || {};
      for (const key in this.role) {
        this.role[key] = this.userInfo[key];
      }
    },
    getGrade() {
      let userInfo = this.$Utils.localDate('userInfo') || null;
      let list = this.setStatte();
      let index = list.findIndex((v) => v.stateText === userInfo.state);
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
      this.$Utils.localDate('userInfo',userInfo);
      this.setUserInfo(userInfo);
    },
    getExperience() {
      let userInfo = this.$Utils.localDate('userInfo') || null;
      this.$Utils.localDate('userInfo',userInfo);
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
      this.time = setInterval(() => {
        this.userInfo = this.$Utils.localDate('userInfo') || {};
        let getExper = this.getExper.width.split("%")[0] - 0;
        if(getExper == 100){
          this.userInfo.getExperience += 1;
          this.$Utils.localDate( "userInfo" ,this.userInfo)
          this.setUserInfo();
        }
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
      margin: 20upx 0 0 20upx;
      background-image: url('./image/user.png'); 
      background-size: 100% 100%;
    }
    .blood-volume {
      height: 100%;
      margin: 50upx 20upx 0;
      .show-blood-volume {
        width: 200upx;
        height: 30upx;
        border-radius: 15upx;
        background-image: url('./image/groove.png');
        position: relative;
        .get-show-blood-volume {
          background-image: url('./image/groove_content.png');
          border-radius: 15upx;
          height: 30upx;
        }
        .blood-volume-text{
          position: absolute;
          top: 0;
          right: 10upx;
          font-size: 20upx;
          line-height: 27.2upx;
        }
        
      }
    }
  }
  .role-box{
    width: 100%;
    margin: 100upx auto;
    text-align: center;
    .role-img{
      width: 415upx;
      height: 348upx;
      background: url('./image/role.png');
      background-size: 100% 100%;
      margin: auto;
    }
  }
  .ware-window {
    display: flex;
    width: 90%;
    margin: 20upx auto;
    height: 180upx;
    border-radius: 20upx;
    display: flex;
    align-items: center;
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
        background-image: url('./image/groove.png');
        margin: auto;
        .get-show-blood-volume {
          background-image: url('./image/groove_content.png');
          border-radius: 15upx;
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
