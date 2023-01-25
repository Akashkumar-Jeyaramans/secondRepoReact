import { createSlice } from "@reduxjs/toolkit";

const BackupNrestoreSetting = createSlice({
  name: "BackupNrestoreSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openBackupNrestoreSettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeBackupNrestoreSettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openBackupNrestoreSettingDialog, closeBackupNrestoreSettingDialog } =
  BackupNrestoreSetting.actions;

export const backupNrestoreSettingSelector = (state) => {
  const { visible } = state.backupNrestoreSetting;
  return { visible };
};

export default BackupNrestoreSetting;