import { sequelizeApi as api } from "../../../apis/data.api"

const optionsBaseUrl = 'options'

export const getOptions = async (tableName, groups) => {
    var query = `tableName=${tableName}`
    if(groups) query += `&groups=${groups}`
    return api.get(`${optionsBaseUrl}?${query}`).then(res => res.data)
}

const baseUrl = 'optionsView'

export const findAll = async () => 
    api.get(`${baseUrl}s`).then(res => res.data)

export const findOne = async id => 
    api.get(`${baseUrl}/${id}`).then((res) => res.data)

