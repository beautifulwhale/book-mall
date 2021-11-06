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
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :address-info="{
        name: info.name,
        tel: info.phone,
        province: info.province,
        city: info.city,
        county: info.county,
        areaCode: info.areaCode,
        addressDetail: info.address,
        isDefault: info.is_default == 1 ? true : false
      }"
    />
  </div>
</template>
<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  getAddressDetail,
  updateAddress,
  deleteAddress
} from "../network/address";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
export default {
  setup(props) {
    const route = useRoute();
    const addressId = route.query.id;
    const addressInfo = reactive({ info: {} });
    const searchResult = ref([]);
    const init = () => {
      getAddressDetail(addressId).then(res => {
        addressInfo.info = res;
        let areaCode = "";
        Object.entries(areaList.county_list).forEach((id, text) => {
          if (text == addressInfo.info.county) {
            areaCode = id;
          }
        });
        addressInfo.info.areaCode = areaCode;
      });
    };
    onMounted(() => {
      init();
    });
    const onSave = content => {
      updateAddress(
        addressId,
        content.name,
        content.addressDetail,
        content.tel,
        content.province,
        content.city,
        content.county,
        Number(content.isDefault)
      ).then(res => {
        console.log(res);
        Toast.success("修改成功");
        history.back();
      });
    };
    const onDelete = () => {
      deleteAddress(addressId).then(res => {
        Toast.success("删除成功");
        history.back();
      });
    };
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
    return {
      goback,
      onSave,
      onDelete,
      areaList,
      onChangeDetail,
      ...toRefs(addressInfo)
    };
  }
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  top: 46px;
  width: 100%;
}
</style>