<template>
  <div id="left-nav">
    <div id="nav-list-container" class="list-container">
      <div class="list-title"><span>发现</span></div>
      <div class="list-item">
        <router-link :to="{ name: 'browser-home' }">
          <i class="iconfont icon-store"></i><span>推荐</span>
        </router-link>
      </div>
      <div class="list-item">
        <router-link :to="{ name: 'browser-hot' }">
          <i class="iconfont icon-hot"></i><span>热门</span>
        </router-link>
      </div>
      <div class="list-item">
        <i class="iconfont icon-video"></i><span>MV</span>
      </div>
      <div class="list-item">
        <i class="iconfont icon-discount"></i><span>索引</span>
      </div>
      <div class="list-item">
        <i class="iconfont icon-Customermanagement"></i><span>动态圈</span>
      </div>
    </div>
    <div id="music-list-container" class="list-container">
      <div class="list-title"><span>我的歌单</span></div>
      <div id="music-list" class="list-container">
        <div class="list-item"><i class="iconfont"></i><span>dsadsadsa</span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
        <div class="list-item"><i class="iconfont"></i><span></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-nav',
  mounted: function () {
    console.log(this.$refs['music-name']);
  },
};
</script>

<style lang="scss" scoped>
#left-nav {
  height: 85%;
  width: 100%;
  .list-container {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    .list-title {
      display: inline-flex;
      align-items: center;
      height: 15%;
      padding-left: 5%;
      font-size: 18px;
    }
    .list-item {
      display: inline-flex;
      align-items: center;
      min-height: 14%;
      padding-left: 10%;
      font-size: 16px;
    }
  }
  #nav-list-container {
    height: 50%;
  }
  #music-list-container {
    height: 25%;
    #music-list {
      width: 100%;
      height: 100%;
    }
  }
}
#mini-player-container {
  width: 100%;
  height: 15%;
}
</style>