import { createSlice } from "@reduxjs/toolkit";

const BackupDeviceSetting = createSlice({
  name: "BackupDeviceSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openBackupDeviceSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeBackupDeviceSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openBackupDeviceSettingDialog, closeBackupDeviceSettingDialog } =
  BackupDeviceSetting.actions;

export const backupDeviceSettingSelector = (state) => {
  const { visible } = state.backupDeviceSetting;
  return { visible };
};

export default BackupDeviceSetting;