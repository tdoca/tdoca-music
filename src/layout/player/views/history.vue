<template>
  <div id="history">
    <music-list :music-list='this.$store.getters.getHistoryList' :scroll='true' :category='true' listView='history'></music-list>
  </div>
</template>

<script>
import musicList from '@/components/music_list'
export default {
  name: 'history',
  components: {
    musicList
  }
}
</script>

<style lang="scss" scoped>
#history{
  width: 100%;
  height: 100%;
}
</style>