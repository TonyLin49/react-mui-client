import dayjs from "dayjs";
import zhTW from 'dayjs/locale/zh-tw'

dayjs.locale(zhTW)

const dateFormat = 'YYYY-MM-DD'
const datetimeFormat = 'YYYY-MM-DD HH-mm-ss'
const yearMonthFormat = 'YYYY MMMM'

export const now = () => {return dayjs().format(datetimeFormat)}

export const today = () => {return dayjs().format(dateFormat)}

export const yearMonth = (date) => {
    if(!date) return dayjs().format(yearMonthFormat)
    return dayjs(date).format(yearMonthFormat)
}