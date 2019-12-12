import {GET_PROMOS} from '../actions/actionTypes'

const initialState = {
    promos: []
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_PROMOS:
            console.log(payload)
            return {
                ...state,
                promos: payload
            }
        default: 
            return state
    }
}