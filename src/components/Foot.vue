<template>
  <van-tabbar
    v-model="active"
    active-color="hotpink"
    inactive-color="#000"
    @change="onChange"
    route
  >
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/cate" icon="bars">分类</van-tabbar-item>
    <van-tabbar-item to="/shopcart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let active = ref(0);
    const onChange = () => {};
    return { active, onChange };
  }
};
</script>
<style lang="less">
.van-tabbar {
  box-shadow: 2px 0px 1px #000;
}
</style>