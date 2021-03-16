<template>
  <div id="browser">
    <div id="left-side">
      <div id="left-nav-container">
        <left-nav></left-nav>
      </div>
      <div id="mini-player-container">
        <mini-player></mini-player>
      </div>
    </div>
    <div id="right-side">
      <router-view v-if="this.$store.getters.getSearchViewVisibility" />
      <transition name="play-list-container">
        <div id="play-list-container" @click="event=>{event.stopPropagation()}" v-show="this.$store.getters.getPlayListVisibility">
          <music-list :music-list="this.$store.getters.getPlayList" :scroll="true"></music-list>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import leftNav from './left_nav'
import miniPlayer from './mini_player'
import musicList from '@/components/music_list'
export default {
  name: 'browser',
  data: function() {
    return {
      event: null
    }
  },
  components: {
    leftNav,
    miniPlayer,
    musicList
  },
  methods: {
    musicBufferChange : function() {
      clearInterval(this.musicBarMove);
      let barLeftWidth = this.musicBar.offsetLeft;
      if (event.clientX - barLeftWidth < 0) {
        this.musicBarValue.style.width = "0px";
        return 0;
      }else if(event.clientX > (barLeftWidth+this.musicBar.offsetWidth)){
        this.musicBarValue.style.width = this.musicBar.offsetWidth + "px";
        return this.musicBar.offsetWidth;
      }else {
        this.musicBarValue.style.width = event.clientX - barLeftWidth + "px";
        return event.clientX - barLeftWidth;
      }
    },

    musicBarChange : function() {
      document.addEventListener("mousemove", this.musicBarValueChange);
      document.addEventListener("mouseup", this.temp);
    },

    temp : function(){
      document.removeEventListener("mousemove", this.musicBarValueChange);
      this.music.currentTime = this.music.duration * (this.musicBarValueChange() / this.musicBar.offsetWidth);
      if(this.music.paused != true) {
        setInterval(()=>{
          try{
            this.musicBarBuffer.style.width = this.music.buffered.end(this.music.buffered.length-1) / this.music.duration * 100 + "%";
            this.musicBarValue.style.width = this.music.currentTime / this.music.duration * 100 + "%";
          }catch(err){
            throw null;
          }
        },300);
      }
      document.removeEventListener("mouseup", this.temp);
    }
  }
}
</script>
<style lang="scss" scoped>
.play-list-container-enter-active {
  animation: play-list-in .3s;
}

.play-list-container-leave-active {
  animation: play-list-in .3s reverse;
}

@keyframes play-list-in {
  0% {
    width: 0%;
    height: 0%;
  }
  100% {
    width: 100%;
    height: 50%;
  }
}
#browser {
  width: 100%;
  height: 90%;
  overflow: hidden;
  #left-side {
    width: calc(23% - 1px);
    height: 100%;
    border-right: 1px solid;
    float: left;
    overflow: hidden;
    #left-nav-container {
      height: 85%;
    }
    #mini-player-container {
      height: 15%;
    }
  }
  #right-side {
    width: 77%;
    height: 100%;
    float: left;
    overflow: hidden;
    #play-list-container {
      transform: translateY(-100%);
      width: 100%;
      height: 50%;
      background-color: #ffffff;
    }
  }
}
</style>