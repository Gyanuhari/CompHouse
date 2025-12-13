import { createSlice } from "@reduxjs/toolkit";
import type { ProductParams } from "../../app/models/productParams";

const initialState: ProductParams = {
  orderBy: "name",
  searchTerm: "",
  brands: [],
  types: [],
  pageNumber: 1,
  pageSize: 50,
};

export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState: initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
      state.pageNumber = 1;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
      state.pageNumber = 1;
    },
    resetParams: () => {
      return initialState;
    },
  },
});

export const {
  setBrands,
  setTypes,
  setPageNumber,
  setPageSize,
  setOrderBy,
  setSearchTerm,
} = catalogSlice.actions;
