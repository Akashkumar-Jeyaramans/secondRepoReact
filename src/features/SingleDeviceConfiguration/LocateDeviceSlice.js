import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import protectedApis from "../../utils/apis/protectedApis";

export const RequestLocateDevice = createAsyncThunk(
  "LocateDeviceSlice/RequestLocateDevice",
  async (params, thunkAPI) => {
    try {
      const response = await protectedApis.post("/api/v1/config/device", {
        device: {
          device_id: params.macAddress,
          device_path: params.ipAddress,
        },
        settings: [
          {
            kind: "locate",
            settings: {
              locateBeep: 1,
            },
          },
        ],
        valid: true,
      });
      const data = await response.data;
      //console.log(data.result);
      if (response.status === 200 && data.result) {
        return data.result;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (e) {
      if (e.response && e.response.statusText !== "")
        return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const LocateDeviceSlice = createSlice({
  name: "LocateDeviceSlice",
  initialState: {
    sessionId: "",
    macAddress: "",
    ipAddress: "",
    resLocateState: "",
    errorLocate: "",
  },
  reducers: {
    clearData: (state, { payload }) => {
      state.resLocateState = "";
      state.sessionId = "";
      state.macAddress = "";
      state.ipAddress = "";
      state.errorLocate = "";
    },
    setResState: (state, { payload }) => {
      state.resLocateState = payload.state;
      state.errorLocate = payload.message;
    },
  },
  extraReducers: {
    [RequestLocateDevice.fulfilled]: (state, { payload }) => {
      const { device, session } = payload;
      state.resLocateState = session.state;
      state.sessionId = session.id;
      state.macAddress = device.deviceId;
      state.ipAddress = device.devicePath;
    },
    [RequestLocateDevice.rejected]: (state, { payload }) => {
      state.resLocateState = "fail";
      state.sessionId = "";
      state.macAddress = "";
      state.ipAddress = "";
    },
  },
});

export const { clearData, setResState } = LocateDeviceSlice.actions;

export const locateDeviceSelector = (state) => {
  const { ipAddress, macAddress, sessionId, resLocateState, errorLocate } =
    state.beepSingleDevice;
  return { ipAddress, macAddress, sessionId, resLocateState, errorLocate };
};

export default LocateDeviceSlice;
