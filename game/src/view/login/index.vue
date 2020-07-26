<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        label="账号"
        :rules="rules.username"
        prop="username"
      >
        <el-col :span="20">
          <el-input
            placeholder="请输入内容"
            prefix-icon=""
            v-model="form.username"
            width="100px"
          >
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="密码"
        :rules="rules.password"
        prop="password"
      >
        <el-col :span="20">
          <el-input
            placeholder="请输入内容"
            prefix-icon=""
            v-model="form.password"
            show-password
          >
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item size="large">
        <el-button
          type="primary"
          @click="logins('form')"
        >登陆</el-button>
        <el-button
          type="primary"
          @click="requests"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, request } from "../../api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 登陆
    logins(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          login({
            ...this.form
          })
            .then(res => {
              console.log(res, "res");
              console.log(res.status === 200);
              const h = this.$createElement;
              if (res.status === 200) {
                let date = new Date().getTime();
                let userInfo = {
                  username: this.form.username,
                  login: true,
                  date: date
                };
                console.log(res.data.code);
                console.log(res.data.code === 1);
                localStorage.setItem("login", JSON.stringify(userInfo));
                if (res.data.code === 1) {
                  localStorage.setItem("code", res.data.code);
                  this.$message({
                    message: h("p", null, [
                      h("span", null, ""),
                      h("i", { style: "color: teal" }, res.data.msg)
                    ])
                  });
                  this.$router.push("/home");
                } else if (res.data.code === 2) {
                  this.$message({
                    message: h("p", null, [
                      h("span", null, ""),
                      h("i", { style: "color: teal" }, res.data.msg)
                    ])
                  });
                  this.$router.push("/userRes");
                } else if (res.data.code === 0) {
                  this.$message({
                    message: h("p", null, [
                      h("span", null, ""),
                      h("i", { style: "color: teal" }, res.data.msg)
                    ])
                  });
                }
              } else {
                this.$message({
                  message: h("p", null, [
                    h("span", null, ""),
                    h("i", { style: "color: teal" }, res.data.msg)
                  ])
                });
              }
            })
            .catch(err => {});
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    // 注册
    requests(e) {
      this.$refs.form.validate(valid => {
        if (valid) {
          request({
            ...this.form
          })
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === 0) {
                  const h = this.$createElement;
                  this.$message({
                    message: h("p", null, [
                      h("span", null, "注册失败"),
                      h("i", { style: "color: teal" }, res.data.msg)
                    ])
                  });
                } else if (res.data.code === 1) {
                  const h = this.$createElement;
                  this.$message({
                    message: h("p", null, [
                      h("span", null),
                      h("i", { style: "color: teal" }, res.data.msg)
                    ])
                  });
                }
              }
              console.log(res, "res");
            })
            .catch(err => {});
        } else {
          console.log("提交失败");
          return false;
        }
      });
    }
  },
  created() {
    // if (localStorage.getItem("login")) {
    //     let userInfo = JSON.parse(localStorage.getItem("login"));
    //     if (userInfo.login) {
    //         let date = new Date().getTime();
    //         let times = date - userInfo.date;
    //         let time = parseInt(times / 1000 / 60 / 60 / 24);
    //         if (time < 1) {
    //             this.$router.push("/userRes");
    //         } else {
    //             let user = {
    //                 username: userInfo.username,
    //                 login: false,
    //                 date: userInfo.date
    //             };
    //             localStorage.setItem("login", JSON.stringify(user));
    //         }
    //     }
    // }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 600px;
  height: 700px;
  margin: 0 auto;
  border: 1px solid black;
  position: relative;
  .login-form {
    width: 400px;
    height: 500px;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>