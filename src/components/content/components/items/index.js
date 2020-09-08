import React, { useEffect, useState, useContext } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import AddItem from "./addItem";
import Table from "./table";
import { Context as DataContext } from "../../../../api/dataProvider";

const Items = () => {
  const {
    state: { items },
    fetchItems,
  } = useContext(DataContext);
  const [loading, isLoading] = useState(false);

  const getItems = async () => {
    await fetchItems();
    isLoading(true);
  };

  useEffect(() => {
    getItems()
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
          <Table data={items} />
        </Box>
      )}{" "}
    </Box>
  );
};

export default Items;
