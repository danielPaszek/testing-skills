import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomID: null,
    cart: [], // item= id, price,name,email, amount
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomID = action.payload;
    },
    addItem: (state, action) => {
      const isInCart = state.cart.find((item) => item.id === action.payload.id);
      if (isInCart) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, { ...action.payload, amount: 1 }];
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.reduce((acc, item) => {
        if (item.id === action.payload) {
          if (item.amount === 1) return acc;
          else return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, []);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { enterRoom, addItem, removeItem, clearCart } = appSlice.actions;

export const selectRoomID = (state) => state.app.roomID;
export const selectCart = (state) => state.app.cart;
export const selectAmountInCart = (state) =>
  state.app.cart.reduce((acc, item) => acc + item.amount, 0);

export default appSlice.reducer;
