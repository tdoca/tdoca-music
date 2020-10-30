<template>
  <div id="browser-home">
    <div id="home-banner"></div>
  </div>
</template>
<script>
export default {
  name: 'browser-home'
}
</script>
<style lang="scss">
@import '../base.scss';

#browser-home {
  @include base;
  #home-banner {
    width: 60%;
    height: 30%;
    margin: 0 auto;
    margin-top: 2%;
    background: green;
  }
}
</style>