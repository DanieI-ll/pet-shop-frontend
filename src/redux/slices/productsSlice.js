import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories, getProductsByCategory, getAllProducts, getProductById, sendOrder } from "../thunks";

const initialState = {
  products: [],
  categories: [],
  product: null,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

