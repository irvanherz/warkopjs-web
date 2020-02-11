const initialState = {
    items: [],
    params: {},
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT_SET_PARAMS':
            return {
                ...state,
                params: action.params
            }
        case 'PRODUCT_SET_DATA':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export default product