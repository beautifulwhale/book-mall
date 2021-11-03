<template>
  <div>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="热销">
        <div class="all">
          <div class="hotsale" v-for="item in showList" :key="item.id">
            <goods-list-item :good-item="item"></goods-list-item>
          </div>
        </div>
      </van-tab>
      <van-tab title="新书">
        <div class="all">
          <div class="hotsale" v-for="item in showList" :key="item.id">
            <goods-list-item :good-item="item"></goods-list-item>
          </div>
        </div>
      </van-tab>
      <van-tab title="精选">
        <div class="all">
          <div class="hotsale" v-for="item in showList" :key="item.id">
            <goods-list-item :good-item="item"></goods-list-item>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import GoodsListItem from "./GoodsListItem.vue";
export default {
  props: {
    showList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    let onClickTab = index => {
      emit("cateClick", index.name);
    };
    let active = ref(0);

 
    return { active, onClickTab};
  },
  components: {
    GoodsListItem
  }
};
</script>
<style lang="less" scoped>
.all {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .hotsale {
    width: 50%;
    height: 150px;
  }
}
</style>