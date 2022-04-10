import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = state => state.cart.cartItems


// Count number of Products in cart
export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    cartItem => cartItem.reduce((count,item)=>{
         return count += item.quantity
    },0)
)


// Calculate total of cart

export const cartTotalSelector = createSelector(
    cartItemsSelector,
    (cartItem) =>{
       return cartItem.reduce((total,item)=>{
          return total += item.quantity * item.product.price
        },0)
    }
)
