// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calculateTotalPrice = cart => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      totalPrice: 0,
    },
    reducers: {
      loadCartFromSessionStorage: state => {
        const cartData = JSON.parse(sessionStorage.getItem('cart'));
        if (cartData) {
          state.items = cartData.items;
          state.totalPrice = calculateTotalPrice(cartData.items);
        }
      },
      addToCart: (state, action) => {
        const { product, quantity } = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
  
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += quantity;
        } else {
          state.items.push({ product, quantity });
        }
        state.totalPrice = calculateTotalPrice(state.items);
        sessionStorage.setItem('cart', JSON.stringify(state));
      },
      removeFromCart: (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter(item => item.product.id !== productId);
        state.totalPrice = calculateTotalPrice(state.items);
        sessionStorage.setItem('cart', JSON.stringify(state));
      },
      updateQuantity: (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.items.find(item => item.product.id === productId);
        if (item) {
          if(quantity !== 0){
            item.quantity = quantity;
          }
          state.totalPrice = calculateTotalPrice(state.items);
          sessionStorage.setItem('cart', JSON.stringify(state));
        }
      },
    },
  });
  
  export const { loadCartFromSessionStorage, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
  export default cartSlice.reducer;