import { Add, Delete, Edit } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUITable from "../../components/common/EnhancedTable/MUITable";
import Popup from "../../components/common/Popup";
import UserForm from "../../components/userManagement/UserForm";
import {
  CreateNewUser,
  GetAllUsers,
  UpdateUser,
  usermgmtSelector,
} from "../../features/UserManagementSlice";
import { useSnackbar } from "notistack";

const ManagementUser = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { usersData, status, message } = useSelector(usermgmtSelector);
  const [openPopup, setopenPopup] = useState(false);
  const [recordsForEdit, setrecordsForEdit] = useState(null);

  const loggedinUser = sessionStorage.getItem("nmsuser");

  const AddorEdit = (user, resetForm) => {
    if (user.id === "0")
      dispatch(CreateNewUser({ ...user, created_by: loggedinUser }));
    else dispatch(UpdateUser({ ...user, updated_by: loggedinUser }));
    resetForm();
    setrecordsForEdit(null);
    setopenPopup(false);
  };

  const openInPopup = (item) => {
    setrecordsForEdit(item);
    setopenPopup(true);
  };

  useEffect(() => {
    dispatch(GetAllUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status !== "") {
      if (status === "success") {
        enqueueSnackbar(message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(message, {
          variant: "error",
        });
      }
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const column = [
    { key: "name", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "created_by", label: "Created By" },
    { key: "created_at", label: "Created At", disableSort: true },
    { key: "status", label: "Status" },
  ];
  const actions = [
    {
      key: "edit",
      icon: <Edit />,
      color: "primary",
      tooltip: "Edit User",
      onClick: (event, rowData) => openInPopup(rowData),
    },
  ];

  return (
    <Paper>
      <MUITable
        Columns={column}
        rowKey="id"
        title="User Management"
        DataSource={usersData}
        TotalRowCount={usersData.length}
        currentPage={1}
        options={{ sortable: true, selectable: false, filtrable: true }}
        toolbarOptions={{
          exportData: true,
          createNew: {
            enable: true,
            label: "Add New",
            icon: <Add />,
            onClick: (event) => {
              setopenPopup(true);
              setrecordsForEdit(null);
            },
          },
          deleteSelected: {
            enable: true,
            label: "Delete",
            icon: <Delete />,
            onClick: (event, selectedRow) =>
              console.log("Add button clicked", selectedRow),
          },
          globalFilter: true,
        }}
        actions={actions}
      />
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setopenPopup}
      >
        <UserForm AddorEdit={AddorEdit} recordsForEdit={recordsForEdit} />
      </Popup>
    </Paper>
  );
};

export default ManagementUser;
