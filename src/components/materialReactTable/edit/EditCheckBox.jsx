import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'

const EditCheckBox = ({
    cell,
    column,
    editingChecked,
    setEditingCheckedFC
}) => {
    const [rowId, setRowId] = useState(null)
    if(cell.row.id!==rowId) {
        setRowId(cell.row.id)
        setEditingCheckedFC(null)
    }
    if(editingChecked===null) setEditingCheckedFC(cell.row.original[column.id])
    return (
        <IconButton
        onClick={()=>{
            if(editingChecked==='N') setEditingCheckedFC('Y')
            else setEditingCheckedFC('N')
        }}
        >
            {editingChecked==='Y' 
                ?<CheckBox color='primary' />
                :<CheckBoxOutlineBlank/>}
        </IconButton>
    )
}

export default EditCheckBox