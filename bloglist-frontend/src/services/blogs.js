import axios from 'axios'
const baseUrl = '/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then(response => response.data)
}

const login = (credentials) => {
  const request = axios.post(`${baseUrl}/login`, credentials)
  return request.then(response => response.data)
}

export default { getAll, login }