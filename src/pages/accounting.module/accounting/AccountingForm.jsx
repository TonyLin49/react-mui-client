import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './accounting.api'
import { useRecoilValue } from 'recoil';
import { //自動完成選單引用範例
    employeeOptionsSelector, //員工選單
    groupCategoriesSelector, //使用類別選單
  } from '../../../atoms/optionsAtom';

const AccountingForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 420

    const [formData, setFormData] = useState(currentRow) //表單資料
    const fieldProps = useState({})

    // 自動完成選單引用範例
    const empOptions = useRecoilValue(employeeOptionsSelector)
    const groupUserCategories = useRecoilValue(groupCategoriesSelector)

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
        // {
        //     name: 'createDept', 
        //     label: lan?.createDept?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     options: deptOptions,
        //     xs:6, sm:6, md:6,
        // },
        // {
        //     name: 'applicant', 
        //     label: lan?.applicant?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     options: empOptions,
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
            name: 'budgetCode', 
            label: lan?.budgetCode?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'parentId', 
            label: lan?.parentId?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'dorC', 
            label: lan?.dorC?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories['DorC'],
            xs:6, sm:6, md:6,
        },
        {
            name: 'accProperty', 
            label: lan?.accProperty?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories['AccProperty'],
            xs:6, sm:6, md:6,
        },
        {
            name: 'isSumCode', 
            label: lan?.isSumCode?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'isAccCode', 
            label: lan?.isAccCode?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'accSponsor', 
            label: lan?.accSponsor?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: empOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'program', 
            label: lan?.program?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'isReceipt', 
            label: lan?.isReceipt?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'accType', 
            label: lan?.accType?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories['AccType'],
            xs:6, sm:6, md:6,
        },
        {
            name: 'accUserType', 
            label: lan?.accUserType?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories['AccUserType'],
            xs:6, sm:6, md:6,
        },
        {
            name: 'reportCode', 
            label: lan?.reportCode?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupUserCategories['ReportCode'],
            xs:6, sm:6, md:6,
        },
        {
            name: 'orderKey', 
            label: lan?.orderKey?.label,
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
            createAPI={create}
            updateAPI={update}
        />
    </>)
}

export default AccountingForm