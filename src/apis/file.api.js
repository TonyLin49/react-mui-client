import axios from 'axios'
import { baseURL, dataServerPort } from './data.api'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

export const fileApi = axios.create({
  baseURL: `${baseURL}:${dataServerPort}/api`,
  withCredentials: false, //跨域設定
})

export const uploadFile = (file)=>fileApi.post('upload/files',file)
export const deleteFile = (fileName)=>fileApi.delete('upload/files/delete',fileName)

export const uploadImage = (file)=>fileApi.post('upload/images',file)
export const deleteImage = (fileName)=>fileApi.delete('upload/images/delete',fileName)

export const uploadSignatureImage = (file)=>fileApi.post('upload/signature',file)

export const downloadFile = (fileName)=>fileApi.get(`upload/files/download/${fileName}`)