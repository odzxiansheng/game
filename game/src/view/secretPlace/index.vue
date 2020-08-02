<template>
  <div class="secretPlace">
    <div
      class="secret"
      v-for="(item,index) in level"
      :key="index"
      @click="toBattle(index)"
    >
      <span>{{item}}</span>
      <img
        src="../../assets/小城.png"
        alt
      />
    </div>
    <div
      v-if="battle"
      class="battle_page"
    >
      <div class="info">
        <masters
          :masterss='masterss'
          :grades='grades'
          :role='info.attribute'
          ref="game"
          @isgrade="isgrade"
        ></masters>
      </div>
    </div>
    <div
      v-if="!battle"
      class="go_home"
      @click="backHome"
    >
      <img
        src="../../assets/button.png"
        alt
      />
      <div>返回</div>
    </div>
  </div>
</template>
<script>
import masters from "../home/masters";
import { read, master, goodsList, checkpoint } from "../../api/login";
export default {
  data() {
    return {
      // level: ["关卡1"],
      level: [],
      secret: ["secret1"],
      battle: false,
      masterss: [],
      zhandouTimeout: null,
      grades: 1,
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
      close: false,
      timeOut: null
    };
  },
  components: {
    masters
  },
  methods: {
    toBattle(index) {
      this.battle = true;
      let login = JSON.parse(localStorage.getItem("login"));
      let grade = index + 1;
      Promise.all([
        read({
          username: login.username
        })
          .then(res => {
            this.info = res.data;
          })
          .catch(err => {
            console.log(err);
          }),
        master({
          grade
        })
          .then(res => {
            this.masterss.push(res.data.isMaster);
            this.grades = index + 1;
          })
          .catch(err => {
            console.log(err);
          })
      ]);
      this.timeOut = setTimeout(() => {
        this.$refs.game.battle();
      }, 500);
    },
    back() {
      this.battle = false;
    },
    backHome() {
      this.$router.push("home");
    },
    readRole() {
      this.battle = false;
    },
    isgrade(e) {
      // console.log(this.level,'111111');
      // console.log(e,'e');

        this.close = false;
      if (e.status === "victory") {
        setTimeout(() => {
          this.battle = false;
        }, 2000);
        if (e.grade >= this.level.length) {
          this.checkpoint(1);
        }
      }
    },
    checkpoint(save) {
      checkpoint({
        save,
        username: "admin"
      })
        .then(res => {
          console.log(res, "res");
          this.level = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.readRole();
    this.checkpoint(0);
  },
  destroyed() {
    this.zhandouTimeout = null;
    this.timeOut = null;
  }
};
</script>
<style lang="less" scoped src="./index.less"></style>