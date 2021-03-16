export default {
  state: {
    play_list_visibility: false,
    right_bar_visibility: false,
    search_Keywords: '',
    search_view_visibility: true
  },
  getters: {
    getPlayListVisibility: state => {
      return state.play_list_visibility
    },
    getRightBarVisibility: state => {
      return state.right_bar_visibility
    },
    getSearchKeywords: state => {
      return state.search_Keywords
    },
    getSearchViewVisibility: state => {
      return state.search_view_visibility
    }
  },
  mutations: {
    setSearchKeywords: (state, keywords) => {
      state.search_Keywords = keywords
    }
  },
  actions: {
    hidePlayList: ({state}) => {
      // commit('setPlayListVisibility', false)
      state.play_list_visibility = false
    },
    showPlayList: ({state}) => {
      // commit('setPlayListVisibility', true)
      state.play_list_visibility = true
    },
    hideRightBar: ({state}) => {
      state.right_bar_visibility = false
    },
    showRightBar: ({state}) => {
      state.right_bar_visibility = true
    },
    hideSearchView: ({state}) => {
      state.search_view_visibility = false
    },
    showSearchView: ({state}) => {
      state.search_view_visibility = true
    }
  }
}