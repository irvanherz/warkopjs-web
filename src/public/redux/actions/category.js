import Axios from "axios"

// export const reload = (props, params={}) => {
//     return {
//         type: 'CATEGORY_RELOAD',
//         payload: Axios.get('http://127.0.0.1:3001/categories?' + queries.join('&'), {headers:{'Authorization': props.authData.data.token} })
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