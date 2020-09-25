import React, { useState } from "react";
import {
  Box,
  Fab,
  Backdrop,
  Paper,
  makeStyles,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { Clear, CameraAlt } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";

const AddPackage = ({ open, classes, setDisabled, setOpen, disabled }) => {
  const [file, setFile] = useState(null);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          position: "absolute",
          top: "7vh",
          maxHeight: "80vh",
          overflowY: "scroll",
          width: "70vw",
          padding: "2rem",
        }}
      >
        <Box display="flex" flexDirection="row-reverse">
          <IconButton
            onClick={() => {
              setDisabled(false);
              setOpen(false);
            }}
          >
            <Clear />
          </IconButton>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ margin: "1rem 0" }}
        >
          <TextField
            variant="outlined"
            label="name"
            // value={name_en}
            // onChange={(e) => setNameEn(e.target.value)}
            style={{ width: "47%" }}
          />
          <TextField
            variant="outlined"
            label="name_ar"
            // name={name_ar}
            // onChange={(e) => setNameAr(e.target.value)}
            style={{ width: "47%" }}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ margin: "1rem 0" }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#282b3c",
                fontWeight: 600,
              }}
            >
              Image :
            </p>
            <Paper style={{ width: "47%" }}>
              <label htmlFor="icon-button-file">
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
                    <CameraAlt />
                  )}
                </Box>
              </label>
            </Paper>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          style={{ margin: "1rem 0" }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "#282b3c",
              fontWeight: 600,
            }}
          >
            Select Resolution :
          </p>
          <FormControl style={{ width: "47%" }}>
            <Select
              //   value={value}
              onChange={(e) => {
                // setValue(e.target.value);
                console.log(e.target.value);
              }}
            >
              {/* {resolution_list ? (
                resolution_list.map((i, k) => (
                  <MenuItem value={i}>{i}</MenuItem>
                ))
              ) : (
                <MenuItem value={0}></MenuItem>
              )} */}
            </Select>
          </FormControl>
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
    </Backdrop>
  );
};

export default AddPackage;
