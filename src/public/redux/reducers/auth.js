const initialState = {
    data: {}
}

const auth = (state = initialState, action) => {
    switch (action.type) {
    case 'AUTH_SET_LOGIN_DATA':
        return {
            ...state,
            data: action.data
        }
    case 'AUTH_UPDATE_LOGIN_DATA':
        return {
            ...state,
            data: {...state.data, ...action.data}
        }
    case 'AUTH_UNSET_LOGIN_DATA':
        return {
            ...state,
            data: {}
        }
    default:
        return state
    }
}

export default auth