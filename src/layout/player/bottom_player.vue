<template>
  <div id="bottom-player">
    <div id="controller-container">
      <i class="iconfont icon-kuaitui" @click="handlePrevButtonClick()"></i>
      <i class="iconfont icon-zanting" ref="play-button" @click="handlePlayButtonClick()"></i>
      <i class="iconfont icon-kuaijin" @click="handleNextButtonClick()"></i>
    </div>
    <div id="meta-container">
      <div id="info-container">
        <span id="music-name">
          {{this.getPlayItem().name}}
        </span>
        <span id="music-duration">
          {{`${parseInt(this.getPlayItem().duration/60000)}:${parseInt((this.getPlayItem().duration-parseInt(this.getPlayItem().duration/60000)*60000)/1000)}`}}
        </span>
      </div>
      <div id="progress-container" ref="progress-bar" @mousedown="handleProgressBarMouseDown()">
        <div id="progress-buffer" ref="progress-buffer"></div>
        <div id="progress-current" ref="progress-current"></div>
        <div id="progress-dot" ref="progress-dot"></div>
      </div>
    </div>
    <i class="iconfont icon-list" ref="play-mode-button" @click="handlePlayModeButtonClick()"></i>
    <!-- <i class="iconfont icon-favorites"></i> -->
    <i class="iconfont icon-download" @click="handleDownloadButtonClick()"></i>
    <div id="sound-container">
      <i class="iconfont icon-sound-filling"></i>
      <div id="volume-container" ref="volume-bar" @mousedown="handleVolumeBarMouseDown()">
        <div id="volume-size" ref="volume-size"></div>
        <div id="volume-dot" ref="volume-dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Music from '@/libs/music'
import {getLyricById} from '@/libs/api'
import {mapActions, mapGetters, mapMutations} from 'vuex'
// import axios from 'axios'
export default {
  name: 'bottom-player',
  data: function(){
    return {
      musicBarMove : null,
    }
  },
  created: async function(){
    await this.musicListInit([
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
  mounted: function(){
    this.getAudio().addEventListener('play', async () => {
      this.$refs['play-button'].className='iconfont icon-bofang'
      if(this.getPlayItem().lyric == null) {
        await getLyricById({id:this.getPlayItem().id}).then(res=>{
          this.getPlayItem().lyric = res
        })
      }
      this.addMusicToHistoryList(this.getPlayItem())
    })

    this.getAudio().addEventListener('timeupdate', this.progressMoveHandler)

    this.getAudio().addEventListener('ended', () => {
      switch (this.getPlayMode()){
        case 'list':
          this.musicInit(this.getNextMusic())
          this.playMusic()
          break
        case 'random':
          this.musicInit(this.getPlayList()[this.randomNum(0,this.getPlayList().length+1)])
          this.playMusic()
          break
        case 'single':
          this.musicInit(this.getPlayItem())
          this.playMusic()
          break
      }
    })
  },
  methods:{
    // downloadSource,
    handlePrevButtonClick: async function() {
      switch (this.getPlayMode()){
        case 'list':
          if(this.getPrevMusic() != null){
            this.pauseMusic()
            await this.musicInit(this.getPrevMusic())
            this.playMusic()
          }else {
            this.pauseMusic()
          }
          break
        case 'single':
          this.pauseMusic()
          await this.musicInit(this.getPlayItem())
          this.playMusic()
          break
        case 'random':
          this.pause()
          await this.musicInit(this.getPlayList()[this.randomNum(0,this.getPlayList().length+1)])
          this.playMusic()
          break
      }
    },
    handleNextButtonClick: async function() {
      switch (this.getPlayMode()){
        case 'list':
          if(this.getNextMusic() != null){
            this.pauseMusic()
            await this.musicInit(this.getNextMusic())
            this.playMusic()
          }else {
            this.pauseMusic()
          }
          break
        case 'single':
          this.pauseMusic()
          await this.musicInit(this.getPlayItem())
          this.playMusic()
          break
        case 'random':
          this.pauseMusic()
          await this.musicInit(this.getPlayList()[this.randomNum(0,this.getPlayList().length+1)])
          this.playMusic()
          break
      }
    },
    handlePlayButtonClick: function() {
      if(this.$refs['play-button'].className.indexOf('icon-zanting') !== -1) {
        this.playMusic()
        this.$refs['play-button'].className = 'iconfont icon-bofang'
      }else {
        this.pauseMusic()
        this.$refs['play-button'].className = 'iconfont icon-zanting'
      }
    },
    handlePlayModeButtonClick: function() {
      switch (this.getPlayMode()){
        case 'list':
          this.setPlayMode('single')
          this.$refs['play-mode-button'].className = 'iconfont icon-single'
          break
        case 'single':
          this.setPlayMode('random')
          this.$refs['play-mode-button'].className = 'iconfont icon-random'
          break
        case 'random':
          this.setPlayMode('list')
          this.$refs['play-mode-button'].className = 'iconfont icon-list'
          break
      }
    },
    handleProgressBarMouseDown : function() {
      this.getAudio().removeEventListener('timeupdate',this.progressMoveHandler)
      document.addEventListener('mousemove', this.progressValueHandler)
      document.addEventListener('mouseup', this.progressMouseUpHandler)
    },
    progressMouseUpHandler: function() {
      document.removeEventListener("mousemove", this.progressValueHandler)
      this.getAudio().currentTime = this.getAudio().duration * this.progressValueHandler()
      this.getAudio().addEventListener('timeupdate', this.progressMoveHandler)
      document.removeEventListener("mouseup", this.progressMouseUpHandler)
    },
    progressValueHandler: function() {
      let barLeftWidth = this.$refs['progress-bar'].offsetLeft + document.querySelector("#main").offsetLeft
      if (window.event.clientX - barLeftWidth < 0) {
        this.$refs['progress-current'].style.width = '0%'
        this.$refs['progress-dot'].style.marginLeft = '0%'
        return 0
      }else if(window.event.clientX > (barLeftWidth+this.$refs['progress-bar'].offsetWidth)){
        this.$refs['progress-current'].style.width = '100%'
        this.$refs['progress-dot'].style.marginLeft = '100%'
        return 1
      }else {
        this.$refs['progress-current'].style.width = ((window.event.clientX - barLeftWidth) / this.$refs['progress-bar'].offsetWidth) * 100 + '%'
        this.$refs['progress-dot'].style.marginLeft = ((window.event.clientX - barLeftWidth) / this.$refs['progress-bar'].offsetWidth) * 100 + '%'
        return ((window.event.clientX - barLeftWidth) / this.$refs['progress-bar'].offsetWidth)
      }
    },
    progressMoveHandler: function() {
      if(this.getAudio().currentTime != 0) {
        this.$refs['progress-buffer'].style.width = this.getAudio().buffered.end(this.getAudio().buffered.length-1) / this.getAudio().duration * 100 + "%";
        this.$refs['progress-current'].style.width = this.getAudio().currentTime / this.getAudio().duration * 100 + "%";
        this.$refs['progress-dot'].style.marginLeft = this.getAudio().currentTime / this.getAudio().duration * 100 + "%";
      }
    },
    handleVolumeBarMouseDown: function() {
      document.addEventListener('mousemove', this.volumeValueHandler)
      document.addEventListener('mouseup', this.volumeMouseUpHandler)
    },
    volumeValueHandler: function() {
      console.log(this.$refs['volume-bar'].offsetLeft)
      let barLeftWidth = this.$refs['volume-bar'].offsetLeft + document.querySelector("#main").offsetLeft
      if (window.event.clientX - barLeftWidth < 0) {
        this.$refs['volume-size'].style.width = '0%'
        this.$refs['volume-dot'].style.marginLeft = '0%'
        return 0
      }else if(window.event.clientX > (barLeftWidth+this.$refs['volume-bar'].offsetWidth)){
        this.$refs['volume-size'].style.width = '100%'
        this.$refs['volume-dot'].style.marginLeft = '100%'
        return 1
      }else {
        this.$refs['volume-size'].style.width = ((window.event.clientX - barLeftWidth) / this.$refs['volume-bar'].offsetWidth) * 100 + '%'
        this.$refs['volume-dot'].style.marginLeft = ((window.event.clientX - barLeftWidth) / this.$refs['volume-bar'].offsetWidth) * 100 + '%'
        return ((window.event.clientX - barLeftWidth) / this.$refs['volume-bar'].offsetWidth)
      }
    },
    volumeMouseUpHandler: function() {
      document.removeEventListener('mousemove', this.volumeValueHandler)
      this.getAudio().volume = 1 * this.volumeValueHandler()
      document.removeEventListener('mouseup',this.volumeMouseUpHandler)
    },
    randomNum: function(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10)
        default:
          return 0
      }
    },
    handleDownloadButtonClick: function() {
      // downloadSource(this.getPlayItem().source).then(res=>{
      //   console.log(res)
      // })
    },
    ...mapActions([
      'musicListInit',
      'musicInit',
      'playMusic',
      'pauseMusic',
      'addMusicToHistoryList'
    ]),
    ...mapGetters([
      'getPlayList',
      'getPlayItem',
      'getAudio',
      'getPlayMode',
      'getNextMusic',
      'getPrevMusic'
    ]),
    ...mapMutations([
      'setPlayMode',
    ])
  }
}
</script>

<style lang="scss" scoped>
#bottom-player {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  i {
    font-size: 36px;
    color: #e1e1e1cc;
  }:hover {
    color: #fff;
  }
  i {
    cursor: pointer;
  }
  #controller-container {
    width: 10%;
    display: flex;
    justify-content: space-between;
  }
  #meta-container {
    width: 55%;
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #info-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: #e1e1e1cc;
      span {
        font-size: 18px;
        line-height: 1.5;
      }
    }
    #progress-container {
      width: 100%;
      height: 2px;
      background: #ffffff1a;
      cursor: pointer;
      #progress-buffer {
        width: 0%;
        height: 100%;
        background: #ffffff33;
        position: relative;
      }
      #progress-current {
        width: 0%;
        height: 100%;
        background: #fff;
        position: relative;
        margin-top: -2px;
      }
      #progress-dot {
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        position: relative;
        top: -6px;
        left: -5px;
      }
    }
  }
  #sound-container {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    #volume-container {
      width: 100%;
      height: 3px;
      background: #ffffff1a;
      cursor: pointer;
      #volume-size {
        width: 100%;
        height: 100%;
        background: #fff;
      }
      #volume-dot {
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        position: relative;
        top: -6px;
        left: -5px;
        margin-left: 100%;
      }
    }
  }
}
</style>