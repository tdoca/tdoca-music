const axios = require('axios')

export const login = ({username,password}) => {
  console.log(username,password)
  return axios.request({
    url: '/api/login',
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

export const getTopPlaylist = ()=> {
  return axios.request({
    url: '/api/getTopPlaylist',
    method: 'get'
  })
}

export const getMusicInfoById = async (query) => {
  let result
  await axios.all([getMusicUrlById({id:query}), getMusicDetailById({ids:query})]).then(axios.spread(function(music_url,music_detail){
    let music_url_list = music_url.data.body.data
    let music_detail_list = music_detail.data.body.songs
    console.log(music_url_list,music_detail_list)
    result = {
      id: music_url_list[0].id,
      source: music_url_list[0].url,
      cover: music_detail_list[0].al.picUrl,
      name: music_detail_list[0].name,
      duration: music_detail_list[0].dt,
      album: {
        name: music_detail_list[0].al.name,
        id: music_detail_list[0].al.id
      },
      artists: {
        name: music_detail_list[0].ar[0].name,
        id: music_detail_list[0].ar[0].id
      }
    }
  }))
  return result
}

export const getMusicListInfoByIds = async (query) => {
  let result_list = []
  await axios.all([getMusicUrlById({id:query}), getMusicDetailById({ids:query})]).then(axios.spread(function(music_url,music_detail){
    let music_url_list = music_url.data.body.data
    let music_detail_list = music_detail.data.body.songs
    let id_list = query.split(',')
    for(let i = 0; i<id_list.length; i++) {
      for(let j = 0; j<id_list.length; j++) {
        if(id_list[i] == music_url_list[j].id) {
          result_list[i] = {
            id: music_url_list[j].id,
            source: music_url_list[j].url,
            cover: music_detail_list[j].al.picUrl,
            name: music_detail_list[j].name,
            duration: music_detail_list[j].dt,
            album: {
              name: music_detail_list[j].al.name,
              id: music_detail_list[j].al.id
            },
            artists: {
              name: music_detail_list[j].ar[0].name,
              id: music_detail_list[j].ar[0].id
            }
          }
          break
        }
      }
    }
  }))
  return result_list
}