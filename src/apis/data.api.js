import axios from 'axios'

export const baseURL = 'http://125.227.50.137'
export const dataServerPort = 5001

export const sequelizeApiBaseURL = `${baseURL}:${dataServerPort}/api/`

export const sequelizeApi = axios.create({
    baseURL: sequelizeApiBaseURL,
    withCredentials: false, //跨域設定
})