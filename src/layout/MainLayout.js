import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NavSidebar from "./components/NavSidebar";
import NavHeader from "./components/NavHeader";
import BreadcrumItemLayout from "./components/BreadcrumItemLayout";
import NetworkSettingDrawer from "../components/drawer/NetworkSettingDrawer";
import AdvancedSettingDrawer from "../components/drawer/AdvancedSettingDrawer";
import * as mqtt from "../utils/nmsMqttService/nmsMqttService";
import { useDispatch } from "react-redux";
import { GetSocketResponse } from "../features/SocketControlSlice";

const drawerWidth = 240;
const wsbroker = "localhost";
const wsport = 15675; // port for above

const MainLayout = () => {
  const dispatch = useDispatch();
  const [client, setClient] = useState(null);
  const _topic = ["config.config", "inventory/update"];
  const _topicOptions = {};

  // called when client lost connection
  const _onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  };
  // called when messages arrived
  const _onMessageArrived = (message) => {
    const parsedMessage = JSON.parse(message.payloadString);
    console.log("socket response", JSON.parse(message.payloadString));
    if (parsedMessage.SessionID)
      dispatch(GetSocketResponse(parsedMessage.SessionID));
  };
  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < _topic.length; i++) {
      console.log(_topic[i] + " has unsubscribed");
      client.unsubscribe(_topic[i], _topicOptions);
    }
  };
  // called when disconnecting the client
  const _onDisconnect = () => {
    console.log("client disconnected");
    client.disconnect();
  };

  const _init = () => {
    const c = mqtt.connect(
      wsbroker,
      wsport,
      "nmsclientid_" + parseInt(Math.random() * 100, 10),
      _onConnectionLost,
      _onMessageArrived
    ); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    c.connect({
      timeout: 3,
      keepAliveInterval: 30,
      onSuccess: () => {
        for (var i = 0; i < _topic.length; i++) {
          console.log(_topic[i] + " has subscribed");
          c.subscribe(_topic[i], _topicOptions);
        }
      },
    }); // called when the client connects
    setClient(c);
  };

  React.useEffect(() => {
    if (client === null) _init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    return () => {
      if (client) {
        _onUnsubscribe();
        _onDisconnect();
      }
    };
  }, [client]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(client);

  return (
    <Box sx={{ display: "flex" }}>
      <NavHeader />
      <NavSidebar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0, overflow: "auto" }}>
        <Toolbar />
        <BreadcrumItemLayout />
        <Outlet />
        <NetworkSettingDrawer />
        <AdvancedSettingDrawer />
      </Box>
    </Box>
  );
};

export default MainLayout;
