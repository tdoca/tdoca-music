import Music from '@/libs/music.js'
import { getMusicListByIds, getMusicById, addMusicToPlayHistory, removeMusicOfPlayHistory } from '@/libs/api.js'

export default {
    state: {
        audio: document.createElement('audio'),
        play_item: new Music({}),
        play_list: [],
        history_list: [],
        musicPlayEvent: null,
        play_mode: 'list'
    },
    getters: {
        getAudio: state => {
            return state.audio
        },
        getPlayList: state => {
            return state.play_list
        },
        getPrevMusic: state => {
            return state.play_item.prev
        },
        getNextMusic: state => {
            return state.play_item.next
        },
        getPlayMode: state => {
            return state.play_mode
        },
        getPlayItem: state => {
            return state.play_item
        },
        getHistoryList: state=> {
            return state.history_list
        }
    },
    mutations: {
        setPlayMode: (state, playMode) => {
            state.play_mode = playMode
        },
        setMusicItem: (state, music) => {
            state.play_item = music
            state.audio.setAttribute('src', state.play_item.source)
        },
        addMusicToList: (state, music) => {
            state.play_list.push(music)
        },
        removeMusicOfList: (state, index) => {
            state.play_list[index].prev.next = state.play_list[index].next
            state.play_list[index].next.prev = state.play_list[index].prev
            state.play_list.splice(index, 1)
        },
        setHistoryList: (state, musicList) => {
            state.history_list = musicList
        }
    },
    actions: {
        musicInit: async ({commit}, music) => {
            console.log('musicInit')
            if(music.source != null) {
                commit('setMusicItem', music)
            }else {
                await getMusicById(music.id).then((result)=>{
                    commit('setMusicItem', result)
                    music = result
                })
            }
            return music
        },
        musicListInit: async ({state, dispatch}, play_list) => {
            console.log('musicListInit')

            let query = `${play_list[0].id}`
            for(let i=1; i<play_list.length; i++) {
                query+=`,${play_list[i].id}`
            }

            await getMusicListByIds(query).then((result)=>{
                play_list = result
                play_list[0].prev = play_list[play_list.length - 1]
                play_list[0].next = play_list[1]
                for(let i=1; i<play_list.length-1; i++) {
                    play_list[i].prev = play_list[i - 1]
                    play_list[i].next = play_list[i + 1]
                }
                play_list[play_list.length - 1].prev = play_list[play_list.length - 2]
                play_list[play_list.length - 1].next = play_list[0]
            })
            dispatch('musicInit', play_list[0])
            return state.play_list = play_list
        },
        playMusic: ({state}) => {
            state.audio.play()
        },
        pauseMusic: ({state}) => {
            state.audio.pause()
        },
        addMusicToPlayList: ({state},music) => {
            console.log(music)
            state.play_list[0].prev = music
            state.play_list[state.play_list.length-1].next = music
            music.prev = state.play_list[state.play_list.length-1]
            music.next = state.play_list[0]
            state.play_list.push(music)
        },
        addMusicToHistoryList: ({state, getters}, music) => {
            if(state.history_list.indexOf(music) == -1) {
                if(state.history_list.length >= 50) {
                    state.history_list.unshift(music)
                    state.history_list.splice(state.history_list.length-1, 1)
                }else {
                    state.history_list.unshift(music)
                }
                if(getters.getLoginStatus == true) {
                    addMusicToPlayHistory({uid: getters.getUid, mid: music.id})
                }
            }
        },
        removeMusicOfHistoryList: ({state, getters}, music) => {
            state.history_list.splice(state.history_list.indexOf(music), 1)
            if(getters.getLoginStatus == true) {
                removeMusicOfPlayHistory({uid: getters.getUid, mid: music.id})
            }
        }
    }
}