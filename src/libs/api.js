const axios = require('axios')
import Music from './music.js'

export const signIn = ({username,password}) => {
  console.log(username,password)
  return axios.request({
    url: '/api/signIn',
    data: {
      username,
      password
    },
    method: 'post'
  })
}

export const signUp = ({username,password}) => {
  return axios.request({
    url: '/api/signUp',
    data: {
      username,
      password
    },
    method: 'post'
  })
}

export const search = ({keywords}) => {
  return axios.request({
    url: '/api/search',
    params: {
      keywords
    },
    method: 'get'
  })
}

export const getMusicUrlById = ({id}) => {
  return axios.request({
    url: '/api/getMusicUrlById',
    params: {
      id
    },
    method: 'get'
  })
}

export const getMusicDetailById = ({ids}) => {
  return axios.request({
    url: '/api/getMusicDetailById',
    params: {
      ids
    },
    method: 'get'
  })
}

export const createSongSheet = ({title, uid}) => {
  return axios.request({
    url: '/api/createSongSheet',
    data: {
      title,
      uid
    },
    method: 'post'
  })
}

export const getSongSheetByUid = ({uid}) => {
  return axios.request({
    url: '/api/getSongSheetByUid',
    data: {
      uid
    },
    method: 'post'
  })
}

export const addMusicToSongSheet = ({sid,mid}) => {
  return axios.request({
    url: '/api/addMusicToSongSheet',
    data: {
      sid,
      mid
    },
    method: 'post'
  })
}

export const getLyricById = ({id}) => {
  let result = new Array
  axios.request({
    url: '/api/getLyricById',
    params: {
      id
    },
    method: 'get'
  }).then(res=>{
    if('lrc' in res.data.body) {
      let lyric_list = res.data.body.lrc.lyric.split('\n')
      lyric_list.forEach(function(item){
        if(item.split(']')[1]=='' || item=='') {
          return
        }
        let time = item.substring(item.indexOf('[')+1, item.indexOf(']'))
        let min = parseInt(time.split(':')[0])*60
        let sec = parseFloat(time.split(':')[1])
        let duration = parseFloat((min+sec).toFixed(2))
        result.push({
          lrc: item.substring(item.indexOf(']')+1),
          dt: duration
        })
      })
    }
  })
  return result
}

export const getPlayHistoryByUid = ({uid}) => {
  return axios.request({
    url: '/api/getPlayHistoryByUid',
    data: {
      uid
    },
    method: 'post'
  })
}

export const addMusicToPlayHistory = ({uid,mid}) => {
  return axios.request({
    url: '/api/addMusicToPlayHistory',
    data: {
      uid,
      mid
    },
    method: 'post'
  })
}

export const removeMusicOfPlayHistory = ({uid,mid}) => {
  return axios.request({
    url: '/api/removeMusicOfPlayHistory',
    data: {
      uid,
      mid
    },
    method: 'post'
  })
}

export const getMusicById = async (query) => {
  console.log('getMusicById')
  let result
  await axios.all([getMusicUrlById({id:query}), getMusicDetailById({ids:query}),getLyricById({id:query})]).then(axios.spread(function(music_url,music_detail,music_lyric){
    let music_url_list = music_url.data.body.data
    let music_detail_list = music_detail.data.body.songs
    console.log(music_url_list,music_detail_list,music_lyric)
    music_url = music_url_list[0]
    music_detail = music_detail_list[0]
    result = new Music({
      id: music_url.id,
      source: music_url.url,
      cover: music_detail.al.picUrl,
      name: music_detail.name,
      duration: music_detail.dt,
      album: {
        name: music_detail.al.name,
        id: music_detail.al.id
      },
      artists: {
        name: music_detail.ar[0].name,
        id: music_detail.ar[0].id
      },
      lyric: music_lyric
    })
  }))
  return result
}

export const getMusicListByIds = async (query) => {
  let music_list = []
  await axios.all([getMusicUrlById({id:query}), getMusicDetailById({ids:query})]).then(axios.spread(function(music_url,music_detail){
    let music_url_list = music_url.data.body.data
    let music_detail_list = music_detail.data.body.songs
    let query_id_list = query.split(',')
    let query_id = null
    for(let i = 0, length = query_id_list.length; i<length; i++) {
      query_id = query_id_list[i]
      let music_obj = new Music({})
      for(let j = 0; j<length; j++) {
        music_url = music_url_list[j]
        if(query_id == music_url.id) {
          music_obj.id = query_id
          music_obj.source = music_url.url
          break
        }
      }
      for(let k = 0; k<length; k++) {
        music_detail = music_detail_list[k]
        if(query_id == music_detail.id) {
          music_obj.cover = music_detail.al.picUrl
          music_obj.name = music_detail.name
          music_obj.duration = music_detail.dt
          music_obj.album = {
            name: music_detail.al.name,
            id: music_detail.al.id
          }
          music_obj.artists = {
            name: music_detail.ar[0].name,
            id: music_detail.ar[0].id
          }
          break
        }
      }
      music_list.push(music_obj)
    }
  }))
  return music_list
}

export const downloadSource = (url)=>{
  console.log(url)
  return axios.request({
    url: '/api/downloadSource',
    params: {
      url
    },
    method: 'get',
    responseType: 'arraybuffer'
  })
}