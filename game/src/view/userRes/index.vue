<template>
  <div class="user-res">
    <el-form
      class="role-form"
      ref="form"
      :model="form"
      label-width="100px"
      v-if="choose"
    >
      <el-form-item
        label="玩家昵称"
        prop="playname"
        :rules="rules"
      >
        <el-col :span="20">
          <el-input
            placeholder="请输入内容"
            prefix-icon=""
            v-model="form.playname"
            width="100px"
          >
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="性别"
        prop="sex"
      >
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="背景"
        prop="family"
      >
        <el-radio-group v-model="form.family">
          <el-col
            :span="7"
            v-for="item in race"
            :key="item"
          >
            <el-radio :label="item"></el-radio>
          </el-col>
        </el-radio-group>
      </el-form-item>
      <el-button
        type="primary"
        @click="submit"
      >开始游戏</el-button>
    </el-form>
    <div
      class="text"
      v-else
    >
      <div class="text-content">
        一位名叫{{form.playname}}的{{form.family}}族{{sex}},
        开始了三界传奇的故事......
      </div>
      <div class="text-content">
        <el-button @click="chooseAgain">重新选择</el-button>
        <el-button @click="playGame">开始游戏</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { existence } from "../../api/login";
import { role } from "../../api/login";
export default {
  data() {
    return {
      form: {
        playname: "",
        sex: "男",
        family: "仙"
      },
      rules: [
        {
          required: true,
          message: "名称不能为空",
          trigger: "blur"
        }
      ],
      race: ["仙", "魔", "妖", "佛", "鬼", "人"],
      choose: true,
      sex: "少年"
    };
  },
  methods: {
    // 登陆
    submit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.playname.length !== 0) {
            this.choose = false;

            if (this.form.sex === "男") {
              this.sex = "少年";
            } else {
              this.sex = "女孩";
            }
          }
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    chooseAgain() {
      this.choose = true;
    },
    playGame() {
      let username = JSON.parse(localStorage.getItem("login")).username;
      role({
        username: username,
        ...this.form
      })
        .then(res => {
          const h = this.$createElement;
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.$message({
                message: h("p", null, [
                  h("span", null, ""),
                  h("i", { style: "color: teal" }, res.data.msg)
                ])
              });
              this.$router.push("home");
              localStorage.setItem("code", 1);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.getItem("code")) {
      let code = localStorage.getItem("code");
      if (Number(code) === 1) {
        this.$router.push("home");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.user-res {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  font-size: 20px;
  .role-form {
    width: 70%;
    height: 70%;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .el-form-item {
      // height: 25%;
      box-sizing: border-box;
      padding-top: 3.125rem;
    }
    .el-button {
      margin-top: 3.125rem;
    }
  }
  .text {
    height: 100%;
    .text-content {
      &:nth-child(1) {
        height: 70%;
        line-height: 18.75rem;
      }
      &:nth-child(2) {
        height: 30%;
        margin: auto;
      }
    }
  }
}
</style>