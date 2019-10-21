import { ADD_TO_CART, DELETE_FROM_CART, DELETE_ALL_FROM_CART } from '../actions/actionTypes'

const initialState = {
    addedItems: [],
    total: 0,
}

export default (state = initialState, { type, payload, productId, quantity }) => {
    switch (type) {
        case ADD_TO_CART:
            quantity = parseInt(quantity)
            let addedItem = payload[0]
            let existedItem = state.addedItems.find(item=> productId === item[0].id)
            if (quantity<20) {
                if (existedItem){
                    existedItem[0].quantity += quantity;
                    return {
                        ...state,
                        total: state.total + addedItem.price * quantity
                    }
                }
                else {
                    addedItem.quantity = quantity;
                    let newTotal = state.total + addedItem.price * quantity
                    return {
                        ...state,
                        addedItems: [...state.addedItems, payload],
                        total: newTotal
                    }
                } 
                
            }
            else{
                alert("Không được mua quá 20 sách")
            }
        default:
            return state;
    }
}