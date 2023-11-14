import axios from 'axios'

export const BASE_API_URL = 'https://fantasia.kg:8080/api'

export const axiosRequest = axios.create({
  baseURL: BASE_API_URL,
})
