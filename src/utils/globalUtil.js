import { FORM_ACTION, FIELD_TYPE, SESSION_USER_OBJECT } from "../constants/globalConstant"
import { v4 as uuidv4 } from "uuid";

export const setDataToSession = (key, data) => {
    sessionStorage.setItem(key,JSON.stringify(data))
}

export const getSessionData = (key) => {
    return JSON.parse(sessionStorage.getItem(key))
}

export const removeSessionData = (key) => {
    sessionStorage.removeItem(key)
}

export const clearSessionData = () => sessionStorage.clear()

export const getDefaultValuesFromFields = (fields) => {

    var defaultValues = {};

    fields.forEach(field => {
      if(field?.multiple)
        defaultValues[field?.name] = []
      else {
        if(field?.defaultValue)
            defaultValues[field?.name] = field?.defaultValue
        else {
            if(field?.fieldType === FIELD_TYPE.NUMBER_FIELD) {
                defaultValues[field?.name] = 0
            } else if(field?.fieldType === FIELD_TYPE.SELECT_FIELD && field?.multiple) {
                defaultValues[field?.name] = []
            } else{
                defaultValues[field?.name] = ''
            }
        }
      }
    })

    return defaultValues
}

export const getInputPropsByStatus = (formAction)=>{
    let obj = {}
    switch(formAction){
        case FORM_ACTION.VIEW :
        case FORM_ACTION.DELETE :
        case FORM_ACTION.SIGN:
            obj['readOnly'] = true;
            break
        default:
    }
    return obj
}

export const setInsertBaseValue = (formValue) => {
    const sessionUser = getSessionData(SESSION_USER_OBJECT)
    formValue.id = uuidv4()
    formValue.applicant = sessionUser.applicant
    formValue.sysNo = sessionUser.sysNo
    formValue.createDept = sessionUser.createDept
}

export const getNewFormValues = (formValues) => {
    let newFormValues = formValues
    for (const [key, value] of Object.entries(newFormValues)) {
        if (value === null) {
            newFormValues[key] = '';
        }
    }
    return newFormValues
}