import { createSlice } from "@reduxjs/toolkit";

const ResetToDefaultSetting = createSlice({
  name: "ResetToDefaultSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openResetToDefaultSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeResetToDefaultSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openResetToDefaultSettingDialog, closeResetToDefaultSettingDialog } =
  ResetToDefaultSetting.actions;

export const resetToDefaultSettingSelector = (state) => {
  const { visible } = state.resetToDefaultSetting;
  return { visible };
};

export default ResetToDefaultSetting;