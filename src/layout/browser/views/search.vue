<template>
  <div id="search" ref="search">
    <music-list :music-list="this.music_list" :scroll="true" :category="true"></music-list>
  </div>
</template>

<script>
import {search} from '@/libs/api'
import musicList from '@/components/music_list'
export default {
  name: 'browser-search',
  data(){
    return {
      music_list: [],
    }
  },
  components:{
    musicList
  },
  created: function(){
    if(this.$store.getters.getSearchKeywords != '') {
      search({keywords: this.$store.getters.getSearchKeywords}).then((res)=>{
        let result = res.data.body.result.songs
        this.music_list = result
        console.log(this.music_list)
      })
    }
  },
  methods:{
    search
  }
}
</script>

<style lang="scss" scoped>
#search {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: overlay;
}
</style>