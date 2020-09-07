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
import axios from "axios";

const EditDialog = ({
  current,
  classes1,
  openEditDialog,
  setOpenEditDialog,
  data,
  setData,
  categoryId,
  setOpen
}) => {
  const { handleSubmit, register } = useForm();
  const [customFieldCount, setCustomFieldCount] = useState(3);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open1, setOpen1] = useState(false);
  const [msg, setMsg] = useState(current && current.status);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen1(false);
  };
  const id = open1 ? "simple-popover" : undefined;

  const onSubmit1 = (values) => {
    let x = Object.values(values).splice(2);
    let y = [];
    for (let i = 0; i < x.length; i += 2) {
      y.push({
        custom_field_id: data[i/2]["id"],
        name_en: x[i],
        name_ar: x[i + 1],
      });
    }
    let res = {};
    res["name_en"] = values["name_en"];
    res["name_ar"] = values["name_ar"];
    res["status"] = current.status;
    res["custom_fields"] = y;
    res["sub_category_id"] = current.id;
    res["category_id"] = current.categoryId;
    // console.log(res,data);
    axios({
      url: `https://test-api.loot-box.co/api/admin/subcategory/add`,
      method: "post",
      data: res,
      headers: {
        "X-Localization": "ar",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    })
      .then((data) => {
        setOpenEditDialog(false);
        setOpen(false);
      })
      .catch((error) => console.log(error));
  };

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
          <form onSubmit={handleSubmit(onSubmit1)}>
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
                inputRef={register()}
                defaultValue={current.name}
                name="name_en"
                variant="outlined"
                label="Name"
                // disabled
              />
              <TextField
                inputRef={register()}
                name="name_ar"
                defaultValue={current.name_ar}
                variant="outlined"
                label="اسم"
                // disabled
              />

              <Tooltip
                title={msg === 0 ? "InActive" : "Active"}
                placement="left"
              >
                <Fab
                  // disabled
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
                      inputRef={register()}
                      name={`name_en${k + 1}`}
                      variant="outlined"
                      label="name_en"
                      defaultValue={i.name}
                    />
                    <TextField
                      inputRef={register()}
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
                onClick={(e) => {
                  e.stopPropagation();
                  // onSubmit()
                }}
                variant="extended"
                color="primary"
                aria-label="add"
              >
                Save
              </Fab>
            </Box>
          </form>
        </Paper>
      )}
    </Backdrop>
  );
};

export default EditDialog;
