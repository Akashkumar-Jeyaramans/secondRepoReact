import  React,{useState, useEffect} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
// import mib from '../../utils/data/mib.json';
import MibbrowserContent from './mibbrowserContent';
import MibC from 'mibJson' 

export default function Mibbrowsertree({
                                        setOid, 
                                        setName, 
                                        setMib, 
                                        selectedNode, 
                                        setSelectedNode, 
                                        selectedRoot, 
                                        setSelectedRoot,
                                        setContent,
                                      }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [openColPopup, setopenColPopup]= useState(false)
  var mib = [];
  mib.push(MibC)
  useEffect(() => {
    // This will be called for each new value of selectedNode, including the initial empty one
    // Here is where you can make your API call
    console.log("selectedNode", selectedNode);
    console.log("selectedRoo", selectedRoot);
  }, [selectedNode, selectedRoot]);

  const handleChange = (event, nodeId) => {
    mib.forEach((treeRoot) => {
      if(treeRoot.id === nodeId){
        setSelectedRoot(treeRoot);
        setSelectedNode(treeRoot);
        return
      }

      handleSelectedNode(treeRoot.children, treeRoot, nodeId);
    });
  };

  const handleSelectedNode = (children, treeRoot, nodeId) => {
    if (!children) {
      return;
    }

    for (let i = 0; i < children.length; i++) {
      let childNode = children[i];
      if (childNode.id === nodeId) {
        setSelectedRoot(treeRoot);
        setSelectedNode(childNode);
        setOid(childNode.oid)
        setName(childNode.name)
        setMib(childNode.mib)
        return;
      }

      handleSelectedNode(childNode.children || [], treeRoot, nodeId);
    }
  };

  const displayTreeView = (treeViewArray) => {
    if (!treeViewArray) {
      return null;
    }
    return treeViewArray.map((treeViewItem) => {
      return (
        <TreeItem
          key={treeViewItem.id}
          nodeId={`${treeViewItem.id}`}
          label={treeViewItem.name}
        >
          {displayTreeView(treeViewItem.children)}
        </TreeItem>
      );
    });
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  return (
      <>
      <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleChange}
        sx={{ height: 240, flexGrow: 1, maxWidth: 800, overflowY: "auto" }}
      >
        {displayTreeView(mib)}
      </TreeView>
      <MibbrowserContent 
        openColPopup={openColPopup} 
        setopenColPopup={setopenColPopup} 
        contextMenu={contextMenu} 
        setContextMenu={setContextMenu}
        selectedNode={selectedNode}
        setContent={setContent}
      />
      </div>
    </>
  );
}