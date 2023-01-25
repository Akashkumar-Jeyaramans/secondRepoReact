import { createSlice } from "@reduxjs/toolkit";

const FirmwareUploadSetting = createSlice({
  name: "FirmwareUploadSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openFirmwareUploadSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeFirmwareUploadSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openFirmwareUploadSettingDialog, closeFirmwareUploadSettingDialog } =
  FirmwareUploadSetting.actions;

export const firmwareUploadSettingSelector = (state) => {
  const { visible } = state.firmwareUploadSetting;
  return { visible };
};

export default FirmwareUploadSetting;