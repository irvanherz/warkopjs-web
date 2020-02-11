const initialState = {
    items: [],
    params: {},
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORY_SET_PARAMS':
            return {
                ...state,
                params: action.params
            }
        case 'CATEGORY_SET_DATA':
                return {
                    ...state,
                    ...action.data
                }
        case 'CATEGORY_RELOAD_FULFILLED':
            return {
                ...state,
                params: action.params,
                items: action.payload.data.data.items
            }
        default:
            return state
    }
}

export default category