import Axios from "axios"

export const setData = (data) => {
    return {
        type: 'PRODUCT_SET_DATA',
        data
    }
}

export const setParams = (params) => {
    return {
        type: 'PRODUCT_SET_PARAMS',
        params
    }
}