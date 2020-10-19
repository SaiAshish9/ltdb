import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Paper,
  IconButton,
  TextField,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import { Clear, CameraAlt } from "@material-ui/icons";
import Thumbnail from "../../../../assets/thumbnail1.png";

const AddBanner = ({ classes, open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          style={{
            position: "absolute",
            top: "12vh",
            maxHeight: "80vh",
            overflowY: "scroll",
            width: "50vw",
            padding: "2rem",
            margin: "auto",
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
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <p
              style={{
                fontWeight: "bolder",
                color: "#282b3c",
              }}
            >
              English Name
            </p>
            <TextField
              variant="outlined"
              label="English Name"
              style={{ width: "47%" }}
            />
          </Box>
          <br />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <p
              style={{
                fontWeight: "bolder",
                color: "#282b3c",
              }}
            >
              Arabic Name
            </p>
            <TextField
              variant="outlined"
              label="Arabic Name"
              style={{ width: "47%" }}
            />
          </Box>
          <br />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <p
              style={{
                fontWeight: "bolder",
                color: "#282b3c",
              }}
            >
              Upload Image
            </p>
            <Paper style={{ width: "47%" }} onClick={() => {}}>
              <label htmlFor="add-banner-image">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    height: "20vh",
                    cursor: "pointer",
                  }}
                >
                  {file ? (
                    <img
                      style={{
                        height: "20vh",
                      }}
                      alt="img"
                      src={file}
                    />
                  ) : (
                    <img
                      style={{
                        height: "20vh",
                      }}
                      alt="img"
                      src={Thumbnail}
                    />
                  )}
                </Box>
              </label>
              <input
                id="add-banner-image"
                style={{ display: "none" }}
                type="file"
              />
            </Paper>
          </Box>
          <Box
            display="flex"
            flexDirection="row-reverse"
            style={{
              marginTop: "1rem",
              marginRight: "2rem",
            }}
          >
            {disabled ? (
              <CircularProgress />
            ) : (
              <Fab type="submit" variant="extended" color="primary">
                Add
              </Fab>
            )}
          </Box>
        </Paper>
      </Box>
    </Backdrop>
  );
};

export default AddBanner;
