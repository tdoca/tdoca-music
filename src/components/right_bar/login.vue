<template>
  <form id="login" onsubmit="return false" autocomplete="off">
    <div id="login-form-container">
      <span id="login-form-title">sign in</span>
      <span id="username-container">username:<input type="text" name="username" id="username" ref="username"></span>
      <span id="password-container">password:<input type="password" name="password" id="password" ref="password"></span>
      <span class="form-button"><input type="submit" value="登录" @click="handleSubmitButton"></span>
      <span class="form-button" @click="a">注册</span>
    </div>
  </form>
</template>

<script>
import {signIn, getSongSheetByUid, getMusicListByIds, getPlayHistoryByUid} from '@/libs/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'login',
  methods: {
    handleSubmitButton: function(){
      let username = this.$refs['username'].value
      let password = this.$refs['password'].value
      signIn({username,password}).then(res=>{
        if(res.data.status == 'true') {
          this.$store.commit('setLoginStatus',true)
          this.$store.commit('setUserName',username)
          this.$store.commit('setUid',res.data.uid)
          getSongSheetByUid({uid: res.data.uid}).then(async res=>{
            res = res.data
            for(let i=0; i<res.length; i++) {
              res[i].cover = ''
            }
            await this.$store.commit('updateSongSheetList',res)
            console.log(res)
          })
          getPlayHistoryByUid({uid: this.getUid()}).then(res=>{
            getMusicListByIds(res.data.toString()).then(res=>{
              this.setHistoryList(res)
            })
          })
          alert('登录成功')
          this.$store.dispatch('hideRightBar')
        }else {
          alert('账号或密码错误')
        }
      })
    },
    a: function(){
      this.$store.state.app.right_container_view='register'
    },
    ...mapGetters([
      'getUid'
    ]),
    ...mapMutations([
      'setHistoryList'
    ])
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