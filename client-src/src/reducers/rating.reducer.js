import {RATING, RATING_LOADING, GET_RATING_USER, GET_RATING_BOOK} from '../actions/actionTypes'

const initialState = {
    rating: null,
    rating_loading: false,
    rating_user: '0'
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case RATING_LOADING:
            return {
                ...state,
                rating_loading: true
            }
        case RATING:
            return {
                ...state,
                rating_loading: false
            }
        case GET_RATING_BOOK:
            return {
                ...state,
                rating: payload,
                rating_loading: false
            }
        case GET_RATING_USER:
            console.log(payload)
            return {
                ...state,
                rating_user: payload.rate,
                rating_loading: false
            }
        default: return state
    }
}