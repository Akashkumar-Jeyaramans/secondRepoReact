import { createSlice } from "@reduxjs/toolkit";

const EnableSNMPsetting = createSlice({
  name: "EnableSNMPsetting",
  initialState: {
    visible: false,
  },
  reducers: {
    openEnableSNMPsettingDialog: (state, { payload }) => {
      state.visible = true;
    },
    closeEnableSNMPsettingDialog: (state, { payload }) => {
      state.visible = false;
    },
  },
});

export const { openEnableSNMPsettingDialog, closeEnableSNMPsettingDialog } =
  EnableSNMPsetting.actions;

export const enableSNMPsettingSelector = (state) => {
  const { visible } = state.enableSNMPsetting;
  return { visible };
};

export default EnableSNMPsetting;