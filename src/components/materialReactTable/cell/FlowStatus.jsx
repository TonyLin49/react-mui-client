import { 
    BorderColor, 
    Cancel,
    DriveFileRenameOutline,
    GppBad,
    Verified 
} from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

const FlowStatus = ({
    value
}) => {
  return (
    value==='approve' ? <Tooltip title='已核准'><Verified color='success'/></Tooltip> 
    : value==='signing' ? <Tooltip title='簽核中'><BorderColor color='primary'/></Tooltip> 
    : value==='draft' ? <Tooltip title='草稿中'><DriveFileRenameOutline/></Tooltip> 
    : value==='reject' ? <Tooltip title='駁回'><GppBad color='error'/></Tooltip> 
    : value==='cancel' ? <Tooltip title='作廢'><Cancel color='error'/></Tooltip> 
    : <></>
  )
}

export default FlowStatus