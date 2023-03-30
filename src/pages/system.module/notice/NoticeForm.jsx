import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './notice.api'

const NoticeForm = ({
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
        // { 
        //     name: 'code', 
        //     label: lan?.code?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:12, sm:12, md:12,
        // },
        // {
        //     name: 'summary', 
        //     label: lan?.summary?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'content', 
            label: lan?.content?.label,
            fieldType: FIELD_TYPE.TEXTAREA_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        {
            name: 'appendix', 
            label: lan?.appendix?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        {
            name: 'linkUrl', 
            label: lan?.linkUrl?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
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
        // {
        //     name: 'objectType', 
        //     label: lan?.objectType?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     options: groupCategories['ObjectType'],
        //     setSelectedFC: {setSelected},
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:12, sm:12, md:12,
        // },
        // {
        //     name: 'objectValues', 
        //     label: lan?.objectValues?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     options: objectValuesOptions,
        //     // multiple: true,
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:12, sm:12, md:12,
        // },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定
            content: Yup.string()
                .required(lan?.content?.required),
            dateFrom: Yup.string()
                .required(lan?.dateFrom?.required),
            dateTo: Yup.string()
                .required(lan?.dateTo?.required),
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

export default NoticeForm