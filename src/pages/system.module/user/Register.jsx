import { Button, Dialog } from '@mui/material'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { 
    localeState,
    notificationAlertState, 
    openLoginState, 
    openRegisterState 
} from '../../../atoms/globalAtom'
import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from 'react'
import { 
    findByEmail, 
    findByCode, 
    create 
} from './user.api'
import { userLocale } from './user.locale'
import { today } from '../../../utils/dayUtil'
import { serverMessageAtom } from '../../../atoms/formAtom'

const Register = () => {
    const paperSize = 340

    const setNotification = useSetRecoilState(notificationAlertState)
    const setServerMessage = useSetRecoilState(serverMessageAtom)
    const locale = useRecoilValue(localeState)

    const [lan, setLan] = useState(userLocale[locale]) //語系資料
    const [formData, setFormData] = useState(null) //表單資料

    useEffect(()=>{
        setLan(userLocale[locale])
    },[locale])

    useEffect(()=>{ 
        setFormData({})
    },[])

    const [openRegister, setOpenRegister] = useRecoilState(openRegisterState)
    const setOpenLogin = useSetRecoilState(openLoginState)
    
    const fieldsSchema = [
        {fieldType: FIELD_TYPE.TEXT_FIELD, xs: 12, sm:6, md:6,
                    name: 'code', 
                    label: lan?.code?.label || 'Code' ,
                    defaultValue: ''},
        {fieldType: FIELD_TYPE.TEXT_FIELD, xs: 12, sm:6, md:6,
            name: 'displayName', 
                    label: lan?.displayName?.label || 'DisplayName' ,
                    defaultValue: ''},
        {fieldType: FIELD_TYPE.TEXT_FIELD, xs: 12, sm:12, md:12,
                    name: 'email', 
                    label: lan?.email?.label || 'Email'},
        {fieldType: FIELD_TYPE.PASSWORD_FIELD, xs: 12, sm:6, md:6,
                    name: 'password', 
                    label: lan?.password?.label || 'Password'},
        {fieldType: FIELD_TYPE.PASSWORD_FIELD, xs:12, sm:6, md:6,
                    name: 'confirm', 
                    label: lan?.confirm?.label || 'ConfirmPassword'}
    ]

    const validateSchema = Yup.object().shape({
        code: Yup.string()
                .required(lan?.code?.required),
        displayName: Yup.string()
                .required(lan?.displayName?.required),
        email: Yup.string()
                .email(lan?.email?.format)
                .required(lan?.email?.required),
        password: Yup.string()
                .min(6,lan?.password?.min)
                .max(12,lan?.password?.max),
        confirm: Yup.string()
                .required(lan?.confirm?.required)
                .when('password', (password, schema) => {
                    return password ? schema.oneOf([password], lan?.passowrd?.required) 
                                    : schema
                })
    })

    const submitFC = async (formValues,reset) => {
        setServerMessage(null)
        const emailUser = await findByEmail(formValues?.email)
        if(emailUser) {
            setServerMessage(`${formValues?.email}郵件地址已被註冊`)
        } else {
            const hasUser = await findByCode(formValues?.code)
            if(hasUser){
                setServerMessage(`${formValues?.code}帳號已被註冊`)
            } else {
                formValues.id = uuidv4()
                formValues.applyDate = today()
                create(formValues)
                reset(formValues)
                setServerMessage(`註冊成功，等待管理員啟用帳號後就可以去登入系統了`)
                setNotification({open: true, message: '註冊成功', severity: 'success'})
            }
        }
    }
    
    return (<>
        <Dialog open={openRegister} >
            <Button sx={{margin: '10px'}}
                variant='outlined' 
                color='secondary'
                onClick={()=>{
                    setOpenLogin(true)
                    setOpenRegister(false)
                }}
            >{lan?.toLogin?.label || '已有帳號，去登入系統'}</Button>
            <HookDynamicForm 
                titleText='申請註冊帳號'
                submitText={lan?.submit?.label || '送出申請'}
                formFields={fieldsSchema}
                validationSchema={validateSchema}
                formDefaultValues={formData}
                submitFC={submitFC}
                showResetButton={true}
                paperSize={paperSize}
            />
        </Dialog>
    </>)
}

export default Register