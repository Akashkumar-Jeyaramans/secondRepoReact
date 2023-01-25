export const inventoryDataMapping = (inventoryData = []) => {
  const modifiedInvDqata = inventoryData.map((invdata) => {
    return {
      ...invdata,
      ap: invdata.firmwareInformation.ap,
      kernel: invdata.firmwareInformation.kernel,
    };
  });
  return modifiedInvDqata;
};
