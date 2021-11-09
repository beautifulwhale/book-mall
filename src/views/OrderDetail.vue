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
      <span>订单预览</span>
    </template>
  </van-nav-bar>
  <div class="content">
    <div class="order-message">
      <div class="status">
        <span>订单状态:</span>
        <span>{{ status }}</span>
      </div>
      <div class="status">
        <span>订单编号:</span>
        <span>{{ orderInfo.order_no }}</span>
      </div>
      <div class="status">
        <span>下单时间:</span>
        <span>{{ orderInfo.created_at }}</span>
      </div>
    </div>
    <div class="button">
      <van-button
        color="hotpink"
        block
        round
        v-if="orderInfo.status === 1"
        @click="goToPay"
        >去支付</van-button
      >
      <van-button color="#bfa" block round v-if="orderInfo.status === 3"
        >确认订单</van-button
      >
    </div>
    <div class="money">
      <div class="price">
        <span>商品金额:</span>
        <span style="color:red">${{ totalPrice }}</span>
      </div>
      <div class="price">
        <span>配送方式:</span>
        <span>普通配送</span>
      </div>
    </div>
    <div class="goods" v-for="item in orderGoods" :key="item.id">
      <van-card
        :num="item.num"
        :price="item.goods.price"
        :desc="item.goods.description"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
      />
    </div>
  </div>
  <van-action-sheet v-model:show="isShowPay" title="支付">
    <van-grid :border="false" :column-num="2">
      <van-grid-item>
        支付宝支付:
        <van-image :src="payUrl" lazy-load />
      </van-grid-item>
      <van-grid-item>
        微信支付:
        <van-image :src="payUrl" lazy-load />
      </van-grid-item>
    </van-grid>
  </van-action-sheet>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { orderDetail, getPay, getPayStatus } from "../network/order";
import { ref, reactive, onMounted, computed, toRefs } from "vue";
import { Toast } from "vant";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const orderId = route.query.id;
    const order = reactive({
      orderInfo: {},
      orderGoods: [],
      status: 0,
      isShowPay: false,
      payUrl: ""
    });
    const totalPrice = computed(() => {
      let sum = 0;
      order.orderGoods.forEach(item => {
        sum += item.goods.price * item.num;
      });
      return sum;
    });
    const init = async () => {
      const res = await orderDetail(orderId);
      order.orderInfo = res;
      order.orderGoods = res.orderDetails.data;
      let statusArr = [
        "",
        "已下单",
        "支付完成",
        "已发货",
        "已确认收货",
        "已过期"
      ];
      order.status = statusArr[res.status];
      console.log(res);
    };
    const goback = () => {
      history.back();
    };
    onMounted(() => {
      Toast.loading("加载中");
      init();
    });
    const goToPay = async () => {
      order.isShowPay = true;
      const payResult = await getPay(order.orderInfo.id, "aliyun");
      order.payUrl = "https://api.shop.eduwork.cn" + payResult.qr_code_url;
      let timer = setInterval(async () => {
        const result = await getPayStatus(orderId);
        console.log(result);
        if (result == '2') {
          clearInterval(timer);
          init();
        }
      }, 2000);
    };
    return { ...toRefs(order), goback, totalPrice, goToPay };
  }
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  top: 46px;
  .order-message {
    width: 100%;
    height: 100px;
    padding: 15px;
    .status {
      margin-bottom: 10px;
      > span:nth-child(1) {
        color: gray;
        margin-right: 3px;
        font-size: 14px;
      }
      > span:nth-child(2) {
        font-size: 14px;
        color: black;
      }
    }
  }
  .button {
    .van-button {
      margin-bottom: 20px;
    }
  }
  .money {
    width: 100%;
    padding: 15px;
    height: 82px;
    .price {
      margin-bottom: 10px;
      font-size: 14px;
      color: black;
      > span:nth-child(1) {
        color: gray;
        margin-right: 3px;
      }
    }
  }
}
</style>