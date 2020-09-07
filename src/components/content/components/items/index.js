import React, { useEffect, useState } from "react";
import {
  // Fab,
  Box,
  CircularProgress,
} from "@material-ui/core";
import AddItem from "./addItem";
import Table from "./table";
import Api from "../../../../api";

const Items = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    Api("admin/item/list")
      .then((data) => {
        setData(data.data.data);
        isLoading(true);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: "1rem 2rem" }}
      >
        <p
          style={{
            color: "#282b3c",
            fontWeight: 600,
            fontSize: "1.5rem",
          }}
        >
          Items
        </p>
        <Box display="flex">
          <AddItem />
        </Box>
      </Box>
      {!loading ? (
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
          }}
        >
          <Table data={data} />
        </Box>
      )}{" "}
    </Box>
  );
};

export default Items;
