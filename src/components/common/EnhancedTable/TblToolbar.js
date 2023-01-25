import { Close, Download, Search, Event,Autorenew,ViewColumn } from "@mui/icons-material";
import {
  alpha,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { DatePickers } from "../../inventoryManagement/DatePicker";
import Popup from "../Popup";
import { ColumnHiding } from "./ColumnHiding";

const TblToolbar = ({
  selected,
  createNew,
  deleteSelected,
  exportData,
  title,
  Columns,
  DataSource,
  globalFilter,
  inputSearch,
  setInputSearch,
  columnSelected,
  dateSort,
  setInputDate,
  setDeviceMode,
  setEventValue,
  setStartDate,
  setEndDate,
  setSelectedCol,
  selectedCol,
  tableRefresh,
  handleRefresh,
  initiateValue,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEll, setAnchorEll] = useState(null);
  const [csvHeader, setCsvHeader] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const[openPopup,setopenPopup]= useState(false)
  const[openColPopup,setopenColPopup]= useState(false)
  const[modVal,setModVal]=useState("")
  const open = Boolean(anchorEl);
  const openDate = Boolean(anchorEll)
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateClick = (event)=>{
    setAnchorEll(event.currentTarget)
  }

  const handleCsvDownload = (event, done) => {
    const headers = Columns.map((col) => col.label);
    const data = DataSource.map((item) => {
      return Columns.map((col) => item[col.key]);
    });
    setCsvHeader(headers);
    setCsvData(data);
    handleClose();
    done(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePdfDownload = (event) => {
    const headers = [Columns.map((col) => col.label)];
    const data = DataSource.map((item) => {
      return Columns.map((col) => item[col.key]);
    });
    exportPDF(data, headers, title);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateClose=()=>{
    setAnchorEll(null)
  }
  const handleDatePicker=()=>{
    setModVal("DatePicker")
    setEventValue("DatePicker")
    setopenPopup(true)
    handleDateClose()
  }
  const handleDateRanger=()=>{
    setModVal("DateRangePicker")
    setEventValue("DateRangePicker")
    setopenPopup(true)
    handleDateClose()
  }
const handleColumns=(event)=>{
  setopenColPopup(true)
}

 const isSelected=(id)=>selectedCol.indexOf(id) !== -1;
 const handleColClick = (event, id) => {
        const selectedIndex = selectedCol.indexOf(id);    
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedCol, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedCol.slice(1));
        } else if (selectedIndex === selectedCol.length - 1) {
          newSelected = newSelected.concat(selectedCol.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedCol.slice(0, selectedIndex),
            selectedCol.slice(selectedIndex + 1)
          );
        }
        setSelectedCol(newSelected)
 };



  return (
    <>
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.secondary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flexGrow: "1" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flexGrow: "1" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {tableRefresh && (
        <Tooltip title="Table Refresh">
        <IconButton color="primary" aria-label="delete" size="small" onClick={handleRefresh}>
          <Autorenew fontSize="inherit" />
        </IconButton>
        </Tooltip>
      )}
     
      <Stack direction="row" spacing={2}>
        {selected.length <= 0 && globalFilter && (
          <TextField
          color="primary"
            label="Search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search  color="primary"/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setInputSearch("")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="primary"
                  >
                    <Close />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
     {selected.length <= 0 && columnSelected &&(
          <>
          <Button
           variant="outlined"
           startIcon={<ViewColumn />}
           onClick={handleColumns}
           sx={{ mr: 2 }}
          >
          Columns
          </Button>
          </>
        )}
        {selected.length <= 0 && createNew && createNew.enable && (
          <Button
            variant="outlined"
            startIcon={createNew.icon}
            onClick={(e) => createNew.onClick(e)}
          >
            {createNew.label}
          </Button>
        )}
        {selected.length > 0 && deleteSelected && deleteSelected.enable && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={deleteSelected.icon}
            onClick={(e) => deleteSelected.onClick(e, selected)}
          >
            {deleteSelected.label}
          </Button>
        )}
        {selected.length <= 0 && exportData && (
          <>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleClick}
              sx={{ mr: 2 }}
            >
              export
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handlePdfDownload}>PDF Export</MenuItem>
              <MenuItem>
                <CSVLink
                  headers={csvHeader}
                  data={csvData}
                  filename={getFilename(title)}
                  asyncOnClick={true}
                  onClick={handleCsvDownload}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  CSV Export
                </CSVLink>
              </MenuItem>
            </Menu>
          </>
        )}
           {selected.length <= 0 && dateSort && (
          <>
            <Button
              variant="outlined"
              startIcon={<Event />}
              onClick={handleDateClick}
              sx={{ mr: 2 }}
            >
              Event
            </Button>
            <Menu
              anchorEl={anchorEll}
              open={openDate}
              onClose={handleDateClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleDatePicker}>Date Picker</MenuItem>
              <MenuItem
                  onClick={handleDateRanger}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Date Range Picker
              </MenuItem>
            </Menu>
          </>
        )}

      </Stack>
    </Toolbar>
    <Popup
        title="Date"
        openPopup={openPopup}
        setOpenPopup={setopenPopup}
      >
     <DatePickers 
      modVal={modVal} 
      setOpenPopup={setopenPopup}  
      setInputDate={setInputDate} 
      setDeviceMode={setDeviceMode} 
      setStartDate={setStartDate} 
      setEndDate={setEndDate} 
      Columns={Columns}
      initiateValue={initiateValue}
     />
      </Popup>
      <Popup
        title="Columns Hiding"
        openPopup={openColPopup}
        setOpenPopup={setopenColPopup}
      >
      <ColumnHiding 
      column={Columns} 
      handleClick={handleColClick} 
      isSelected={isSelected} 
      />
      </Popup>
    </>
  );
};

export default TblToolbar;

const exportPDF = (data, headers, title) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  let content = {
    startY: 50,
    head: headers,
    body: data,
  };

  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(getFilename(title));
};

const getFilename = (title) => {
  // For todays date;
  // eslint-disable-next-line no-extend-native
  Date.prototype.today = function () {
    return (
      (this.getDate() < 10 ? "0" : "") +
      this.getDate() +
      (this.getMonth() + 1 < 10 ? "0" : "") +
      (this.getMonth() + 1) +
      this.getFullYear()
    );
  };

  // For the time now
  // eslint-disable-next-line no-extend-native
  Date.prototype.timeNow = function () {
    return (
      (this.getHours() < 10 ? "0" : "") +
      this.getHours() +
      (this.getMinutes() < 10 ? "0" : "") +
      this.getMinutes() +
      (this.getSeconds() < 10 ? "0" : "") +
      this.getSeconds()
    );
  };
  const currentdate = new Date();

  return `${title}_${currentdate.today()}_${currentdate.timeNow()}`;
};
