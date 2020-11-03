import React, { useEffect, useState, useContext } from "react";
import { Context as DataContext } from "../../../../api/dataProvider";
import { Box, CircularProgress } from "@material-ui/core";
import Table from "./table";

const Orders = () => {
  const [loading, isLoading] = useState(false);
  const { fetchOrders } = useContext(DataContext);

  useEffect(() => {
    async function fetchdata() {
      isLoading(true);
      await fetchOrders();
      isLoading(false);
    }
    fetchdata();
  }, []);

  return (
    <Box>
      <Box>
        <Box style={{ position: "absolute", top: 1, right: "2vw" }}></Box>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ height: "60vh" }}
          >
            <CircularProgress
              style={{
                margin: "auto",
                color: "#151628",
                position: "relative",
                top: "10vh",
              }}
            />
          </Box>
        ) : (
          <Box
            style={{
              background: "#fff",
              position: "absolute",
              bottom: 0,
              width: "85%",
              height: "90vh",
            }}
          >
            <Table />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Orders;
