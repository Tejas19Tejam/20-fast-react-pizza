import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      console.log(action.payload);
      // payload = itemId
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },
    clearCart(state, action) {
      state.cart = [];
    },
    increaseItemQuantity(state, action) {
      // payload = itemId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = itemId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

// Redux Selector Functions
// This functions should start with get keyword
// Please check sec_23_to_24 file in react notes for more details.

export const getCart = (store) => store.cart.cart;

export const getCartTotalQuantity = createSelector(
  [(store) => store.cart.cart],
  (cart) => cart.reduce((sum, item) => sum + item.quantity, 0),
);

export const getCartTotalPrice = createSelector(
  [(store) => store.cart.cart],
  (cart) => cart.reduce((sum, item) => sum + item.totalPrice, 0),
);


// export const getQuantityById = (id) => {
//   return createSelector(
//     [(store) => store.cart.cart],
//     (cart) => {
//       console.log('Run');
//       const item = cart.find((item) => item.pizzaId === id);
//       return item ? item.quantity : 0;
//     },
//     {
//       equalityCheck: (previousCart, currentCart) => {
//         console.log(previousCart);
//         console.log(currentCart);
//         // return previousCart === currentCart;
//         return _.isEqual(previousCart, currentCart);
//       },
//     },
//   );
// };

export const getQuantityById = (id) => {
  return createSelector([(store) => store.cart.cart], (cart) => {
    const item = cart.find((item) => item.pizzaId === id);
    return item ? item.quantity : 0;
  });
};
