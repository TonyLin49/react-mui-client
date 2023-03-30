import { Button, Dialog } from '@mui/material'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { 
    commonLoadingState,
    currentUserState, 
    localeState, 
    notificationAlertState, 
    openLoginState, 
    openRegisterState, 
    openUserMenuState 
} from '../../../atoms/globalAtom'
import { 
    FIELD_TYPE, 
    SESSION_USER_OBJECT 
} from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { findByCodeAndPassword } from './user.api'
import { 
    removeSessionData, 
    setDataToSession 
} from '../../../utils/globalUtil'
import { userLocale } from './user.locale'
import { serverMessageAtom } from '../../../atoms/formAtom'

const Login = () => {
    const paperSize = 340
    
    const [openLogin, setOpenLogin] = useRecoilState(openLoginState)
    const setServerMessage = useSetRecoilState(serverMessageAtom)
    const setOpenUserMenu = useSetRecoilState(openUserMenuState)
    const setCurrentUser = useSetRecoilState(currentUserState)
    const setOpenRegister = useSetRecoilState(openRegisterState)
    const setAlert = useSetRecoilState(notificationAlertState)
    const setIsLoading = useSetRecoilState(commonLoadingState)
    const locale = useRecoilValue(localeState)
    
    const [lan, setLan] = useState(userLocale[locale]) //語系資料
    const [formData, setFormData] = useState(null) //表單資料

    useEffect(()=>{
        setLan(userLocale[locale])
    },[locale])

    useEffect(()=>{ 
        setFormData({})
    },[])
    
    const fieldsSchema = [
        {fieldType: FIELD_TYPE.TEXT_FIELD, xs: 12, sm:12, md:12,
                    name: 'code', 
                    label: lan?.code?.label || '使用者帳號' ,
                    defaultValue: ''},
        {fieldType: FIELD_TYPE.PASSWORD_FIELD, xs: 12, sm:12, md:12,
                    name: 'password', 
                    label: lan?.password?.label || '密碼'}
    ]

    const validateSchema = Yup.object().shape({
        code: Yup.string()
                .required(lan?.code?.required),
        password: Yup.string()
                .min(6,lan?.password?.min)
                .max(12,lan?.password?.max),
    })

    const submitFC = async (formValues,reset) => {
        setIsLoading(true)
        setServerMessage(null)
        removeSessionData(SESSION_USER_OBJECT)
        const user = await findByCodeAndPassword(formValues?.code, formValues?.password)
        if(user) {
            if(user.active==='Y'){
                setAlert({open: true, message: '成功登入系統', severity: 'success'})
                reset(formValues)
                setOpenLogin(false)
                setCurrentUser(user)
                let sessionUser = {
                    code: user?.code, 
                    displayName: user?.displayName,
                    role: user?.role,
                    sysNo: user?.sysNo,
                    createDept: user?.createDept,
                    applicant: user?.empCode,
                }
                setDataToSession(SESSION_USER_OBJECT, sessionUser)
                setOpenUserMenu(true)
            } else {
                setServerMessage('此帳號尚未啟用，請連絡系統管理員')
            }
        } else {
            setAlert({open: true, message: '使用者帳號或密碼錯誤', severity: 'error'})
            setServerMessage("帳號或密碼錯誤")
            reset()
        }
        setIsLoading(false)
    }
    
    return (<>
        <Dialog open={openLogin}>
            <Button sx={{margin: '10px'}}
                variant='outlined' 
                color='secondary'
                onClick={()=>{
                    setOpenLogin(false)
                    setOpenRegister(true)
                }}
            >{lan?.toLogin?.label || '我還沒有帳號，去申請註冊帳號'}</Button>
            <HookDynamicForm 
                titleText={lan?.loginTitle?.label || '企業管理系統登入'}
                submitText={lan?.submit?.label || '登入系統'}
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

export default Login