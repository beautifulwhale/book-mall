<template>
  <van-nav-bar border>
    <template #title>
      <h3>个人中心</h3>
    </template>
  </van-nav-bar>
  <foot></foot>
  <!-- 个人主页 -->
  <div class="profile" @click="goAccount">
    <div class="avatar">
      <van-image
        round
        width="3rem"
        height="3rem"
        :src="user.avatar_url"
        lazy-load
      />
    </div>
    <div class="user">
      <div>{{ user.name }}</div>
      <div>邮箱:{{ user.email }}</div>
    </div>
  </div>
  <van-cell title="我的收藏" is-link to="collect" />
  <van-cell title="我的订单" is-link to="order" />
  <van-cell title="账号管理" is-link to="account" />
  <van-cell title="地址管理" is-link to="address" />
  <van-cell title="关于我们" is-link />
  <van-button color="hotpink" block round>退出登录</van-button>
</template>
<script>
import Foot from "../components/Foot.vue";
import { getUser } from "../network/user";
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    let userInfo = reactive({ user: {} });
    const router = useRouter();
    const init = () => {
      getUser().then(res => {
        userInfo.user = res;
      });
    };
    onMounted(() => {
      init();
    });
    const goAccount = () => {
      router.push("/account");
    };
    return { ...toRefs(userInfo), goAccount };
  },
  components: {
    Foot
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: hotpink;
}
.profile {
  width: 100%;
  height: 100px;
  padding: 20px;
  background-color: rgb(241, 241, 241);
  display: flex;
  flex: 1;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
  .user {
    div:nth-child(1) {
      color: black;
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 16px;
    }
    div:nth-child(2) {
      font-size: 13px;
    }
  }
}
.van-cell {
  margin: 5px 0;
}
.van-button {
  margin-top: 20px;
}
</style>