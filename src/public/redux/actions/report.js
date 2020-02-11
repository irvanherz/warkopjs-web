export const setParams = (params={}) => {
    return {
        type: 'REPORT_SET_PARAMS',
        params
    }
}

export const setData = (data) => {
    return {
        type: 'REPORT_SET_DATA',
        data
    }
}