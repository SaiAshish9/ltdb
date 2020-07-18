import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import SubTable from "./subTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";


const SubCategoryTable = ({ rows,classes, setOpen, open }) => {

  const [loading,setLoading]=useState(true);
  
  useEffect(() => {
  setTimeout(()=>{
  setLoading(false)
  },200)
  }, []);
  
  const [customFieldCount, setCustomFieldCount] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open1, setOpen1] = useState(false);
  const [msg, setMsg] = useState("Active");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen1(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen1(false);
  };

  // const open1 = Boolean(anchorEl);
  const id = open1 ? "simple-popover" : undefined;

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Paper
        style={{
          maxHeight: "70vh",
          width: "50vw",
          position: "absolute",
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
            Add Sub Category
          </p>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <Divider />

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              padding: "1rem",
            }}
          >
            <TextField variant="outlined" label="Name" />
            <TextField variant="outlined" label="اسم" />

            <Tooltip title={msg} placement="left">
              <Fab
                aria-describedby={id}
                onClick={handleClick}
                style={{
                  color: "#fff",
                }}
                size="medium"
                color="primary"
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
                      setMsg("Active");
                    }}
                    style={{
                      borderRadius: 0,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Active
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      setMsg("InActive");
                    }}
                    style={{
                      borderRadius: 0,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Inactive
                  </Button>
                </Box>
              )}
            </Popover>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            // alignItems="center"
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

            {[...Array(customFieldCount).keys()].map((i, k) => (
              <Box
                style={{
                  margin: "1rem 0",
                  // width:'77%'
                }}
                key={k}
                display="flex"
                justifyContent="space-between"
              >
                <TextField variant="outlined" label="name_en" />
                <TextField variant="outlined" label="name_ar" />
                <Box display="flex">
                  {k === [...Array(customFieldCount).keys()].length - 1 && (
                    <Tooltip title="Add New Custom Field" placement="left">
                      <Fab
                        onClick={() => {
                          setCustomFieldCount(customFieldCount + 1);
                        }}
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
                      onClick={() => {
                        setCustomFieldCount(customFieldCount - 1);
                      }}
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
          <Divider />
        </Box>
        <Box style={{ padding: "1rem" }}>
          {!loading? <SubTable rows={rows} />:<CircularProgress/>}
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ margin: "1rem 1rem 0" }}
        >
          <Fab
            onClick={() => {
              setOpen(false);
            }}
            variant="extended"
            color="primary"
            aria-label="add"
          >
            Save
          </Fab>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default SubCategoryTable;
