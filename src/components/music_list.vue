<template>
  <div id="music-list" :style="scroll ? {'overflow': 'overlay'}:{'overflow':'hidden'}">
    <div id="list-category" v-if="category">
      <span id="category-number">序号</span>
      <span id="category-name">音乐名称</span>
      <span id="category-artists">歌手</span>
      <span id="category-album">专辑</span>
      <span id="category-duration">时长</span>
      <span id="category-favorites">收藏</span>
    </div>
    <div class="music-item" :class="musicList.indexOf(musicItem)%2===0 ? 'even':'odd'" v-for="musicItem in musicList" :key="musicList.indexOf(musicItem)" @click="handleMusicItemClick(musicItem)" @contextmenu="menuHandle($event)">
      <span class="music-item-number">{{musicList.indexOf(musicItem)}}</span>
      <span class="music-item-name">{{musicItem.name}}</span>
      <span class="music-item-artists"><router-link :to="`browser-search/${musicItem.artists.name}`">{{musicItem.artists.name}}</router-link></span>
      <span class="music-item-album"><router-link :to="`browser-search/${musicItem.album.name}`">{{musicItem.album.name}}</router-link></span>
      <span class="music-item-duration">{{`${parseInt(musicItem.duration/60000)}:${(musicItem.duration-parseInt(musicItem.duration/60000)*60000)/1000}`}}</span>
      <span class="music-item-favorites"><i class="iconfont" :class="musicItem.favorites ? 'icon-favorites-fill':'icon-favorites' "></i></span>
    </div>
    <transition name="menu_visibility">
      <ul class="menu" id="menu" v-show="menu_visibility" ref="menu">
        <!-- <component :is="menu_view"></component> -->
        <li id="sendMsg"><i class="iconfont icon-play"></i><span>播放并添加到播放栏</span></li>
        <li id="deleteFriend"><i class="iconfont icon-gedan"></i><span>专辑：</span></li>
        <li id="addToBlack">加入黑名单</li>
        <li class="bottom">修改备注名</li>
      </ul>
    </transition>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: 'music-list',
  data: function() {
    return {
      menu_visibility: false,
      menu_view: 'play_list'
    }
  },
  // components:{
  //   play_list: {
  //     template: '<li id="sendMsg"><i class="iconfont icon-play"></i><span>播放并添加到播放栏</span></li>'
  //   }
  // },
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
    e: {
      type: Object,
      default: null,
      required: false
    }
  },
  methods: {
    handleMusicItemClick: async function(musicItem) {
      console.log(musicItem)
      let play_list = this.$store.getters.getPlayList
      // play_list[play_list.length-1].next = musicItem
      // musicItem.prev = play_list[play_list.length-1]
      // musicItem.next = play_list[0]
      for(let play_item of play_list) {
        if(play_item.id === musicItem.id) {
          this.$store.dispatch('musicInit',musicItem)
          this.$store.dispatch('playMusic')
          return
          // break
        }
      }
      play_list.push(musicItem)
      this.$store.dispatch('musicListInit',play_list)
      console.log(play_list)
      this.$store.dispatch('musicInit',musicItem)
      this.$store.dispatch('playMusic')
      // (async ()=>{this.$store.dispatch('playMusic')})()
      // (function(){this.$store.getters.getAudio.play()})()
    },
    menuHandle: function(event) {
      // this.musicList.splice(key,1)
      // console.log(this.$store.getters.getPlayList)
      console.log(event)
      // var menu=document.getElementById('menu');
      this.menu_visibility=true
      // menu.style.visibility='visible';
      let menu = this.$refs['menu']
      menu.style.top = event.clientY + 'px'
      menu.style.left=event.clientX+'px';
    }
  }
};
</script>

<style lang="scss" scoped>
#music-list {
  width: 100%;
  height: 100%;
  font-size: 15px;
  background: #ffffff;
  #list-category {
    display: flex;
    align-items: center;
    width: 100%;
    height: 7%;
    background: #ffffff8c;
    #category-number {
      width: calc(7% - 1vw);
      padding-left: 1vw;
    }
    #category-name {
      width: calc(25% - 1vw);
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
    #category-favorites {
      width: 9%;
      // padding-left: 1vw;
    }
  }
  .odd {
    background: #ccccccab;
  }
  .even {
    background: #c0c0c09e;
  }
  .music-item:hover {
    background: #9b9b9b;
  }
  .music-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    cursor: pointer;
    .music-item-album, .music-item-artists, .music-item-duration, .music-item-favorites, .music-item-number, .music-item-name{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-clamp: 1;
    }
    .music-item-number {
      width: calc(7% - 2vw);
      padding-left: 2vw;
    }
    .music-item-name {
      width: calc(25% - 1vw);
      padding-left: 1vw;
    }
    .music-item-artists {
      width: calc(15% - 1vw);
      padding-left: 1vw;
      a {
        color: #7d7d7d;
      }:hover {
        color: #000000
      }
    }
    .music-item-album {
      width: calc(32% - 1vw);
      padding-left: 1vw;
      a {
        color: #7d7d7d;
      }:hover {
        color: #000000
      }
    }
    .music-item-duration {
      width: calc(12% - 2vw);
      padding-left: 2vw;
      color: #7d7d7d;
    }
    .music-item-favorites {
      width: calc(9% - 1vw);
      padding-left: 1vw;
    }
  }
}
.right_bar_visibility-enter-active, .right_bar_visibility-leave-active {
  transition: opacity .5s;
}
.right_bar_visibility-enter, .right_bar_visibility-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
ul.menu{
  width: 14em;
  // height: 30%;
  list-style: none;
  position: absolute;
  z-index:9999;
  visibility: hidden;
  // border:1px solid #5A9CCC;
  box-shadow: 1px 1px 5px #888888;
  background:#ffffff;
  margin: 0;
  padding: 0;
  li{
    display: flex;
    // justify-content: center;
    align-items: center;
    // width: 100%;
    // height: 20%;
    i {
      padding: 0 5%;
      font-size: 2em;
    }
    span {
      font-size: 0.9em;
    }
    // padding: 5%;
    // border-bottom:1px solid #5A9CCC;
    cursor:pointer;
  }:hover{
    background: #9b9b9b;
  }
  li.bottom{
    border-bottom: none;
  }
}
</style>