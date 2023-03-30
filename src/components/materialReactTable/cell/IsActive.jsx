import { DoNotDisturbAlt, VerifiedUser } from '@mui/icons-material'
import React from 'react'

const IsActive = ({
    value
}) => {
  return (
    value==='Y'
        ? <VerifiedUser color='success'/> 
        : <DoNotDisturbAlt color='error'/>
  )
}

export default IsActive