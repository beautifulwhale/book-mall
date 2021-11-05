<template>
  <van-nav-bar border fixed style="backgroundColor:hotpink">
    <template #left>
      <van-icon
        name="arrow-left"
        color="black"
        size="1.2rem"
        @click="goback"
      ></van-icon>
    </template>
    <template #title>
      <span>账号管理</span>
    </template>
  </van-nav-bar>
  <div class="content">
    <van-cell is-link @click="changeAvatarClick">
      <template #title>
        <span class="custom-title">头像</span>
      </template>
      <template #value>
        <van-image
          :src="user.avatar_url"
          round
          width="2rem"
          height="2rem"
          lazy-load
        />
      </template>
    </van-cell>
    <van-cell
      title="用户名"
      is-link
      :value="user.name"
      @click="changeName(user.name)"
    />
    <van-cell
      title="邮箱"
      is-link
      :value="user.email"
      @click="changeEmail(user.email)"
    />
  </div>
</template>
<script>
import { getUser, changeAvatar } from "../network/user";
import { reactive, onMounted, toRefs, ref } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    let userInfo = reactive({ user: {} });
    const router = useRouter();
    const show = ref(false);
    const init = () => {
      getUser().then(res => {
        userInfo.user = res;
      });
    };
    const changeAvatarClick = () => {
      Toast.fail("没钱买阿里云");
    };
    onMounted(() => {
      init();
    });
    const goback = () => {
      router.back();
    };
    const changeName = name => {
      router.push({ path: "/changename", query: { name } });
    };
    const changeEmail = email => {
      router.push({ path: "/changeemail", query: { email } });
    };
    return {
      ...toRefs(userInfo),
      show,
      changeAvatarClick,
      goback,
      changeName,
      changeEmail
    };
  }
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  top: 46px;
}
</style>