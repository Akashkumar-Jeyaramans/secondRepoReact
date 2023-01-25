import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import ProtectedApis from "../utils/apis/protectedApis";
import PublicApis from "../utils/apis/publicApis";

export const loginUser = createAsyncThunk(
  "userAuth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await PublicApis.post("/v1/auth/login", {
        id: nanoid(8),
        type: "loginuser",
        parameters: [
          {
            username,
            password,
          },
        ],
        metadata: {},
      });
      let data = await response.data;
      let responseResult = data.result;
      if (response.status === 200 && responseResult.success) {
        sessionStorage.setItem("nmstoken", responseResult.data[0].token);
        sessionStorage.setItem("nmsuser", responseResult.data[0].username);
        ProtectedApis.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${responseResult.data[0].token}`;
        return data.user;
      } else {
        return thunkAPI.rejectWithValue(responseResult.message);
      }
    } catch (e) {
      if (e.response && e.response.statusText !== "") {
        return thunkAPI.rejectWithValue(e.response.statusText);
      } else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getInitialUser = createAsyncThunk(
  "userAuth/getInitialUser",
  async (_, thunkAPI) => {
    try {
      const response = await PublicApis.post("/v1/auth/initialUser", {
        id: nanoid(8),
        type: "getinitialUser",
        parameters: [],
        metadata: {},
      });
      let data = await response.data;
      let responseResult = data.result;
      if (response.status === 200 && responseResult.success) {
        return responseResult.data[0];
      } else {
        return thunkAPI.rejectWithValue(responseResult.message);
      }
    } catch (e) {
      if (e.response && e.response.statusText !== "") {
        return thunkAPI.rejectWithValue(e.response.statusText);
      } else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    id: "",
    name: "",
    role: "",
    username: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    initialUserData: {
      username: "",
      password: "",
    },
  },
  reducers: {
    // Reducer comes here
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    clearAuthData: (state) => {
      state.id = "";
      state.name = "";
      state.role = "";
      state.username = "";
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setUser: (state, { payload }) => {
      state.username = payload;
      return state;
    },
    logoutUser: (state) => {
      state.id = "";
      state.name = "";
      state.role = "";
      state.username = "";
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: {
    // Extra reducer comes here
    [getInitialUser.fulfilled]: (state, { payload }) => {
      state.initialUserData.username = payload?.username;
      state.initialUserData.password = payload?.password;
      return state;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.id = payload?.user_id;
      state.name = payload?.name;
      state.role = payload?.role;
      state.username = payload?.username;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState, setUser, logoutUser, clearAuthData } =
  userAuthSlice.actions;
export const userAuthSelector = (state) => state.userAuth;

export default userAuthSlice;
