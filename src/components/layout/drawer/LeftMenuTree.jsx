import React, { useEffect } from 'react'
import { ReactTree, useReactTreeApi } from '@naisutech/react-tree'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { goToPathState, leftTreeMenuExpandState, openLeftDrawerState } from '../../../atoms/globalAtom'
import { useState } from 'react'

const inventorysystem = [
  {
    "id": 'inventorysystem',
    "parentId": 'enterprisemanagementsystem',
    "label": "進銷存",
    "items": []
  },
  {
    "id": 'salesmanagement',
    "parentId": 'inventorysystem',
    "label": "銷售管理",
    "items": [
      {
        "id": 'quotations',
        "label": "報價單",
      },
      {
        "id": 'orders',
        "label": "訂單",
      },
      {
        "id": 'shipments',
        "label": "出貨單",
      },
      {
        "id": 'shipmentreturns',
        "label": "退貨單",
      }
    ]
  },
  {
    "id": 'purchasemanagement',
    "parentId": 'inventorysystem',
    "label": "進貨管理",
    "items": [
      {
        "id": 'purchaseorders',
        "label": "訂購單",
      },
      {
        "id": 'purchases',
        "label": "採購單",
      },
      {
        "id": 'acceptances',
        "label": "驗收單",
      },
      {
        "id": 'acceptancereturns',
        "label": "驗退單",
      }
    ]
  },
  {
    "id": 'inventorymanagement',
    "parentId": 'inventorysystem',
    "label": "存貨管理",
    "items": [
      {
        "id": 'stockouts',
        "label": "領用單",
      },
      {
        "id": 'stockins',
        "label": "領退單",
      },
      {
        "id": 'stocktransfers',
        "label": "調撥單",
      },
      {
        "id": 'qtyadjustments',
        "label": "調整單",
      },
      {
        "id": 'amountadjustments',
        "label": "金額調整單",
      },
      {
        "id": 'scrappeds',
        "label": "報廢單",
      }
    ]
  },
  {
    "id": 'settlement',
    "parentId": 'inventorysystem',
    "label": "結算管理",
    "items": [
      {
        "id": 'inventorys',
        "label": "盤點作業",
      },
      {
        "id": 'stockweightedaverages',
        "label": "加權平均成本",
      },
      {
        "id": 'stockmonthlybalances',
        "label": "庫存月結作業",
      }
    ]
  },
  {
    "id": 'inventorybasedata',
    "parentId": 'inventorysystem',
    "label": "基本資料",
    "items": [
      {
        "id": 'customers',
        "label": "客戶資料",
      },
      {
        "id": 'vendors',
        "label": "廠商資料",
      },
      {
        "id": 'products',
        "label": "產品資料",
      },
      {
        "id": 'batchnos',
        "label": "批號資料",
      }
    ]
  },
  {
    "id": 'inventoryreport',
    "parentId": 'inventorysystem',
    "label": "報表中心",
    "items": [
      {
        "id": 'inventories',
        "label": "進銷存統計表",
      },
      {
        "id": 'stockweightedaverages',
        "label": "庫存交易明細表",
      },
      {
        "id": 'stockmonthlybalances',
        "label": "庫存在手量查詢",
      }
    ]
  },
]

const hrsystem = [
  {
    "id": 'hrsystem',
    "parentId": 'enterprisemanagementsystem',
    "label": "人事管理",
    "items": []
  },
  {
    "id": 'attendance',
    "parentId": 'hrsystem',
    "label": "考勤管理",
    "items": [
      {
        "id": 'schedulingwork',
        "label": "排班作業",
      },
      {
        "id": 'leaves',
        "label": "請假單",
      },
      {
        "id": 'overtimes',
        "label": "加班單",
      },
      {
        "id": 'punchrecoeds',
        "label": "打卡資料",
      },
      {
        "id": 'balanceleavetypeapplys',
        "label": "特殊假申請單",
      },
      {
        "id": 'scheduletables',
        "label": "班表定義",
      },
      {
        "id": 'leavetypes',
        "label": "假別定義",
      },
      {
        "id": 'givespecialleavetypes',
        "label": "休假發放作業",
      },
      {
        "id": 'leaveaccountinfos',
        "label": "差假立帳資料",
      },
      {
        "id": 'overtimefeesettles',
        "label": "加班費結算",
      }
    ]
  },
  {
    "id": 'reportcenter',
    "label": "報表中心",
    "parentId": 'attendance',
    'items' : [
      
    ]
  },
  {
    "id": 'salarymanagement',
    "parentId": 'hrsystem',
    "label": "薪資管理",
    "items": [
      {
        "id": 'salaryinfos',
        "label": "薪資資料",
      },
      {
        "id": 'salarysettles',
        "label": "加扣薪作業",
      },
      {
        "id": 'salarylabors',
        "label": "勞健保代扣",
      },
      {
        "id": 'salarymonthbalances',
        "label": "薪資月結算",
      },
      {
        "id": 'salarybalancefulldatas',
        "label": "薪資發放明細",
      }
    ]
  },
]

const budgetsystem = [
  {
    "id": 'budget',
    "parentId": null,
    "label": "預算管理",
    "items": []
  },
  {
    "id": 'budgetarranges',
    "parentId": 'budget',
    "label": "預算編列",
    "items": [
      {
        "id": 'budgets',
        "label": "通用預算編列",
      },
      {
        "id": 'projects',
        "label": "專案計畫",
      },
      {
        "id": 'accountings',
        "label": "會計科目",
      },
    ]
  },
  {
    "id": 'budgetexecute',
    "parentId": 'budget',
    "label": "預算執行",
    "items": [
      {
        "id": 'voucherpayments',
        "label": "請款單",
      },
      {
        "id": 'receipts',
        "label": "交款單",
      },
      {
        "id": 'borrows',
        "label": "借款單",
      },
      {
        "id": 'budgetapportions',
        "label": "預算分攤",
      },
      {
        "id": 'paymentmemos',
        "label": "付款註記",
      },
    ]
  },
  {
    "id": 'budgeterport',
    "parentId": 'budget',
    "label": "預算報表",
    "items": [
      {
        "id": 'budgetarrangesummary',
        "label": "預算編列彙整表",
      },
      {
        "id": 'budgetarrangedetails',
        "label": "預算編列明細表",
      },
      {
        "id": 'budgetexecutestatus',
        "label": "預算執行狀況表",
      },
      {
        "id": 'budgetexecuteprojectsummary',
        "label": "專案執行狀況表",
      },
      {
        "id": 'budgetexecutedetails',
        "label": "專案執行明細表",
      },
    ]
  },
]

const flowsystem = [
  {
    "id": 'flowsystem',
    "parentId": null,
    "label": "流程管理",
    "items": [
      {
        "id": 'flowdefines',
        "label": "流程設定",
      },
      {
        "id": 'flows',
        "label": "流程資料",
      },
      {
        "id": 'flowdetails',
        "label": "簽核記錄",
      },
      {
        "id": 'flowsteps',
        "label": "簽核流程",
      },
      {
        "id": 'voidform',
        "label": "作廢表單",
      },
      {
        "id": 'jobagent',
        "label": "職務代理",
      },
      {
        "id": 'undertakers',
        "label": "業務承辦",
      },
      {
        "id": 'jobtransfer',
        "label": "工作移轉",
      },
    ]
  },
]

const systemmanagement = [
  {
    "id": 'systemmanagement',
    "parentId": null,
    "label": "系統管理",
    "items": [
      {
        "id": 'notices',
        "label": "系統公告",
      },
      {
        "id": 'syslogs',
        "label": "系統日誌",
      },
    ]
  },
  {
    "id": 'org',
    "parentId": 'systemmanagement',
    "label": "組織管理",
    "items": [
      {
        "id": 'employees',
        "label": "員工資料",
      },
      {
        "id": 'departments',
        "label": "部門資料",
      },
      {
        "id": 'companies',
        "label": "公司資料",
      }
    ]
  },
  {
    "id": 'security',
    "parentId": 'systemmanagement',
    "label": "安全管理",
    "items": [
      {
        "id": 'users',
        "label": "帳號資料",
      },
      {
        "id": 'groups',
        "label": "角色資料",
      },
      {
        "id": 'authorizations',
        "label": "權限設定",
      }
    ]
  },
  {
    "id": 'maintain',
    "parentId": 'systemmanagement',
    "label": "系統維護",
    "items": [
      {
        "id": 'usercategories',
        "label": "使用類別",
      },
      {
        "id": 'syscategories',
        "label": "系統類別",
      },
      {
        "id": 'programstructures',
        "label": "程式架構",
      },
      {
        "id": 'mailserviecs',
        "label": "郵件服務",
      },
      {
        "id": 'taskschedulings',
        "label": "背景排程",
      },
      {
        "id": 'properties',
        "label": "屬性配置",
      }
    ]
  }
]

const accountingledger = [
  {
    "id": 'accountingledger',
    "parentId": 'financialmanagement',
    "label": "會計總帳",
    "items": [
      {
        "id": 'accvouchers',
        "label": "傳票作業",
      },
      {
        "id": 'strikebalance',
        "label": "沖帳作業",
      },
      {
        "id": 'accperiods',
        "label": "期間控制",
      },
      {
        "id": 'accinterfaces',
        "label": "分錄介面定義",
      },
      {
        "id": 'accountings',
        "label": "會計科目",
      },
    ]
  },
  {
    "id": 'accountingreports',
    "parentId": 'accountingledger',
    "label": "報表中心",
    "items": [
      {
        "id": 'tobereceived',
        "label": "待收查詢",
      },
      {
        "id": 'tobepaid',
        "label": "待付查詢",
      },
      {
        "id": 'chargeoff',
        "label": "立沖餘額查詢",
      },
      {
        "id": 'dailyaccounting',
        "label": "日計帳",
      },
      {
        "id": 'dailymeter',
        "label": "日計表",
      },
      {
        "id": 'accountingbalancesheet',
        "label": "科目餘額表",
      },
      {
        "id": 'accountingspreadsheet',
        "label": "試算表",
      },
      {
        "id": 'generalledger',
        "label": "總分類帳",
      },
      {
        "id": 'subsidiaryledger',
        "label": "明細分類帳",
      },
      {
        "id": 'budgetandfinalanalysis',
        "label": "預決算分析表",
      },
      {
        "id": 'balancesheet',
        "label": "資產負債表",
      },
      {
        "id": 'comprehensiveincomestatement',
        "label": "綜合損益表",
      },
    ]
  },
]

const invoicemanagement = [
  {
    "id": 'invoicemanagement',
    "parentId": 'financialmanagement',
    "label": "發票管理",
    "items": [
      {
        "id": 'invoicenumbercontroll',
        "label": "編號控制設定",
      },
      {
        "id": 'salesinvoiceinfo',
        "label": "銷項發票資料",
      },
      {
        "id": 'incominginvoiceinfo',
        "label": "進項發票資料",
      },
      {
        "id": 'invoiceapplication',
        "label": "開立發票申請",
      },
      {
        "id": 'allowance',
        "label": "折讓單",
      },
    ]
  },
  {
    "id": 'invoicereports',
    "parentId": 'invoicemanagement',
    "label": "發票報表中心",
    "items": [
      {
        "id": 'salesinvoicedetails',
        "label": "銷項發票明細",
      },
      {
        "id": 'incominginvoicedetails',
        "label": "進項發票明細",
      },
      {
        "id": 'declaration81code',
        "label": "申報81碼格式",
      },
      {
        "id": 'invoicesalesdetail',
        "label": "發票銷貨明細",
      },
      
    ]
  },
]

const incometaxdeclaration = [
  {
    "id": 'incometaxdeclaration',
    "parentId": 'financialmanagement',
    "label": "所得申報",
    "items": [
      {
        "id": 'receipts',
        "label": "領款收據",
      },
      {
        "id": 'workingssalarygivings',
        "label": "工資發放",
      },
      {
        "id": 'workingsalarysummary',
        "label": "工資彙整",
      },
      {
        "id": 'salarydistribution',
        "label": "獎薪發放",
      },
      {
        "id": 'temporarystaffs',
        "label": "臨時人員資料",
      },
      {
        "id": 'invoicesalesdetail',
        "label": "各類所得統計",
      },
      {
        "id": 'variousincomestatistics',
        "label": "各類所得明細",
      },
      {
        "id": 'withholdingdetails',
        "label": "代扣明細資料",
      },
      {
        "id": 'mediadeclarationinfos',
        "label": "媒體申報資料",
      },
    ]
  },
]

const financialsystem = [
  {
    "id": 'financialmanagement',
    "parentId": 'enterprisemanagementsystem',
    "label": "財務管理",
    "items": []
  },
  ...incometaxdeclaration,
  ...invoicemanagement,
  ...accountingledger,
]

const sampleData =[
  {
    "id": 'enterprisemanagementsystem',
    "parentId": null,
    "label": "企業管理",
    "items": []
  },
  ...inventorysystem,
  ...hrsystem,
  ...financialsystem,
  ...budgetsystem,
  ...flowsystem,
  ...systemmanagement
]

const LeftMenuTree = () => {

  const data = sampleData

  const [leafNodes, setLeafNodes] = useState([])

  const setOpenLeftDrawer = useSetRecoilState(openLeftDrawerState)
  const treeExpand = useRecoilValue(leftTreeMenuExpandState)
  const setGoToPath = useSetRecoilState(goToPathState)

  const treeApi = useReactTreeApi()

  useEffect(()=>{
    treeApi.current.toggleAllNodesOpenState(treeExpand)
  },[treeExpand, treeApi])

  useEffect(()=>{
    var leafItems = []
    data.forEach((node)=>{
      if(node.items && node.items.length>0){
        node.items.forEach(item=>{
          leafItems.push(item)
        })
      }
    })
    setLeafNodes(leafItems)
  },[data])

  return (<>
    <ReactTree 
      ref={treeApi}
      nodes={data}  
      noIcons={false}
      enableItemAnimations={true}
      enableIndicatorAnimations={true}
      multiSelect={false}
      onToggleOpenNodes={(e)=>{
        //console.log('onToggleOpenNodes',e)
      }}
      onToggleSelectedNodes={(e)=>{
        if(e && e.length>0){
          let nodeId = e[0]
          leafNodes.forEach(node=>{
            if(node.id===nodeId){
              setGoToPath('/'+node.id)
              setOpenLeftDrawer(false)
            }
          })
        }
      }}
    />
  </>)
}

export default LeftMenuTree