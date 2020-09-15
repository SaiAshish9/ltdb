import React, { useState } from "react";
import {
  Backdrop,
  Paper,
  Box,
  IconButton,
  Avatar,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import Img from "../../../../assets/thumbnail1.png";

const Popup = ({ classes, open, setOpen }) => {
  const [value, setValue] = useState("male");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          height: "80vh",
          width: "50vw",
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
        <Box style={{ padding: "2rem" }} display="flex">
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
            <Box display="flex">
              <TextField
                label="First Name"
                variant="outlined"
                style={{ marginRight: "1rem" }}
              />
              <TextField label="Last Name" variant="outlined" />
            </Box>
            <TextField label="Full Name" variant="outlined" />
          </Box>
        </Box>
        <Box display="flex" style={{ padding: "2rem" }}>
          <TextField
            label="Email Address"
            variant="outlined"
            style={{ marginRight: "1rem" }}
          />
          <TextField label="Phone Number" variant="outlined" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          //   justifyContent="space-between"
          style={{ padding: "2rem" }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField
            id="date"
            label="Date Of Birth"
            type="date"
            style={{ marginLeft: "4rem" }}
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box
          justifyContent="space-between"
          display="flex"
          style={{ padding: " 0 2rem" }}
        >
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={<Checkbox color="primary" />}
              label="Google Signed-in"
              labelPlacement="end"
            />
          </FormGroup>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default Popup;
