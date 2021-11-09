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
      <span>我的订单</span>
    </template>
  </van-nav-bar>
  <div class="content">
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="全部">
        <div
          class="order"
          v-for="(item, index) in orderList"
          :key="item.id"
          v-if="orderList.length !== 0"
          @click="goDetail(item.id)"
        >
          <div class="goodsinfo">
            <div class="number">订单编号:{{ item.order_no }}</div>
            <div class="time">创建时间:{{ item.created_at }}</div>
          </div>
          <div
            class="goods"
            v-for="item1 in item.orderDetails.data"
            :key="item1.id"
          >
            <van-card
              :num="item1.num"
              :price="item1.goods.price"
              :desc="item1.goods.description"
              :title="item1.goods.title"
              :thumb="item1.goods.cover_url"
            />
          </div>
        </div>
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂时没有商品哦~~~"
          />
        </div>
      </van-tab>
      <van-tab title="已下单">
        <div
          class="order"
          v-for="(item, index) in orderList"
          :key="item.id"
          v-if="orderList.length !== 0"
          @click="goDetail(item.id)"
        >
          <div class="goodsinfo">
            <div class="number">订单编号:{{ item.order_no }}</div>
            <div class="time">创建时间:{{ item.created_at }}</div>
          </div>
          <div
            class="goods"
            v-for="item1 in item.orderDetails.data"
            :key="item1.id"
          >
            <van-card
              :num="item1.num"
              :price="item1.goods.price"
              :desc="item1.goods.description"
              :title="item1.goods.title"
              :thumb="item1.goods.cover_url"
            />
          </div>
        </div>
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂时没有商品哦~~~"
          /></div
      ></van-tab>
      <van-tab title="支付">
        <div
          class="order"
          v-for="(item, index) in orderList"
          :key="item.id"
          v-if="orderList.length !== 0"
          @click="goDetail(item.id)"
        >
          <div class="goodsinfo">
            <div class="number">订单编号:{{ item.order_no }}</div>
            <div class="time">创建时间:{{ item.created_at }}</div>
          </div>
          <div
            class="goods"
            v-for="item1 in item.orderDetails.data"
            :key="item1.id"
          >
            <van-card
              :num="item1.num"
              :price="item1.goods.price"
              :desc="item1.goods.description"
              :title="item1.goods.title"
              :thumb="item1.goods.cover_url"
            />
          </div>
        </div>
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂时没有商品哦~~~"
          /></div
      ></van-tab>
      <van-tab title="已发货">
        <div
          class="order"
          v-for="(item, index) in orderList"
          :key="item.id"
          v-if="orderList.length !== 0"
          @click="goDetail(item.id)"
        >
          <div class="goodsinfo">
            <div class="number">订单编号:{{ item.order_no }}</div>
            <div class="time">创建时间:{{ item.created_at }}</div>
          </div>
          <div
            class="goods"
            v-for="item1 in item.orderDetails.data"
            :key="item1.id"
          >
            <van-card
              :num="item1.num"
              :price="item1.goods.price"
              :desc="item1.goods.description"
              :title="item1.goods.title"
              :thumb="item1.goods.cover_url"
            />
          </div>
        </div>
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂时没有商品哦~~~"
          /></div
      ></van-tab>
      <van-tab title="已收货">
        <div
          class="order"
          v-for="(item, index) in orderList"
          :key="item.id"
          v-if="orderList.length !== 0"
          @click="goDetail(item.id)"
        >
          <div class="goodsinfo">
            <div class="number">订单编号:{{ item.order_no }}</div>
            <div class="time">创建时间:{{ item.created_at }}</div>
          </div>
          <div
            class="goods"
            v-for="item1 in item.orderDetails.data"
            :key="item1.id"
          >
            <van-card
              :num="item1.num"
              :price="item1.goods.price"
              :desc="item1.goods.description"
              :title="item1.goods.title"
              :thumb="item1.goods.cover_url"
            />
          </div>
        </div>
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂时没有商品哦~~~"
          /></div
      ></van-tab>
      <van-tab title="过期">
        <div
          class="order"
          v-for="(item, index) in orderList"
          :key="item.id"
          v-if="orderList.length !== 0"
          @click="goDetail(item.id)"
        >
          <div class="goodsinfo">
            <div class="number">订单编号:{{ item.order_no }}</div>
            <div class="time">创建时间:{{ item.created_at }}</div>
          </div>
          <div
            class="goods"
            v-for="item1 in item.orderDetails.data"
            :key="item1.id"
          >
            <van-card
              :num="item1.num"
              :price="item1.goods.price"
              :desc="item1.goods.description"
              :title="item1.goods.title"
              :thumb="item1.goods.cover_url"
            />
          </div>
        </div>
        <div v-else>
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂时没有商品哦~~~"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed, toRefs } from "vue";
import { orderList } from "../network/order";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter();
    const active = ref(0);
    const orderInfo = reactive({
      orderList: [],
      page: 1,
      status: 1
    });
    const init = async () => {
      const res = await orderList(orderInfo.page, orderInfo.status);
      orderInfo.orderList = res.data;
    };
    onMounted(() => {
      Toast.loading("加载中");
      init();
    });
    const goback = () => {
      history.back();
    };
    const onClickTab = index => {
      orderInfo.status = index.name;
      init();
    };
    const goDetail = id => {
      router.push({ path: "/orderdetail", query: { id } });
    };
    return { active, onClickTab, goback, ...toRefs(orderInfo), goDetail };
  }
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  top: 46px;
  .order {
    width: 100%;
    .goodsinfo {
      width: 100%;
      height: 60px;
      background-color: pink;
      padding: 10px;
      font-size: 14px;
      color: black;
      border-radius: 20px;
      .number {
        margin-bottom: 10px;
      }
    }
  }
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>