import React from "react";
import {
    Table,
    TableCell,
    TableRow,
  } from "@mui/material";

const MibbrowserTableList = ({Name,Mib,Oid}) => {
   
  return (
    <>
    <Table>
    <TableRow>
        <TableCell variant="head">Name</TableCell>
        <TableCell>{Name}</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">OID</TableCell>
        <TableCell>{Oid}</TableCell>
    </TableRow>
    <TableRow>
           <TableCell variant="head">MIB</TableCell>
        <TableCell>{Mib}</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Syntax</TableCell>
        <TableCell>{}</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Access</TableCell>
        <TableCell>{}</TableCell>
    </TableRow>
    <TableRow>
        <TableCell variant="head">Status</TableCell>
        <TableCell>{}</TableCell>
    </TableRow>
    </Table>
    </>
  );
};

export default MibbrowserTableList;