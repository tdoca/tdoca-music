import {getMusicDetailById} from '@/libs/api'

export default {
  state: {
    uid: '',
    user_name: '',
    login_status: false,
    song_sheet_list: []
  },
  getters: {
    getUserName: state => {
      return state.user_name
    },
    getLoginStatus: state => {
      return state.login_status
    },
    getUid: state => {
      return state.uid
    },
    getSongSheetList: state => {
      return state.song_sheet_list
    }
  },
  mutations: {
    setUserName: (state, userName) => {
      state.user_name = userName
    },
    setLoginStatus: (state, status) => {
      state.login_status = status
    },
    setUid: (state, uid) => {
      state.uid = uid
    },
    setSongSheetList: (state, songSheetList) => {
      state.song_sheet_list = songSheetList
    },
    updateSongSheetList: (state, song_sheet_list) => {
      let query = new Array
      for(let i=0; i<song_sheet_list.length; i++){
        let songs = song_sheet_list[i].songs
        if(songs.length != 0) {
          query.push(songs[0])
        }
      }
      query = query.toString()
      getMusicDetailById({ids:query}).then(res=>{
        for(let i=0; i<song_sheet_list.length; i++) {
          for(let j=0; j<res.length; j++) {
            if(song_sheet_list[i].songs[0] == res[j].id) {
              song_sheet_list[i].cover = res[j].cover
              break
            }
          }
        }
      })
      state.song_sheet_list = song_sheet_list
    }
  }
}