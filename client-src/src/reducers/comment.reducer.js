import {GET_COMMENT, COMMENT, COMMENT_LOADING} from '../actions/actionTypes'

const initialState = {
    comment: null,
    comments: null,
    comment_loading: false
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case COMMENT_LOADING:
            return {
                ...state,
                comment_loading: true
            }
        case GET_COMMENT:
            return {
                ...state,
                comment: payload,
                comment_loading: false
            }
        case COMMENT:
            console.log(payload)
            return {
                ...state,
                comment: payload
            }
        default: return state
    }
}