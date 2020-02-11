const initialState = {
    items: [],
    params: {},
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_SET_PARAMS':
            return {
                ...state,
                params: action.params
            }
        case 'USER_SET_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'USER_RELOAD_FULFILLED':
            return {
                ...state,
                params: action.params,
                items: action.payload.data.data.items
            }
        default:
            return state
    }
}

export default user