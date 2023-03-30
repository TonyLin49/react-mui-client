import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './category.api'
import { useRecoilValue } from 'recoil';
import {  
    accountingOptionsSelector,
    employeeOptionsSelector, 
} from '../../../atoms/optionsAtom';

const CategoryForm = ({
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

    const empOptions = useRecoilValue(employeeOptionsSelector)
    const accountingOptions = useRecoilValue(accountingOptionsSelector)

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


    useEffect(()=>{ 
        if(currentRow) {
            setFormData(currentRow)
        } else {
            setFormData({})
        }
    },[currentRow])

    const titleText = lan?.title?.label || '樣本範例'

    const fieldsSchema = [ //表單欄位各項規格設定
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
        {
            name: 'groupCode', 
            label: lan?.groupCode?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'orderSeq', 
            label: lan?.orderSeq?.label,
            fieldType: FIELD_TYPE.NUMBER_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'controler', 
            label: lan?.controler?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: empOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'sponsor', 
            label: lan?.sponsor?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: empOptions,
            xs:6, sm:6, md:6,
        },
        // {
        //     name: 'crossFlag', 
        //     label: lan?.crossFlag?.label,
        //     fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
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
        {
            name: 'accounts', 
            label: lan?.accounts?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: accountingOptions,
            xs:12, sm:12, md:12,
        },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定
            code: Yup.string()
                .required(lan?.code?.required),
            names: Yup.string()
                .required(lan?.names?.required),
            groupCode: Yup.string()
                .required(lan?.groupCode?.required),
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

export default CategoryForm