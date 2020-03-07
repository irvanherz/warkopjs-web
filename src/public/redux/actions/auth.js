import axios from 'axios'
import qs from 'qs'

export const setLoginData = (data) => {
    return {
        type: 'AUTH_SET_LOGIN_DATA',
        data
    }
}

export const updateLoginData = (data) => {
    return {
        type: 'AUTH_UPDATE_LOGIN_DATA',
        data
    }
}

export const unsetLoginData = () => {
    return {
        type: 'AUTH_UNSET_LOGIN_DATA',
    }
}