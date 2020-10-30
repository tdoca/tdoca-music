<template>
  <div id="browser">
    <div id="left-side">
      <browser-nav></browser-nav>
    </div>
    <div id="right-side">
      <router-view />
    </div>
    <div id="bottom-side">
      <player-bar></player-bar>
    </div>
  </div>
</template>
<script>
import browserNav from './views/nav'
import playerBar from './views/playerBar'
export default {
  name: 'browser',
  components: {
    browserNav,
    playerBar
  }
}
</script>
<style lang="scss" scoped>
#browser {
  width: 100%;
  height: 100%;
}

#left-side {
  width: 20%;
  height: 90%;
  // display: inline-flex;
  float: left;
  padding: 0 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  background: red;
}
#left-side:hover {
  overflow-y: auto;
  width: calc(20% + 5px);
}

#right-side {
  width: 80%;
  height: 90%;
  float: left;
  // display: inline-flex;
  overflow-x: hidden;
  overflow-y: scroll;
  background: blue;
}

#bottom-side {
  width: 100%;
  height: 10%;
  float: left;
  // display: inline-flex;
  background: green;
}
</style>