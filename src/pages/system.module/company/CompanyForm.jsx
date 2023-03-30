import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './company.api'

const CompanyForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 340

    const [formData, setFormData] = useState(currentRow) //表單資料
    const [fieldProps, setFieldProps] = useState({})

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

    const titleText = lan?.title?.label || '樣本範例'

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
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'code', 
            label: lan?.code?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'names', 
            label: lan?.names?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        // {
        //     name: 'createDept', 
        //     label: lan?.createDept?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        // {
        //     name: 'applicant', 
        //     label: lan?.applicant?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'vatNo', 
            label: lan?.vatNo?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'taxNo', 
            label: lan?.taxNo?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'invoiceAddress', 
            label: lan?.invoiceAddress?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        // {
        //     name: 'englishName', 
        //     label: lan?.englishName?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        // {
        //     name: 'englishAddress', 
        //     label: lan?.englishAddress?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'responsiblePersons', 
            label: lan?.responsiblePersons?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        {
            name: 'tel', 
            label: lan?.tel?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'fax', 
            label: lan?.fax?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'isGeneralLedger', 
            label: lan?.isGeneralLedger?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'taxOrgNo', 
            label: lan?.taxOrgNo?.label,
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

    const submitFC = null
    
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
            findByCodeAPI={findByCode}
            updateAPI={update}
            createAPI={create}
        />
    </>)
}

export default CompanyForm