export default {
  state: {
    name: '',
    avatar: '',
    introduce: '',
    logined: false
  },
  getters: {
    getName: state => {
      return state.name
    },
    getAvatar: state => {
      return state.avatar
    },
    getIntroduce: state => {
      return state.introduce
    },
    getLoginState: state => {
      return state.logined
    }
  },
  mutations: {
    setName: (state, name) => {
      state.name = name
    }
  },
  actions: {
    changeUserName: ({commit}, name) => {
      commit('setName',name)
    }
  }
}