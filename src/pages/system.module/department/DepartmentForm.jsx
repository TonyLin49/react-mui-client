import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './department.api'
import { useRecoilValue } from 'recoil';
import { 
    employeeOptionsSelector,
    hasChildDeptOptionsAtom
} from '../../../atoms/optionsAtom';
import PermissionsTable from '../permission/PermissionsTable'
import FixedBottomNavigation from '../../../components/dynaHookForm/bottomNavigation/FixedBottomNavigation'
import { Subtitles, ViewList } from '@mui/icons-material'

const DepartmentForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 580

    const [formData, setFormData] = useState(currentRow) //表單資料
    const [fieldProps, setFieldProps] = useState({})

    const employeeOptions = useRecoilValue(employeeOptionsSelector)
    const hasChildDeptOptions = useRecoilValue(hasChildDeptOptionsAtom)

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
            props: {...fieldProps, disabled: actionMode==='update' ? true : false},
            xs:6, sm:6, md:6,
        },
        {
            name: 'deptName', 
            label: lan?.deptName?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
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
            options: hasChildDeptOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'heads', 
            label: lan?.heads?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: employeeOptions,
            xs:6, sm:6, md:6,
        },
        {
            name: 'canApprove', 
            label: lan?.canApprove?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'deptCode', 
            label: lan?.deptCode?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'subDeptFlag', 
            label: lan?.subDeptFlag?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
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
        // {
        //     name: 'company', 
        //     label: lan?.company?.label,
        //     fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
        //     defaultValue: '',
        //     props: {...fieldProps},
        //     xs:12, sm:12, md:12,
        // },
        {
            name: 'isBudgetControl', 
            label: lan?.isBudgetControl?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:6, sm:6, md:6,
        },
        {
            name: 'budgetControler', 
            label: lan?.budgetControler?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: employeeOptions,
            xs:6, sm:6, md:6,
        },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定
            code: Yup.string()
                .required(lan?.code?.required),
            deptName: Yup.string()
                .required(lan?.deptName?.required),
        }
    )

    const submitFC = null

    const columnVisibility = {
        id: false, 
        sysNo: false, 
        applicant: false, 
        createDept: false, 
        parentTable: false,
        parentId: false,
        multiDeptsAuth: false,
    }

    let components = [
        {
            component: 
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
            disabledPrint={true}
            />, 
            label: titleText, 
            icon: <Subtitles />
        },
    ]

    if(actionMode==='update'){
        components=[
            ...components,
            {
                component: 
                <PermissionsTable
                paperSize={paperSize}
                disabledPrint={true}
                columnVisibility={columnVisibility}
                defaultFilters={[
                    {id:'parentTable', value: 'Department'},
                    {id:'parentId', value: formData?.code}
                ]}/>, 
                label: '權限設定', 
                icon: <ViewList />
            },
        ]
    }
    
    return (
        <FixedBottomNavigation components={components}/>
    )
}

export default DepartmentForm