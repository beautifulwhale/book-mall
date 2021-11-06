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
  <van-address-edit
    :area-list="areaList"
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
    @change-area="changeArea"
  />
</template>

<script>
import { ref, reactive, toRefs } from "vue  ";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";
import { addAddress } from "../network/address";
import { Toast } from "vant";
export default {
  setup(props) {
    const router = useRouter();
    const searchResult = ref([]);
    const province = ref("");
    const city = ref("");
    const county = ref("");
    const onSave = content => {
      addAddress(
        content.name,
        content.addressDetail,
        content.tel,
        content.province,
        content.city,
        content.county,
        Number(content.isDefault)
      ).then(res => {
        history.back();
        Toast.success("添加地址成功");
      });
    };
    const onDelete = () => Toast("delete");
    const onChangeDetail = val => {
      if (val) {
        searchResult.value = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        searchResult.value = [];
      }
    };
    const goback = () => {
      history.back();
    };
    const changeArea = val => {
      province.value = val[0].name;
      city.value = val[1].name;
      county.value = val[2].name;
      console.log(val);
    };
    return {
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
      goback,
      changeArea
    };
  }
};
</script>
<style lang="less" scoped>
.van-address-edit {
  position: relative;
  top: 46px;
}
</style>