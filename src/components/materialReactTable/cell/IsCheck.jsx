import { Check } from '@mui/icons-material'
import React from 'react'

const IsCheck = ({
    value
}) => {
  return (
    value==='Y'
        ? <Check color='success'/> 
        : <></>
  )
}

export default IsCheck