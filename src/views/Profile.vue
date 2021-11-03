<template>
  <div>
    <van-nav-bar border>
      <template #title>
        <h3>个人中心</h3>
      </template>
    </van-nav-bar>
    <foot></foot>
    <van-image
      round
      width="3rem"
      height="3rem"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";
export default {
  components: {
    Foot
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: hotpink;
}
</style>