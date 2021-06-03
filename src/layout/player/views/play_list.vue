<template>
  <div id="play-list">
    <music-list :music-list="this.$store.getters.getPlayList" :listView="'playList'" :scroll="true" :category="true"></music-list>
  </div>
</template>

<script>
import musicList from '@/components/music_list.vue'
export default {
  name: 'play-list',
  components: {
    musicList
  }
}
</script>

<style lang="scss" scoped>
#play-list {
  width: 100%;
  height: 100%;
}
</style>