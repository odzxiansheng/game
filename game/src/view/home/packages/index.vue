<template>
  <div class="package">
    <div class="package_btn">
      <div class="money">
        <!-- <img
          src=""
          alt=""
        /> -->
        <div>金钱</div>
        <div>0</div>
      </div>
      <div
        class="package_close"
        @click="close"
      >
        <img
          src="../../../assets/5.png"
          alt
        />
        <div>关闭</div>
      </div>
    </div>
    <div class="package_role_info">
      <!-- 控制位置 -->
      <div class="package_info_box">
        <div class="package_left">
          <div class="package_equipment">
            <img
              src="../../../assets/2.png"
              alt
            />
          </div>
          <div class="package_equipment">
            <img
              src="../../../assets/1.png"
              alt
            />
          </div>
        </div>
        <div class="package_center">
          <img
            src="../../../assets/role.png"
            alt
          />
        </div>
        <div class="package_right">
          <div class="package_equipment">
            <img
              src="../../../assets/4.png"
              alt
            />
          </div>
          <div class="package_equipment">
            <img
              src="../../../assets/3.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <div class="package_goods">
      <div class="package_all">
        <div
          class="package_box"
          v-for="(item,index) in 30"
          :key="index"
        >
          <img
            src="../../../assets/5.png"
            alt
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("packagesClose");
    }
  },
  created() {}
};
</script>
<style scoped lang="less" src="./index.less"></style>
