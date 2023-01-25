import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import protectedApis from "../utils/apis/protectedApis";
import { inventoryDataMapping } from "../utils/dataMapping";

export const GetInventoryDeviceData = createAsyncThunk(
  "deviceInventorySlice/GetInventoryDeviceData",
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
        return inventoryDataMapping(data.inventories);
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

const DeviceInventorySlice = createSlice({
  name: "deviceInventorySlice",
  initialState: {
    inventoryDeviceData: [],
  },
  reducers: {},
  extraReducers: {
    [GetInventoryDeviceData.fulfilled]: (state, { payload }) => {
      state.inventoryDeviceData = payload;
    },
  },
});

//export const {} = DeviceInventorySlice.actions;

export const inventoryDeviceDataSelector = (state) => {
  const { inventoryDeviceData } = state.deviceInventory;
  return { inventoryDeviceData };
};

export default DeviceInventorySlice;
