import  React from 'react';
import { TextField, Menu, MenuItem } from '@mui/material';
import Popup from '../../components/common/Popup';
import Button from '../../components/common/form/controls/Button';

export default function MibbrowserContent({
                                            setopenColPopup, 
                                            openColPopup, 
                                            contextMenu, 
                                            setContextMenu,
                                            setContent,
                                            selectedNode,
                                          }) {


  const handleClose = (e) => {
    // console.log(e.target.outerText)
    setContextMenu(null);
  };

  const handlefind=(e)=>{
    // console.log(e.target.outerText)
    setopenColPopup(true)
  } 

  const handleContent = () => {
    setContent(selectedNode);
  };

  return (
      <>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
        <MenuItem onClick={(e)=>handlefind(e)}>Find in Subtree</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Export to CSV</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Export to XML</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Expand Subtree</MenuItem>
        <hr/>
        <MenuItem onClick={(e)=>handleClose(e)}>Graph View</MenuItem> 
        <hr/>
        <MenuItem onClick={handleContent}>Get Next</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Get Bulk</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Get Subtree</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Walk</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)}>Add to Watches</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e)} disabled>Table View</MenuItem>
        </Menu>
        <Popup
        title="Find objects in mib tree"
        openPopup={openColPopup}
        setOpenPopup={setopenColPopup}
        >
          <TextField label="Find Next" />
          <div sx={{maxWidth:"100px"}}>
          <Button text="Find"></Button>
          <Button text="Cancel"></Button>
          </div>
        </Popup>
    </>
  );
}