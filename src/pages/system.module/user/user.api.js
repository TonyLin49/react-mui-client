import { sequelizeApi as api } from '../../../apis/data.api'

const baseUrl = 'user'

export const findAll = async (params) => 
    api.get(`${baseUrl}s`, params).then(res => res.data)

export const findOne = async (id) => 
    api.get(`${baseUrl}/${id}`).then(res => res.data)

export const findByCode = async code =>
    api.get(`${baseUrl}?code=${code}`).then((res) => res.data)

export const findByEmail = async (email) => 
    api.get(`${baseUrl}?email=${email}`).then(res => res.data)

export const findByCodeAndPassword = async (code, password) => 
    api.get(`${baseUrl}active?code=${code}&password=${password}`)
    .then(res => {
        if(res.status===401) {
            return null
        }
        return res.data
    })
    .catch(error=> console.log(error))

export const findByCodeOrEmail = async (code, email) => {
    const emailUsers = await findByEmail(email)
    if(emailUsers) return emailUsers
    const hasUsers = await findByCode(code)
    if(hasUsers) return hasUsers
}

export const update = async (rowData) =>
    api.put(`${baseUrl}`, rowData).then((res) => res.data)

export const create = async formData => {
    api.post(`${baseUrl}`, formData).then((res)=>res.data) 
}

export const destroy = async (id) =>
    api.delete(`${baseUrl}/${id}`).then((res)=>res.data)

export const destroyMany = async (idArray) => 
    api.delete(`${baseUrl}`, {data: idArray}).then((res)=>res.data)
