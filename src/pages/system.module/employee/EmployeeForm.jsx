import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import {
    create, 
    update,
    findByCode
} from './employee.api'
import { useRecoilValue } from 'recoil';
import { 
    departmentOptionsSelector, 
    employeeOptionsSelector, 
    groupUserCategoriesSelector, 
} from '../../../atoms/optionsAtom';

const EmployeeForm = ({
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

    const deptOptions = useRecoilValue(departmentOptionsSelector)
    const empOptions = useRecoilValue(employeeOptionsSelector)
    const groupUserCategories = useRecoilValue(groupUserCategoriesSelector)
    const groupTypeOptions = groupUserCategories['GroupType']
    const idTypeOptions = groupUserCategories['IdType']
    const jobTitleOptions = groupUserCategories['JobTitle']

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
        // {
        //     name: 'id', 
        //     label: lan?.id?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps, disabled: true},
        //     xs:12, sm:12, md:12,
        // },
        // {
        //     name: 'sysNo', 
        //     label: lan?.sysNo?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        // {
        //     name: 'createDept', 
        //     label: lan?.createDept?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        // {
        //     name: 'applicant', 
        //     label: lan?.applicant?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        {
            name: 'code', 
            label: lan?.code?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, 
                disabled: actionMode==='update',
                placeholder: lan?.code?.placeholder
            },
            xs: 6, sm:6, md:6,
        },
        {
            name: 'empName', 
            label: lan?.empName?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'groupType', 
            label: lan?.groupType?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: groupTypeOptions,
            xs: 6, sm:6, md:6,
        },
        {
            name: 'jobTitle', 
            label: lan?.jobTitle?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: jobTitleOptions,
            xs: 6, sm:6, md:6,
        },
        {
            name: 'idType', 
            label: lan?.idType?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: idTypeOptions,
            xs: 6, sm:6, md:6,
        },
        {
            name: 'idNo', 
            label: lan?.idNo?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'deptId', 
            label: lan?.deptId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: deptOptions,
            xs: 6, sm:6, md:6,
        },
        {
            name: 'agent', 
            label: lan?.agent?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: empOptions,
            xs: 6, sm:6, md:6,
        },
        // {
        //     name: 'tel', 
        //     label: lan?.tel?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        {
            name: 'mobile', 
            label: lan?.mobile?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'email', 
            label: lan?.email?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'address', 
            label: lan?.address?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        {
            name: 'onBoardDate', 
            label: lan?.onBoardDate?.label,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'leavesDate', 
            label: lan?.leavesDate?.label,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        {
            name: 'birthday', 
            label: lan?.birthday?.label,
            fieldType: FIELD_TYPE.DATE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        // {
        //     name: 'jobDegree', 
        //     label: lan?.jobDegree?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        // {
        //     name: 'salaryLevel', 
        //     label: lan?.salaryLevel?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        {
            name: 'hourlyWage', 
            label: lan?.hourlyWage?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs: 6, sm:6, md:6,
        },
        // {
        //     name: 'leader', 
        //     label: lan?.leader?.label,
        //     fieldType: FIELD_TYPE.TEXT_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        // {
        //     name: 'isHeads', 
        //     label: lan?.isHeads?.label,
        //     fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs: 6, sm:6, md:6,
        // },
        // {
        //     name: 'agentDept', 
        //     label: lan?.agentDept?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     options: deptOptions,
        //     xs: 6, sm:6, md:6,
        // },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定
            empName: Yup.string()
                .required(lan?.empName?.required),
            deptId: Yup.string()
                .required(lan?.deptId?.required),
            jobTitle: Yup.string()
                .required(lan?.jobTitle?.required),
            groupType: Yup.string()
                .required(lan?.groupType?.required),
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

export default EmployeeForm