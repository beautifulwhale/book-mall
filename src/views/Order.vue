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

  <div class="content" v-if="carts.length !== 0">
    <!-- 地址 -->
    <div class="address" v-for="item in address" :key="item.id">
      <div class="city">
        {{ item.province }}{{ item.city }}{{ item.county }}
      </div>
      <div class="detailaddress">
        <span>{{ item.address }}</span>
        <span><van-icon name="arrow"></van-icon></span>
      </div>
      <div class="userinfo">
        <span>{{ item.name }}</span>
        <span>{{ item.phone }}</span>
      </div>
    </div>
    <!-- 商品 -->
    <div class="allgoods">
      <div class="carts" v-for="item in carts" :key="item.id">
        <van-card
          :num="item.num"
          :price="item.goods.price"
          :title="item.goods.title"
          :thumb="item.goods.cover_url"
        />
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="生成订单"
      @submit="onSubmit"
    />
    <van-action-sheet v-model:show="showPay" title="支付" @close="close">
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
  </div>
  <div v-else style="margin-top:70px">
    <van-skeleton title :row="5" />
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import {
  previewOrder,
  commitOrder,
  getPay,
  getPayStatus
} from "../network/order";
import { reactive, ref, toRefs, onMounted, computed } from "vue";
import { Toast } from "vant";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    let orderInfo = reactive({
      address: [],
      carts: [],
      showPay: false,
      payUrl: "",
      orderId: 0
    });
    const init = () => {
      previewOrder().then(res => {
        orderInfo.address = res.address.filter(n => n.is_default == 1);
        orderInfo.carts = res.carts;
      });
    };
    const totalPrice = computed(() => {
      let sum = 0;
      orderInfo.carts.forEach(item => {
        sum += item.num * item.goods.price;
      });
      return sum;
    });
    onMounted(() => {
      init();
    });
    const goback = () => {
      history.back();
    };
    const onSubmit = () => {
      let address_id = orderInfo.address.map(item => item.id);
      commitOrder(address_id.join()).then(async res => {
        orderInfo.showPay = true;
        orderInfo.orderId = res.id;
        const payResult = await getPay(res.id, "aliyun");
        orderInfo.payUrl =
          "https://api.shop.eduwork.cn" + payResult.qr_code_url;
        store.dispatch("updateCart");
        //轮询，支付后退出转到订单界面
        let timer = setInterval(async () => {
          const status = await getPayStatus(orderInfo.orderId);
          if (status == 2) {
            clearInterval(timer);
            router.push({ path: "/orderdetail", query: { id: res.id } });
          }
        }, 2000);
      });
    };
    const close = () => {
      router.push({ path: "/orderdetail", query: { id: orderInfo.orderId } });
    };
    return { ...toRefs(orderInfo), goback, onSubmit, totalPrice, close };
  }
};
</script>

<style lang="less" scoped>
.content {
  position: relative;
  top: 46px;
  left: 0;
  right: 0;
  .address {
    width: 100%;
    height: 90px;
    padding: 15px;
    border-bottom: 2px dashed black;
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    .city {
      font-size: 13px;
      margin-bottom: 5px;
      color: black;
    }
    .detailaddress {
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 5px;
      color: black;
      display: flex;
      justify-content: space-between;
      > span:nth-child(2) {
        color: black;
        font-weight: bolder;
        font-size: 20px;
      }
    }
    .userinfo {
      font-size: 13px;
      color: black;
      > span:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .allgoods {
    position: relative;
    top: 90px;
    width: 100%;
  }
}
</style>