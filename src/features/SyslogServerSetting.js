import { createSlice } from "@reduxjs/toolkit";

const SysylogServerSetting = createSlice({
  name: "SysylogServerSetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openSysylogServerDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeSysylogServerDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openSysylogServerDialog, closeSysylogServerDialog } =
  SysylogServerSetting.actions;

export const sysylogServerSettingSelector = (state) => {
  const { visible } = state.sysylogServerSetting;
  return { visible };
};

export default SysylogServerSetting;