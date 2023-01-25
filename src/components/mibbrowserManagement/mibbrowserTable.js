import React from "react";
import MUITable from "../common/EnhancedTable/MUITable";
import dataMib from "../../utils/data/dataCheck.json";

const MibbrowserTable = ({Content}) => {
  console.log(Content)
const column = [
    { key: "name", label: "Name/OID" },
    { key: "value", label: "Value" },
    { key: "type", label: "Type" },
    { key: "port", label: "Port" },
    ];
   
  return (
    <>
    <MUITable
      Columns={column}
      rowKey="id"
      title="Result Table"
      DataSource={dataMib}
      TotalRowCount={dataMib.length}
      currentPage={1}
      options={{ sortable: false, selectable: false, filtrable: false }}
      toolbarOptions={{
        exportData: false,
        createNew: {
            enable: false,
            // icon: <Add />,
            onClick: (event) => {
            },
        },
        deleteSelected: {
            enable: false,
            label: "Delete",
            // icon: <Delete />,
            onClick: (event, selectedRow) =>
            console.log("Add button clicked", selectedRow),
        },
        globalFilter: false,
        }}
        />
    </>
  );
};

export default MibbrowserTable;