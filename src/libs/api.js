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
    url: 'api/getMusicDetailById',
    params: {
      ids
    },
    method: 'get'
  })
}