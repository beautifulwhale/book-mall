<template>
  <van-nav-bar border fixed>
    <template #left>
      <van-icon name="arrow-left" size="20" color="black" @click="goback" />
    </template>
    <template #title>
      <h3>注册</h3>
    </template>
  </van-nav-bar>
  <van-image
    fit="cover"
    width="15rem"
    height="10rem"
    src="https://weixin.aisoutu.com/cunchu7/2021-07-10/27_16259229407049556.jpg"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password_confirmation"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script>
import { reactive, toRefs } from "vue";
import { registerUser } from "../network/register";
import { Toast, Notify } from "vant";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter();
    const registerInfo = reactive({
      username: "",
      password: "",
      password_confirmation: "",
      email: ""
    });
    const onSubmit = () => {
      if (registerInfo.password !== registerInfo.password_confirmation) {
        Toast.fail("请确保密码相同");
      } else {
        registerUser(
          registerInfo.username,
          registerInfo.email,
          registerInfo.password,
          registerInfo.password_confirmation
        ).then(res => {
          Toast.success("注册成功!");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        });
      }
    };
    const goback = () => {
      router.back();
    };
    return { ...toRefs(registerInfo), onSubmit, goback };
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
</style>