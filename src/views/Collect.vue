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
      <span>我的收藏</span>
    </template>
  </van-nav-bar>
  <div class="content">
    <div
      v-for="(item, index) in list"
      :key="item.id"
      @click="goDetail(item.goods.id)"
    >
      <van-swipe-cell>
        <van-card
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          :thumb="item.goods.cover_url"
          lazy-load
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script>
import { myCollect } from "../network/detail";
import { ref, reactive, onMounted, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter();
    const collectInfo = reactive({
      list: []
    });
    const init = async () => {
      const res = await myCollect();
      collectInfo.list = res.data;
      console.log(res);
    };
    onMounted(() => {
      Toast.loading("加载中...");
      init();
    });
    const goback = () => {
      history.back();
    };
    const goDetail = id => {
      router.push({ path: "/detail", query: { id } });
    };
    return { goback, ...toRefs(collectInfo), goDetail };
  }
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  top: 46px;
}
.delete-button {
  height: 100%;
}
</style>