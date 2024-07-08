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

    removeCart(state, action: PayloadAction<string>) {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },

    updateCart(
      state,
      action: PayloadAction<{ id: string; updatedItem: Partial<ICart> }>
    ) {
      const { id, updatedItem } = action.payload;
      const existingItem = state.carts.find((item) => item.id === id);
      if (existingItem) {
        Object.assign(existingItem, updatedItem);
      }
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.carts.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addCart, removeCart, updateCart, updateCartQuantity } =
  itemsSlice.actions;
export default itemsSlice.reducer;
