const initialState = {}

const misc = (state = initialState, action) => {
    switch (action.type) {
        case 'MISC_SET_STATE':
            return {
                ...state,
                ...action.states
            }
        default:
            return state
    }
}

export default misc