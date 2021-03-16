<template>
  <div id="user-data">
    <router-link class="user-data-item" to="/my/news">
      <span class="user-data-item-value">0</span>
      <span class="user-data-item-key">动态</span>
    </router-link>
    <router-link class="user-data-item" to="">
      <span class="user-data-item-value">0</span>
      <span class="user-data-item-key">收藏</span>
    </router-link>
    <router-link class="user-data-item" to="">
      <span class="user-data-item-value">0</span>
      <span class="user-data-item-key">关注</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'user-data',
};
</script>
<style lang="scss" scoped>
#user-data {
  display: flex;
  width: 100%;
  height: 100%;
  .user-data-item {
    display: inline-block;
    width: 33.3%;
    height: 85%;
    padding-top: 5%;
    .user-data-item-value {
      display: inline-block;
      width: 100%;
      font-size: 20px;
      text-align: center;
    }
    .user-data-item-key {
      display: inline-block;
      width: 100%;
      padding-top: 10%;
      text-align: center;
    }
  }
  .user-data-item:hover {
    color: red;
  }
}
</style>