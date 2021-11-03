<template>
  <div class="goods-item" @click="goDetail">
    <img :src="goodItem.cover_url" v-lazy="goodItem.cover_url" />
    <div class="title">{{ goodItem.title }}</div>
    <div class="price">${{ goodItem.price }}</div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    const router = useRouter();
    const goDetail = () => {
      router.push({ path: "/detail", query: { id: props.goodItem.id } });
    };
    return { goDetail };
  }
};
</script>
<style lang="less" scoped>
.goods-item {
  width: 100%;
  height: 150px;
  padding: 5px;
  img {
    width: 80px;
    height: 100px;
    margin-left: 50px;
  }
  .title {
    width: 150px;
    font-size: 12px;
    color: black;
    text-align: center;
  }
  .price {
    margin-top: 12px;
    width: 150px;
    font-size: 12px;
    color: red;
    text-align: center;
  }
}
</style>