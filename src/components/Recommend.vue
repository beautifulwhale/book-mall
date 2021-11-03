<template>
  <div class="recommend">
    <div
      class="img"
      v-for="item in recommendList"
      :key="item.id"
      @click="goDetail(item.id)"
    >
      <img :src="item.cover_url" v-lazy="item.cover_url" />
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    recommendList: Array
  },
  setup(props) {
    const recommendList = reactive(props.recommendList);
    const router = useRouter();
    let goDetail = id => {
      router.push({ path: "/detail", query: { id: id } });
    };
    return { recommendList, goDetail };
  }
};
</script>
<style lang="less" scoped>
.recommend {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img {
    width: 25%;
    height: 9rem;
    text-align: center;
    span {
      font-size: 12px;
    }
    img {
      width: 7rem;
      height: 7rem;
    }
  }
}
</style>