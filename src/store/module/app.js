export default {
  state: {
    play_list_visibility: false,
    right_bar_visibility: false,
    menu_visibility: false,
    right_container_view: null,
    search_keywords: '',
    search_view_visibility: true,
    search_page: 1
  },
  getters: {
    getPlayListVisibility: state => {
      return state.play_list_visibility
    },
    getRightBarVisibility: state => {
      return state.right_bar_visibility
    },
    getSearchKeywords: state => {
      return state.search_keywords
    },
    getSearchViewVisibility: state => {
      return state.search_view_visibility
    },
    getSearchPage: state => {
      return state.search_page
    }
  },
  mutations: {
    setSearchKeywords: (state, keywords) => {
      state.search_keywords = keywords
    },
    setSearchPage: (state, page) => {
      state.search_page = page
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