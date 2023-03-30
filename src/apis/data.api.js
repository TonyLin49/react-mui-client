import axios from 'axios'

export const baseURL = 'http://192.168.68.111'
export const dataServerPort = 5001

export const sequelizeApiBaseURL = `${baseURL}:${dataServerPort}/api/`

export const sequelizeApi = axios.create({
    baseURL: sequelizeApiBaseURL,
    withCredentials: false, //跨域設定
})