import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { 
    create, 
    update,
    findByCode
} from './programStructure.api'
import { useRecoilValue } from 'recoil';
import { flowDefineOptionsAtom, groupUserCategoriesSelector, programMenuOptionsAtom } from '../../../atoms/optionsAtom'

const ProgramStructureForm = ({
    lan,
    actionMode, 
    currentRow, 
    onCloseFC,
    syncDataFC,
    handleCloseForm
}) => {
    const paperSize = 420

    const programMenuOptions = useRecoilValue(programMenuOptionsAtom)
    const flowDefineOptions = useRecoilValue(flowDefineOptionsAtom)
    const groupUserCategories = useRecoilValue(groupUserCategoriesSelector)
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
            name: 'programName', 
            label: lan?.programName?.label,
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
            options: programMenuOptions,
            xs:8, sm:8, md:8,
        },
        {
            name: 'orderKey', 
            label: lan?.orderKey?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'onlineHelp', 
            label: lan?.onlineHelp?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:12, sm:12, md:12,
        },
        {
            name: 'isMenu', 
            label: lan?.isMenu?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'programUrl', 
            label: lan?.programUrl?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:8, sm:8, md:8,
        },
        {
            name: 'bindFlow', 
            label: lan?.bindFlow?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'flowId', 
            label: lan?.flowId?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            options: flowDefineOptions,
            xs:8, sm:8, md:8,
        },
        {
            name: 'systemEncode', 
            label: lan?.systemEncode?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'encodeRule', 
            label: lan?.encodeRule?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD, 
            defaultValue: '',
            options: groupUserCategories['EncodeRule'],
            props: {...fieldProps},
            xs:8, sm:8, md:8,
        },
        {
            name: 'beginCode', 
            label: lan?.beginCode?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'connectChar', 
            label: lan?.connectChar?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'endNoLength', 
            label: lan?.endNoLength?.label,
            fieldType: FIELD_TYPE.NUMBER_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'logInsert', 
            label: lan?.logInsert?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'logUpdate', 
            label: lan?.logUpdate?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
        {
            name: 'logDelete', 
            label: lan?.logDelete?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD, 
            defaultValue: '',
            props: {...fieldProps},
            xs:4, sm:4, md:4,
        },
    ]

    const validateSchema = Yup.object().shape(
        { //前端表單驗證設定，以下為參考範例：
            logUpdate: Yup.string().max(1, lan?.logUpdate?.max),
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

export default ProgramStructureForm