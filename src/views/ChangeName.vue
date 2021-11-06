<template>
  <van-nav-bar
    title="修改昵称"
    right-text="确定"
    border
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <van-field v-model="name" label="昵称" />
</template>
<script>
import { useRoute } from "vue-router";
import { changeName } from "../network/user";
import { ref } from "vue";
import { Toast } from "vant";
export default {
  setup() {
    const onClickLeft = () => history.back();
    const route = useRoute();
    let name = ref(route.query.name);
    const onClickRight = () => {
      changeName(name.value).then(res => console.log(res));
      Toast.success("修改成功");
      history.back();
    };
    return {
      name,
      onClickLeft,
      onClickRight
    };
  }
};
</script>
<style lang="less" scoped>
.van-field {
  background-color: whitesmoke;
}
</style>