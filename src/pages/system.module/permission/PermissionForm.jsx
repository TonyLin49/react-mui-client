import { FIELD_TYPE } from '../../../constants/globalConstant'
import HookDynamicForm from '../../../components/dynaHookForm/HookDynamicForm'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import {
    create,
    update,
    findByCode
} from './permission.api'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { notificationAlertState } from '../../../atoms/globalAtom';
import {
    departmentOptionsSelector,
    programOptionsAtom,
    roleOptionsAtom
} from '../../../atoms/optionsAtom';
import { getNewFormValues, setInsertBaseValue } from '../../../utils/globalUtil';
import { serverMessageAtom } from '../../../atoms/formAtom';
import { permissionDefaultValuesAtom } from '../../../atoms/permissionAtom';

const PermissionForm = ({
    lan,
    actionMode,
    currentRow,
    onCloseFC,
    syncDataFC,
    handleCloseForm,
}) => {
    const paperSize = 480

    const permissionValues = useRecoilValue(permissionDefaultValuesAtom)
    const setNotification = useSetRecoilState(notificationAlertState)
    const [serverMessage, setServerMessage] = useRecoilState(serverMessageAtom)
    const [formData, setFormData] = useState(currentRow || permissionValues)
    const [fieldProps] = useState({})
    const [parentTable, setSelected] = useState({ value: 'All' })
    const [parentIdOptions, setParentIdOptions] = useState([])

    const deptOptions = useRecoilValue(departmentOptionsSelector)
    const roleOptions = useRecoilValue(roleOptionsAtom)
    const programOptions = useRecoilValue(programOptionsAtom)

    useEffect(() => {
        if (currentRow) {
            setFormData(currentRow)
            setSelected({ value: currentRow.parentTable })
        } else {
            setFormData(permissionValues)
        }
    }, [currentRow, permissionValues])

    useEffect(() => {
        setParentIdOptions([])
        if (parentTable.value === 'Department')
            setParentIdOptions(deptOptions)
        if (parentTable.value === 'Role')
            setParentIdOptions(roleOptions)
    }, [parentTable, deptOptions, roleOptions])

    const authOptions = [
        { value: 'All', label: 'All-全部' },
        { value: 'Self', label: 'Self-自己' },
        { value: 'Department', label: 'Department-部門' },
        { value: 'Disabled', label: 'Disabled-禁用' },
    ]

    const authTypeOptions = [
        { value: 'All', label: 'All-所有人' },
        { value: 'Role', label: 'Role-角色' },
        { value: 'Department', label: 'Department-部門' },
    ]

    const titleText = lan?.title?.label

    const fieldsSchema = [
        {
            name: 'code',
            label: lan?.code?.label,
            fieldType: FIELD_TYPE.TEXT_FIELD,
            defaultValue: '',
            props: { ...fieldProps, disabled: true },
            xs: 12, sm: 12, md: 12,
        },
        {
            name: 'parentTable',
            label: lan?.parentTable?.label,
            fieldType: actionMode === 'update' || formData.parentTable !== ''
                ? FIELD_TYPE.TEXT_FIELD
                : FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            disabled: actionMode === 'update',
            props: {
                ...fieldProps,
                disabled: actionMode === 'update' || formData.parentTable !== '' ? true : false
            },
            options: authTypeOptions,
            setSelectedFC: { setSelected },
            xs: 6, sm: 6, md: 6,
        },
        {
            name: 'parentId',
            label: lan?.parentId?.label,
            fieldType: actionMode === 'update' || formData.parentId !== ''
                ? FIELD_TYPE.TEXT_FIELD
                : FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            props: {
                ...fieldProps,
                disabled: actionMode === 'update' || formData.parentTable !== '' ? true : false
            },
            options: parentIdOptions,
            xs: 6, sm: 6, md: 6,
        },
        {
            name: 'programId',
            label: lan?.programId?.label,
            fieldType: actionMode === 'update'
                ? FIELD_TYPE.TEXT_FIELD
                : FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            props: {
                ...fieldProps,
                disabled: actionMode === 'update' ? true : false
            },
            options: programOptions,
            xs: 12, sm: 12, md: 12,
        },
        {
            name: 'searchAuth',
            label: lan?.searchAuth?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            props: { ...fieldProps },
            options: authOptions,
            xs: 6, sm: 6, md: 6,
        },
        {
            name: 'canInsert',
            label: lan?.canInsert?.label,
            fieldType: FIELD_TYPE.CHECKBOX_FIELD,
            defaultValue: '',
            props: { ...fieldProps },
            xs: 6, sm: 6, md: 6,
        },
        {
            name: 'updateAuth',
            label: lan?.updateAuth?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            props: { ...fieldProps },
            options: authOptions,
            xs: 6, sm: 6, md: 6,
        },
        {
            name: 'deleteAuth',
            label: lan?.deleteAuth?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            props: { ...fieldProps },
            options: authOptions,
            xs: 6, sm: 6, md: 6,
        },
        {
            name: 'multiDeptsAuth',
            label: lan?.multiDeptsAuth?.label,
            fieldType: FIELD_TYPE.AUTOCOMPLETE_FIELD,
            defaultValue: '',
            props: { ...fieldProps },
            options: deptOptions,
            multiple: true,
            xs: 12, sm: 12, md: 12,
        },
        {
            name: 'memo',
            label: lan?.memo?.label,
            fieldType: FIELD_TYPE.TEXTAREA_FIELD,
            defaultValue: '',
            props: { ...fieldProps },
            xs: 12, sm: 12, md: 12,
        },
    ]

    const validateSchema = Yup.object().shape(
        {
            parentTable: Yup.string()
                .required(lan?.parentTable?.required),
            parentId: Yup.string().when('parentTable', {
                is: (val) => val === 'Department' || val === 'Role',
                then: Yup.string().required(lan?.parentId?.required),
                otherwise: Yup.string().notRequired(),
            }),
            programId: Yup.string()
                .required(lan?.programId?.required),
            searchAuth: Yup.string()
                .required(lan?.searchAuth?.required),
            deleteAuth: Yup.string()
                .required(lan?.deleteAuth?.required),
            updateAuth: Yup.string()
                .required(lan?.updateAuth?.required),
        }
    )

    const accessDataSuccessfully = (message) => {
        onCloseFC()
        setNotification({
            open: true,
            message: message,
            severity: 'success'
        })
        requestAnimationFrame(() => {
            setTimeout(() => { syncDataFC() }, 500)
        })
    }

    const submitFC = async (formValues, reset) => {
        setServerMessage(null)
        if (actionMode === 'view') onCloseFC()
        const newFormValues = getNewFormValues(formValues)
        if (actionMode === 'insert') {
            const newCode = `${formValues.parentTable}-${formValues.parentId}-${formValues.programId}`
            const findPermissionByCode = await findByCode(newCode)
            if (findPermissionByCode && findPermissionByCode.data.code === newCode) {
                setServerMessage('此權限碼已設定過，無需重複設定，請改用修改功能')
                reset()
            } else {
                setInsertBaseValue(newFormValues)
                newFormValues.code = newCode
                create(newFormValues)
                    .then(res => accessDataSuccessfully('資料新增成功'))
                    .catch(error => setServerMessage(`新增資料發生錯誤：${error}`))
            }
        }
        if (actionMode === 'update') {
            const newCode = `${formValues.parentTable}-${formValues.parentId}-${formValues.programId}`
            if (formValues.code === newCode) {
                update(formValues)
                    .then(res => accessDataSuccessfully('資料修改成功'))
                    .catch(error => setServerMessage(`資料修改發生錯誤：${error}`))
            } else {
                setServerMessage(`權限類別、權限內值、程式代碼不可修改`)
                reset()
            }
        }
        if (serverMessage) {
            requestAnimationFrame(() => {
                setTimeout(() => { setServerMessage(null) }, 5000)
            })
        }
    }

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
            findByCodeAPI={null}
            createAPI={null}
            updateAPI={null}
        />
    </>)
}

export default PermissionForm