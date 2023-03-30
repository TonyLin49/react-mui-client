import React, { useState } from 'react';
import {Column, Table} from 'react-virtualized';
import axios from 'axios';
import 'react-virtualized/styles.css';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { commonLoadingState } from '../../atoms/globalAtom';

const BaseVirtualizTable = () => {

  const setIsLoading = useSetRecoilState(commonLoadingState)

  const [count, setCount] = useState(0)
  const [rows, setRows] = useState([])

  useEffect(()=>{
    fecthData()
  },[])
  
  const fecthData = async ()=>{
    setIsLoading(true)
    const data = await axios.get('http://192.168.68.111:5001/api/flows').then(res=>res.json())
    console.log('data', data)
    setCount(data.count)
    setRows(data.rows)
    setIsLoading(false)
  }
  
  return (
    <Table
        style={{marginTop: 100}}
        width={800}
        height={600}
        headerHeight={20}
        rowHeight={30}
        rowCount={count}
        rowGetter={({index}) => rows[index]}>
        <Column label="流程代碼" dataKey="flowkey" width={150} />
        <Column label="申請人" dataKey="applicantName" width={100} />
        <Column width={700} label="流程摘要" dataKey="flowName" />
    </Table>
  )
}
export default BaseVirtualizTable;