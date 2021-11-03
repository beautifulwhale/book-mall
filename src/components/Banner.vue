<template>
  <van-swipe
    :autoplay="3000"
    lazy-render
    class="my-swipe"
    indicator-color="white"
  >
    <van-swipe-item v-for="image in bannerList" :key="image.id">
      <img :src="image.img_url" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import { reactive, ref } from "vue";
export default {
  props: {
    bannerList: Array
  },
  setup(props) {
    const bannerList = reactive(props.bannerList);
    return { bannerList };
  }
};
</script>
<style lang="less" scoped>
</style>