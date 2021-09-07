<template>
  <div id="app" @click="handleAppClick($event)"> <!--oncontextmenu="return false"-->
    <div id="bg" ref="bg" :style="{'background-image': blur_bg}"></div>
    <div id="main">
      <div id="top-bar">
        <div id="logo">
          <span>tdoca-music</span>
        </div>
        <div id="nav">
          <div id="search-container">
            <form id="search-form" onsubmit="return false" autocomplete="off">
              <input type="text" name="search" ref="searchValue">
              <i style="" class="iconfont icon-search"><input type="submit" value="" @click="handleSearch"></i>
            </form>
          </div>
          <div id="username-container">
            <span v-if="this.$store.getters.getLoginStatus == true">
              {{this.$store.getters.getUserName}}
            </span>
            <span id="login-view" v-else @click="event=>{this.$store.dispatch('showRightBar');this.$store.state.app.right_container_view='login';event.stopPropagation()}">请登录</span>
          </div>
        </div>
      </div>
      <router-view />
      <transition name="right_bar_visibility">
        <div id="right-bar" v-if="this.$store.getters.getRightBarVisibility" @click="handleRightBarClick($event)">
            <component :is="this.$store.state.app.right_container_view"></component>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import('@/assets/iconfont/iconfont.css')
import defaultBackground from '@/assets/Abstract.jpg'
import login from '@/components/right_bar/login'
import register from '@/components/right_bar/register'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    login,
    register
  },
  data() {
    return {
      right_bar_visibility: false,
      blur_bg: `url('${defaultBackground}')`,
      old_cover: null,
      isRouterAlive: true
    }
  },
  provide: function() {
    return {
      reload: this.reload
    }
  },
  mounted: function() {
    // this.getAudio().src = URL.createObjectURL(this.getMediaSource())
    // console.log(this.getAudio().src)
    // this.getMediaSource().addEventListener('sourceopen', ()=>{
    //   this.setSourceBuffer(this.getMediaSource().addSourceBuffer('audio/mpeg;'))
    // })
    this.getAudio().setAttribute("preload", 'none')
    this.getAudio().addEventListener('loadstart', () => {
      if(this.getPlayItem().cover !== this.old_cover) {
        this.blur_bg = `url(${this.getPlayItem().cover})`
      }
      this.old_cover = this.getPlayItem().cover
    })
  },
  methods: {
    ...mapMutations([
      // 'setSourceBuffer',
      'setSearchKeywords'
    ]),
    ...mapActions([
      'hideRightBar',
      'hidePlayList',
      'hideSearchView',
      'showSearchView'
    ]),
    ...mapGetters([
      'getAudio',
      'getPlayItem',
      // 'getMediaSource',
      // 'getSourceBuffer',
    ]),
    reload: function() {
      this.hideSearchView()
      this.$nextTick(()=>{
        this.showSearchView() 
      })
    },
    handleAppClick: function (event) {
      this.hideRightBar()
      this.$store.state.app.menu_visibility=false
      event.stopPropagation()
    },
    handleSearch: function() {
      this.setSearchKeywords(this.$refs['searchValue'].value)
      if(this.$route.name != 'search') {
        this.$router.push({name: 'search'})
      } else {
        console.log('reload')
        this.reload()
      }
    },
    handleRightBarClick: function(event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss">
*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

body {
  margin: 0;
}

a {
  text-decoration: none;
  color: black;
}

#app {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 720px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  // z-index: -1;
  #bg {
    position: relative;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    filter: blur(50px);
    transform: scale(1.2);
    transition: background-image 1s;
  }
  #main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, calc(-50%));
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    // width: 100%;  //适配浏览器宽度
    // height: calc(100% - 20px); //适配浏览器高度
    width: 1280px;
    height: 720px;
    // margin: 10px 0 10px 0;
    // padding: 0 10% 0 10%;
    background-clip: content-box;
    background-color: #00000038; //#dddddd70;
    z-index: 3;
    #top-bar {
      display: flex;
      width: 100%;
      height: 10%;
      #logo {
        display: inline-flex;
        width: 23%;
        height: 100%;
        align-items: center;
        span {
          margin: 0 auto;
          font-size: 28px;
          color: #ffffff;
          text-shadow: 0 1px 4px #fff;
        }
      }
      #nav {
        display: inline-flex;
        width: 77%;
        height: 100%;
        align-items: center;
        #search-container {
          display: inline-flex;
          width: 30%;
          height: 40%;
          margin-left: 10%;
          padding-left: 1%;
          border-radius: 90px;
          background: #b3b3b340;
          #search-form {
            display: flex;
            width: 100%;
            height: 100%;
            input {
              width: 90%;
              height: 100%;
              padding: 0;
              border: 0;
              border-radius: 0;
              background: initial;
              outline: none;
              color: #fff;
            }
            i {
              position: relative;
              display: inline-flex;
              width: 10%;
              height: 100%;
              color: #fff;
              font-size: 20px;
              align-items: center;
              input {
                position: absolute;
                width: 100%;
                height: 100%;
                cursor: pointer;
              }
            }
          }
        }
        #username-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10%;
          color: #fff;
          #login-view {
            cursor: pointer;
          }
        }
      }
    }
    .right_bar_visibility-enter-active, .right_bar_visibility-leave-active {
      transition: opacity .5s;
    }
    .right_bar_visibility-enter, .right_bar_visibility-leave-to {
      opacity: 0;
    }
    #right-bar {
      width: 380px;
      height: 100%;
      float: right;
      transform: translateY(-100%);
      background: #ffffffbf;
    }
  }
}
</style>
