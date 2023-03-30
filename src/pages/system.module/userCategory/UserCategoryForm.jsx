import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './userCategory.api'
import { useRecoilValue } from 'recoil';
import { 
    accountingOptionsSelector, 
    employeeOptionsSelector, 
    groupCategoriesSelector,
    groupUserCategoriesSelector,
} from '../../../atoms/optionsAtom';

const UserCategoryForm = ({
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
    const groupCategories = useRecoilValue(groupCategoriesSelector)
    const groupUserCategories = useRecoilValue(groupUserCategoriesSelector)

    const [groupCode, setSelected] = useState(currentRow?.groupCode || '')

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
        // {
        //     name: 'createDept', 
        //     label: lan?.createDept?.label,
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
        {
            name: 'groupCode', 
            label: lan?.groupCode?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupCategories['UserCategory'],
            setSelectedFC: {setSelected},
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
        {
            name: 'parentId', 
            label: lan?.parentId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories[groupCode],
            xs:6, sm:6, md:6,
        },
        {
            name: 'rate', 
            label: lan?.rate?.label,
            fieldType: FIELD_TYPE.NUMBER_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'assistants', 
            label: lan?.assistants?.label,
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
        {
            name: 'controler', 
            label: lan?.controler?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: empOptions,
            xs:6, sm:6, md:6,
        },
        // {
        //     name: 'groupControl', 
        //     label: lan?.groupControl?.label,
        //     fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'accountsC', 
            label: lan?.accountsC?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: accountingOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'accountsD', 
            label: lan?.accountsD?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: accountingOptions,
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
            name: 'memo', 
            label: lan?.memo?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        // {
        //     name: 'effectMonth', 
        //     label: lan?.effectMonth?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
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

export default UserCategoryForm