import React, { useContext, useEffect } from "react";
import { Box, Paper, CircularProgress } from "@material-ui/core";
// import Lootbox from "../../lootbox.png";
import { Context as DataContext } from "../../api/dataProvider";

const Home = () => {
  const data = [
    "Total Revenue",
    "Total number of orders",
    "Total number of New orders",
    "Total number of confirmed orders",
    "Total number of on-the-way Orders",
    "Total number of canceled orders",
    "Total number of confirmed orders",
    "Total number of customers",
  ];

  const {
    state: { user_count, users },
    fetchUsers,
  } = useContext(DataContext);

  useEffect(() => {
    const getUsers = async () => {
      await fetchUsers();
    };
    getUsers();
  }, []);

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
        padding: "3rem 0rem",
      }}
    >
      <h2 style={{ paddingLeft: "2rem", marginBottom: "2rem" }}>Dashboard</h2>
      {/* <p
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
      <br /> */}
      <Box display="flex" alignItems="center" justifyContent="space-around">
        {data.slice(0, 4).map((i, k) => (
          <Paper
            className="animate__animated animate__fadeIn"
            key={k}
            style={{
              height: "20vh",
              // height: "240px",
              width: "250px",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "#fff",
            }}
          >
            <h1
              style={
                {
                  // color: "#f7f7f7"
                  // fontSize:32,
                  // background: "linear-gradient(135deg,#C01C8A,#865CF4)",
                  // backgroundClip: "text",
                  // textFillColor: "transparent",
                }
              }
            >
              0
            </h1>
            <p
              className="animate__animated animate__zoomIn"
              style={{
                color: "#151628",
                // color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                // fontSize: "1rem",
              }}
            >
              {i}
            </p>
          </Paper>
        ))}
      </Box>

      <Box
        style={{ marginTop: "2rem" }}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        {data.slice(4, 8).map((i, k) => (
          <Paper
            key={k}
            className="animate__animated animate__fadeIn"
            elevation={2}
            style={{
              height: "20vh",
              width: "250px",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "#fff",
              // background: "linear-gradient(135deg,#C01C8A,#865CF4)",
            }}
          >
            <h1
              style={
                {
                  // color: "linear-gradient(135deg,#C01C8A,#865CF4)",
                  // color: "#f7f7f7"
                }
              }
            >
              {k === 3 ? (
                users ? (
                  user_count
                ) : (
                  <CircularProgress style={{ color: "#865CF4" }} />
                )
              ) : (
                0
              )}
            </h1>
            <p
              className="animate__animated animate__zoomIn"
              style={{
                // color: "#fff",
                color: "#151628",
                // opacity: 0.6,
                fontWeight: "bold",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              {i}
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
