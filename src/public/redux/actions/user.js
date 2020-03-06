import Axios from "axios"

// export const reload = (params={}) => {
//     const queries = Object.keys(params).map(key => `${key}=${params[key]}`)
//     return {
//         type: 'USER_RELOAD',
//         params: params,
//         payload: Axios.get(`${process.env.REACT_APP_API_HOST}/users?` + queries.join('&'), {headers:{'Authorization': props.authData.data.token} })
//     }
// }

export const setData = (data) => {
    return {
        type: 'USER_SET_DATA',
        data
    }
}

export const setParams = (params) => {
    return {
        type: 'USER_SET_PARAMS',
        params
    }
}