<script>
export default {
  onLaunch: function () {
    let userInfo = this.$Utils.localDate({ name: "userInfo" }) || null;
    if (userInfo) {
      uni.redirectTo({
        url: "/pages/role/index",
      });
    }else{
			uni.redirectTo({
        url: "/pages/home/index",
      });
		}
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
