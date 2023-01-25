import React, {useState} from "react";
import {TableRow, TableCell, List, Card, CardHeader, ListItem, ListItemText, ListItemIcon, Checkbox, Divider} from "@mui/material";
import SchedulePopupTransfer from "./SchedulePopupTransfer";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const ScheduleBackupTransfer = 
    ({
        openPopup, 
        setopenPopup, 
        Style, 
        schedulename,
        tabRightTransfer,
        settabRightTransfer,
        setscheduleValue
    }) => {

    const [checked, setChecked] = useState([]);
    const [tabLeftTransfer, settabLeftTransfer] = useState([
        {"id": "1", "mac": "01-7C-F5-4B-2B-9D", "model": "EHG7208", "ip": "111.162.2.81", "status": "WAITING"}, 
        {"id": "2", "mac": "02-5D-6Y-3B-2D-6D", "model": "EHG7308", "ip": "199.160.40.60", "status": "WAITING"}, 
        {"id": "3", "mac": "AF-03-E1-E6-AC-90", "model": "EHG7408", "ip": "73.56.28.105", "status": "WAITING"}, 
        {"id": "4", "mac": "81-6F-6C-75-96-7F", "model": "EHG7508", "ip": "120.228.35.15", "status": "WAITING"}, 
        {"id": "5", "mac": "4A-39-06-8C-B7-99", "model": "EHG7608", "ip": "41.117.156.122", "status": "WAITING"}
    ]);
    const leftChecked = intersection(checked, tabLeftTransfer);
    const rightChecked = intersection(checked, tabRightTransfer);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {

        if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
        } else {
        setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        settabRightTransfer(tabRightTransfer.concat(leftChecked));
        settabLeftTransfer(not(tabLeftTransfer, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        settabLeftTransfer(tabLeftTransfer.concat(rightChecked));
        settabRightTransfer(not(tabRightTransfer, rightChecked));
        setChecked(not(checked, rightChecked));
    };
        const handleButton = () => {
        setscheduleValue(tabRightTransfer);
        setopenPopup(false)
    };

    const customList = (title, items) => (

    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${items.length} items`}
      />
      <Divider />
      <List
        sx={{
          width: 1000,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId}>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{value.model}</TableCell>
              <TableCell align="right">{value.mac}</TableCell>
              <TableCell align="right">{value.ip}</TableCell>
            </TableRow>
                </ListItemText>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div>
        <SchedulePopupTransfer
            Style={Style}
            rightChecked={rightChecked}
            tabRightTransfer={tabRightTransfer}
            handleCheckedRight={handleCheckedRight}
            leftChecked={leftChecked}
            tabLeftTransfer={tabLeftTransfer}
            handleCheckedLeft={handleCheckedLeft}
            customList={customList}
            handleButton={handleButton}
            openPopup={openPopup}
            setopenPopup={setopenPopup}
            schedulename={schedulename}
        />
    </div>
  );
};

export default ScheduleBackupTransfer;