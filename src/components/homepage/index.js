import React from "react";
import { Box, Paper } from "@material-ui/core";
// import Lootbox from "../../lootbox.png";

const Home = () => {
  return (
    <Box
      // display="flex"
      // alignItems="center"
      justifyContent="space-around"
      flexWrap="wrap"
      // flexDirection="column"
      style={{
        background: "#f4f4f4",
        // background: "#151628",
        width: "100%",
        height: "90vh",
        padding: "4rem 0rem",
      }}
    >
      <p
        className="animate__animated animate__fadeIn"
        style={{
          color: "#151628",
          // opacity: 0.6,
          fontWeight: "bold",
          fontSize: "1rem",
          paddingLeft: "1rem",
        }}
      >
        Dashboard
      </p>
      <br />
      <Box display="flex" alignItems="center" justifyContent="space-around">
        {[...Array(4).keys()].map((i, k) => (
          <Paper
            className="animate__animated animate__fadeIn"
            key={k}
            style={{
              height: "20vh",
              width: "21%",
              padding: "1rem",
            }}
          >
            <p
              className="animate__animated animate__zoomIn"
              style={{
                color: "#151628",
                // opacity: 0.6,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              lootbox
            </p>
          </Paper>
        ))}
      </Box>

      <Box
        style={{ marginTop: "3rem" }}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        {[...Array(4).keys()].map((i, k) => (
          <Paper
            key={k}
            className="animate__animated animate__fadeIn"
            elevation={2}
            style={{
              height: "20vh",
              width: "21%",
              padding: "1rem",
            }}
          >
            <p
              className="animate__animated animate__zoomIn"
              style={{
                color: "#151628",
                // opacity: 0.6,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              lootbox
            </p>
          </Paper>
        ))}
      </Box>

      {/* <img
        className="animate__animated animate__zoomIn"
        src={Lootbox}
        // src={Logo}
        style={{
          height: "10rem",
          width: "10rem",
        }}
        alt="img"
      /> */}
      {/* <div
        className="animate__animated animate__fadeIn"
        // style={{ textAlign: "center" }}
      ></div> */}
    </Box>
  );
};

export default Home;
