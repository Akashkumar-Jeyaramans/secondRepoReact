import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import protectedApis from "../utils/apis/protectedApis";

export const GetAllUsers = createAsyncThunk(
  "usermgmtSlice/GetAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await protectedApis.post("/v1/user/getAll", {
        id: nanoid(8),
        type: "getalluser",
        parameters: [],
        metadata: {},
      });
      const data = await response.data;
      let responseResult = data.result;
      if (response.status === 200 && responseResult.success) {
        return responseResult;
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

export const CreateNewUser = createAsyncThunk(
  "usermgmtSlice/CreateNewUser",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const response = await protectedApis.post("/v1/user/create", {
        id: nanoid(),
        type: "createUser",
        parameters: [
          {
            name: params.name,
            username: params.username,
            password: params.password,
            email: params.email,
            role: params.role,
            created_by: params.created_by,
          },
        ],
        metadata: {},
      });
      const data = await response.data;
      let responseResult = data.result;
      if (response.status === 200 && responseResult.success) {
        thunkAPI.dispatch(GetAllUsers());
        return responseResult;
      } else {
        return thunkAPI.rejectWithValue(responseResult.message);
      }
    } catch (e) {
      if (e.response && e.response.statusText !== "")
        return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "usermgmtSlice/UpdateUser",
  async (params, thunkAPI) => {
    try {
      const response = await protectedApis.post("/v1/user/update", {
        id: nanoid(),
        type: "createUser",
        parameters: [
          {
            id: params.id,
            name: params.name,
            username: params.username,
            email: params.email,
            role: params.role,
            updated_by: params.updated_by,
          },
        ],
        metadata: {},
      });
      const data = await response.data;
      let responseResult = data.result;
      if (response.status === 200 && responseResult.success) {
        thunkAPI.dispatch(GetAllUsers());
        return responseResult;
      } else {
        return thunkAPI.rejectWithValue(responseResult.message);
      }
    } catch (e) {
      if (e.response && e.response.statusText !== "")
        return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const UserManagementSlice = createSlice({
  name: "usermgmtSlice",
  initialState: {
    usersData: [],
    status: "",
    message: "",
  },
  reducers: {},
  extraReducers: {
    [GetAllUsers.pending]: (state, { payload }) => {
      state.usersData = [];
      state.status = "";
      state.message = "";
    },
    [GetAllUsers.fulfilled]: (state, { payload }) => {
      state.usersData = payload?.data;
      state.status = payload?.success ? "" : "fail";
      state.message = payload?.success ? "" : payload?.message;
    },
    [GetAllUsers.rejected]: (state, { payload }) => {
      state.usersData = [];
      state.status = "fail";
      state.message = payload;
    },
    [CreateNewUser.fulfilled]: (state, { payload }) => {
      state.status = payload?.success ? "success" : "fail";
      state.message = payload?.message;
    },
    [CreateNewUser.rejected]: (state, { payload }) => {
      state.status = "fail";
      state.message = payload;
    },
    [UpdateUser.fulfilled]: (state, { payload }) => {
      state.status = payload?.success ? "success" : "fail";
      state.message = payload?.message;
    },
    [UpdateUser.rejected]: (state, { payload }) => {
      state.status = "fail";
      state.message = payload;
    },
  },
});

//export const {} = UserManagementSlice.actions;

export const usermgmtSelector = (state) => {
  const { usersData, status, message } = state.usermgmt;
  return { usersData, status, message };
};

export default UserManagementSlice;
