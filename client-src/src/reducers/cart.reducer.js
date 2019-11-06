import { ADD_TO_CART, DELETE_FROM_CART, DELETE_ALL_FROM_CART, CHANGE_QUANTITY } from '../actions/actionTypes'
import { CHECKOUT, CHECKOUT_CONFIRM } from '../actions/actionTypes'

const initialState = {
    addedItems: [],
    total: 0,
    shipping: 10,
    error: "",
}

export default (state = initialState, { type, payload, productData, dataList, shipping}) => {
    let extra = 10;
    if (shipping === "standard") {
        extra = 3;
    } else{
        extra = 10;
    }
    
    // console.log(productData)
    switch (type) {
        case ADD_TO_CART:
            let quant = parseInt(productData.quantity);
            let addedItem = payload[0];
            if  (addedItem){
                let added = state.addedItems;
                let existedItem = added.find(item=> productData.productId === item[0].id);
                if (quant === 0){
                    return {
                        ...state,
                        error: "Điền vào số sách cần mua"
                    }
                } else if (0<quant<20) {
                    if (existedItem){
                        let temp = existedItem[0].quantity + quant;
                        if (temp >= 20){
                            return {
                                ...state,
                                error: "Không được mua quá 20 sách mỗi loại"
                            }
                        } else{
                            existedItem[0].quantity = temp
                            return {
                                ...state,
                                addedItems: added,
                                total: state.total + addedItem.price * quant,
                                error: ""
                            }
                        }  
                    } else {
                        addedItem.quantity = quant;
                        let newTotal = state.total + addedItem.price * quant;
                        return {
                            ...state,
                            addedItems: [...state.addedItems, payload],
                            total: newTotal,
                            error: ""
                        }
                    }  
                } else{
                    return {
                        ...state,
                        error: "Không được mua quá 20 sách mỗi loại"
                    }
                }
            } else{
                return {
                    ...state,
                    error: "Không đủ sách trong kho"
                }
            }
        case CHANGE_QUANTITY:
            let added = state.addedItems;
            if (dataList.length ===0){
                return state;
            }
            else{
                if (payload === "success"){
                    const vals = Object.values(dataList)
                    if (!vals.every(e=>e<20)){
                        return {
                            ...state,
                            error: "Không được mua quá 20 sách mỗi loại"
                        }
                    } else {
                        if(vals.includes("")) {
                            return {
                                ...state,
                                error: "Điền số sách cần mua",
                            }
                        } else{
                            let tempTotal = 0;
                            for (var productId in dataList) {
                                let book = added.find(item => item[0].id === productId)[0];
                                book.quantity = dataList[productId];
                                tempTotal += book.price * book.quantity;
                            }
                            let bookNotInList = added.filter(book => !(book[0].id in dataList));
                            for (var index = 0; index < bookNotInList.length; index++) {
                                let book = bookNotInList[index][0]; 
                                tempTotal += book.price * book.quantity;
                            }
                            return {
                                ...state,
                                addedItems: added,
                                total: tempTotal,
                                shipping: extra,
                                error: ""
                            }
                        }
                    }
                } else{
                    return {
                        ...state,
                        error: "Không đủ sách trong kho"
                    }
                }
            }
        case DELETE_ALL_FROM_CART:
            return {
                ...state,
                addedItems: [],
                total: 0,
                shipping: 10,
                error: ""
            }
        case DELETE_FROM_CART:
            let added2 = state.addedItems.filter(item=> item[0].id !== productData);
            let book = state.addedItems.find(item => item[0].id === productData)[0];
            let tempTotal = state.total - book.price * book.quantity;
            return {
                ...state,
                addedItems: added2,
                total: tempTotal,
                error: ""
            }
        case CHECKOUT:
            return state;
        case CHECKOUT_CONFIRM:
            return {
                ...state,
                addedItems: [],
                total: 0,
                shipping: 10,
                error: "",
            }
        default:
            return state;
    }
}