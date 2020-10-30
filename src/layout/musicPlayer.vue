<template>
  <div id="music-player">
    <div id="music-cover">
      <div id="image-border"></div>
      <div id="cover-image"></div>
    </div>
    <div id="music-controller">
      <div
        id="music-name"
        style="font-size:0.8em; height:1.4em; overflow: hidden; font-weight:700; user-select:none; -webkit-user-seletct:none; -moz-user-seletct:none; -ms-user-seletct:none;"
      ></div>
      <svg
        id="previous"
        class="icon"
        aria-hidden="true"
        style="font-size:1.8em; margin-right:5px; cursor:pointer"
        v-on:click="previousMusic()"
      >
        <use xlink:href="#iconkuaitui" />
      </svg>
      <svg
        id="play"
        class="icon"
        aria-hidden="true"
        style="font-size:2.5em; margin-right:5px; cursor:pointer"
        v-on:click="playMusic()"
      >
        <use xlink:href="#iconzanting1" />
      </svg>
      <svg id="next" class="icon" aria-hidden="true" style="font-size:1.8em; cursor:pointer" v-on:click="nextMusic()">
        <use xlink:href="#iconkuaijin" />
      </svg>

      <div
        id="music-bar"
        style="width:90%; height:3px; margin:0 auto; margin-top:3px; margin-bottom:3px; background:rgb(190, 190, 190); cursor:pointer;"
        @mousedown="musicBarChange()"
      >
        <div style="height:3px; background:rgb(100, 100, 100);"></div>
        <div
          style="margin-top:-3px; width:0; height:3px; min-width:0px; max-width:100%; background:rgb(60, 60, 60);"
        ></div>
      </div>

      <svg
        id="lyrics"
        class="icon"
        aria-hidden="true"
        style="font-size:1em; margin-right:5px; cursor:pointer"
      >
        <use xlink:href="#icongeci" />
      </svg>
      <svg
        id="song-list"
        class="icon"
        aria-hidden="true"
        style="font-size:1em; margin-right:5px; cursor:pointer"
      >
        <use xlink:href="#iconliebiao1" />
      </svg>
      <svg
        id="play-mode"
        class="icon"
        aria-hidden="true"
        style="font-size:1em; cursor:pointer"
        v-on:click="playModeChange()"
      >
        <use xlink:href="#iconlist" />
      </svg>
    </div>
    <div id="music-list"></div>
  </div>
</template>
<script>
export default {
  name: "music-player",
  data:function(){
    return{
      music : null,
      coverImage : this.$refs.coverImage,
      imageBorder : this.$refs.imageBorder,
      musicItem : null,
      musicName : null,
      musicBar : null,
      musicBarBuffer : null,
      musicBarValue : null,
      musicRootPath : "https://music.163.com/song/media/outer/url?id=",
      coverRootPath : "https://p1.music.126.net/",
      musicObj : null,
      musicList : null,
      playMode : ["list","single","random"],
      scale : 0,
      musicCoverMove : null,
      musicBarMove : null,
    }
  },
  created:function(){
    this.music = document.createElement("audio");
    this.music.playMode = 0;
    const coverRootPath = this.coverRootPath;
    const musicRootPath = this.musicRootPath;
    this.musicObj = function(name,musicSource,coverSource){
      this.name = name;
      this.cover = coverRootPath + coverSource +"?param=500y500";
      this.src = musicRootPath + musicSource;
    }
    const musicObj = this.musicObj;
    this.musicList = [
        new musicObj("God knows...","22826401.mp3","6wOX7u8h6_HdtxeLxz9AxA==/2022001883517029.jpg"),
        new musicObj("lost my misic","22826405.mp3","6wOX7u8h6_HdtxeLxz9AxA==/2022001883517029.jpg"),
        new musicObj("こいのうた","31426678.mp3","E4rGcR6s7C2xdHZyn2FMRw==/109951163597282351.jpg"),
        new musicObj("ふわふわ時間","26201862.mp3","l11rCDiuqpRkurWDbzcL-A==/109951163598270163.jpg"),
        new musicObj("Don't say \"lazy\"","26201885.mp3","t5MZk4JbC7lZ9JfFloAbVw==/109951163597290217.jpg"),
        new musicObj("NO, Thank You!","26201979.mp3","w3N1-_X7nG2eZUtpb--LHQ==/109951163598117027.jpg"),
        new musicObj("LITTLE BUSTERS","4997987.mp3","0-Zz4-DngekfJAgz1sCSlQ==/109951163351490277.jpg"),
        new musicObj("LAST DINOSAUR","840197.mp3","X3t_2Zgny2poMWcDQA0QFQ==/109951163351509575.jpg"),
        new musicObj("Come Down","839930.mp3","e6TPg-9fX7xU3VZST-U5CQ==/109951163351614317.jpg"),
        new musicObj("Funny Bunny","839938.mp3","e6TPg-9fX7xU3VZST-U5CQ==/109951163351614317.jpg"),
        new musicObj("打上花火","496869422.mp3","ZUCE_1Tl_hkbtamKmSNXEg==/109951163009282836.jpg"),
        new musicObj("玩具","41659256.mp3","KHqGDy5zFlQb5WOQTBNhjg==/18150737951738895.jpg"),
        new musicObj("Don't Cry","1482115001.mp3","HIvYLxhz-t28kjeG8pVwqA==/109951165342855986.jpg"),
        new musicObj("Sweet Child O' Mine","1482113923.mp3","HIvYLxhz-t28kjeG8pVwqA==/109951165342855986.jpg"),
        new musicObj("Knockin' On Heaven's Door","1482114998.mp3","HIvYLxhz-t28kjeG8pVwqA==/109951165342855986.jpg"),
        new musicObj("November Rain","1482113929.mp3","HIvYLxhz-t28kjeG8pVwqA==/109951165342855986.jpg")
      ];
    this.musicItem = this.musicList[0];
    this.music.setAttribute("src", this.musicItem.src);
  },
  mounted:function(){
    this.coverImage = document.querySelector("#cover-image");
    this.imageBorder = document.querySelector("#image-border");
    this.musicName = document.querySelector("#music-name");
    this.musicBar = document.querySelector("#music-bar");
    this.musicBarBuffer = this.musicBar.childNodes[0];
    this.musicBarValue = this.musicBar.childNodes[1];

    const musicList = this.musicList;
    for (let i = 0; i < musicList.length; i++) {
      if (i == 0) {
        musicList[i].previous=musicList[musicList.length - 1];
        musicList[i].next=musicList[i + 1];
        continue;
      } else if (i == musicList.length - 1) {
        musicList[i].previous=musicList[i - 1];
        musicList[i].next=musicList[0];
        continue;
      }
      musicList[i].previous=musicList[i - 1];
      musicList[i].next=musicList[i + 1];
    }

    let musicCoverWhirl = ()=>{
      this.musicCoverMove = setInterval(() => {
        this.coverImage.style.webkitTransform =
          "rotate(" + (this.scale += 0.1).toString() + "deg)";
        this.imageBorder.style.webkitTransform =
          "rotate(" + (this.scale += 0.1).toString() + "deg)";
      }, 10)
    }
    let musicBarValueBuff = ()=>{
      this.musicBarMove = setInterval(()=>{
        try{
          this.musicBarBuffer.style.width = this.music.buffered.end(this.music.buffered.length-1) / this.music.duration * 100 + "%";
          this.musicBarValue.style.width = this.music.currentTime / this.music.duration * 100 + "%";
        }catch(err){
          throw null;
        }
      },300)
    }

    this.musicName.innerText = this.musicItem.name;

    const music = this.music;
    const musicName = this.musicName;
    const coverImage = this.coverImage;

    music.addEventListener("play",()=>{
      musicCoverWhirl();
      musicBarValueBuff();
      document.querySelector("#play").firstChild.setAttribute("xlink:href", "#iconbofang");
    });

    music.addEventListener("pause",()=>{
      clearInterval(this.musicCoverMove);
      clearInterval(this.musicBarMove);
      document.querySelector("#play").firstChild.setAttribute("xlink:href", "#iconzanting1");
    });

    const musicCoverStop = this.musicCoverStop;
    music.addEventListener("ended",()=>{
      if(music.playMode==0){
        musicCoverStop();
        clearInterval(this.musicBarMove);
        this.musicItem = this.musicItem.next;
        musicName.innerText = this.musicItem.name;
        coverImage.style.backgroundImage = "url(\"" + this.musicItem.cover +"\")";
        music.setAttribute("src",this.musicItem.src);
        music.play();
      }else if(music.playMode==1){
        music.pause();
        music.setAttribute("src",this.musicItem.src);
        music.play();
      }else if(music.playMode==2){
        musicCoverStop();
        clearInterval(this.musicBarMove);
        this.musicItem = musicList[parseInt((Math.random()*(musicList.length-1))+1)];
        musicName.innerText = this.musicItem.name;
        coverImage.style.backgroundImage = "url(\"" + this.musicItem.cover +"\")";
        music.setAttribute("src",this.musicItem.src);
        music.play();
      }
    });

    for (let i = 0; i < musicList.length; i++) {
    let musicListItem = document.createElement("div");
    musicListItem.innerText = i+1 + ". " + musicList[i].name;
    musicListItem.addEventListener("click", ()=> {
      if (music.getAttribute("src") != musicList[i].src) {
        this.musicItem=musicList[i];
        music.setAttribute("src",this.musicItem.src);
        musicCoverStop();
        clearInterval(this.musicBarMove);
        musicName.innerText = this.musicItem.name;
        coverImage.style.backgroundImage = "url(\"" + this.musicItem.cover +"\")";
        music.play();
      } else if (music.getAttribute("src") == musicList[i].src) {
        if (music.paused == true) {
          music.play();
        } else {
          music.pause();
        }
      }
    });
    document.querySelector("#music-list").appendChild(musicListItem);
  }
  },
  methods:{
    musicCoverStop : function() { 
      clearInterval(this.musicCoverMove);
      this.scale = 0;
      this.coverImage.style.webkitTransform = "rotate(0deg)";
      this.imageBorder.style.webkitTransform = "rotate(0deg)";
    },

    playModeChange : function(){
      if(this.music.playMode==this.playMode.length-1){
        this.music.playMode=0;
        document.querySelector("#play-mode").firstChild.setAttribute("xlink:href", "#icon"+this.playMode[this.music.playMode]);
        return;
      }
      this.music.playMode++;
      document.querySelector("#play-mode").firstChild.setAttribute("xlink:href", "#icon"+this.playMode[this.music.playMode]);
    },

    playMusic : function() {
      if (this.music.paused == true) {
        this.music.play();
        document.querySelector("#play").firstChild.setAttribute("xlink:href", "#iconbofang");
      } else {
        this.music.pause();
        document.querySelector("#play").firstChild.setAttribute("xlink:href", "#iconzanting1");
      }
    },

    previousMusic : function() {
      if(this.music.playMode==1){
        clearInterval(this.musicBarMove);
        clearInterval(this.musicCoverMove);
        this.music.load();
        this.music.play();
        return;
      }else if(this.music.playMode==2){
        this.musicCoverStop();
        clearInterval(this.musicBarMove);
        this.musicItem = this.musicList[parseInt((Math.random()*(this.musicList.length-1))+1)];
        this.musicName.innerText = this.musicItem.name;
        this.musicCover.style.backgroundImage = "url(\""+ this.musicItem.cover +"\")";
        this.music.setAttribute("src",this.musicItem.src);
        this.music.play();
        return;
      }
      this.musicCoverStop();
      clearInterval(this.musicBarMove);
      this.musicItem = this.musicItem.previous;
      this.musicName.innerText = this.musicItem.name;
      this.coverImage.style.backgroundImage = "url(\""+ this.musicItem.cover +"\")";
      this.music.setAttribute("src",this.musicItem.src);
      this.music.play();
    },

    nextMusic : function() {
      if(this.music.playMode==1){
        clearInterval(this.musicBarMove);
        clearInterval(this.musicCoverMove);
        this.music.load();
        this.music.play();
        return;
      }else if(this.music.playMode==2){
        this.musicCoverStop();
        clearInterval(this.musicBarMove);
        this.musicItem = this.musicList[parseInt((Math.random()*(this.musicList.length-1)))];
        this.musicName.innerText = this.musicItem.name;
        this.musicCover.style.backgroundImage = "url(\""+ this.musicItem.cover +"\")";
        this.music.setAttribute("src",this.musicItem.src);
        this.music.play();
        return;
      }
      this.musicCoverStop();
      clearInterval(this.musicBarMove);
      this.musicItem = this.musicItem.next;
      this.musicName.innerText = this.musicItem.name;
      this.coverImage.style.backgroundImage = "url(\""+ this.musicItem.cover +"\")";
      this.music.setAttribute("src",this.musicItem.src);
      this.music.play();
    },

    musicBarValueChange : function() {
      clearInterval(this.musicBarMove);
      let barLeftWidth = this.musicBar.offsetLeft + document.querySelector("#left-side").offsetLeft;
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
};

</script>
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#music-player {
  height: 100%;
  width: 100%;
}
#music-cover {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
#cover-image {
  display: inline-block;
  background: no-repeat 50% 50%;
  background-image: url("https://p1.music.126.net/6wOX7u8h6_HdtxeLxz9AxA==/2022001883517029.jpg?param=500y500");
  background-size: cover;
  height: 80px;
  width: 80px;
  margin: 20px;
}
#image-border {
  position: absolute;
  display: inline-block;
  background: url("https://s2.music.126.net/style/web2/img/ie6/singlecover.png") no-repeat 50% 50%;
  background-size: 100%;
  width: 120px;
  height: 120px;
  z-index: 1;
}

#music-controller {
  height: 90px;
  width: 100%;
  overflow: hidden;
  text-align: center;
}

#music-list {
  width: 100%;
  height: calc(100% - 210px);
  overflow-y: scroll;
  overflow-x: hidden;
}

#music-list div {
  font-size: 1em;
  font-weight: 700;
  line-height: 2em;
  height: 2em;
  padding: 0 5px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  -webkit-user-seletct: none;
  -moz-user-seletct: none;
  -ms-user-seletct: none;
  transition: background-color 0.5s;
}

#music-list div:hover {
  background-color: #4b4b4b80;
}

#music-list::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

#music-list::-webkit-scrollbar-thumb {
  border-radius: 0px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

#music-list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0px;
  background: rgba(0, 0, 0, 0.1);
}
</style>