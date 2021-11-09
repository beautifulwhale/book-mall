<template>
  <van-nav-bar border>
    <template #title>
      <h3>个人中心</h3>
    </template>
  </van-nav-bar>
  <foot></foot>
  <!-- 个人主页 -->
  <div class="profile">
    <div class="avatar">
      <van-image
        round
        width="3rem"
        height="3rem"
        :src="user.avatar_url"
        lazy-load
        @click="goAccount"
      />
    </div>
    <div class="user" v-if="Object.keys(user).length !== 0">
      <div>{{ user.name }}</div>
      <div>邮箱:{{ user.email }}</div>
    </div>
    <div class="goLogin" v-else @click="goLogin">
      登录/注册
    </div>
  </div>
  <van-cell title="我的收藏" is-link to="collect" />
  <van-cell title="我的订单" is-link to="myorder" />
  <van-cell title="账号管理" is-link to="account" />
  <van-cell title="地址管理" is-link to="address" />
  <van-cell title="关于我们" is-link @click="aboutus" />
  <van-button
    color="hotpink"
    block
    round
    @click="logout"
    v-if="Object.keys(user).length !== 0"
    >退出登录</van-button
  >
</template>
<script>
import Foot from "../components/Foot.vue";
import { getUser } from "../network/user";
import { logOut } from "../network/login";
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { Dialog } from "vant";
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
    const aboutus = () => {
      Toast.fail("暂时未开放此功能");
    };
    const logout = () => {
      Dialog.confirm({
        title: "退出",
        message: "是否退出登录?"
      })
        .then(async () => {
          const res = await logOut();
          init();
          router.go(0);
          Toast.success("退出登录成功");
        })
        .catch(() => {
          Toast.success("不退出是明智的选择");
        });
    };
    const goLogin = () => {
      router.push("/login");
    };
    return { ...toRefs(userInfo), goAccount, aboutus, logout, goLogin };
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
  .goLogin {
    font-size: 15px;
    font-weight: bolder;
    color: black;
    line-height: 40px;
  }
}
.van-cell {
  margin: 5px 0;
}
.van-button {
  margin-top: 20px;
}
</style>