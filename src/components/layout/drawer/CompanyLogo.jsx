import { Box, Tooltip } from '@mui/material'
import React from 'react'
import companyImg from './muiLogo.png'

const CompanyLogo = () => {
  return (
    <Box sx={{
      marginTop: 2,
      marginRight: 2,
      marginLeft: 1
    }}>
      <Tooltip title='中華職業棒球大聯盟'>
        <img src={companyImg} height={32} alt='中華職棒' />
      </Tooltip>
    </Box>
  )
}

export default CompanyLogo