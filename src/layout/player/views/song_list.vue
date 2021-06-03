<template>
  <div id="song-sheet">
    <div id="sheet-container" v-if="this.getLoginStatus() == true">
      <div class="song-sheet-block" v-for="songSheetItem in this.getSongSheetList()" :key="songSheetItem.sid">
        <div class="block-cover" :style="{'background-image':`url(${songSheetItem.cover})`}" v-if="songSheetItem.songs.length != 0"></div>
        <div v-else :style="{
          'width': '100%',
          'height': '100%',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'background': '#706f6fa9'
        }">
          <i class="iconfont icon-zhuanji" :style="{
            'font-size': '50px',
            'color': '#c4c3c3'
          }"></i>
        </div>
        <div class="title-container">
          <span>{{songSheetItem.title}}</span>
          <i class="iconfont icon-play" @click="handlePlayButtonClick(songSheetItem)"></i>
        </div>
      </div>
      <div v-show="create_block_visibility" class="song-sheet-block" style="float: left;">
        <div id="create-block" ref="create-block" @click="handleCreateBlockClick">
          <i class="iconfont icon-add"></i>
        </div>
      </div>
      <div v-show="create_order_visibility" id="create-order">
        <div id="title-container">
          标题：
          <input type="text" ref="title">
        </div>
        <div id="submit-container">
          <span id="submit" @click="handleSubmit">确定</span>
          <span id="cancel" @click="create_order_visibility=false;create_block_visibility=true">取消</span>
        </div>
      </div>
    </div>
    <div v-else>
      登陆后查看歌单
    </div>
  </div>
</template>

<script>
import {createSongSheet, getSongSheetByUid, getMusicListByIds, getLyricById} from '@/libs/api'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'song-sheet',
  data: function(){
    return {
      create_block_visibility: true,
      create_order_visibility: false,
    }
  },
  mounted: function(){
    console.log(this.getSongSheetList())
  },
  methods: {
    handleCreateBlockClick: function(){
      this.create_block_visibility = false
      this.create_order_visibility = true
    },
    handleSubmit: function(){
      if(this.$refs['title'].value!='') {
        createSongSheet({
          title: this.$refs['title'].value,
          uid: this.getUid()
        }).then(res=>{
          if(res.data == 'OK') {
            getSongSheetByUid({uid: this.getUid()}).then(res=>{
              // this.setSongSheetList(res.data)
              for(let i=0; i<res.data.length; i++) {
                res.data[i].cover = ''
              }
              this.updateSongSheetList(res.data)
            })
            alert('创建成功')
          }
        })
        this.create_block_visibility=true
        this.create_order_visibility=false
      }
    },
    handlePlayButtonClick: function(songSheetItem){
      getMusicListByIds(songSheetItem.songs.toString()).then(async res=>{
        console.log(res)
        await this.musicListInit(res)
        if(this.getPlayItem().lyric == null) {
          await (this.getPlayItem().lyric = getLyricById({id:this.getPlayItem().id}))
        }
        this.playMusic()
      })
    },
    ...mapGetters(['getUid','getLoginStatus','getSongSheetList','getPlayItem']),
    ...mapMutations(['setSongSheetList','updateSongSheetList']),
    ...mapActions(['musicListInit','playMusic'])
  }
}
</script>

<style lang="scss" scoped>
.create-block-enter-active{
  animation: create-block .3s;
}
.create-block-leave-active{
  animation: create-block .3s reverse;
}
.create-order-enter-active{
  animation: create-order-in .3s;
}
.create-order-leave-active{
  animation: create-order-in .3s reverse;
}
@keyframes create-block{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes create-order-in{
  0%{
    width: 144px;
    height: 144px;
  }
  100%{
    width: 318px;
    height: 144px;
  }
}
#song-sheet {
  width: 100%;
  height: 100%;
  #sheet-container {
    // width: calc(100% - 72px);
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    // align-content: flex-start;
    padding-left: 67px;
    .song-sheet-block{
      width: 144px;
      height: 144px;
      margin-right: 30px;
      margin-bottom: 30px;
      overflow: hidden;
      .block-cover{
        background-size: 100%;
        width: 144px;
        height: 144px;
      }
      .title-container{
        width: 144px;
        height: 144px;
        display: block;
        position: relative;
        float: left;
        top: -144px;
        padding-top: 144px;
        background-clip: content-box;
        background-color: #312e2e9e;
        transition: padding 0.3s;
        span {
          display: inline-block;
          width: 100%;
          height: 104px;
          color: #e1e1e1cc;
        }
        i{
          position: relative;
          font-size: 40px;
          line-height: 40px;
          left: 104px;
          display: inline-block;
          color: #e1e1e1cc;
          cursor: pointer;
        }
        i:hover{
          color: #fff;
        }
      }:hover{
        padding-top: 0;
      }
      #create-block{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(112, 111, 111, 0.664);
        i{
          // display: block;
          font-size: 70px;
          color: #c4c3c3;
        }
      }
    }
    #create-order{
      width: 318px;
      height: 144px;
      background: #706f6fa9;
      div{
        width: calc(100% - 20px);
        margin: 40px 0 0 20px;
        color: rgb(207, 202, 202);
      }
      #submit-container{
        text-align: end;
        #submit{
          cursor: pointer;
        }:hover{
          color: #fff;
        }
        #cancel{
          margin-left: 20px;
          cursor: pointer;
        }:hover{
          color: #fff;
        }
      }
    }
  }
}
</style>