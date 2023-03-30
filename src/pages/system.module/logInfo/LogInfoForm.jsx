import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './logInfo.api'

const LogInfoForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 420

    const [formData, setFormData] = useState(currentRow) //表單資料
    const [fieldProps] = useState({})

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
        //     props: {...fieldProps, disabled: true},
        //     xs: 6, sm:6, md:6,
        // },
        {
            name: 'action', 
            label: lan?.action?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'updateTime', 
            label: lan?.updateTime?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'srcTable', 
            label: lan?.srcTable?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'srcFlowKey', 
            label: lan?.srcFlowKey?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'updateAccount', 
            label: lan?.updateAccount?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'updateUserName', 
            label: lan?.updateUserName?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:6, sm:6, md:6,
        },
        {
            name: 'actionInfo', 
            label: lan?.actionInfo?.label,
            fieldType: FIELD_TYPE.TEXTAREA_FIELD, 
            defaultValue: '',
            props: {...fieldProps, disabled: true},
            xs:12, sm:12, md:12,
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

export default LogInfoForm