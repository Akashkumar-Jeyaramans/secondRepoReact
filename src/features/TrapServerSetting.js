import { createSlice } from "@reduxjs/toolkit";

const TrapServerSetting = createSlice({
  name: "TrapServerSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openTrapServerDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeTrapServerDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openTrapServerDialog, closeTrapServerDialog } =
  TrapServerSetting.actions;

export const trapServerSettingSelector = (state) => {
  const { visible } = state.trapServerSetting;
  return { visible };
};

export default TrapServerSetting;