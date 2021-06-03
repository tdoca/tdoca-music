<template>
  <form id="register" onsubmit="return false" autocomplete="off">
    <div id="register-form-container">
      <span id="register-form-title">sign up</span>
      <span id="username-container">username:<input type="text" name="username" id="username" ref="username"></span>
      <span class="password-container">password:<input type="password" name="password1" class="password" ref="password1"></span>
      <span class="password-container">password:<input type="password" name="password2" class="password" ref="password2"></span>
      <span class="form-button"><input type="submit" value="提交" @click="handleSubmitButton"></span>
    </div>
  </form>
</template>

<script>
import {signUp} from '@/libs/api'
export default {
  name: 'register',
  methods: {
    handleSubmitButton: function(){
      let username = this.$refs['username'].value
      let password1 = this.$refs['password1'].value
      let password2 = this.$refs['password2'].value
      if(password1 == password2 && username != '' && password1 != ''){
        signUp({username,password:password1}).then(res=>{
          console.log(res)
          if(res.data == true) {
            alert('注册成功')
            this.$store.dispatch('hideRightBar')
          }else{
            alert('此用户名已被注册')
          }
        })
      }else if(username == '') {
        alert('没有输入用户名')
      }else {
        alert('密码不一致或为空')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#register {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #register-form-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 50%;
    margin: 20% auto;
    #username-container, .password-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 20%;
      width: 100%;
      font-size: 20px;
      #username, .password {
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