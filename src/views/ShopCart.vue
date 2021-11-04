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
              v-model="checked"
            ></van-checkbox>
          </template>
          <template #footer>
            <van-stepper
              v-model="value"
              input-width="25px"
              button-size="20px"
            />
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
  <!-- <div v-else>
      <van-empty description="购物车中空空如也" />
      <van-button color="#7232dd" to="home">点此添加</van-button>
    </div> -->
</template>
<script>
import Foot from "../components/Foot.vue";
import { getCart } from "../network/shopcart";
import { reactive, onMounted, toRefs, ref } from "vue";
export default {
  setup(props) {
    const checked = ref(false);
    const value = ref(1);
    const shopcart = reactive({
      list: []
    });
    onMounted(() => {
      getCart("include=goods").then(res => {
        shopcart.list = res.data;
        console.log(res);
      });
    });
    console.log(shopcart.list);
    return { ...toRefs(shopcart), checked, value };
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
</style>