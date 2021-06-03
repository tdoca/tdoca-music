<template>
  <div id="right-cover">
    <div id="cover-container">
      <img :src="this.$store.getters.getPlayItem.cover" alt="music cover">
    </div>
    <div id="lyric-container">
      <lyric-list :lyricList="this.$store.getters.getPlayItem.lyric"></lyric-list>
      <!-- <span>何処に行けばいい 貴方と離れて</span>
      <span>今は過ぎ去った 時流(とき)に問い掛けて</span>
      <span>長すぎた夜に 旅立ちを夢見た</span>
      <span>異国の空見つめて 孤独を抱きしめた</span>
      <span>流れる涙を 時代(とき)の風に重ねて</span>
      <span>終わらない貴女の 吐息を感じて</span>
      <span>Dry your tears with love</span>
      <span>Dry your tears with love</span> -->
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