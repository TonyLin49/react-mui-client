import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const EditAutocomplete = ({
    cell,
    column,
    setEditingValueFC,
    options,
}) => {
    return(
        <Autocomplete
        fullWidth
        onChange={(e)=>{
            const componentValue = e.target.innerText
            setEditingValueFC(componentValue)
        }}
        options={options}
        getOptionLabel={(option) => option?.label || ''}
        
        isOptionEqualToValue={(option, value) =>
            option?.label === value.label
        }
        renderInput={(params) => 
            <TextField
                {...params}
                variant="standard"
                placeholder={cell.row.original[column.id]}
            />
        }
        />
    )
}

export default EditAutocomplete