import { createSlice } from "@reduxjs/toolkit";

const NetworkSetting = createSlice({
  name: "NetworkSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openNetworkSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeNetworkSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openNetworkSettingDialog, closeNetworkSettingDialog } =
  NetworkSetting.actions;

export const networkSettingSelector = (state) => {
  const { visible } = state.networkSetting;
  return { visible };
};

export default NetworkSetting;