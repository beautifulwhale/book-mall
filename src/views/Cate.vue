<template>
  <van-nav-bar border>
    <template #title>
      <h3>分类详情</h3>
    </template>
  </van-nav-bar>
  <foot></foot>

  <div class="categories">
    <!-- 左边导航栏 -->
    <div class="leftcate">
      <van-collapse
        v-model="activeName"
        accordion
        v-for="item in categories"
        :key="item.id"
      >
        <van-collapse-item :title="item.name" :name="item.name">
          <van-sidebar
            v-model="active"
            v-for="item1 in item.children"
            :key="item1.id"
          >
            <van-sidebar-item
              :title="item1.name"
              @click="cateClick(item1.id)"
            />
          </van-sidebar>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="rightdetails">
      <van-tabs v-model:active="activeOrder" swipeable @click-tab="onClickTab">
        <van-tab title="销量排序"></van-tab>
        <van-tab title="价格排序"></van-tab>
        <van-tab title="评论排序"></van-tab>
      </van-tabs>
      <van-card
        v-for="item in currentShow"
        :key="item.id"
        :num="item.comments_count"
        :tag="item.comments_count >= 0 ? '流行' : '标签'"
        :price="item.price"
        desc="描述信息"
        :title="item.title"
        :thumb="item.cover_url"
        origin-price="10.00"
        lazy-load
        @click="goDetail(item.id)"
      />
    </div>
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";
import { getAllGoodsList, getGoodsCate } from "../network/cate";
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  async setup(props) {
    const active = ref(0);
    const activeName = ref(1);
    const activeOrder = ref(0);
    const router = useRouter();
    let currentType = ref("sales");
    let currentId = ref(0);
    let cateGoods = reactive({
      sales: { page: 0, list: [] },
      price: { page: 0, list: [] },
      comments_count: { page: 0, list: [] }
    });
    const allGoodsList = await getAllGoodsList();
    const categories = allGoodsList.categories;

    // 异步获取数据
    const init = () => {
      getGoodsCate("sales", currentId.value).then(res => {
        cateGoods.sales.list = res.goods.data;
      });
      getGoodsCate("price", currentId.value).then(res => {
        cateGoods.price.list = res.goods.data;
      });
      getGoodsCate("comments_count", currentId.value).then(res => {
        cateGoods.comments_count.list = res.goods.data;
      });
    };

    init();
    //计算当前显示的数据
    let currentShow = computed(() => {
      return cateGoods[currentType.value].list;
    });
    const onClickTab = index => {
      let order = ["sales", "price", "comments_count"];
      currentType.value = order[index.name];
      getGoodsCate(currentType.value, currentId.value).then(res => {
        cateGoods[currentType.value].list = res.goods.data;
      });
    };
    const cateClick = cid => {
      currentId.value = cid;
      init();
    };

    const goDetail = id => {
      router.push({ path: "/detail", query: { id } });
    };

    return {
      active,
      activeName,
      activeOrder,
      allGoodsList,
      categories,
      onClickTab,
      cateClick,
      currentShow,
      goDetail
    };
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
.categories {
  width: 100%;
  height: 100vh-96px;
  display: flex;
  flex: 1;
  .leftcate {
    width: 90px;
    height: 540px;
    margin-top: 30px;
  }
  .rightdetails {
    width: 285px;
    height: 300px;
  }
}
</style>