const initialState = {
    data: [],
    params: {},
}

const report = (state = initialState, action) => {
    switch (action.type) {
        case 'REPORT_SET_PARAMS':
            return {
                ...state,
                params: action.params
            }
        case 'REPORT_SET_DATA':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export default report