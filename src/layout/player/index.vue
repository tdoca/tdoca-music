<template>
  <div id="player">
    <div id="left-side">
      <div id="nav-container">
        <router-link :to="{name: 'songsheet'}" class="nav-item">歌单</router-link> | 
        <router-link :to="{name: 'playlist'}" class="nav-item">播放列表</router-link> | 
        <router-link :to="{name: 'history'}" class="nav-item">历史记录</router-link>
      </div>
      <div id="view-container">
        <router-view v-if="this.$store.getters.getSearchViewVisibility" />
      </div>
    </div>
    <div id="right-side">
      <right-cover></right-cover>
    </div>
    <div id="bottom-side">
      <bottom-player></bottom-player>
    </div>
  </div>
</template>

<script>
// import musicList from '@/components/music_list.vue'
import bottomPlayer from './bottom_player.vue'
import rightCover from './right_cover.vue'
export default {
  name: 'player',
  components: {
    // musicList,
    bottomPlayer,
    rightCover
  },
}
</script>

<style lang="scss" scoped>
#player{
  width: 100%;
  height: 90%;
  overflow: hidden;
  #left-side{
    width: 840px;
    height: 90%;
    margin: 0 30px;
    float: left;
    #nav-container {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      // color: #e1e1e1cc;
      color: #fff;
      .nav-item {
        font-size: 18px;
        transition: font-size 1s;
        // color: #e1e1e1cc;
        color: #fff;
      }:hover {
        font-size: 30px;
        // color: #fff;
      }
    }
    #view-container {
      width: 100%;
      height: 90%;
    }
  }
  #right-side{
    width: 380px;
    height: 90%;
    // background: green;
    float: left;
  }
  #bottom-side{
    width: 100%;
    height: 10%;
    // background: yellow;
    float: left;
  }
}
</style>