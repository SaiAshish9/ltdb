import React, { useContext, useState } from "react";
import { Backdrop, Paper, Box, IconButton, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Clear } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";

const ViewOrderPopup = ({ open, setOpen, classes }) => {
  const { register, handleSubmit, reset } = useForm();
  const {
    state: { order_details },
  } = useContext(DataContext);
  const onSubmit = () => {};

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          position: "absolute",
          top: "7vh",
          maxHeight: "80vh",
          overflowY: "scroll",
          width: "70vw",
          minHeight: "80vh",
          padding: "2rem",
        }}
      >
        {order_details && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                onClick={() => {
                  reset();
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
                Username :
              </p>
              <TextField
                variant="outlined"
                // label="English Name"
                inputRef={register()}
                value={order_details.user_name}
                disabled
                name="name"
                // value={package_details && package_details.name_en}
                // onChange={(e) => setNameEn(e.target.value)}
                style={{ width: "47%" }}
              />
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
                Email :
              </p>
              <TextField
                type="email"
                value={order_details.email}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
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
                Phone :
              </p>
              <TextField
                type="email"
                value={order_details.phone}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
          </form>
        )}
      </Paper>
    </Backdrop>
  );
};

export default ViewOrderPopup;
