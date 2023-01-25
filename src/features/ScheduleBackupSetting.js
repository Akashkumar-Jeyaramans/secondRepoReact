import { createSlice } from "@reduxjs/toolkit";

const ScheduleBackupSetting = createSlice({
  name: "ScheduleBackupSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openScheduleBackupSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeScheduleBackupSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openScheduleBackupSettingDialog, closeScheduleBackupSettingDialog } =
  ScheduleBackupSetting.actions;

export const scheduleBackupSettingSelector = (state) => {
  const { visible } = state.scheduleBackupSetting;
  return { visible };
};

export default ScheduleBackupSetting;