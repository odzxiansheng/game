
<template>
  <div class="jiemian">
    <div class="info">
      <div
        class="roleInfo"
        @click="peopleInfo"
      >
        <img v-if="info.sex === '男'" src="../../assets/boy.jpg" alt />
        <img v-else src="../../assets/gril.jpg" alt />
      </div>
      <div class="elseInfo">
        <div class="xInfo">
          <div>等级:{{info.attribute.grade.value}}</div>
          <div>经验:{{info.attribute.gainExperience.value}}/{{info.attribute.experience.value}}</div>
        </div>
        <div>
          <div style="display:flex;">
            <div class="xue-text">血量:</div>
            <div class="xue-box">
              <div class="xue">
                <div class="is-role1">
                  {{info.attribute.vitality.value}}
                </div>
              </div>
            </div>
          </div>
          <div style="display:flex;">
            <div class="xue-text">魔法值:</div>
            <div class="xue-box">
              <div class="lan">
                <div class="is-role">
                  {{info.attribute.mana.value}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <role
      v-if="showRole"
      :people="info.attribute"
    ></role>
    <div
      class="to-secret-place"
      @click="toSecretPlace"
    >副本</div>
  </div>
</template>
<script>
import role from "./role";
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
    };
  },
  components: {
    role
  },
  methods: {
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
