<template>
  <div id="right-cover">
    <div id="cover-container">
      <img :src="this.$store.getters.getPlayItem.cover" alt="music cover">
    </div>
    <div id="lyric-container">
      <lyric-list :lyric="this.$store.getters.getPlayItem.lyric"></lyric-list>
    </div>
  </div>
</template>

<script>
import lyricList from '@/components/lyric_list'
export default {
  name: 'right-cover',
  mounted: function() {
    console.log(this.$store.getters.getPlayItem)
  },
  components: {
    lyricList
  }
}
</script>

<style lang="scss" scoped>
#right-cover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  #cover-container {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
    }
  }
  #lyric-container {
    width: 100%;
    height: calc(100% - 300px);
    overflow: hidden;
  }
}
</style>