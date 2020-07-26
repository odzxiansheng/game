<template>
  <div class="battle">
    <div class="role">
      <div>等级:{{role.grade.value}}</div>
      <div style="display:flex;">
        <div style="display:flex;">
          <div class="xue-text">血量:</div>
          <div class="xue-box">
            <div class="xue">
              <div class="is-role111">
                {{role.vitality.value}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(item,key) in masterss"
      :key="key"
    >
      <div class="master">
        <div>等级:{{item.grade.value}}</div>
        <div style="display:flex;">
          <div style="display:flex;">
            <div class="xue-text">血量:</div>
            <div class="xue-box">
              <div class="xue">
                <div class="is-master">
                  {{item.vitality.value}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gainExperience } from "@/api/login";
export default {
  data() {
    return {
      mas: [],
      xue: 0,
      grade: 1,
      mvitali: 0
    };
  },
  props: {
    masterss: {
      type: Array,
      default: () => []
    },
    role: {
      type: Object,
      default: () => {}
    },
    grades: {
      type: Number,
      default: 0
    },
  },
  methods: {
    battle() {
      let roleVitality = document.getElementsByClassName("is-role111")[0];
      let masterVita = document.getElementsByClassName("is-master")[0];

      let gongji = 0;
      let vitality = this.role.vitality.value;
      let mgongji = 0;
      let mvitality = this.masterss[0].vitality.value;
      let role = this.role;
      // 初始生命值
      let rolevitality = this.role.vitality.value;
      let rgj = role.magicPower.value;
      let rmg = role.magicAttack.value;
      let rsm = role.vitality.value;
      let rfl = role.mana.value;
      let rwf = role.physicalDefense.value;
      let rmf = role.spellDefense.value;
      let rsd = role.attacks.value;
      let rsb = role.dodge.value;

      let master = this.masterss[0];
      // 怪物初始生命值
      let mastervitality = this.masterss[0].vitality.value;
      let mgj = master.magicPower.value;
      let mmg = master.magicAttack.value;
      let msm = master.vitality.value;
      let mfl = master.mana.value;
      let mwf = master.physicalDefense.value;
      let mmf = master.spellDefense.value;
      let msd = master.attacks.value;
      let msb = master.dodge.value;
      let mge = master.gainExperience.value;
      let zhandou = (msm, rsm) => {
        gongji = rgj - mwf > 0 ? rgj - mwf : 1;
        mvitality = gongji - msm > 0 ? 0 : msm - gongji;
        if (vitality > 0) {
          mgongji = mgj - rwf > 0 ? mgj - rwf : 1;
          vitality = mgongji - rsm > 0 ? 0 : rsm - mgongji;
        }

        this.zhandouTimeout = setTimeout(() => {
          if (mvitality > 0 && vitality > 0) {
            this.role.vitality.value = vitality;
            let percentage = parseInt((1 - vitality / rolevitality) * 100);
            let masterPercen = parseInt((1 - mvitality / mastervitality) * 100);
            this.masterss[0].vitality.value = mvitality;
            roleVitality.style.width = percentage + "%";
            masterVita.style.width = masterPercen + "%";
            zhandou(mvitality,vitality);
          } else if (mvitality <= 0 && vitality > 0) {
            masterVita.style.width = "0";
            role.gainExperience.value += mge + this.grades*5;
            console.log(`战斗结束，获得${mge + this.grades*5}经验`);
            this.masterss.shift();
            let user = JSON.parse(localStorage.getItem("login"));
            gainExperience({
              username: user.username,
              gainExperience: mge + this.grades*5
            })
              .then(res => {
                console.log('战斗结束');
                this.$emit("isgrade", { status: "victory",grade:this.grades });
              })
              .catch(err => {
                console.log(err);
              });
          } else if (mvitality > 0 && vitality <= 0) {
            this.role.vitality.value = 0;
            roleVitality.style.width = "100%";
            console.log("战斗失败");
            this.$emit("grade", { status: "fail" });
          }
        }, 500);
      };
      zhandou(msm, rsm);
      // this.masterss[0]
    },
    vitality(num) {
      let master = document.getElementsByClassName("is-role111")[0];
      master.style.width = num + "%";
    },
    destroyed() {
      this.zhandouTimeout = null;
    },
  }
};
</script>
<style scoped lang="less"  src="./index.less"></style>