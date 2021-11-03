<template>
  <div class="comment" >
    <div class="user">
      <img :src="user.avatar_url" alt="" />
      <div class="info">
        <div class="name">{{ user.name }}</div>
        <div class="time">{{ created_at }}</div>
      </div>
    </div>
    <div class="content">
      {{ content }}
    </div>
  </div>

</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    commentItem: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const comment = reactive(props.commentItem);
    return { ...toRefs(comment), comment };
  }
};
</script>
<style lang="less" scope>
.comment {
  width: 100%;
  height: auto;
  padding: 15px;
  .user {
    width: 100%;
    height: 40px;
    display: flex;
    flex: 1;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .info {
      .name {
        font-size: 13px;
        color: red;
        margin-bottom: 4px;
      }
      .time {
        color: gray;
        font-size: 12px;
      }
    }
  }
  .content {
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>