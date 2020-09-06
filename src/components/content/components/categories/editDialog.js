import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const EditDialog = ({
  current,
  classes1,
  openEditDialog,
  setOpenEditDialog,
}) => {
  return (
    <Backdrop className={classes1.backdrop} open={openEditDialog}>
      <Paper
        style={{
          height: "70vh",
          width: "50vw",
          position: "absolute",
          zIndex: 3,
          top: "10vh",
          overflowY: "scroll",
          paddingBottom: "2rem",
        }}
      >
        <div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: "0 1rem", color: "#979aa4" }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Edit {current} Details
            </p>
            <IconButton
              onClick={() => {
                setOpenEditDialog(false);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default EditDialog;
