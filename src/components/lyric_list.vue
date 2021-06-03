<template>
  <div id="lyric-list" ref="lyric-list">
    <span class="lyric-item" ref="lyric-item" v-for="lyricItem in lyricList" :key="lyricList.indexOf(lyricItem)">
      {{lyricItem.lrc}}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'lyric-list',
  props: {
    lyricList: {
      type: Array,
      // required: true
    }
  },
  mounted: function(){
    this.getAudio().addEventListener('timeupdate',()=>{
      // if(this.lyric_list != undefined){
        let lyric_list = this.lyricList
        let current = this.getAudio().currentTime
        if(this.$refs['lyric-item'] != null){
          this.$refs['lyric-item'].forEach(item=>{
            item.style.fontSize = '14px'
            item.style.color = '#e1e1e1cc'
          })
        
          let i=lyric_list.length
          while(i--) {
            if(current >= lyric_list[i].dt) {
              this.$refs['lyric-item'][i].style.fontSize = '18px'
              this.$refs['lyric-item'][i].style.color = '#fff'
              break
            }
          }
          i=lyric_list.length
          while(i--) {
            if(current >= lyric_list[i].dt && i>=3) {
              let overflow_top = 0
              for(let j=0; j<i-2; j++) {
                overflow_top += this.$refs['lyric-item'][j].offsetHeight
              }
              this.$refs['lyric-list'].style.marginTop = '-'+overflow_top+'px'
              break
            }else if(current < lyric_list[3].dt) {
              this.$refs['lyric-list'].style.marginTop = '0px'
            }
          }
        }
    })
  },
  methods: {
    ...mapGetters([
      'getAudio'
    ])
  }
}
</script>

<style lang="scss" scoped>
#lyric-list{
  width: 100%;
  height: 100%;
  transition: margin-top .2s;
  // overflow: hidden;
  .lyric-item{
    width: 100%;
    min-height: 17%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e1e1e1cc;
    font-size: 14px;
    transition: font-size .3s
  }
}
</style>