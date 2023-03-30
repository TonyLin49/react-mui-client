import { sequelizeApi as api } from "../../../apis/data.api"

const baseUrl = 'sample'

export const findAll = async () => 
    api.get(`${baseUrl}s`).then(res => res.data)

export const findOne = async id => 
    api.get(`${baseUrl}/${id}`).then((res) => res.data)

export const findByCode = async code =>
    api.get(`${baseUrl}?code=${code}`).then((res) => res.data)

export const create = async formData => 
    api.post(`${baseUrl}`, formData).then((res)=>res.data) 

export const update = async formData =>
    api.put(`${baseUrl}`, formData).then((res) => res.data)

export const destroy = async id =>
    api.delete(`${baseUrl}/${id}`).then((res)=>res.data)

export const destroyMany = async idArray => 
    idArray.forEach(id => {
        destroy(id).then(res=>console.log(`${id}被刪除了`))
    })
