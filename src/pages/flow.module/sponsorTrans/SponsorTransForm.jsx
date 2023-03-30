import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './sponsorTrans.api'
import {useRecoilValue } from 'recoil';
import { //自動完成選單引用範例
    departmentOptionsSelector, //部門選單
    employeeOptionsSelector, //員工選單
} from '../../../atoms/optionsAtom';

const SponsorTransForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 420

    const [formData, setFormData] = useState(currentRow) //表單資料
    const [fieldProps, setFieldProps] = useState({})

    // 自動完成選單引用範例
    const deptOptions = useRecoilValue(departmentOptionsSelector)
    const empOptions = useRecoilValue(employeeOptionsSelector)

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
            props: {...fieldProps, disabled: actionMode==='update'},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'deptId', 
            label: lan?.deptId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: deptOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'srcSponsor', 
            label: lan?.srcSponsor?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: empOptions, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'newSponsor', 
            label: lan?.newSponsor?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: empOptions, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'waitToSign', 
            label: lan?.waitToSign?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'waitToClose', 
            label: lan?.waitToClose?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'jobTrans', 
            label: lan?.jobTrans?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'memo', 
            label: lan?.memo?.label,
            fieldType: FIELD_TYPE.TEXTAREA_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'dateFrom', 
            label: lan?.dateFrom?.label,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'dateTo', 
            label: lan?.dateTo?.label,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定
            code: Yup.string()
                .required(lan?.code?.required),
            deptId: Yup.string()
                .required(lan?.deptId?.required),
            srcSponsor: Yup.string()
                .required(lan?.srcSponsor?.required),
            newSponsor: Yup.string()
                .required(lan?.newSponsor?.required),
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
            createAPI={create}
            updateAPI={update}
        />
    </>)
}

export default SponsorTransForm