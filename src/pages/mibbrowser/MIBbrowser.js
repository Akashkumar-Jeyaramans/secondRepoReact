import  React, { useState } from 'react';
import {
    Card,
    CardContent,
    Paper,
    Button,
    Stack,
    Grid,
  } from "@mui/material";
import MibbrowserForm from "../../components/mibbrowserManagement/mibbrowserForm";
import MibbrowserDialog from "../../components/mibbrowserManagement/mibbrowserDialog";
import MibbrowserTable from "../../components/mibbrowserManagement/mibbrowserTable";
import MibbrowserTableList from "../../components/mibbrowserManagement/mibbrowserTableList";
import Mibbrowsertree from "../../components/mibbrowserManagement/mibbrowserTree";
import MibC from 'mibJson' 
import mib from '../../utils/data/mib.json';

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "30vw"
  };

const MIBbrowser = () => {
  var a = [];
  a.push(MibC)
  console.log("mib",a)
  console.log("jsonmib", mib)
    const [address, setaddress] = useState('');
    const [clickedMibDialog, setClickedMibDialog] = useState("")
    const [Oid, setOid] = useState('');
    const [Name, setName] = useState('');
    const [Mib, setMib] = useState('');
    const [loadMib, setLoadMib] = useState('');
    const [Content, setContent] = useState('');
    const [selectedNode, setSelectedNode] = useState({});
    const [selectedRoot, setSelectedRoot] = useState({});

    const handleAdvanced = () => {
        if (address === "") setClickedMibDialog('false');
        else setClickedMibDialog('true')
      };

    const handleUnload = () => {
        setLoadMib("");
      };

  return (
    <Paper>
      <Card>
        <CardContent>
        <Stack spacing={2} direction="row">
        <Button variant="contained" component="label">
            Load MIBs
            <input hidden accept="image/*" multiple type="file" onChange={(e) => setLoadMib(e.target.value)}/>
        </Button>
            <Button variant="contained" component="label" onClick={handleUnload}>
            Unload MIBs
        </Button>
        </Stack>

        <br></br> 

        <Stack spacing={2} direction="row" alignItems="center">
            <MibbrowserForm address={address} setaddress={setaddress} handleAdvanced={handleAdvanced} Oid={Oid}/>
        </Stack>

            <MibbrowserDialog clickedMibDialog={clickedMibDialog} address={address} setaddress={setaddress}/>

        <br></br>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card style={cardStyle}>
                <CardContent>
                <h3>SNMP MIBs Tree</h3>
                {loadMib !== ''? 
                <Mibbrowsertree 
                  setOid={setOid} 
                  setMib={setMib} 
                  setName={setName} 
                  selectedNode={selectedNode} 
                  setSelectedNode={setSelectedNode} 
                  selectedRoot={selectedRoot} 
                  setSelectedRoot={setSelectedRoot}
                  setContent={setContent}
                />
                : null }
                </CardContent>
                </Card>
                <Card >
                <CardContent>
                 <MibbrowserTableList Oid={Oid} Name={Name} Mib={Mib}/>
                </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <MibbrowserTable Content={Content}/>
              </Grid>
              </Grid>

        </CardContent>
      </Card>
    </Paper>
  );
};

export default MIBbrowser;