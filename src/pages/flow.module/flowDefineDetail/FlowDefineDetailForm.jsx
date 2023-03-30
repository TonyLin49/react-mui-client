import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './flowDefineDetail.api'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { notificationAlertState } from '../../../atoms/globalAtom';
import { //自動完成選單引用範例
    departmentOptionsSelector, //部門選單
    employeeOptionsSelector, //員工選單
    groupCategoriesSelector, //使用類別選單
  } from '../../../atoms/optionsAtom';
import { serverMessageAtom } from '../../../atoms/formAtom';

const FlowDefineDetailForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 480

    // const setNotification = useSetRecoilState(notificationAlertState) 
    // const [serverMessage, setServerMessage] = useRecoilState(serverMessageAtom) 
    const [formData, setFormData] = useState(currentRow) //表單資料
    const [fieldProps, setFieldProps] = useState({})

    // 自動完成選單引用範例
    const deptOptions = useRecoilValue(departmentOptionsSelector)
    const empOptions = useRecoilValue(employeeOptionsSelector)
    const groupUserCategories = useRecoilValue(groupCategoriesSelector)

    useEffect(()=>{
        switch(actionMode){
            case 'insert':
                setFieldProps({color: 'primary'})
                break
            case 'update':
                setFieldProps({color: 'secondary'})
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

    useEffect(()=>{ //如果有外面傳進來的currentRow就設定在表單資料中
        if(currentRow) {
            setFormData(currentRow)
        } else {
            setFormData({})
        }
    },[currentRow])

    const titleText = lan?.title?.label

    const fieldsSchema = [ //表單欄位各項規格設定
        // {
        //     name: 'id', 
        //     label: lan?.id?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps, disabled: true},
        //     xs: 12, sm:12, md:12,
        // },
        // { 
        //     name: 'sysNo', 
        //     label: lan?.sysNo?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps, disabled: true},
        //     xs: 6, sm:6, md:6,
        // },
        // { 
        //     name: 'createDept', 
        //     label: lan?.createDept?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps, disabled: true},
        //     options: deptOptions,
        //     xs: 6, sm:6, md:6,
        // },
        // { 
        //     name: 'applicant', 
        //     label: lan?.applicant?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps, disabled: true},
        //     options: empOptions,
        //     xs: 6, sm:6, md:6,
        // },
        { 
            name: 'code', 
            label: lan?.code?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'seqNo', 
            label: lan?.seqNo?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'step', 
            label: lan?.step?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'stepName', 
            label: lan?.stepName?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'signType', 
            label: lan?.signType?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories['SignType'],
            xs:6, sm:6, md:6,
        },
        {
            name: 'signValue', 
            label: lan?.signValue?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'isNecessary', 
            label: lan?.isNecessary?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'canDecided', 
            label: lan?.canDecided?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'defaultSkip', 
            label: lan?.defaultSkip?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'skipValue', 
            label: lan?.skipValue?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'decidedValue', 
            label: lan?.decidedValue?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'resetFlow', 
            label: lan?.resetFlow?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'canEditField', 
            label: lan?.canEditField?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'countersign', 
            label: lan?.countersign?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'isSendMessage', 
            label: lan?.isSendMessage?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'messageValue', 
            label: lan?.messageValue?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定，以下為參考範例：
            // userName: Yup.string()
            //     .required(lan?.userName?.required),
            // displayName: Yup.string()
            //     .required(lan?.displayName?.required),
            // email: Yup.string()
            //     .email(lan?.email?.format)
            //     .required(lan?.email?.required),
            // password: Yup.string()
            //     .min(6,lan?.password?.min)
            //     .max(12,lan?.password?.max)
        }
    )

    // const accessDataSuccessfully = (message)=>{
    //     onCloseFC()
    //     setNotification({
    //         open: true, 
    //         message: message, 
    //         severity: 'success'
    //     })
    //     requestAnimationFrame(() => {
    //         setTimeout(()=>{syncDataFC()},500)
    //     })
    // }

    const submitFC = null //若未設定則使用 HookDynamicForm 預設的 onSubmit()
    // async (formValues) => {
    //     setServerMessage(null)
    //     if(actionMode==='view' && onCloseFC) onCloseFC()
    //     if(actionMode==='insert'){
    //         if(!formValues.code || formValues.code.length===0){
    //             setServerMessage(`代碼不可空白`)
    //         } else {
    //             const findByCodeEmployee = await findByCode(formValues.code).then(res=>res.data)
    //             if(findByCodeEmployee && findByCodeEmployee.code===formValues.code){
    //                 setServerMessage(`此代碼${formValues.code}已存在，不可重複`)
    //             } else {
    //                 setInsertBaseValue(formValues)
    //                 const newFormValues = getNewFormValues(formValues)
    //                 create(newFormValues)
    //                 .then(res=>accessDataSuccessfully(`新增資料成功`))
    //                 .catch(error=>setServerMessage(`新增資料發生錯誤：${error}`))
    //             }
    //         }
    //     }
    //     if(actionMode==='update'){
    //         const newFormValues = getNewFormValues(formValues)
    //         update(newFormValues)
    //         .then(res=> accessDataSuccessfully('資料修改成功'))
    //         .catch(error=> setServerMessage(`資料修改發生錯誤：${error}`))
    //     }
    //     if(serverMessage){
    //         requestAnimationFrame(() => {
    //             setTimeout(()=>{setServerMessage(null)},5000)
    //         })
    //     }
    // }
    
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
            onCloseFC={onCloseFC}
            syncDataFC={syncDataFC}
            submitFC={submitFC}
            //如果有自定義 submitFC 則以下三個API可設為 null 或直接刪除
            findByCodeAPI={findByCode}
            createAPI={create}
            updateAPI={update}
        />
    </>)
}

export default FlowDefineDetailForm