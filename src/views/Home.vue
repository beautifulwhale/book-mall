<template>
  <div class="home">
    <!-- NavBar -->
    <van-nav-bar border fixed>
      <template #title>
        <h3>小A图书</h3>
      </template>
    </van-nav-bar>
    <!-- 底部导航 -->
    <foot class="foot"></foot>
    <!-- <div class="wraper"> -->
    <div class="content">
      <!-- 轮播图 -->
      <banner :bannerList="bannerList" class="banner"></banner>
      <!-- 推荐图书 -->
      <recommend :recommendList="recommendList" class="recommends"></recommend>
      <!-- 图书分类 -->
      <categroies @cateClick="cateClick" :showList="showList"></categroies>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";
import Banner from "../components/Banner.vue";
import Recommend from "../components/Recommend.vue";
import Categroies from "../components/Categroies.vue";
import { getHomeData, getHomeCateData } from "../network/home";
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";
// import BScroll from "better-scroll";
export default {
  async setup(props) {
    const bookInfo = await getHomeData();
    const bannerList = bookInfo.slides;
    const recommendList = bookInfo.goods.data.splice(0, 4);
    let goods = reactive({
      sales: { page: 0, list: [] },
      recommend: { page: 0, list: [] },
      new: { page: 0, list: [] }
    });
    getHomeCateData("sales", 1).then(res => {
      goods.sales.list = res.goods.data;
    });
    getHomeCateData("recommend", 1).then(res => {
      goods.recommend.list = res.goods.data;
    });
    getHomeCateData("new", 1).then(res => {
      goods.new.list = res.goods.data;
    });

    let showType = ref("sales");
    let showList = computed({
      get: () => {
        return goods[showType.value].list;
      }
    });
    let cateClick = async name => {
      let types = ["sales", "new", "recommend"];
      showType.value = types[name];
    };

    let bscroll = reactive({});
    // onMounted(() => {
      // let bscroll = new BScroll(document.querySelector(".wraper"), {
      //   click: true,
      //   pullUpLoad: true, //上拉加载更多
      //   probeType: 3
      // });
      // bscroll.on("scorll", position => {
      //   console.log(position.y);
      // });
      // bscroll.on("pullingUp", () => {
      //   console.log("上拉加载更多");
      // });
    // });
    //监听任何变量
    // watchEffect(() => {
    //   nextTick(() => {
    //     bscroll && bscroll.refresh();
    //   });
    // });

    return {
      bannerList,
      recommendList,
      cateClick,
      goods,
      showList
    };
  },
  components: {
    Foot,
    Banner,
    Recommend,
    Categroies
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  padding-bottom: 50px;
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .van-nav-bar {
    width: 100%;
    background-color: hotpink;
  }
  .content {
    position: absolute;
    top: 0px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: scroll;
    .banner {
      width: 100%;
      height: 10rem;
      top: 46px;
      position: relative;
      margin-bottom: 46px;
    }
    .recommends {
      width: 100%;
      height: 170px;
      border-bottom: 5px solid whitesmoke;
    }
  }
}
</style>