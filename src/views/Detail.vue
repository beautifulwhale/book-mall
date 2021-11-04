<template>
  <div>
    <van-nav-bar title="商品详情">
      <template #left>
        <van-icon name="arrow-left" size="20" color="black" @click="goback" />
      </template>
    </van-nav-bar>
    <div class="book-detail">
      <img :src="detail.cover_url" />
      <div class="bookInfo">
        <div class="name">{{ detail.title }}</div>
        <div class="desc">{{ detail.description }}</div>
        <div class="sale">
          <span>价格:${{ detail.price }}</span>
          <span>销量:{{ detail.sales }}</span>
          <span>收藏:{{ detail.collects_count }}</span>
        </div>
      </div>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="概述">
        <div class="description" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div
          class="hotcomment"
          v-for="item in comments"
          :key="item.id"
          v-if="comments.length !== 0"
        >
          <comment-item :comment-item="item"></comment-item>
        </div>
        <div v-else>
          <van-empty description="暂时没有人评论哦" />
        </div>
      </van-tab>
      <van-tab title="推荐">
        <div class="all">
          <div class="recommend" v-for="item in likeBooks" :key="item.id">
            <goods-list-item :goodItem="item"></goods-list-item>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="lookShopCart" />
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="joinShopCart"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { getGoodsDetail } from "../network/detail";
import { addShopCart } from "../network/shopcart";
import CommentItem from "../components/CommentItem.vue";
import GoodsListItem from "../components/GoodsListItem.vue";
import { ref, reactive, onMounted, toRefs } from "vue";
import { Toast } from "vant";
import { useStore } from "vuex";
export default {
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = ref(0);
    let active = ref(0);
    let number = ref("1");
    id = route.query.id;
    let book = reactive({
      detail: {},
      likeBooks: [],
      comments: []
    });
    onMounted(() => {
      getGoodsDetail(id).then(res => {
        book.detail = res.goods;
        book.comments = res.goods.comments;
        book.likeBooks = res.like_goods;
        console.log(res);
      });
    });
    const goback = () => {
      router.back();
    };
    const joinShopCart = () => {
      addShopCart(id).then(res => {
        Toast.success("添加成功");
        store.dispatch("updateCart");
      });
    };
    const lookShopCart = () => {
     
    };
    return { goback, ...toRefs(book), active, joinShopCart, lookShopCart };
  },
  components: {
    CommentItem,
    GoodsListItem
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: hotpink;
}
.book-detail {
  width: 100%;
  height: 220px;
  display: flex;
  flex: 1;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
  .bookInfo {
    width: 100%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      font-size: 18px;
      color: black;
    }
    .desc {
      font-size: 12px;
      color: #333;
    }
    .sale {
      width: 100%;
      display: flex;
      justify-content: space-around;
      span {
        font-size: 13px;
      }
      span:nth-child(1) {
        color: red;
      }
    }
  }
}
.description {
  padding: 15px;
  img {
    width: 100px !important;
    height: 100px !important;
  }
}
.all {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .recommend {
    width: 50%;
    height: 150px;
  }
}
</style>