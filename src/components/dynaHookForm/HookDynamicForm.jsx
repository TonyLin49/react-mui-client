import { 
  Badge, 
  Button, 
  Grid, 
  IconButton, 
  Paper, 
  Tooltip, 
  Typography 
} from "@mui/material";
import { useForm } from "react-hook-form";
import DynaTextField from "./DynaTextField";
import DynaPasswordField from "./DynaPasswordField";
import DynaSelectField from "./DynaSelectField";
import { DEFAULT_FIELD_SIZE, FIELD_TYPE } from "../../constants/globalConstant";
import { 
  getDefaultValuesFromFields, 
  getNewFormValues, 
  getSessionData, 
  removeSessionData, 
  setDataToSession, 
  setInsertBaseValue
} from "../../utils/globalUtil";
import { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import { DevTool } from "@hookform/devtools";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { notificationAlertState, windowDimensionsState } from "../../atoms/globalAtom";
import DynaCheckboxField from "./DynaCheckboxField";
import { 
  AssignmentReturned, 
  Cancel, 
  CleaningServices, 
  Difference, 
  Print, 
  Send, 
} from "@mui/icons-material";
import { windowPrinter } from "../../utils/windowUtil";
import DynaAutocompleteField from "./DynaAutocompleteField";
import { serverMessageAtom } from "../../atoms/formAtom";

const HookDynamicForm = ({
      titleText, 
      submitText, 
      formFields, 
      formDefaultValues,
      validationSchema,
      paperSize,
      handleCloseForm,
      disabledPrint,
      formAction,
      submitFC,
      onCloseFC,
      syncDataFC,
      findByCodeAPI,
      createAPI,
      updateAPI,
}) => {
  const windowDimensions = useRecoilValue(windowDimensionsState)
  const setNotification = useSetRecoilState(notificationAlertState)
  const [serverMessage, setServerMessage] = useRecoilState(serverMessageAtom)
  const [canSave, setCanSave] = useState(false)
  const [color, setColor] = useState('primary')
  const [btnColor, setBtnColor] = useState('success')
  const [defaultSubmitText, setDefaultSumbitText] = useState('確定')
  const [actionMode, setActionMode] = useState('檢視')
  const [showCancelBtn, setShowCancelBtn] = useState(true)
  const [showSubmitBtn, setShowSubmitBtn] = useState(true)
  const [cloneValues, setCloneValues] = useState(getSessionData(titleText))

  const fields = formFields

  if(fields && !formDefaultValues){
    formDefaultValues = getDefaultValuesFromFields(fields)
  }
  
  const defaultValues = formDefaultValues 
  
  const methods = useForm({
    defaultValues, 
    resolver: yupResolver(validationSchema)
  });
  
  const { handleSubmit, reset, control, watch } = methods;

  const watchValues = watch()

  const accessDataSuccessfully = (message)=>{
    onCloseFC()
    setNotification({
        open: true, 
        message: message, 
        severity: 'success'
    })
    requestAnimationFrame(() => {
      setTimeout(()=>{syncDataFC()},500)
    })
  }

  const createData = (formValues) => {
    setInsertBaseValue(formValues)
    const newFormValues = getNewFormValues(formValues)
    createAPI(newFormValues)
    .then(res=>accessDataSuccessfully(`新增資料成功`))
    .catch(error=>setServerMessage(`新增資料發生錯誤：${error}`))
  }
  
  const onSubmit = async (formValues) => {
    if(submitFC) {
      submitFC(formValues,reset)
    } else {
      setServerMessage(null)
      if(formAction==='view' && onCloseFC) onCloseFC()
      if(formAction==='insert' && createAPI){
        if(!formValues.code || formValues.code.length===0){
          setServerMessage(`代碼不可空白`)
        } else {
          if(findByCodeAPI && createAPI){
            const findByCodeEntity = await findByCodeAPI(formValues.code).then(res=>res.data)
            if(findByCodeEntity && findByCodeEntity.code===formValues.code){
              setServerMessage(`此代碼${formValues.code}已存在，不可重複`)
            } else {
              createData(formValues)
            }
          }
          if(!findByCodeAPI && createAPI){
            createData(formValues)
          }
        }
      }
      if(formAction==='update' && updateAPI){
        const newFormValues = getNewFormValues(formValues)
        updateAPI(newFormValues)
        .then(res=> accessDataSuccessfully('資料修改成功'))
        .catch(error=> setServerMessage(`資料修改發生錯誤：${error}`))
      }
      if(serverMessage){
        requestAnimationFrame(() => {
          setTimeout(() => {setServerMessage(null);}, 5000);
        });    
      }
    }
  }
  
  const paperWidth = () => {
    if(windowDimensions.width<410) return 280
    if(windowDimensions.width<460) return 340
    return paperSize || 480
  }

  useEffect(()=>{
    if(formAction==='update'){
      if(JSON.stringify(watchValues)!==JSON.stringify(defaultValues)) 
        setCanSave(true)
      else 
        setCanSave(false)
    }
  },[formAction, defaultValues, watchValues])

  useEffect(()=>{
    switch(formAction){
      case 'view':
        setColor('green')
        setBtnColor('success')
        setDefaultSumbitText('關閉')
        setActionMode('檢視')
        setCanSave(true)
        setShowCancelBtn(true)
        setShowSubmitBtn(false)
        break
      case 'update':
        setColor('secondary')
        setBtnColor('secondary')
        setDefaultSumbitText('修改')
        setActionMode('修改')
        setShowCancelBtn(true)
        setShowSubmitBtn(true)
        break
      case 'delete':
        setColor('error')
        setBtnColor('error')
        setDefaultSumbitText('刪除')
        setActionMode('刪除')
        setCanSave(true)
        setShowCancelBtn(true)
        setShowSubmitBtn(true)
        break
      case 'insert':
        setColor('primary')
        setBtnColor('primary')
        setDefaultSumbitText('新增')
        setActionMode('新增')
        setCanSave(true)
        setShowCancelBtn(true)
        setShowSubmitBtn(true)
        break
      default:
        setBtnColor('primary')
        setColor('primary')
        setDefaultSumbitText('送出')
        setActionMode('')
        setCanSave(true)
        setShowCancelBtn(true)
        setShowSubmitBtn(true)
        break
    }
  },[formAction])

  const handleCloneValue = () => {
    if(cloneValues){
      removeSessionData(titleText)
      setCloneValues(null)
    } else {
      const watchValue = watch()
      setDataToSession(titleText, {...watchValue, 
        id: null, code: null, sysNo: null, createDept: null, applicant: null})
      setCloneValues({...watchValue, 
        id: null, code: null, sysNo: null, createDept: null, applicant: null})
    }
  }

  // const SubmitBtnGrid = ()=> (
  //   <Grid container item spacing={1} xs={6} justifyContent='space-around'>
  //     {showCancelBtn && formAction &&
  //     <Grid item xs={6}>
  //       <Button 
  //         size={DEFAULT_FIELD_SIZE}
  //         onClick={handleCloseForm} 
  //         variant='outlined' 
  //         sx={{width:'100%'}}
  //         color={btnColor}
  //         startIcon={<Cancel/>}
  //       >
  //         取消
  //       </Button>
  //     </Grid>}
  //     {showSubmitBtn &&
  //     <Grid item xs={6}>
  //       <Button 
  //         size={DEFAULT_FIELD_SIZE}
  //         onClick={handleSubmit(onSubmit)} 
  //         variant='contained' 
  //         sx={{width:'100%'}}
  //         color={btnColor}
  //         disabled={!canSave}
  //         startIcon={<Send/>}
  //       >
  //         {submitText || defaultSubmitText}
  //       </Button>
  //     </Grid>}
  //   </Grid>
  // ) 

  return (
    <>
      <Paper id='printArea'
        style={{
          padding: 8,
          margin: 8,
          width: paperWidth()
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{xs:1, sm:2, md:3}}>
          <Grid item xs={12}>
            <Typography 
              variant="title" 
              align="left"
              color={color}
              sx={{fontSize:18, fontWeight: 'bold'}}
            >
              {`${actionMode}${titleText}` || 'HookDynamicForm Exapmple'}
            </Typography>
            {formAction && <>
            {!disabledPrint && windowDimensions.width>460 &&
            <IconButton 
              color={btnColor}
              onClick={()=>windowPrinter()}
            >
              <Print/>
            </IconButton>}
            <Tooltip title={cloneValues ? "清除複製內容" : '複製內容'}>
              <IconButton 
              color={btnColor}
              onClick={handleCloneValue}
              >
                <Badge 
                    color={btnColor}
                    badgeContent={cloneValues ? 1 : 0}
                    variant='dot'
                    >
                  <Difference/>
                </Badge>
              </IconButton>
            </Tooltip>
            </>}
            {formAction==='insert' && <>
              <Tooltip title="點二下來清空表單資料">
                <IconButton 
                  color={btnColor}
                  onClick={()=>reset({})}
                  >
                  <CleaningServices/>
                </IconButton>
              </Tooltip>
              {cloneValues &&
              <Tooltip title="貼上複製內容到表單">
                <IconButton 
                  color={btnColor}
                  onClick={()=>reset(cloneValues)}
                  >
                  <AssignmentReturned/>
                </IconButton>
              </Tooltip>}
            </>}
            {showCancelBtn && formAction &&
            <Tooltip title="取消">
            <IconButton 
            onClick={handleCloseForm} 
            color={btnColor}
            // startIcon={}
            >
              <Cancel/>
            </IconButton>
            </Tooltip>}
            {showSubmitBtn &&
            <Button sx={{marginLeft: 1}}
            size={DEFAULT_FIELD_SIZE}
            onClick={handleSubmit(onSubmit)} 
            variant='contained' 
            color={btnColor}
            disabled={!canSave}
            startIcon={<Send/>}
            >
              {submitText || defaultSubmitText}
            </Button>}
          </Grid>
          {fields.map(({fieldType, name, label, props, options, setSelectedFC,
                        status, multiple, InputProps, xs, sm, md}) => {
            switch(fieldType){
              case FIELD_TYPE.DATE_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaTextField control={control} 
                            name={name} label={label} 
                            props={{...props, type: 'date', InputLabelProps:{ shrink: true }}}
                          />
                        </Grid>
              case FIELD_TYPE.TIME_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaTextField control={control} 
                            name={name} label={label} 
                            props={{...props, type: 'time', InputLabelProps:{ shrink: true }}}
                          />
                        </Grid>
              case FIELD_TYPE.DATE_TIME_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaTextField control={control} 
                            name={name} label={label} 
                            props={{...props, type: 'datetime-local', InputLabelProps:{ shrink: true }}}
                          />
                        </Grid>
              case FIELD_TYPE.SELECT_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaSelectField control={control} 
                            name={name} label={label} 
                            options={options}
                            setSelectedFC={setSelectedFC}
                            multiple={multiple}
                            props={props}
                          />
                        </Grid>
              case FIELD_TYPE.PASSWORD_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaPasswordField control={control} 
                            name={name} label={label}
                            props={props}
                          />
                        </Grid>
              case FIELD_TYPE.TEXTAREA_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaTextField control={control} 
                            name={name} label={label} 
                            status={status} props={{
                              ...props, multiline: true, 
                            }}
                          />
                        </Grid>
              case FIELD_TYPE.NUMBER_FIELD:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaTextField control={control} 
                            name={name} label={label} 
                            status={status}
                            props={{...props, type:'number'}}
                            InputProps={InputProps}
                          />
                        </Grid>
              case FIELD_TYPE.CHECKBOX_FIELD:
                return <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                        <DynaCheckboxField control={control} 
                          name={name} label={label} 
                          props={props}
                        />
                        </Grid>
              case FIELD_TYPE.AUTOCOMPLETE_FIELD:
                return <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                        <DynaAutocompleteField control={control} 
                          name={name} label={label} 
                          options={options}
                          setSelectedFC={setSelectedFC}
                          multiple={multiple}
                          props={props} 
                        />
                        </Grid>
              default:
                return  <Grid item key={name} xs={xs||12} sm={sm||12} md={md||12}>
                          <DynaTextField key={name} control={control} 
                            name={name} label={label} 
                            status={status} props={props}
                          />
                        </Grid>
            }
          })}
          {serverMessage &&
          <Grid item xs={12}>
            <Typography 
                variant='body' 
                sx={{ color: "#ba000d", mt: 1 }}
              >
                {serverMessage}
              </Typography> 
          </Grid>
          }
        </Grid>
      </Paper>
      {process.env.NODE_ENV==='development' 
        && <DevTool control={control} />}
    </>
  )
}

export default HookDynamicForm