<template>
  <van-nav-bar border fixed>
    <template #left>
      <van-icon name="arrow-left" size="20" color="black" @click="goback" />
    </template>
    <template #title>
      <h3>登录</h3>
    </template>
  </van-nav-bar>
  <van-image
    fit="cover"
    width="15rem"
    height="10rem"
    src="https://weixin.aisoutu.com/cunchu7/2021-07-10/27_16259198424856.jpg"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div class="register" @click="goRegister">
      <span>未注册账号,先进行注册!</span>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script>
import { reactive, toRefs } from "vue";
import { loginUser } from "../network/login";
import { Toast, Notify } from "vant";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter();
    const loginInfo = reactive({
      email: "",
      password: ""
    });
    const onSubmit = () => {
      loginUser(loginInfo.email, loginInfo.password).then(res => {
        console.log(res);
        //保存token
        window.localStorage.setItem("token", res.access_token);
        Toast.success("登录成功!");
        setTimeout(() => {
          router.go(-1);
        }, 1000);
      });
    };
    const goback = () => {
      router.back();
    };
    const goRegister = () => {
      router.push("/register");
    };
    return { ...toRefs(loginInfo), onSubmit, goback, goRegister };
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  width: 100%;
  background-color: hotpink;
}
.van-image {
  margin: 70px 70px 30px;
}
.register {
  color: hotpink;
  font-size: 12px;
  margin-left: 30px;
}
</style>