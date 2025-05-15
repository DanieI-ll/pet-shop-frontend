import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer
  },
  devTools: true,
});

store.subscribe(() => {
  localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.items));
});

export default store;