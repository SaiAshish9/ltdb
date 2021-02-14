import React, { useState, useEffect, useContext } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import SubTable from "./subTable";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  CircularProgress,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import Api from "../../../../api";
import Thumbnail from "../../../../assets/thumbnail1.png";
import { uploadImage } from "../../../../api/dataProvider";

const SubCategoryTable = ({
  categoryId,
  rows,
  classes,
  setOpen,
  open,
  openEditDialog,
  setOpenEditDialog,
  fetchSubCategories,
}) => {
  const [loading, setLoading] = useState(true);
  const { handleSubmit, register, reset } = useForm();
  const [current, setCurrent] = useState(true);
  const [value, setValue] = useState(null);
  const [linkSubCategoryId, setLinkSubCategoryId] = useState(null);

  const [showBuilder, IsShowBuilder] = useState(false);
  const [optional, IsOptional] = useState(false);
  const [multiple, IsMultiple] = useState(false);
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setFile(reader.result);
    };
    setImgFile(file1);
    reader.readAsDataURL(file1);
  };


  const onSubmit = async (values) => {
    let x = Object.values(values).splice(2);
    let y = [];
    for (let i = 0; i < x.length; i += 2) {
      customFieldCount > 1 &&
        y.push({
          name_en: x[i],
          name_ar: x[i + 1],
        });
    }
    let res = {};
    res["name_en"] = values["name_en"];
    res["is_show_builder"] = showBuilder ? 1 : 0;
    res["is_optional"] = optional ? 1 : 0;
    res["is_multiple"] = multiple ? 1 : 0;
    res["name_ar"] = values["name_ar"];
    res["status"] = msg;
    res["link_sub_category_id"] = linkSubCategoryId;
    res["custom_fields"] = y;
    res["category_id"] = categoryId;
    res["image"] = await uploadImage("advanced-builders", imgFile);

    current &&
      Api.post("admin/subcategory/add", res).then((data) => {
        setOpen(false);
        setValue(null);
        setFile(null);
        setImgFile(null);
        IsOptional(false)
        IsShowBuilder(false)
        IsMultiple(false)
        reset();
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const [customFieldCount, setCustomFieldCount] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open1, setOpen1] = useState(false);
  const [msg, setMsg] = useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen1(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen1(false);
    setValue(null);
    reset();
  };

  const id = open1 ? "simple-popover" : undefined;

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Paper
        style={{
          maxHeight: "80vh",
          width: "70vw",
          position: "absolute",
          top: "8vh",
          overflowY: "scroll",
          paddingBottom: "2rem",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                setValue(null);
                setFile(null);
                setImgFile(null);
                IsOptional(false)
                IsShowBuilder(false)
                IsMultiple(false)
                reset();
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box>
            <Box
              // display="flex"
              // justifyContent="space-between"
              style={{
                padding: "1rem",
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#979aa4",
                  }}
                >
                  Name
                </p>
                <TextField
                  inputRef={register()}
                  name="name_en"
                  variant="outlined"
                  label="Name"
                  style={{ width: "47%" }}
                />
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "2rem 0" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#979aa4",
                  }}
                >
                  Arabic Name
                </p>
                <TextField
                  inputRef={register()}
                  name="name_ar"
                  inputProps={{
                    dir: "rtl",
                    style: {
                      textAlign: "right",
                      direction: "rtl",
                    },
                  }}
                  style={{ width: "47%" }}
                  variant="outlined"
                  label="اسم"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "0 1rem 2rem" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#979aa4",
                }}
              >
                Do you want to link this subcategory for advance builder ?
              </p>
              <FormControl variant="outlined" style={{ width: "47%" }}>
                <InputLabel
                  style={{
                    position: "absolute",
                    zIndex: 15,
                    background: "#fff",
                  }}
                  id="demo"
                >
                  Sub Category
                </InputLabel>
                <Select
                  labelId="demo"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setLinkSubCategoryId(e.target.value);
                  }}
                >
                  {rows ? (
                    rows.map((i, k) => (
                      <MenuItem key={k} value={i.id}>
                        {i.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={0}>---</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box
              style={{ margin: "0 1rem 2rem" }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#979aa4",
                }}
              >
                Logo
              </p>
              <label htmlFor="add-logo-image" m style={{ width: "47%" }}>
                <Paper style={{ width: "100%" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      height: "20vh",
                      cursor: "pointer",
                    }}
                  >
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
                  </Box>
                </Paper>
              </label>
              <input
                id="add-logo-image"
                style={{ display: "none" }}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => handleImgChange(e)}
              />
            </Box>

            <Box
              style={{ margin: "0 1rem 2rem" }}
              display="flex"
              alignItems="center"
            >
              <Checkbox
                checked={showBuilder}
                onChange={() => {
                  IsShowBuilder(!showBuilder);
                }}
                style={{ color: "#8095a1" }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#979aa4",
                  marginLeft: "0.5rem",
                }}
              >
                Show Builder
              </p>
            </Box>

            {showBuilder && (
              <>
                <Box
                  style={{ margin: "0 1rem 2rem" }}
                  display="flex"
                  alignItems="center"
                >
                  <Checkbox
                    // disabled
                    checked={optional}
                    onChange={() => {
                      IsOptional(!optional);
                    }}
                    style={{ color: "#8095a1" }}
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#979aa4",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Optional
                  </p>
                </Box>

                <Box
                  style={{ margin: "0 1rem 2rem" }}
                  display="flex"
                  alignItems="center"
                >
                  <Checkbox
                    // disabled
                    checked={multiple}
                    onChange={() => {
                      IsMultiple(!multiple);
                    }}
                    style={{ color: "#8095a1" }}
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#979aa4",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Multiple
                  </p>
                </Box>
              </>
            )}

            <Box
              Arabic
              Name
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

              {[...Array(customFieldCount).keys()].map((i, k) => (
                <Box
                  style={{
                    margin: "1rem 0",
                  }}
                  key={k}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{
                      width: "70%",
                    }}
                  >
                    <TextField
                      inputRef={register()}
                      name={`name_en${k + 1}`}
                      variant="outlined"
                      label="Name"
                      style={{ width: "47%" }}
                    />
                    <TextField
                      inputRef={register()}
                      variant="outlined"
                      inputProps={{
                        dir: "rtl",
                        style: {
                          textAlign: "right",
                          direction: "rtl",
                        },
                      }}
                      style={{ width: "47%" }}
                      name={`name_ar${k + 1}`}
                      label="اسم"
                      Arabic
                      Name
                    />
                  </Box>

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
                        disabled={customFieldCount === 1}
                        onClick={() => {
                          customFieldCount > 1 &&
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
          </Box>
          <Box style={{ padding: "1rem" }}>
            {!loading ? (
              <SubTable
                setCurrent={setCurrent}
                classes1={classes}
                rows={rows}
                fetchSubCategories={fetchSubCategories}
                setOpenSubCategory={setOpen}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{ margin: "1rem 1rem 0" }}
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
        </form>
      </Paper>
    </Backdrop>
  );
};

export default withRouter(SubCategoryTable);
