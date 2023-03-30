import printJS from 'print-js'

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    //console.log('width, Height', width, height)
    return { width, height }
}

export const windowPrinter = () => window.print()

export const jsonPrinter = (
    headerTitle,
    documentTitle,
    jsonData, 
    headers,
    headerStyle,
    gridStyle,
) => {
    if(!jsonData) {
        jsonData = [
            {id: '1', username: 'Tony', displayname: '林文彬', email: 'tonylin49@gmail.com'},
            {id: '2', username: 'Sonia', displayname: '鍾雪婷', email: 'sonia1201@gmail.com'},
            {id: '3', username: 'tonyinfos', displayname: '東尼資訊有限公司', email: 'tonyinfos@gmail.com'},
            {id: '4', username: 'testUser', displayname: '測試帳號', email: 'test.user@mail.tonyinfos.com'},
        ]
    }
    if(!headers){
        headers = [
            {field: 'id', displayName: 'ID', columnSize: 4},
            {field: 'username', displayName: '帳號', columnSize: 2},
            {field: 'displayname', displayName: '顯示名稱', columnSize: 3},
            {field: 'email', displayName: 'Email帳號', columnSize: 4},
        ]
    }
    if(!headerStyle) headerStyle='border-bottom: 4px solid #3971A5;'
    if(!gridStyle) gridStyle='border-bottom: 1px solid #3971A5;'
    if(!headerTitle) headerTitle='HEADER TITLE'
    if(!documentTitle) documentTitle='DOCUMENT TITLE'

    return printJS({
        printable: jsonData,
        properties: headers,
        type: 'json',
        gridHeaderStyle: headerStyle,
        gridStyle: gridStyle,
        header: headerTitle,
        documentTitle: documentTitle
    })
}