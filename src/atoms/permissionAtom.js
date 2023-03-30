import { atom } from "recoil";

export const permissionDefaultValuesAtom = atom({
    key: 'permissionDefaultValuesAtom',
    default: {
        id:'',
        sysNo:'',
        applicant:'',
        createDept:'',
        code:'',
        parentTable:'All',
        parentId:'',
        programId:'',
        canInsert:'Y',
        searchAuth:'Department',
        updateAuth:'Self',
        deleteAuth:'Self',
        multiDeptsAuth:''
    }
})