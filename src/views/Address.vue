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
      <span>地址管理</span>
    </template>
  </van-nav-bar>
  <div class="content">
    <div v-if="address.length !== 0">
      <div class="alladress">
        <div class="address-info" v-for="item in address" :key="item.id">
          <div class="person">
            <div class="name">{{ item.name }}</div>
            <div class="phone">{{ item.phone }}</div>
            <van-tag type="danger" v-if="item.is_default === 1">默认</van-tag>
          </div>
          <div class="detail">
            <div class="hometown">
              {{ item.province }}{{ item.city }}{{ item.county
              }}{{ item.address }}
            </div>
            <van-icon name="edit" @click="goEditAddress(item.id)"></van-icon>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-empty image="search" description="地址暂时未添加哦~" />
    </div>
    <van-button color="hotpink" round size="large" @click="goAddAddress"
      >新增地址</van-button
    >
  </div>
</template>
<script>
import { getAllAddress } from "../network/address";
import { ref, reactive, onMounted, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    let addressList = reactive({ address: [] });
    const init = () => {
      getAllAddress().then(res => {
        addressList.address = res.data;
      });
    };
    onMounted(() => {
      init();
    });
    const goback = () => {
      history.back();
    };
    const goAddAddress = () => {
      router.push("/addaddress");
    };
    const goEditAddress = id => {
      router.push({ path: "/editaddress", query: { id } });
    };
    return { ...toRefs(addressList), goback, goAddAddress, goEditAddress };
  }
};
</script>
<style lang="less" scoped>
.van-button {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}
.content {
  position: relative;
  top: 46px;
  width: 100%;
  height: 620px;
  .alladress {
    width: 100%;
    border-radius: 10px;
    .address-info {
      height: 80px;
      padding: 10px;
      width: 100%;
      background-color: whitesmoke;
      margin-bottom: 10px;
      border-radius: 10px;
      .person {
        display: flex;
        flex: 1;
        width: 100%;
        .name {
          font-weight: bolder;
          margin-right: 10px;
          color: black;
        }
        .phone {
          font-size: 13px;
          margin-right: 10px;
        }
      }
    }
    .detail {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      > div {
        font-size: 14px;
      }
    }
  }
}
</style>