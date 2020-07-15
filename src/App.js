import React from "react";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import Content from "./components/content";
import Sidebar from "./components/sidebar"


const App = () => {

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#e6ebed",
        //   position: "absolute",
        //   bottom: 0,
      }}
    >
<Sidebar/>    
      <Box style={{ width: "85%", height: "100vh" }}>
        <Box
          style={{
            height: "10vh",
            width: "100%",
            background: "#282b3c",
          }}
        ></Box>
        <Content />
      </Box>
    </Box>
  );
};

export default withRouter(App);
