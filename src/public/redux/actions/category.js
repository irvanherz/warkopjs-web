import Axios from "axios"

// export const reload = (props, params={}) => {
//     return {
//         type: 'CATEGORY_RELOAD',
//         payload: Axios.get(`${process.env.REACT_APP_API_HOST}/categories?` + queries.join('&'), {headers:{'Authorization': props.authData.data.token} })
//     }
// }

export const setData = (data) => {
    return {
        type: 'CATEGORY_SET_DATA',
        data
    }
}

export const setParams = (params) => {
    return {
        type: 'CATEGORY_SET_PARAMS',
        params
    }
}