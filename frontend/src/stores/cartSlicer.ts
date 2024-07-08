import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../features/cart/cart.type";

export interface CartsState {
  carts: ICart[];
}

const initialState: CartsState = {
  carts: [],
};

const itemsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<ICart>) {
      state.carts.push(action.payload);
    },

    removeCart(state, action: PayloadAction<number>) {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },

    updateCart(
      state,
      action: PayloadAction<{ id: number; updatedItem: Partial<ICart> }>
    ) {
      const { id, updatedItem } = action.payload;
      const existingItem = state.carts.find((item) => item.id === id);
      if (existingItem) {
        Object.assign(existingItem, updatedItem);
      }
    },
  },
});

export const { addCart, removeCart, updateCart } = itemsSlice.actions;
export default itemsSlice.reducer;
