import { createSlice } from "@reduxjs/toolkit";

const RestoreDeviceSetting = createSlice({
  name: "RestoreDeviceSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openRestoreDeviceSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeRestoreDeviceSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openRestoreDeviceSettingDialog, closeRestoreDeviceSettingDialog } =
  RestoreDeviceSetting.actions;

export const restoreDeviceSettingSelector = (state) => {
  const { visible } = state.restoreDeviceSetting;
  return { visible };
};

export default RestoreDeviceSetting;