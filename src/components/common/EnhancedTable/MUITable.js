import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import TblHead from "./TblHead";
import TblBody from "./TblBody";
import TblPagination from "./TblPagination";
import TblToolbar from "./TblToolbar";
import { Toolbar } from "@mui/material";

const MUITable = ({
  Columns,
  rowKey,
  title,
  DataSource,
  TotalRowCount,
  currentPage = 0,
  options: { sortable, selectable, filtrable },
  toolbarOptions: { exportData, createNew, deleteSelected, globalFilter, columnHindingEnable,dateSort,tableRefresh, },
  actions = [],
  size = "small",
}) => {
  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setorder] = useState();
  const [orderBy, setorderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const handleSetSelected = (value) => {
    setSelected(value);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = DataSource.map((n) => n[rowKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DataSource.length) : 0;

  const isActions = actions.length > 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setorder(isAsc ? "desc" : "asc");
    setorderBy(cellId);
  };
  const initiateValue=  Columns.filter((col)=>{
    return col.type === "timeStamp" ?(col):null
  }).map((dev)=>dev.key)[0]
  const [inputDate, setInputDate] = useState("");
  const [deviceMode,setDeviceMode]=useState(initiateValue)
  const [eventValue,setEventValue]= useState("DateRangePicker")
  const [startDate,setStartDate]= useState(new Date("6/1/2022").toLocaleDateString())
  const [endDate,setEndDate]= useState(new Date().toLocaleDateString())

   const recordAfterDateSort=(newData)=>{
     if(eventValue==="DatePicker"){
     return newData.filter((row) => {
       let rec = Columns.map((element) =>{
           const timedata = Date.parse(inputDate)
           const timeEnd = (timedata+86399000)
          return element.key===deviceMode ?(  
           (Date.parse((new Date(Date.parse(row[element.key]))).toLocaleDateString()))>=timedata&& (Date.parse((new Date(Date.parse(row[element.key]))).toLocaleDateString()))<=timeEnd
    ):null
       } 
       );
       return rec.includes(true);
     })};
     if(eventValue==="DateRangePicker"){
       return newData.filter((row) => {
         let rec = Columns.map((element) =>{
             const timedata = Date.parse(startDate)
             const timeEnd = (Date.parse(endDate)+86399000)
            return element.key===deviceMode?( 
             (Date.parse((new Date(Date.parse(row[element.key]))).toLocaleDateString()))>=timedata&& (Date.parse((new Date(Date.parse(row[element.key]))).toLocaleDateString()))<=timeEnd
         ):null
         } 
         );
         return rec.includes(true);
       });
     }
     }

  const recordAfterfiltering = (dataSource) => {
    return dataSource.filter((row) => {
      let rec = Columns.map((element) =>
        row[element.key].includes(inputSearch)
      );
      return rec.includes(true);
    });
  };
const dataCapture=(dataSource)=>{
const dataAfterfiltering = recordAfterfiltering(dataSource)
const dataforSort = recordAfterDateSort(dataAfterfiltering)
return dataforSort
}

  const recordAfterPaginationAndSorting = (dataSource) => {
    if(dateSort){
      return stableSort(
        dataCapture(dataSource),
        getComparator(order, orderBy),
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }else{
      return stableSort(
        recordAfterfiltering(dataSource),
        getComparator(order, orderBy),
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    
  };

  const [selectedCol,setSelectedCol]=useState(Columns.map(col=>col.key));
  const handleRefresh =()=>{
    setStartDate(new Date("6/1/2022").toLocaleDateString())
   setEndDate(new Date().toLocaleDateString())
   setDeviceMode(initiateValue)
   setEventValue("DateRangePicker")
 recordAfterPaginationAndSorting(DataSource)
     }

  return (
    <React.Fragment>
      <TableContainer component={Paper} >
        <TblToolbar
          selected={selected}
          createNew={createNew}
          deleteSelected={deleteSelected}
          exportData={exportData}
          title={title}
          selectable={selectable}
          Columns={Columns}
          DataSource={DataSource}
          globalFilter={globalFilter}
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
          columnSelected={columnHindingEnable}
          dateSort={dateSort}
          setInputDate={setInputDate}
          setDeviceMode={setDeviceMode}
          setEventValue={setEventValue}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedCol={setSelectedCol}
          selectedCol={selectedCol}
          tableRefresh={tableRefresh}
          handleRefresh={handleRefresh}
          initiateValue={initiateValue}
        />
      <Toolbar sx={{ overflow:'auto' }}>
          <Table stickyHeader aria-label="sticky table" size={size} >
          <TblHead
            Columns={Columns}
            order={order}
            orderBy={orderBy}
            handleSortRequest={handleSortRequest}
            sortable={sortable}
            isActions={isActions}
            actions={actions}
            rowCount={TotalRowCount}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            selectable={selectable}
            selectedCol={selectedCol}
            columnSelected={columnHindingEnable}
            title={title}
          />
          <TblBody
            Columns={Columns}
            Items={recordAfterPaginationAndSorting(DataSource)}
            emptyRows={emptyRows}
            actions={actions}
            rowKey={rowKey}
            selected={selected}
            handleSetSelected={handleSetSelected}
            selectable={selectable}
            selectedCol={selectedCol}
            columnSelected={columnHindingEnable}
          />
        </Table>
        </Toolbar>
        <TblPagination
            rowsPerPageOptions={[5, 10, 15]}
            count={TotalRowCount ? TotalRowCount : DataSource.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> 
      </TableContainer>       
    </React.Fragment>
  );
};

export default MUITable;

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
