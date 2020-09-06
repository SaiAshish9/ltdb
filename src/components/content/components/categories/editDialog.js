import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Divider from "@material-ui/core/Divider";
import { useForm } from "react-hook-form";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Popover from "@material-ui/core/Popover";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Button from "@material-ui/core/Button";

const EditDialog = ({
  current,
  classes1,
  openEditDialog,
  setOpenEditDialog,
  data,
  setData,
}) => {
  const { handleSubmit, register, errors } = useForm();
  const [customFieldCount, setCustomFieldCount] = useState(3);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open1, setOpen1] = useState(false);
  const [msg, setMsg] = useState(current && current.status);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen1(false);
  };
  const id = open1 ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen1(true);
  };
  return (
    <Backdrop className={classes1.backdrop} open={openEditDialog}>
      {current && (
        <Paper
          style={{
            height: "70vh",
            maxHeight: "70vh",
            width: "50vw",
            position: "absolute",
            zIndex: 3,
            top: "10vh",
            overflowY: "scroll",
            paddingBottom: "2rem",
          }}
        >
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
              Edit {current && current.name} Details
            </p>
            <IconButton
              onClick={() => {
                setOpenEditDialog(false);
                setData(null);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Divider />

          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              padding: "1rem",
            }}
          >
            <TextField
              // inputRef={register()}
              defaultValue={current.name}
              name="name_en"
              variant="outlined"
              label="Name"
            />
            <TextField
              // inputRef={register()}
              name="name_ar"
              defaultValue={current.name_ar}
              variant="outlined"
              label="اسم"
            />

            <Tooltip title={msg === 0 ? "InActive" : "Active"} placement="left">
              <Fab
                aria-describedby={id}
                onClick={handleClick}
                style={{
                  color: "#fff",
                }}
                size="medium"
                color={msg === 0 ? "primary" : "secondary"}
              >
                <ExpandMoreIcon />
              </Fab>
            </Tooltip>

            <Popover
              id={id}
              open={open1}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {open1 && (
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Button
                    onClick={() => {
                      handleClose();
                      setMsg(0);
                    }}
                    style={{
                      borderRadius: 0,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    variant="contained"
                    color="primary"
                  >
                    InActive
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      setMsg(1);
                    }}
                    style={{
                      borderRadius: 0,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Active
                  </Button>
                </Box>
              )}
            </Popover>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            style={{ padding: "0 1rem 2rem", color: "#979aa4" }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Custom Fields
            </p>

            {data &&
              data.map((i, k) => (
                <Box
                  style={{
                    margin: "1rem 0",
                  }}
                  key={k}
                  display="flex"
                  justifyContent="space-between"
                >
                  <TextField
                    // inputRef={register()}
                    name={`name_en${k + 1}`}
                    variant="outlined"
                    label="name_en"
                    defaultValue={i.name}
                  />
                  <TextField
                    // inputRef={register()}
                    variant="outlined"
                    name={`name_ar${k + 1}`}
                    label="name_ar"
                    defaultValue={i.name_ar}
                  />
                  <Box display="flex">
                    {k === data.length - 1 && (
                      <Tooltip title="Add New Custom Field" placement="left">
                        <Fab
                          onClick={() => {}}
                          size="medium"
                          color="secondary"
                          aria-label="add"
                          style={{
                            marginRight: 10,
                          }}
                        >
                          <AddIcon />
                        </Fab>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete" placement="left">
                      <Fab
                        onClick={() => {}}
                        style={{
                          color: "#fff",
                          background: "red",
                        }}
                        size="medium"
                        color="secondary"
                      >
                        <DeleteOutlineIcon />
                      </Fab>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{ margin: "0 1rem 2rem" }}
          >
            <Fab
              type="submit"
              onClick={() => {}}
              variant="extended"
              color="primary"
              aria-label="add"
            >
              Save
            </Fab>
          </Box>
        </Paper>
      )}
    </Backdrop>
  );
};

export default EditDialog;
