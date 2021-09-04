<template>
  <div class="btn">
    <div class="btn-item" @click="to('info')">个人信息</div>
    <div class="btn-item" @click="to('bag')">背包</div>
    <div class="btn-item" @click="to('forging')">锻造</div>
    <!-- <div class="btn-item" @click="to('forging')">宠物</div> -->
    <!-- <div class="btn-item" @click="to('forging')">商店</div> -->
    <div class="btn-item" @click="to('map')">历练</div>
  </div>
</template>
<script>
export default {
  methods: {
    to(type) {
      switch (type) {
        case "info":
          type = "/pages/role/index";
          break;
        case "bag":
          type = "/pages/bag/index";
          break;
        case "map":
          type = "/pages/map/index";
          break;
        case "forging":
          type = "/pages/forging/index";
          break;

        default:
          break;
      }
      uni.navigateTo({
        url: type,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100upx;
  display: flex;
  justify-content: space-around;
  .btn-item {
    width: 30%;
    height: 80upx;
    line-height: 80upx;
    background-image: url('./imaage/btn.png');
    background-size: 100% 100%;
    text-align: center;
    color: #fff;
  }
}
</style>