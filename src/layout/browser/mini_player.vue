<template>
  <div id="mini-player">
    <div id="music-cover-container">
      <div
        id="music-cover"
        ref="music-cover"
        :style="{
          'background-image': `url(${this.getPlayItem().cover})`,
        }"
      ></div>
    </div>
    <div id="music-info-container">
      <div id="music-name-container">
        <span id="music-name" ref="music-name">{{
          this.getPlayItem().name
        }}</span>
      </div>
      <div id="music-control-container">
        <div id="music-play-button-container">
          <i
            class="iconfont icon-kuaitui"
            ref="prev-button"
            @click="this.handlePrevButtonClick"
          ></i>
          <i
            class="iconfont icon-zanting"
            ref="play-button"
            @click="this.handlePlayButtonClick"
          ></i>
          <i
            class="iconfont icon-kuaijin"
            ref="next-button"
            @click="this.handleNextButtonClick"
          ></i>
        </div>
        <div id="music-progress-container">
          <div id="music-progress-buffer" ref="music-buffer"></div>
          <div id="music-progress-current" ref="music-current"></div>
        </div>
        <div id="music-play-control-container">
          <span id="control-left">
            <i class="iconfont icon-list" ref="play-mode"></i>
            <i class="iconfont icon-sound-filling" ref="sound"></i>
          </span>
          <span id="control-right">
            <i class="iconfont icon-gedan" @click="event=>handleListButtonClick(event)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// import {getMusicById} from '@/libs/api.js'
export default {
  name: "mini-player",
  data: function () {
    return {
      musicBufferHandler: null,
      mapActions
    }
  },
  created: function() {
    let Music = this.$store.state.player.Music
    this.musicListInit([
      new Music({id: '28256124'}),
      new Music({id: '26201979'}),
      new Music({id: '27258185'}),
      new Music({id: '27866687'}),
      new Music({id: '22826405'}),
      new Music({id: '840197'}),
      new Music({id: '22805698'}),
      new Music({id: '22826401'}),
      new Music({id: '1329967179'}),
      new Music({id: '4997987'})
    ])
  },
  mounted: function() {
    /**
     * @description 监听音频对象暂停状态
     */
    this.getAudio().addEventListener('ended',() => {
      if(this.getPlayMode() === 'list') {
        this.musicInit(this.getPlayItem().next)
        this.getAudio().play()
      }
    })

    this.getAudio().addEventListener('play', ()=>{
      this.$refs['play-button'].className='iconfont icon-bofang'
      this.musicBufferHandler = setInterval(()=>{
        if(this.getAudio().currentTime !== 0) {
          try{
            this.$refs['music-buffer'].style.width = this.getAudio().buffered.end(this.getAudio().buffered.length-1) / this.getAudio().duration * 100 + "%";
            this.$refs['music-current'].style.width = this.getAudio().currentTime / this.getAudio().duration * 100 + "%";
          }catch(err) {
            console.log(err)
          }
        }
      },300)
    })

    this.getAudio().addEventListener('pause', ()=>{
      this.$refs['play-button'].className='iconfont icon-zanting'
      clearInterval(this.musicBufferHandler)
      console.log('pause')
    })
  },
  methods: {
    ...mapGetters([
      'getAudio',
      'getPlayItem',
      'getPlayList',
      'getPlayMode'
    ]),

    ...mapActions([
      'musicInit',
      'musicListInit',
      'playMusic',
      'showPlayList',
      'hideRightBar'
    ]),

    handlePlayButtonClick: function() {
      if(this.$refs['play-button'].className.indexOf('icon-zanting') !== -1) {
        this.playMusic()
      }else {
        this.getAudio().pause()
      }
    },

    handlePrevButtonClick: function() {
      try {
        this.getAudio().pause()
        this.musicInit(this.getPlayItem().prev)
        this.getAudio().play()
      }catch(err) {
        this.getAudio().pause()
        throw err
      }
    },

    handleNextButtonClick: function() {
      try {
        this.getAudio().pause()
        this.musicInit(this.getPlayItem().next)
        this.getAudio().play()
      }catch(err) {
        this.getAudio().pause()
        console.log(err)
      }
    },

    handleListButtonClick: function(event) {
      event.stopPropagation()
      this.showPlayList()
      this.hideRightBar()
    }
  }
};
</script>

<style lang="scss" scoped>
#mini-player {
  display: flex;
  width: 100%;
  height: 100%;
  #music-cover-container {
    display: flex;
    align-items: center;
    width: 30%;
    height: 100%;
    #music-cover {
      width: 70px;
      height: 70px;
      margin: 0 auto;
      background-size: cover;
    }
  }
  #music-info-container {
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
    #music-name-container {
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 20%;
      #music-name {
        display: inline-block;
        font-size: 14px;
        margin: 0 auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-clamp: 1;
      }
    }
    #music-control-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 80%;
      #music-play-button-container {
        display: flex;
        align-items: center;
        width: 55%;
        height: 60%;
        margin: 0 auto;
        justify-content: space-around;
        .icon-kuaitui {
          font-size: 24px;
          cursor: pointer;
        }
        .icon-zanting,
        .icon-bofang {
          font-size: 35px;
          cursor: pointer;
        }
        .icon-kuaijin {
          font-size: 24px;
          cursor: pointer;
        }
      }
      #music-progress-container {
        width: 80%;
        height: 3px;
        margin: 0 auto;
        background: #bebebe;
        cursor: pointer;
        #music-progress-buffer {
          min-width: 0px;
          max-width: 100%;
          width: 0;
          height: inherit;
          background: #646464;
        }
        #music-progress-current {
          min-width: inherit;
          max-width: inherit;
          width: 0;
          margin-top: -3px;
          height: inherit;
          background: #3c3c3c;
        }
      }
      #music-play-control-container {
        display: flex;
        justify-content: space-between;
        width: 60%;
        padding: 0 20%;
        height: 30%;
        span {
          cursor: pointer;
        }
      }
    }
  }
}
</style>