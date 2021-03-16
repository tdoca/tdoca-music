// const coverRootPath = "https://p1.music.126.net/"
// const musicRootPath = "http://localhost:8888/api/getMusic?musicName="
                     //https://music.163.com/song/media/outer/url?id=
                     //http://localhost:8888/getMusic?name=
import {getMusicUrlById} from '@/libs/api.js'
import axios from 'axios'
import { getMusicDetailById } from '../../libs/api'

export default {
    state: {
        audio: document.createElement('audio'),
        Music: function({id, name, source, cover, artists, album, duration, favorites}) {
            this.id = id
            this.name = name
            this.source = source
            this.cover = cover
            this.artists = artists
            this.album = album
            this.duration = duration
            this.favorites = favorites
            this.prev = null
            this.next = null
            return this
        },
        play_item: {
            name: '',
            source: '',
            cover: '',
            prev: null,
            next: null
        },
        play_list: [],
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
        }
    },
    mutations: {
        addMusicToList: (state, musicObj) => {
        // if(state.play_list[state.play_list.length - 1])
            state.play_list.push(musicObj)
        },
        setMusicItem: (state, music) => {
            state.play_item = music
            // state.play_item.prototype = state.Music
            state.audio.setAttribute('src', state.play_item.source)
        }
    },
    actions: {
        musicInit: ({commit}, music) => {
            return commit('setMusicItem', music)
        },
        musicListInit: async ({state, commit}, play_list) => {
            play_list[0].prev = play_list[play_list.length - 1]
            play_list[0].next = play_list[1]
            let query = play_list[0].id
            for(let i=1; i<play_list.length-1; i++) {
                play_list[i].prev = play_list[i - 1]
                play_list[i].next = play_list[i + 1]
                query+=`,${play_list[i].id}`
            }
            play_list[play_list.length - 1].prev = play_list[play_list.length - 2]
            play_list[play_list.length - 1].next = play_list[0]
            query+=`,${play_list[play_list.length-1].id}`

            await axios.all([getMusicUrlById({id:query}), getMusicDetailById({ids:query})]).then(axios.spread(function(music_url,music_detail){
                for(let i = 0; i<play_list.length; i++){
                    play_list[i].source = music_url.data.body.data[i].url
                    play_list[i].cover = music_detail.data.body.songs[i].al.picUrl
                    play_list[i].name = music_detail.data.body.songs[i].name
                    play_list[i].duration = music_detail.data.body.songs[i].dt
                    play_list[i].album = {
                        name: music_detail.data.body.songs[i].al.name,
                        id : music_detail.data.body.songs[i].al.id
                    }
                    play_list[i].artists = {
                        name: music_detail.data.body.songs[i].ar[0].name,
                        id: music_detail.data.body.songs[i].ar[0].id
                    }
                }
            }))
            console.log(play_list)
            commit('setMusicItem', play_list[0])
            return state.play_list = play_list
        },
        playMusic: async ({state, getters}) => {
            if(getters.getPlayListVisibility == true) { //解决当播放列表可见性为true时，播放列表过渡效果不展现bug
                setTimeout(()=>{
                    state.audio.play()
                },300)
            }else {
                state.audio.play()
            }
        }
        // playNext: ({state}) => {
        //     state
        // }
    }
}