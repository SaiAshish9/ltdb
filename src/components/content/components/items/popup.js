import React, { useState } from "react";
import {
  Backdrop,
  Paper,
  Box,
  IconButton,
  Avatar,
  TextField,
  Fab,
} from "@material-ui/core";
import Img from "../../../../assets/thumbnail1.png";

import Clear from "@material-ui/icons/Clear";

const Popup = ({ classes, open, setOpen }) => {
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          height: "80vh",
          width: "60vw",
          position: "absolute",
          top: "5vh",
          background: "#fff",
          padding: "2rem",
        }}
      >
        <Box display="flex" flexDirection="row-reverse">
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <Clear />
          </IconButton>
        </Box>
        <Box
          style={{
            padding: "2rem",
            // width: "80%",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Avatar
              src={Img}
              style={{ width: "150px", height: "150px", marginRight: "2rem" }}
              variant="rounded"
            >
              H
            </Avatar>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <TextField variant="outlined" label="Name_en" />
              <TextField variant="outlined" label="Name_ar" />
            </Box>
            <TextField
              rows={7}
              multiline
              label="Description_en"
              variant="outlined"
            />
            <TextField
              rows={7}
              multiline
              label="Description_ar"
              variant="outlined"
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ margin: "2rem 0" }}
          >
            <TextField variant="outlined" label="Price" type="number" />
            <TextField variant="outlined" label="Status" />
            <TextField
              variant="outlined"
              id="date"
              label="Date Of Birth"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ margin: "2rem 0" }}
          >
            <TextField variant="outlined" label="link_item_id" type="number" />
            <TextField variant="outlined" label="category" />
            <TextField variant="outlined" label="sub-category" />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ margin: "2rem 0" }}
          >
            <TextField variant="outlined" label="custom_field_1" />
            <TextField variant="outlined" label="custom_field_2" />
            <TextField variant="outlined" label="custom_field_3" />
          </Box>
          <Box display="flex" flexDirection="row-reverse">
            <Fab type="submit" variant="extended" color="primary">
              Save
            </Fab>
          </Box>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default Popup;
