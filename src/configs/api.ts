import axios from 'axios'

export const BASE_API_URL = 'http://80.90.189.153:8001/api'

export const axiosRequest = axios.create({
  baseURL: BASE_API_URL,
})
