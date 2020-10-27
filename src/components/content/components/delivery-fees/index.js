import React from "react";
import { Box, Paper, TextField, Button } from "@material-ui/core";

const DeliveryFees = () => {
  return (
    <Box
      display="flex"
      style={{ height: "90vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        style={{
          padding: "2rem",
          width: "30vw",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <p
            style={{
              textAlign: "center",
              color: "#8095a1",
              fontWeight: 500,
            }}
          >
            Order below 100 KD
          </p>
          <TextField />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <p
            style={{
              textAlign: "center",
              color: "#8095a1",
              fontWeight: 500,
            }}
          >
            Order between 100-200 KD
          </p>
          <TextField />
        </Box>{" "}
        <Box display="flex" justifyContent="space-between">
          <p
            style={{
              textAlign: "center",
              color: "#8095a1",
              fontWeight: 500,
            }}
          >
            Order above 200 KD
          </p>
          <TextField />
        </Box>
        <Box display="flex" alignItems="center" style={{ margin: "1.5rem 0 0"}}>
          <Button
            style={{
              margin: "auto",
              background: "#282b3c",
              color: "#fff",
              fontWeight: 700,
              letterSpacing:1,
              textTransform: "none",
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DeliveryFees;
