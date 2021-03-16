<template>
  <div id="user">
    <div id="user-info-container">
      <div id="user-avatar-container">
        <user-avatar></user-avatar>
      </div>
      <div id="user-name-container">
        <user-name></user-name>
      </div>
      <div id="user-introduce-container">
        <user-introduce></user-introduce>
      </div>
    </div>
    <div id="user-data-container">
      <user-data></user-data>
    </div>
    <div id="user-option-container">
      <div class="user-option-item">
        <span><i class="iconfont icon-set"></i>编辑用户信息</span>
      </div>
      <div class="user-option-item">
        <span><i class="iconfont icon-switch"></i>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import userData from '@/components/user_data'
import userName from '@/components/user_name'
import userAvatar from '@/components/user_avatar'
import userIntroduce from '@/components/user_introduce'

export default {
  name: 'user',
  components: {
    userData,
    userName,
    userAvatar,
    userIntroduce
  }
}
</script>

<style lang="scss">
@mixin item-base {
  width: 90%;
  padding: 5% 5% 0 5%;
}
#user {
  width: 100%;
  height: 100%;
  z-index: 6;
  #user-info-container {
    @include item-base();
    display: inline-flex;
    flex-direction: column;
    height: 25%;
    #user-avatar-container {
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
    #user-name-container {
      height: 25%;
      text-align: center;
      font-size: 30px;
    }
    #user-introduce-container {
      height: 25%;
      font-family: 'Microsoft YaHei';
      font-size: 15px;
    }
  }
  #user-data-container {
    @include item-base();
    height: 10%;
  }
  #user-option-container {
    @include item-base();
    display: flex;
    flex-direction: column;
    height: 20%;
    .user-option-item {
      display: flex;
      height: 40px;
      font-size: 18px;
      align-items: center;
      .iconfont {
        font-size: 20px;
        padding-right: 10px;
      }
    }
  }
}
</style>