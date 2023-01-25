import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import protectedApis from "../utils/apis/protectedApis";
import { setResState } from "./SingleDeviceConfiguration/LocateDeviceSlice";

export const GetSocketResponse = createAsyncThunk(
  "socketControlSlice/GetSocketResponse",
  async (params, thunkAPI) => {
    try {
      const response = await protectedApis.post(
        `/api/v1/config-result/${params}`,
        {}
      );
      const data = await response.data;
      if (response.status === 200) {
        thunkAPI.dispatch(ExtractConfigResults(data));
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.statusText !== "") {
        console.log(e.response.statusText);
        return thunkAPI.rejectWithValue(e.response.statusText);
      } else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const ExtractConfigResults = (results) => {
  return async (dispatch, getState) => {
    const kind = results.configResults[0].kind;
    switch (kind) {
      case "locate":
        let beepState = getState().beepSingleDevice;
        if (beepState.sessionId === results.session.id)
          dispatch(
            setResState({
              state: results.session.state,
              message: results.session.message,
            })
          );
        break;
      default:
        break;
    }
  };
};

const initialState = {};

const SocketControlSlice = createSlice({
  name: "socketControlSlice",
  initialState,
  reducers: {},
});

//export const {} = SocketControlSlice.actions;

export default SocketControlSlice.reducer;
