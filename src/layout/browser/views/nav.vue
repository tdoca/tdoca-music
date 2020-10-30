<template>
  <div id="browser-nav">
    <div id="user-container"></div>
  </div>
</template>
<script>
export default {
  name: 'browser-nav'
}
</script>
<style lang="scss">
@import '../base.scss';

#browser-nav {
  // @include base;
  width: 100%;
  height: 100%;
  #user-container {
    width: 100%;
    height: 10%;
    margin-top: 20%;
    background: yellow;
  }
}
</style>