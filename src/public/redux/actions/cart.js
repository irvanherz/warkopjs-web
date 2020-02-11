import axios from 'axios'
import qs from 'qs'

export const addItem = (item) => {
    return {
        type: 'CART_ADD_ITEM',
        item
    }
}

export const increaseItem = id => {
    return {
        type: 'CART_INCREASE_ITEM',
        id
    }
}

export const decreaseItem = id => {
    return {
        type: 'CART_DECREASE_ITEM',
        id
    }
}

export const removeItem = id => {
    return {
        type: 'CART_REMOVE_ITEM',
        id
    }
}

export const clearItems = () => {
    return {
        type: 'CART_CLEAR_ITEMS',
    }
}

export const setOrderData = data => {
    return {
        type: 'CART_SET_ORDER_DATA',
        orderData: data
    }
}

