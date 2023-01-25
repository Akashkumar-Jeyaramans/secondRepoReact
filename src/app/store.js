import { configureStore } from "@reduxjs/toolkit";
import DeviceAdvancedSetting from "../features/DeviceAdvancedSetting";
import DeviceDiscoverySlice from "../features/DeviceDiscoverySlice";
import SingleNetworkSetting from "../features/SingleNetworkSetting";
import SysylogServerSetting from "../features/SyslogServerSetting";
import TrapServerSetting from "../features/TrapServerSetting";
import FirmwareUploadSetting from "../features/FirmwareUploadSetting";
import ResetToDefaultSetting from "../features/ResetToDefaultSetting";
import NetworkSetting from "../features/NetworkSetting";
import BackupDeviceSetting from "../features/BackupDeviceSetting";
import RestoreDeviceSetting from "../features/RestoreDeviceSetting";
import ScheduleBackupSetting from "../features/ScheduleBackupSetting";
import EnableSNMPsetting from "../features/EnableSNMPsetting";
import ThemeSlice from "../features/ThemeSlice";
import DeviceInventorySlice from "../features/DeviceInventorySlice";
import InventoryDeviceReducer from "../features/InventoryDeviceSlice";
import UserManagementSlice from "../features/UserManagementSlice";
import userAuthSlice from "../features/useeAuthSlice";
import LocateDeviceSlice from "../features/SingleDeviceConfiguration/LocateDeviceSlice";

export const store = configureStore({
  reducer: {
    theme: ThemeSlice.reducer,
    deviceDiscovery: DeviceDiscoverySlice.reducer,
    singleNetworkSetting: SingleNetworkSetting.reducer,
    deviceAdvancedSetting: DeviceAdvancedSetting.reducer,
    sysylogServerSetting: SysylogServerSetting.reducer,
    trapServerSetting: TrapServerSetting.reducer,
    firmwareUploadSetting: FirmwareUploadSetting.reducer,
    resetToDefaultSetting: ResetToDefaultSetting.reducer,
    networkSetting: NetworkSetting.reducer,
    backupDeviceSetting: BackupDeviceSetting.reducer,
    restoreDeviceSetting: RestoreDeviceSetting.reducer,
    scheduleBackupSetting: ScheduleBackupSetting.reducer,
    enableSNMPsetting: EnableSNMPsetting.reducer,
    deviceInventory: DeviceInventorySlice.reducer,
    inventoryDevice: InventoryDeviceReducer,
    usermgmt: UserManagementSlice.reducer,
    userAuth: userAuthSlice.reducer,
    beepSingleDevice: LocateDeviceSlice.reducer,
  },
});
