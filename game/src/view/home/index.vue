
<template>
  <div class="interface">
    <div class="info">
      <div class="info_box">
        <div class="roleInfo">
          <img
            v-if="info.sex === '男'"
            src="../../assets/boy.jpg"
            alt
          />
          <img
            v-else
            src="../../assets/gril.jpg"
            alt
          />
        </div>
        <div class="elseInfo">
          <div class="xue_box">
            <div class="content red_content"></div>
          </div>
          <div class="xue_box">
            <div class="content blue_content"></div>
          </div>
          <div class="xue_box">
            <div
              ref="experiences"
              class="content yellow_content"
            ></div>
          </div>
        </div>
        <div class="xInfo">
          <div>等级:{{info.attribute.grade.value}}</div>
          <div>经验:{{info.attribute.gainExperience.value}}/{{info.attribute.experience.value}}</div>
        </div>
      </div>
    </div>
    <div
      v-if="showRole"
      class="go_home"
      @click="backHome"
    >
      <img
        src="../../assets/button.png"
        alt
      />
      <div>关闭</div>
    </div>
    <role
      v-if="showRole"
      :people="info.attribute"
      class="role"
    ></role>
    <div class="interface_content ">
      <div class="to_secret_place one">
        <img
          @click="peopleInfo"
          src="../../assets/home.png"
          alt
        />
        个人信息
      </div>
      <div class="to_secret_place two">
        <img
          @click="openPackage"
          src="../../assets/仓库.png"
          alt
        />
        仓库
      </div>
      <div class="to_secret_place three">
        <img
          class="place_two"
          @click="toSecretPlace"
          src="../../assets/副本.jpg"
          alt
        />
        副本
      </div>
      <div class="to_secret_place four">
        <img
          class="place_two"
          @click="toSecretPlace"
          src="../../assets/商城.png"
          alt
        />
        商城
      </div>
    </div>
      <packages
        v-if="packageShow"
        @packagesClose="packagesClose"
        class="home_packages"
      ></packages>
  </div>
</template>
<script>
import role from "./role";
import packages from "./packages";
import { read } from "../../api/login";
export default {
  data() {
    return {
      info: {
        playname: "",
        sex: "男",
        family: "仙",
        attribute: {
          grade: 0,
          power: 0,
          agile: 0,
          constitution: 0,
          magic: 0,
          phyiacticPower: 0,
          magicPower: 0,
          magicAttack: 0,
          vitality: 0,
          mana: 0,
          physicalDefense: 0,
          spellDefense: 0,
          attacks: 0,
          dodge: 0,
          experience: 0,
          gainExperience: 0
        }
      },
      showRole: false,
      packageShow: false
    };
  },
  components: {
    role,
    packages
  },
  methods: {
    // 关闭个人信息
    backHome() {
      this.showRole = false
    },
    openPackage() {
      this.packageShow = true;
    },
    packagesClose() {
      this.packageShow = false;
    },
    peopleInfo() {
      this.showRole = !this.showRole;
    },
    open() {},
    readRole() {
      let login = JSON.parse(localStorage.getItem("login"));
      read({
        username: login.username
      })
        .then(res => {
          this.info = res.data;
          let attribute = this.info.attribute;
          this.$refs.experiences.style.width =
            Number(
              (
                (attribute.gainExperience.value / attribute.experience.value) *
                100
              ).toFixed(2)
            ) + "%";
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 进入副本
    toSecretPlace() {
      this.$router.push("/secretPlace");
    },
    shenji() {}
  },
  created() {
    this.readRole();
  }
};
</script>
<style scoped lang="less" src="./index.less"></style>
