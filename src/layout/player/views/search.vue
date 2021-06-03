<template>
  <div id="search" ref="search">
    <music-list :music-list="this.music_list" :listView="'musicList'" :scroll="true" :category="true"></music-list>
  </div>
</template>

<script>
import {search} from '@/libs/api'
import Music from '@/libs/music'
import musicList from '@/components/music_list'
export default {
  name: 'player-search',
  data(){
    return {
      music_list: [],
    }
  },
  components:{
    musicList
  },
  created: function(){
    console.log(this.$store.getters.getSearchKeywords)
    if(this.$store.getters.getSearchKeywords != '') {
      search({keywords: this.$store.getters.getSearchKeywords}).then((res)=>{
        let result = res.data.body.result.songs
        for(let i=0, length=result.length; i<length; i++) {
          this.music_list.push(new Music({
            id: result[i].id,
            name: result[i].name,
            duration: result[i].duration,
            album: result[i].album,
            artists: result[i].artists
          }))
        }
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
}
</style>