<template>
  <div>
    <div class="box">
      <div class="name-label">名称</div>
      <div class="namae-input">
        <input class="is-input" type="text" v-model="name" />
      </div>
    </div>
    <div class="btn">
      <div @click="startGame">开始游戏</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  onload() {

  },
  onHide() {},
  methods: {
    startGame() {
      if (!this.name) {
        this.$UI.tip("请输入名称");
        return;
      }
      let data = {
          name:this.name,
          aggressivity: 10,
          defensivePower: 5,
          lifeValue: 50,
          experience: 100,
          getExperience: 0,
          aggressivity:10, // 攻击力
          defensivePower:5, // 防御力
          lifeValue:50, // 生命值
          money: 0,
          state: '练气期前期',
          combatEffectiveness: 10 + 5 + 50 / 10,
          ID:'0000000',
          type:1
      }
      this.$Utils.localDate('userInfo',data);
      uni.redirectTo({
        url: "/pages/role/index",
      });
    },
  },
};
</script>
<style scoped>
.box {
  width: 90%;
  height: 150upx;
  margin: 20upx auto;
  display: flex;
  align-items: center;
  border: 2upx solid #eee;
}
.box .name-label {
  width: 30%;
  text-align: center;
}
.box .name-input {
}
.box .name-input .is-input {
}
.btn {
  width: 30%;
  height: 100upx;
  line-height: 100upx;
  text-align: center;
  border-radius: 20upx;
  background: rgb(149, 68, 241);
  margin: auto;
}
</style>