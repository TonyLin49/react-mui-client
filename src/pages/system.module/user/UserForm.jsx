import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    destroy,
    findByEmail, 
    findByCode, 
    create, 
    update
} from './user.api'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { localeState, notificationAlertState } from '../../../atoms/globalAtom';
import { userLocale } from './user.locale';
import { employeeOptionsSelector, roleOptionsAtom } from '../../../atoms/optionsAtom';
import { serverMessageAtom } from '../../../atoms/formAtom'

const UserForm = ({
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 420

    const setNotification = useSetRecoilState(notificationAlertState) 
    const [serverMessage, setServerMessage] = useRecoilState(serverMessageAtom)
    const locale = useRecoilValue(localeState)
    
    const [lan, setLan] = useState(userLocale[locale]) //語系資料
    const [formData, setFormData] = useState(currentRow) //表單資料
    const [fieldProps, setFieldProps] = useState({})
    const [codeProps, setCodeProps] = useState({})
    const [emailProps, setEmailProps] = useState({})

    const roleOptions = useRecoilValue(roleOptionsAtom)
    const empOptions = useRecoilValue(employeeOptionsSelector)
    
    
    useEffect(()=>{ //設定表單的語系文字
        setLan(userLocale[locale])
    },[locale])

    useEffect(()=>{
        switch(actionMode){
            case 'insert':
                setFieldProps({color: 'primary'})
                break
            case 'update':
                setFieldProps({color: 'secondary'})
                setCodeProps({disabled: true})
                setEmailProps({disabled: true})
                break
            case 'delete':
                setFieldProps({color: 'error'})
                break
            case 'view':
                setFieldProps({color: 'success', disabled: true})
                break
            default:
                setFieldProps({})
        }
    },[actionMode])


    useEffect(()=>{ 
        setFormData(currentRow)
    },[currentRow])

    const titleText = lan?.title?.label

    const fieldsSchema = [ //表單欄位各項規格設定
        {
            name: 'code', 
            label: lan?.code?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, ...codeProps},
            xs: 6, sm:6, md:6,
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            name: 'displayName', 
            label: lan?.displayName?.label,
            defaultValue: '',
            props: fieldProps
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            name: 'email', 
            label: lan?.email?.label,
            props: {...fieldProps, ...emailProps},
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            name: 'mobile', 
            label: lan?.mobile?.label,
            props: {...fieldProps},
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.PASSWORD_FIELD, 
            name: 'password', 
            label: lan?.password?.label,
            props: fieldProps
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            name: 'applyDate', 
            label: lan?.applyDate?.label,
            defaultValue: '',
            props: fieldProps
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            name: 'startDate', 
            label: lan?.startDate?.label,
            defaultValue: '',
            props: fieldProps
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            name: 'endDate', 
            label: lan?.endDate?.label,
            defaultValue: '',
            props: fieldProps
        },
        {
            xs: 12, sm:12, md:12,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            name: 'role', 
            label: lan?.role?.label,
            defaultValue: '',
            options: roleOptions,
            multiple: true,
            props: fieldProps
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            name: 'empCode', 
            label: lan?.empCode?.label,
            defaultValue: false,
            options: empOptions,
            props: fieldProps
        },
        {
            xs: 6, sm:6, md:6,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            name: 'active', 
            label: lan?.active?.label,
            defaultValue: false,
            props: fieldProps
        },
    ]

    const validateSchema = Yup.object().shape({ //前端表單驗證設定
        code: Yup.string()
                .required(lan?.code?.required),
        displayName: Yup.string()
                .required(lan?.displayName?.required),
        email: Yup.string()
                .email(lan?.email?.format)
                .required(lan?.email?.required ),
        password: Yup.string()
                .min(6,lan?.password?.min)
                // .max(12,lan?.password?.max)
    })

    const accessDataSuccessfully = (message)=>{
        onCloseFC()
        setNotification({
            open: true, 
            message: message, 
            severity: 'success'
        })
        requestAnimationFrame(() => {
            setTimeout(()=>{syncDataFC()},500)
        })
    }

    const submitFC = async (formValues,reset) => {
        setServerMessage(null)
        if(actionMode==='view') onCloseFC()
        if(actionMode==='insert'){
            var checkMessage = null
            const hasUser = await findByCode(formValues?.code) 
            const hasEmailUser = await findByEmail(formValues?.email)
            if(hasUser) checkMessage = '帳號'
            if(hasEmailUser) {
                if(checkMessage) checkMessage = checkMessage+'、電子郵件'
                else checkMessage = '電子郵件'
            }
            if(checkMessage) setServerMessage(`此${checkMessage}已被註冊過，請重新填寫再送出申請`)
            else {
                create(formValues)
                .then(res => accessDataSuccessfully('資料新增成功'))
                .catch(error => setServerMessage(`新增資料發生錯誤：${error}`))
            }
        }
        if(actionMode==='update'){
            update(formValues)
            .then(res=> accessDataSuccessfully('資料修改成功'))
            .catch(error=> setServerMessage(`資料修改發生錯誤：${error}`))
        }
        if(actionMode==='delete'){
            destroy(formValues.id)
            .then(res => accessDataSuccessfully('資料刪除成功'))
            .catch(error => setServerMessage(`刪除資料發生錯誤：${error}`))
        }
        if(serverMessage){
            requestAnimationFrame(() => {
                setTimeout(()=>{setServerMessage(null)},5000)
            })
        }
    }
    
    return (<>
        <HookDynamicForm 
            titleText={titleText}
            submitText={lan?.submit?.label || '送出'}
            formFields={fieldsSchema}
            formDefaultValues={formData}
            validationSchema={validateSchema}
            paperSize={paperSize}
            formAction={actionMode}
            handleCloseForm={handleCloseForm}
            submitFC={submitFC}
        />
    </>)
}

export default UserForm