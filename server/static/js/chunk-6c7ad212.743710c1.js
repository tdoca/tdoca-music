(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c7ad212"],{"1f50":function(t,e,i){},6192:function(t,e,i){"use strict";i("1f50")},c016:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"song-sheet"}},[1==this.getLoginStatus()?i("div",{attrs:{id:"sheet-container"}},[t._l(this.getSongSheetList(),(function(e){return i("div",{key:e.sid,staticClass:"song-sheet-block"},[0!=e.songs.length?i("div",{staticClass:"block-cover",style:{"background-image":"url("+e.cover+")"}}):i("div",{style:{width:"100%",height:"100%",display:"flex","justify-content":"center","align-items":"center",background:"#706f6fa9"}},[i("i",{staticClass:"iconfont icon-zhuanji",style:{"font-size":"50px",color:"#c4c3c3"}})]),i("div",{staticClass:"title-container"},[i("span",[t._v(t._s(e.title))]),i("i",{staticClass:"iconfont icon-play",on:{click:function(i){return t.handlePlayButtonClick(e)}}})])])})),i("div",{directives:[{name:"show",rawName:"v-show",value:t.create_block_visibility,expression:"create_block_visibility"}],staticClass:"song-sheet-block",staticStyle:{float:"left"}},[i("div",{ref:"create-block",attrs:{id:"create-block"},on:{click:t.handleCreateBlockClick}},[i("i",{staticClass:"iconfont icon-add"})])]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.create_order_visibility,expression:"create_order_visibility"}],attrs:{id:"create-order"}},[i("div",{attrs:{id:"title-container"}},[t._v(" 标题： "),i("input",{ref:"title",attrs:{type:"text"}})]),i("div",{attrs:{id:"submit-container"}},[i("span",{attrs:{id:"submit"},on:{click:t.handleSubmit}},[t._v("确定")]),i("span",{attrs:{id:"cancel"},on:{click:function(e){t.create_order_visibility=!1,t.create_block_visibility=!0}}},[t._v("取消")])])])],2):i("div",[t._v(" 登陆后查看歌单 ")])])},c=[],s=i("1da1"),a=i("5530"),r=(i("96cf"),i("d3b7"),i("25f0"),i("09bb")),o=i("2f62"),l={name:"song-sheet",data:function(){return{create_block_visibility:!0,create_order_visibility:!1}},mounted:function(){console.log(this.getSongSheetList())},methods:Object(a["a"])(Object(a["a"])(Object(a["a"])({handleCreateBlockClick:function(){this.create_block_visibility=!1,this.create_order_visibility=!0},handleSubmit:function(){var t=this;""!=this.$refs["title"].value&&(Object(r["c"])({title:this.$refs["title"].value,uid:this.getUid()}).then((function(e){"OK"==e.data&&(Object(r["i"])({uid:t.getUid()}).then((function(e){for(var i=0;i<e.data.length;i++)e.data[i].cover="";t.updateSongSheetList(e.data)})),alert("创建成功"))})),this.create_block_visibility=!0,this.create_order_visibility=!1)},handlePlayButtonClick:function(t){var e=this;Object(r["g"])(t.songs.toString()).then(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(i),t.next=3,e.musicListInit(i);case 3:if(null!=e.getPlayItem().lyric){t.next=6;break}return t.next=6,e.getPlayItem().lyric=Object(r["d"])({id:e.getPlayItem().id});case 6:e.playMusic();case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},Object(o["c"])(["getUid","getLoginStatus","getSongSheetList","getPlayItem"])),Object(o["d"])(["setSongSheetList","updateSongSheetList"])),Object(o["b"])(["musicListInit","playMusic"]))},d=l,u=(i("6192"),i("2877")),h=Object(u["a"])(d,n,c,!1,null,"3261de55",null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-6c7ad212.743710c1.js.map