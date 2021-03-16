<template>
  <div id="user-avatar" ref="user-avatar"></div>
</template>
<script>

export default {
  name: 'user-avatar',
  data() {
    return {
      // avatar: this.$store.getters.get
    }
  },
  mounted() {
    console.log(this.$refs['user-avatar'])
    // let host = window.document.location.host
    this.$refs['user-avatar'].style['background-image']=`url(http://localhost:8888/api/getAvatarByUser)`
  }
}
</script>

<style lang="scss" scoped>
#user-avatar {
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>