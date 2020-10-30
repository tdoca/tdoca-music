<template>
  <div id="app">
    <div id="bg"></div>
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
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

*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
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
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  // filter: blur(2px);
  // z-index: -1;
}

#bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%;
  // https://s2.ax1x.com/2020/03/10/8CQoFO.png
  // https://i1.100024.xyz/i/2020/10/12/k9nht5.jpg
  background-image: url("https://i1.100024.xyz/i/2020/10/12/k9nht5.jpg");
  background-size: cover;
  z-index: 1;
}

#bg::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* 从父元素继承 background 属性的设置 */
  background: inherit;
  filter: blur(7px);
  z-index: 2;
}

#main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% + -10px));
  overflow-y: hidden;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 80%;
  height: calc(100% - 20px);
  margin: 10px 0 10px 0;
  padding: 0 10% 0 10%;
  background-clip: content-box;
  background-color: #9696964d;
  z-index: 3;
}
</style>
