import { atom } from 'recoil'
import { SESSION_USER_OBJECT } from '../constants/globalConstant'
import { getSessionData } from '../utils/globalUtil'
import { getWindowDimensions } from '../utils/windowUtil'

export const currentUserState = atom({
    key: 'currentUserState', 
    default: getSessionData(SESSION_USER_OBJECT) || null 
})

export const openLoginState = atom({
    key: 'openLoginState',
    default: true
})

export const openUserMenuState = atom({
    key: 'openUserMenuState',
    default: false
})

export const openRegisterState = atom({
    key: 'openRegisterState', 
    default: false 
})

export const localeState = atom({
    key: 'localeState',
    default: 'zh_TW'
})

export const commonLoadingState = atom({
    key: 'commonLoadingState',
    default: false
})

export const notificationAlertState = atom({
    key: 'notificationAlertState',
    default: {open: false, message: 'info', severity: 'info'}
})

export const windowDimensionsState = atom({
    key: 'windowDimensionsState',
    default: getWindowDimensions()
})

export const globalUsersState = atom({
    key: 'globalUsersState',
    default: []
})

export const openLeftDrawerState = atom({
    key: 'openLeftDrawerState',
    default: false 
})

export const leftDrawerWidthState = atom({
    key: 'leftDrawerWidthState',
    default: 240
})

export const leftTreeMenuExpandState = atom({
    key: 'leftTreeMenuExpandState',
    default: 'close'
})

export const openLeftDrawerBackdropState = atom({
    key: 'openLeftDrawerBackdropState',
    default: false
})

export const goToPathState = atom({
    key: 'goToPathState',
    default: ''
})