import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './flow.api'
import { useRecoilValue } from 'recoil';
import { 
    departmentOptionsSelector, 
    employeeOptionsSelector, 
    groupUserCategoriesSelector,
    programStructureOptionsAtom
} from '../../../atoms/optionsAtom'

const FlowForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 480

    const empOptions = useRecoilValue(employeeOptionsSelector)
    const deptOptions = useRecoilValue(departmentOptionsSelector)
    const groupCategoriesSelector = useRecoilValue(groupUserCategoriesSelector)
    const programStructureOptions = useRecoilValue(programStructureOptionsAtom)
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
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'applicant', 
            label: lan?.applicant?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            options: empOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'createDept', 
            label: lan?.createDept?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: deptOptions, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'createTime', 
            label: lan?.createTime?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'status', 
            label: lan?.status?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            options: groupCategoriesSelector['Status'],
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'formTableName', 
            label: lan?.formTableName?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            options: programStructureOptions,
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        // {
        //     name: 'flowId', 
        //     label: lan?.flowId?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps, disabled: true},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'flowName', 
            label: lan?.flowName?.label,
            fieldType: FIELD_TYPE.TEXTAREA_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        // {
        //     name: 'applicantName', 
        //     label: lan?.applicantName?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:6, sm:6, md:6,
        // },
        {
            name: 'srcSignerId', 
            label: lan?.srcSignerId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: empOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'signerId', 
            label: lan?.signerId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: empOptions, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'deciderId', 
            label: lan?.deciderId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: empOptions,
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'decideTime', 
            label: lan?.decideTime?.label,
            fieldType: FIELD_TYPE.DATE_TIME_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'closerId', 
            label: lan?.closerId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: empOptions,
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'closedTime', 
            label: lan?.closedTime?.label,
            fieldType: FIELD_TYPE.DATE_TIME_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'totalSteps', 
            label: lan?.totalSteps?.label,
            fieldType: FIELD_TYPE.NUMBER_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'finishedSteps', 
            label: lan?.finishedSteps?.label,
            fieldType: FIELD_TYPE.NUMBER_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'closeFlag', 
            label: lan?.closeFlag?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'draftRight', 
            label: lan?.draftRight?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            options: empOptions,
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

export default FlowForm