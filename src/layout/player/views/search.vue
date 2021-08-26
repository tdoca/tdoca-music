<template>
  <div id="search">
    <div id="result-container">
      <music-list :music-list="this.music_list" :listView="'musicList'" :scroll="true" :category="true"></music-list>
    </div>
    <div id="pages-container">
        <div v-if="getSearchPage() != 1" @click="handlePageButtonClick(0)">1</div>
        <div v-if="getSearchPage() != 1" @click="handlePageButtonClick((getSearchPage()-1)*30)">上一页</div>
        <div @click="handlePageButtonClick(getSearchPage()*30)">{{getSearchPage()}}</div>
        <!-- <div v-if="search_page < end-4">...</div> -->
        <div v-if="getSearchPage() != max_page" @click="handlePageButtonClick((getSearchPage()+1)*30)">下一页</div>
        <div v-if="getSearchPage() != max_page" @click="handlePageButtonClick(max_page*30)">{{this.max_page}}</div>
      </div>
  </div>
</template>

<script>
import {search} from '@/libs/api'
import Music from '@/libs/music'
import musicList from '@/components/music_list'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'player-search',
  data(){
    return {
      music_list: [],
      song_count: null,
      max_page: 0
    }
  },
  components:{
    musicList
  },
  created: function(){
    console.log(this.$store.getters.getSearchKeywords)
    if(this.$store.getters.getSearchKeywords != '') {
      search({keywords: this.$store.getters.getSearchKeywords,offset:0}).then((res)=>{
        let songs = res.data.body.result.songs
        this.song_count = res.data.body.result.songCount
        this.setSearchPage(1)
        if(parseFloat(this.song_count & 30) != 0) {
          this.max_page = parseInt(this.song_count / 30) + 1
        }
        let musicList = new Array()
        for(let i=0, length=songs.length; i<length; i++) {
          musicList.push(new Music({
            id: songs[i].id,
            name: songs[i].name,
            duration: songs[i].duration,
            album: songs[i].album,
            artists: songs[i].artists
          }))
        }
        this.music_list = musicList
      })
    }
  },
  methods:{
    handlePageButtonClick: function(page) {
      search({keywords: this.$store.getters.getSearchKeywords,offset:page}).then((res)=>{
        let songs = res.data.body.result.songs
        if(page < this.max_page) {
          console.log('max')
          this.setSearchPage(page)
        }else {
          this.setSearchPage(this.max_page)
        }
        let musicList = new Array()
        for(let i=0, length=songs.length; i<length; i++) {
          musicList.push(new Music({
            id: songs[i].id,
            name: songs[i].name,
            duration: songs[i].duration,
            album: songs[i].album,
            artists: songs[i].artists
          }))
        }
        this.music_list = musicList
      })
    },
    ...mapGetters([
      'getSearchPage'
    ]),
    ...mapMutations([
      'setSearchPage'
    ])
  }
}
</script>

<style lang="scss" scoped>
#search {
  width: 100%;
  height: 100%;
  #result-container {
    width: 100%;
    height: 90%;
  }
  #pages-container {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      color: #e1e1e1cc;
      cursor: pointer;
      outline: none;
      text-align: center;
      background-color: #a3a1a105;
      transition: all 0.2s;
      font-size: 14px;
      min-width: 15px;
      margin: 0 2px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
    }:hover {
      color: #fff;
      background-color: #b4b4b45c;
    }
  }
}
</style>