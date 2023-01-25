import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import protectedApis from "../utils/apis/protectedApis";
export const GetData = createAsyncThunk(
  "inventoryDevice/getData",
  async (_, thunkAPI) => {
    try {
      const response = await protectedApis.post("/v1/inventories", {
        pagination: {
          page: 1,
          size: 20,
        },
      });
      const data = await response.data;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.payload.reason);
      }
    } catch (e) {
      console.log("Error", e.message);
      if (e.response) return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const InventoryDeviceSlice = createSlice({
  name: "invnetoryDevice",
  initialState: {
    inventoryList: [],
    status: null,
    loadding: false,
  },
  extraReducers: {
    [GetData.pending]: (state, { payload }) => {
      state.status = "loading";
      state.error = false;
      state.loading = true;
    },
    [GetData.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.error = false;
      state.loading = false;
      state.inventoryList = payload.inventories;
    },
    [GetData.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = true;
      state.loading = false;
      state.inventoryList = [];
    },
  },
});

export const inventoryDeviceSelector = (state) =>
  state.inventoryDevice.inventoryList;
export default InventoryDeviceSlice.reducer;
