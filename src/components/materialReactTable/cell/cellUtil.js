export const handleShowCellContent = (cellValue, optinos)=>{
    if(!cellValue || !optinos || optinos.length===0) return cellValue
    if(cellValue.indexOf(',')===-1){
        return getDataLabel(cellValue,optinos)
    } else {
        let rtnValue = null
        const cellArray = cellValue.split(',')
        cellArray.forEach(cell => {
            if(rtnValue===null)
                rtnValue = getDataLabel(cell,optinos)
            else 
                rtnValue += `,${getDataLabel(cell,optinos)}`
        });
        return rtnValue
    }
}

const getDataLabel = (cellValue, optinos) => {
    if(!cellValue || !optinos || optinos.length===0) return cellValue
    const data = optinos.find(
        (option)=> option.value === cellValue
    )
    if(data && data.label.split('-')[1]) 
        return data.label.split('-')[1]
    return cellValue
}