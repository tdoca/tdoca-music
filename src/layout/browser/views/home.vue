<template>
  <div id="home">
    <div class="recommended-container" style="display: flex;">
      <div class="swiper-button-prev" style="transform: translateX(78px);"></div>
      <div class="swiper-container" style="width: 730px; z-index: 0;">
        <div class="swiper-wrapper" style="z-index: 0;">
          <div class="swiper-slide">
            <router-link :to={}></router-link>
            <img style="width: 730px;" :src="`${this.recommend_list[0].image_url}`" alt="recommed">
          </div>
          <div class="swiper-slide">
            <img style="width: 730px;" :src="`${this.recommend_list[1].image_url}`" alt="recommed">
          </div>
          <div class="swiper-slide">
            <img style="width: 730px;" :src="`${this.recommend_list[2].image_url}`" alt="recommed">
          </div>
        </div>
      </div>
      <div class="swiper-button-next" style="transform: translateX(-78px);"></div>
      <!-- <div id="recommended-image-container" style="width: 80%; height: 50%; padding: 0 10% 0 10%;">
        <div class="recommended-image" :style="{'width': '80%', 'height': '80%', 'top': '10%', 'position': 'relative', 'background-image': `url(${this.recommend_list[0].image_url})`, 'background-size': 'cover'}"></div>
        <div class="recommended-image" :style="{'width': '80%', 'height': '100%', 'top': '-80%', 'left': '10%', 'position': 'relative', 'z-index': '1', 'background-image': `url(${this.recommend_list[1].image_url})`, 'background-size': 'cover'}"></div>
        <div class="recommended-image" :style="{'width': '80%', 'height': '80%', 'top': '-170%', 'left': '20%', 'position': 'relative', 'background-image': `url(${this.recommend_list[2].image_url})`, 'background-size': 'cover'}"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import $ from 'jquery'
export default {
  name: 'browser-home',
  data: function() {
    return {
      Music: this.$store.state.player.Music,
      recommend_list: [
        {
          music_id: '1823002072',
          image_url: 'http://p1.music.126.net/z9gpFHCf3LKAJg-TO8DvKw==/109951165785974132.jpg?imageView&quality=89'
        },
        {
          music_id: '123857369',
          image_url: 'http://p1.music.126.net/iGqexIUCuUPn-C-u1igTIw==/109951165777708529.jpg?imageView&quality=89'
        },
        {
          music_id: '1825495671',
          image_url: 'http://p1.music.126.net/kveWM8w4VdQvVBW9QCr_FQ==/109951165786097491.jpg?imageView&quality=89'
        }
      ]
    }
  },
  mounted: function() {
    $(document).ready(function(){
      let recommended = new Swiper('.swiper-container', {
        simulateTouch : false,
        loop: true,
        autoplay: {
          delay: 2000
        },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      })

      $('.swiper-button-prev').click(function(){
        recommended.autoplay.start()
      })
      $('.swiper-button-next').click(function(){
        recommended.autoplay.start()
      })

      // let images = $('.recommended-image')
      // images[images.length-1].next = images[0]
      // for (let i = 0; i<images.length-1; i++){
      //   images[i].next = images[i+1]
      // }
      // console.log(images)

      // let tmp = 0
      // $('#recommended-image-container').click(()=>{
      //   $(images[tmp]).animate({
      //     left: '20%',
      //   },'fast')

      //   $(images[tmp].next).animate({
      //     'z-index': '0',
      //     left: '0',
      //     width: '80%',
      //     height: '80%',
      //     top: '+=10%'
      //   },'fast')

      //   $(images[tmp].next.next).animate({
      //     'z-index': '1',
      //     left: '10%',
      //     height: '100%',
      //     top: '+=10%'
      //   },'fast')
      //   tmp++
      // })
    })
  }
}
</script>

<style lang="scss" scoped>
.recommended-images {
  width: 100%;
  height: 284px;
  margin: 20px auto;
}
#home {
  width: 92%;
  height: 100%;
  padding: 0 4%;
  overflow-y: overlay;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .recommended-container {
    width: 100%;
    height: 284px;
    margin-top: 3%;
    align-items: center;
    .swiper-button-prev, .swiper-button-next {
      outline: none;
      position: relative;
      height: 100%;
      width: 50px;
      top: 3%;
      opacity: 0;
    }
    .swiper-button-prev:hover {
      color: rgb(168, 168, 168);
      background: linear-gradient(to right, rgb(82, 82, 82) , rgba(182, 182, 182, 0));
      opacity: 1;
    }
    .swiper-button-next:hover {
      color: rgb(168, 168, 168);
      background: linear-gradient(to right, rgba(182, 182, 182, 0) , rgb(82, 82, 82));
      opacity: 1;
    }
    span {
      width: 92%;
      padding: 0 4%;
    }
    hr {
      width: 100%;
      background-color: black;
      border-width: 0.8px;
      border-style: double;
      border-left-style: hidden;
      border-right-style: hidden;
    }
    #single-music-list {
      width: 100%;
      height: 90%;
      font-size: 1vw;
      background: #ffffff66;
      .single-music-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 10%;
        background: #ffffffff;
        .single-music-item-number {
          width: calc(7% - 1vw);
          padding-left: 2vw;
          // background: green;
        }
        .single-music-item-name {
          width: calc(30% - 1vw);
          padding-left: 1vw;
          // background: red;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
        }
        .single-music-item-artists {
          width: 20%;
          // background: blue;
        }
        .single-music-item-album {
          display: inline-block;
          width: 25%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          // background: red;
        }
        .single-music-item-duration {
          width: 10%;
          // background: green;
        }
      }
    }
    #music-album-list {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: space-between;
      height: 90%;
      .music-album-item {
        width: 17%;
        height: 50%;
        .music-album-item-cover {
          width: 0;
          height: 0;
          padding: 50%;
          background: url(https://p1.music.126.net/6wOX7u8h6_HdtxeLxz9AxA==/2022001883517029.jpg?param=500y500) 50% 50% no-repeat;
          background-size: cover;
        }
        .music-album-item-title {
          display: inline-block;
          word-break: break-all;
          width: 100%;
          height: 4em;
          font-size: 1vw;
        }
      }
    }
  }
}
</style>