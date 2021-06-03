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
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    login,
    register
  },
  data() {
    return {
      right_bar_visibility: false,
      // right_container_view: '',
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
    this.$store.getters.getAudio.setAttribute("preload", 'none');
    this.$store.getters.getAudio.addEventListener('play', () => {
      if(this.$store.getters.getPlayItem.cover !== this.old_cover) {
        this.handleBackground(this.$store.getters.getPlayItem.cover)
      }
      this.old_cover = this.$store.getters.getPlayItem.cover
    })
  },
  methods: {
    ...mapMutations([
      'setSearchKeywords'
    ]),
    ...mapActions([
      'hideRightBar',
      'hidePlayList',
      'hideSearchView',
      'showSearchView'
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
      if(this.$route.name != 'player-search') {
        this.$router.push({name: 'player-search'})
      } else {
        console.log('reload')
        this.reload()
      }
    },
    handleRightBarClick: function(event) {
      event.stopPropagation()
    },
    handleBackground: async function(imageSource) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      //解决资源跨域问题
      img.crossOrigin = "anonymous";
      //这里直接修改图片的路径
      img.src = imageSource
      img.onload = () => {
        //设置canvas的宽高
        canvas.height = img.height;
        canvas.width = img.width;

        //将图像绘制到canvas上面
        ctx.drawImage(img, 0, 0, img.width, img.height);

        //从画布获取图像
        img.crossOrigin='anonymous'
        let data = ctx.getImageData(0, 0, img.width, img.height);

        //将图像数据进行高斯模糊 data.data是一个数组，每四个值代表一个像素点的rgba的值，data.width data.height 分别代表图像数据的宽高
        let emptyData = gaussBlur(data);

        //将模糊的图像数据再渲染到画布上面
        ctx.putImageData(emptyData, 0, 0);
        this.blur_bg = `url(${canvas.toDataURL('image/png')})`
      }

      function gaussBlur(imgData) {
          let pixes = imgData.data;
          let width = imgData.width;
          let height = imgData.height;
          let gaussMatrix = [],
              gaussSum = 0,
              x, y,
              r, g, b, a,
              i, j, k, len;

          let radius = 100;
          let sigma = 100;

          a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
          b = -1 / (2 * sigma * sigma);
          //生成高斯矩阵
          for (i = 0, x = -radius; x <= radius; x++, i++) {
              g = a * Math.exp(b * x * x);
              gaussMatrix[i] = g;
              gaussSum += g;
          }

          //归一化, 保证高斯矩阵的值在[0,1]之间
          for (i = 0, len = gaussMatrix.length; i < len; i++) {
              gaussMatrix[i] /= gaussSum;
          }
          //x 方向一维高斯运算
          for (y = 0; y < height; y++) {
              for (x = 0; x < width; x++) {
                  r = g = b = a = 0;
                  gaussSum = 0;
                  for (j = -radius; j <= radius; j++) {
                      k = x + j;
                      if (k >= 0 && k < width) {//确保 k 没超出 x 的范围
                          //r,g,b,a 四个一组
                          i = (y * width + k) * 4;
                          r += pixes[i] * gaussMatrix[j + radius];
                          g += pixes[i + 1] * gaussMatrix[j + radius];
                          b += pixes[i + 2] * gaussMatrix[j + radius];
                          // a += pixes[i + 3] * gaussMatrix[j];
                          gaussSum += gaussMatrix[j + radius];
                      }
                  }
                  i = (y * width + x) * 4;
                  // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
                  pixes[i] = r / gaussSum;
                  pixes[i + 1] = g / gaussSum;
                  pixes[i + 2] = b / gaussSum;
                  // pixes[i + 3] = a ;
              }
          }
          //y 方向一维高斯运算
          for (x = 0; x < width; x++) {
              for (y = 0; y < height; y++) {
                  r = g = b = a = 0;
                  gaussSum = 0;
                  for (j = -radius; j <= radius; j++) {
                      k = y + j;
                      if (k >= 0 && k < height) {//确保 k 没超出 y 的范围
                          i = (k * width + x) * 4;
                          r += pixes[i] * gaussMatrix[j + radius];
                          g += pixes[i + 1] * gaussMatrix[j + radius];
                          b += pixes[i + 2] * gaussMatrix[j + radius];
                          // a += pixes[i + 3] * gaussMatrix[j];
                          gaussSum += gaussMatrix[j + radius];
                      }
                  }
                  i = (y * width + x) * 4;
                  pixes[i] = r / gaussSum;
                  pixes[i + 1] = g / gaussSum;
                  pixes[i + 2] = b / gaussSum;
              }
          }
          return imgData;
      }
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
  // overflow: hidden;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 720px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  // filter: blur(2px);
  // z-index: -1;
  #bg {
    position: relative;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    transition: background-image 1s;
  }
  // #bg::after {
  //   position: absolute;
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   left: 0;
  //   top: 0;
  //   /* 从父元素继承 background 属性的设置 */
  //   background: inherit;
  //   filter: blur(7px);
  //   z-index: 2;
  // }
  #main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, calc(-50%));  //自适应浏览器
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
            }
            i {
              position: relative;
              display: inline-flex;
              width: 10%;
              height: 100%;
              color: black;
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
          #login-view {
            cursor: pointer;
          }
        }
        #message-container {
          width: 40px;
          height: 40px;
          background: red;
          margin-left: 5%;
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
