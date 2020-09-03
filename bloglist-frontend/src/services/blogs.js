import axios from 'axios'
const baseUrl = '/api'


let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}
const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then(response => response.data)
}

const login = (credentials) => {
  const request = axios.post(`${baseUrl}/login`, credentials)
  return request.then(response => response.data)
}

const createBlog = (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(`${baseUrl}/blogs`, newBlog, config)
  return request.then( response => response.data)
}

const updateLikes = (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/blogs/${blog.id}`,blog, config )
  return request.then(response => response.data)
}

const deleteBlog = (blogId) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios.delete(`${baseUrl}/blogs/${blogId}`, config)
  
}

export default { getAll, login, setToken, deleteBlog, createBlog, updateLikes }