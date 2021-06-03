<template>
  <div id="music-list">
    <div id="list-category-container" v-if="category">
      <div id="category-number">序号</div>
      <div id="category-name">音乐名称</div>
      <div id="category-artists">歌手</div>
      <div id="category-album">专辑</div>
      <div id="category-duration">时长</div>
    </div>
    <div id="music-item-container" :style="scroll ? {'overflow': 'overlay'}:{'overflow':'hidden'}">
      <div class="music-item" :class="musicList.indexOf(musicItem)%2===0 ? 'even':'odd'" v-for="musicItem in musicList" :key="musicList.indexOf(musicItem)" @mousemove="handleMusicItemMouseMove(musicList.indexOf(musicItem))" @mouseout="handleMusicItemMouseOut(musicList.indexOf(musicItem))">
        <div class="music-item-number">{{musicList.indexOf(musicItem)}}</div>
        <div class="music-item-name">
          <span ref="name">{{musicItem.name}}</span>
          <div ref="control" style="display:none">
            <i class="iconfont icon-play" @click="handlePlayButtonClick(musicItem)"></i>
            <i class="iconfont icon-add" @click="handleAddButtonClick(musicItem,$event)"></i>
            <i class="iconfont icon-download" @click="handleDownloadButtonClick(musicItem)"></i>
          </div>
        </div>
        <div class="music-item-artists"><router-link :to="`browser-search/${musicItem.artists.name||musicItem.artists[0].name}`">{{musicItem.artists.name||musicItem.artists[0].name}}</router-link></div>
        <div class="music-item-album"><router-link :to="`browser-search/${musicItem.album.name}`">{{musicItem.album.name}}</router-link></div>
        <div class="music-item-duration">
          <div ref="duration">
            {{`${parseInt(musicItem.duration/60000)}:${parseInt((musicItem.duration-parseInt(musicItem.duration/60000)*60000)/1000)}`}}
          </div>
          <div v-if="listView=='playList' || listView=='history'" ref="remove" style="display:none" @click="handleRemoveButtonClick(musicItem)">
            <i class="iconfont icon-ashbin"></i>
          </div>
        </div>
      </div>
    </div>
    <transition name="menu_visibility">
      <ul id="menu" v-show="this.$store.state.app.menu_visibility" ref="menu">
        <li v-for="songSheetItem in this.$store.getters.getSongSheetList" :key="songSheetItem.sid" @click="handleSongSheetItemClick(songSheetItem)">
          {{songSheetItem.title}}
        </li>
        <span v-if="this.$store.getters.getLoginStatus == false">
          登录后添加到歌单
        </span>
      </ul>
    </transition>
  </div>
</template>

<script>
import { addMusicToSongSheet, getSongSheetByUid, downloadSource } from '@/libs/api'
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'music-list',
  data: function() {
    return {
      menu_view: 'play_list',
      music_id: '',
    }
  },
  props: {
    musicList: {
      type: Array,
      default: null,
      required: true,
      // validator: function(value) {
      //   return value.length !== 0
      // }
    },
    scroll: {
      type: Boolean,
      default: false,
      required: false
    },
    category: {
      type: Boolean,
      default: false,
      required: false
    },
    listView: {
      type: String,
      required: true
    }
  },
  methods: {
    handlePlayButtonClick: async function(musicItem) {
      console.log(musicItem.id)
      let play_list = this.getPlayList()
      let i = play_list.length-1
      do {
        if(play_list[i].id == musicItem.id) {
          await this.musicInit(play_list[i]);
          this.playMusic()
          return
        }
        console.log(i)
      }while(i--)
        // this.addToPlayList(result)
        // await this.$store.dispatch('musicListInit',play_list)
        // console.log(play_list)
      this.addMusicToPlayList(await this.musicInit(musicItem))
      this.playMusic()
        // console.log(result)
    },
    handleMusicItemMouseMove: function(index) {
      switch(this.listView){
        case 'playList':
        case 'history':
          this.$refs.name[index].style.display = 'none'
          this.$refs.control[index].style.display = 'block'
          this.$refs.duration[index].style.display = 'none'
          this.$refs.remove[index].style.display = 'inline'
          break
        case 'musicList':
          this.$refs.name[index].style.display = 'none'
          this.$refs.control[index].style.display = 'block'
      }
    },
    handleMusicItemMouseOut: function(index) {
      switch(this.listView){
        case 'playList':
        case 'history':
          this.$refs.name[index].style.display = 'block'
          this.$refs.control[index].style.display = 'none'
          this.$refs.duration[index].style.display = 'inline'
          this.$refs.remove[index].style.display = 'none'
          break
        case 'musicList':
          this.$refs.name[index].style.display = 'block'
          this.$refs.control[index].style.display = 'none'
      }
    },
    handleAddButtonClick: function(musicItem,event) {
      this.music_id = musicItem.id
      event.stopPropagation()
      this.$store.state.app.menu_visibility = true
      let menu = this.$refs['menu']
      menu.style.top = event.clientY + 'px'
      menu.style.left = 170 + 'px'
      if(event.clientY>=450) {
        menu.style.top = event.clientY - 200 + 'px'
        menu.style.left = 170 + 'px'
      }
    },
    handleSongSheetItemClick: function(songSheetItem) {
      if(songSheetItem.songs.indexOf(this.music_id.toString()) == -1 ) {
        addMusicToSongSheet({sid: songSheetItem.sid, mid: this.music_id}).then(()=>{
          alert('添加成功')
          getSongSheetByUid({uid: this.getUid()}).then(async res=>{
            await this.updateSongSheetList(res.data)
          })
        })
      }else {
        alert('此歌单已存在这首歌')
      }
    },
    handleRemoveButtonClick: async function(musicItem) {
      switch(this.listView) {
        case 'playList':
          this.removeMusicOfList(this.musicList.indexOf(musicItem))
          break
        case 'history':
          this.removeMusicOfHistoryList(musicItem)
          break
      }
    },
    handleDownloadButtonClick: function(musicItem) {
      downloadSource(musicItem.source).then(res=>{
        console.log(res)
      })
    },
    ...mapMutations(['removeMusicOfList','updateSongSheetList']),
    ...mapActions(['musicInit','playMusic','addMusicToPlayList','removeMusicOfHistoryList']),
    ...mapGetters(['getNextMusic','getPlayList','getPlayItem','getUid'])
  }
};
</script>

<style lang="scss" scoped>
#music-list {
  width: 100%;
  height: 100%;
  font-size: 15px;
  // background: #ffffff;
  #list-category-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 7%;
    // background: #ffffff8c;
    #category-number {
      width: calc(7% - 1vw);
      padding-left: 1vw;
    }
    #category-name {
      width: calc(34% - 1vw);
      padding-left: 1vw;
    }
    #category-artists {
      width: calc(15% - 1vw);
      padding-left: 1vw;
    }
    #category-album {
      width: calc(32% - 1vw);
      padding-left: 1vw;
    }
    #category-duration {
      width: calc(12% - 1vw);
      padding-left: 1vw;
    }
  }
  .odd {
    background: #a3a1a105;
  }
  .even {
    background: #c0c0c000;
  }
  #music-item-container{
    height: 93%;
    padding-right: 5px;
    .music-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 10%;
      .music-item-album, .music-item-artists, .music-item-duration, .music-item-number, .music-item-name{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #e1e1e1cc;
      }
      .music-item-number {
        width: calc(7% - 2vw);
        padding-left: 2vw;
      }
      .music-item-name {
        width: calc(34% - 1vw);
        padding-left: 1vw;
        span {
          cursor: pointer;
        }
        span:hover {
          color: #ffffff;
        }
        div {
          .icon-play,.icon-add,.icon-download {
            font-size: 30px;
            cursor: pointer;
            margin-right: 5px;
          }:hover {
            color: #fff;
          }
        }
      }
      .music-item-artists {
        width: calc(15% - 1vw);
        padding-left: 1vw;
        a {
          color: #e1e1e1cc;
        }:hover {
          color: #ffffff
        }
      }
      .music-item-album {
        width: calc(32% - 1vw);
        padding-left: 1vw;
        a {
          color: #e1e1e1cc;
        }:hover {
          color: #ffffff
        }
      }
      .music-item-duration {
        width: calc(12% - 2vw);
        padding-left: 2vw;
        .icon-ashbin {
          font-size: 30px;
          cursor: pointer;
        }
        div {
          color: #e1e1e1cc;
        }:hover {
          color: #ffffff
        }
      }
    }
  }
  #menu{
    width: 150px;
    height: 200px;
    list-style: none;
    position: absolute;
    z-index:9999;
    // visibility: hidden;
    // border:1px solid #5A9CCC;
    box-shadow: 1px 1px 5px #888888;
    background:#ffffff;
    margin: 0;
    padding: 0;
    li{
      // display: flex;
      // align-items: center;
      cursor:pointer;
    }
    li:hover{
      background: #9b9b9b;
    }
  }
}
.right_bar_visibility-enter-active, .right_bar_visibility-leave-active {
  transition: opacity .5s;
}
.right_bar_visibility-enter, .right_bar_visibility-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>