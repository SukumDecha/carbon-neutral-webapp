import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlicer, { CartsState } from "./cartSlicer";

// Combine reducers
const rootReducer = combineReducers({
  carts: cartSlicer,
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = {
  carts: CartsState;
};
