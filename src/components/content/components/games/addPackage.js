import React, { useState, useContext } from "react";
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
  Avatar,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { Clear, CameraAlt } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";

const AddPackage = ({ open, classes, setDisabled, setOpen, disabled }) => {
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(null);

  const {
    state: { games },
    fetchGames,
  } = useContext(DataContext);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      {games && (
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
            <p
              style={{
                fontSize: "1rem",
                color: "#282b3c",
                fontWeight: 600,
              }}
            >
              Select Game :
            </p>
            <FormControl style={{ width: "47%" }}>
              <Select
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {games ? (
                  games.map((i, k) => (
                    <MenuItem value={i.name_en}>{i.name_en}</MenuItem>
                  ))
                ) : (
                  <MenuItem value={0}></MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ margin: "1rem 0" }}
          >
            <TextField
              variant="outlined"
              label="English Name"
              // value={name_en}
              // onChange={(e) => setNameEn(e.target.value)}
              style={{ width: "47%" }}
            />
            <TextField
              variant="outlined"
              label="Arabic Name"
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
                Package Image :
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
                Cover Images :
              </p>
              <Box display="flex" style={{ width: "47%" }}>
                <Avatar
                  style={{
                    height: 100,
                    width: 100,
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  variant="rounded"
                  src="https://image.freepik.com/free-psd/white-macbook-pro-mockup_106244-898.jpg"
                />
                <Avatar
                  style={{
                    height: 100,
                    width: 100,
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  variant="rounded"
                >
                  <CameraAlt />
                </Avatar>
              </Box>
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
              SubCategory :
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
              Items :
            </p>
            <FormControl style={{ width: "47%" }}>
              <Select
                multiple
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
      )}
    </Backdrop>
  );
};

export default AddPackage;
