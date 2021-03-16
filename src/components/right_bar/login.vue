<template>
  <form id="login" onsubmit="return false" autocomplete="off">
    <div id="login-form-container">
      <span id="login-form-title">Login</span>
      <span id="username-container">username:<input type="text" name="username" id="username" ref="username"></span>
      <span id="password-container">password:<input type="password" name="password" id="password" ref="password"></span>
      <span class="form-button"><input type="submit" value="登录" @click="handleLoginButton"></span>
      <span class="form-button">注册</span>
      <span class="form-button">找回密码</span>
    </div>
  </form>
</template>

<script>
import {login} from '@/libs/api'
export default {
  name: 'login',
  methods: {
    handleLoginButton: function(){
      let username = this.$refs['username'].value
      let password = this.$refs['password'].value
      console.log('login')
      login({username,password})
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #login-form-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 50%;
    margin: 20% auto;
    #username-container, #password-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 20%;
      width: 100%;
      font-size: 20px;
      #username, #password {
        border: 0;
        font-size: 17px;
        border-radius: 0;
        background: #b3b3b394;
        outline: none;
      }
    }
    .form-button {
      display: flex;
      height: 50px;
      font-size: 1.5vw;
      justify-content: center;
      align-items: center;
      input {
        background-color: rgba(0, 0, 0, 0);
        font-size: 1.5vw;
        padding: 0;
        border: 0;
      }
    }
  }
}
</style>