<template>
  <van-nav-bar border>
    <template #title>
      <h3>购物车</h3>
    </template>
  </van-nav-bar>
  <foot></foot>
  <div class="shopcart" v-if="list.length !== 0">
    <div class="goodInfo" v-for="item in list" :key="item.id">
      <van-swipe-cell>
        <van-card
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          class="goods-card"
          :thumb="item.goods.cover_url"
          :num="item.num"
        >
          <template #origin-price>
            <van-checkbox
              checked-color="#ee0a24"
              v-model="item.is_checked"
              @change="changeChecked"
            ></van-checkbox>
          </template>
          <template #footer>
            <van-stepper
              v-model="item.num"
              input-width="20px"
              :min="1"
              :max="item.goods.stock"
              theme="round"
              button-size="20"
              :name="item.id"
              disable-input
              @change="onChange"
            />
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="deleteCart(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
    </van-submit-bar>
  </div>
  <div v-else>
    <van-empty description="购物车中空空如也" />
    <van-button color="hotpink" to="home" block round>点此添加</van-button>
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";
import {
  getCart,
  changeNum,
  changeCheck,
  deleteGoods
} from "../network/shopcart";
import { reactive, onMounted, toRefs, ref, computed } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const shopcart = reactive({
      list: [],
      cartIdArray: []
    });
    const allChecked = ref(false);
    const totalPrice = computed(() => {
      let sum = 0;
      console.log(shopcart.list)
      const a = shopcart.list
        .filter(item => {
          console.log(shopcart.cartIdArray);
          let b = shopcart.cartIdArray.includes(item.id);
          console.log(b)
        })
        console.log(a);
        // .forEach(element => {
        //   console.log(element)
        //   sum += parseInt(element.num) * parseFloat(element.goods.price);
        //   console.log(sum);
        // });
      return sum;
    });
    const init = () => {
      getCart("include=goods").then(res => {
        shopcart.list = res.data;
        shopcart.cartIdArray = res.data
          .filter(n => n.is_checked == 1)
          .map(item => item.id);
      });
    };
    onMounted(() => {
      init();
    });
    const onChange = (value, detail) => {
      changeNum(detail.name, value).then(res => {
        Toast.success("修改成功");
      });
    };
    const changeChecked = isCheck => {
      changeCheck({ cart_ids: shopcart.cartIdArray }).then(res => {});
    };
    const onSubmit = () => {
      if (shopcart.cartIdArray.length == 0) {
        Toast.fail("请选择购买的商品");
        return;
      } else {
        router.push("/order");
      }
    };
    const deleteCart = id => {
      deleteGoods(id).then(res => {
        Toast.success("删除成功");
        store.dispatch("updateCart");
        init();
      });
    };
    return {
      ...toRefs(shopcart),
      onChange,
      totalPrice,
      allChecked,
      onSubmit,
      changeChecked,
      deleteCart
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
.goods-card {
  margin: 0;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
}

.delete-button {
  height: 100%;
}
.van-submit-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
}
.shopcart{
  width: 100%;
  height: 550px;
  overflow: scroll;
}
</style>