<template>
  <van-nav-bar
    title="标题"
    right-text="确定"
    border
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <van-cell-group inset>
    <van-field
      v-model="emailCode"
      center
      clearable
      label="邮箱验证码"
      placeholder="请输入邮箱验证码"
    >
      <template #button>
        <van-button size="small" type="primary" @click="getCode"
          >发送验证码</van-button
        >
      </template>
    </van-field>
  </van-cell-group>
  <van-field v-model="email" label="邮箱" />
</template>
<script>
import { useRoute } from "vue-router";
import { getEmailCode, changeEmail } from "../network/user";
import { ref } from "vue";
import { Toast } from "vant";
export default {
  setup() {
    const onClickLeft = () => history.back();
    const route = useRoute();
    let email = ref(route.query.email);
    let emailCode = ref("");
    const onClickRight = () => {
      changeEmail("5223", "3340969578@qq.com").then(res => console.log(res));
      Toast.success("修改成功");
      history.back();
    };
    const getCode = () => {
      getEmailCode("3340969578@qq.com").then(res => {
        Toast.success("验证码已发送");
      });
    };
    return {
      email,
      emailCode,
      onClickLeft,
      onClickRight,
      getCode
    };
  }
};
</script>
<style lang="less" scoped>
.van-field {
  background-color: whitesmoke;
}
</style>