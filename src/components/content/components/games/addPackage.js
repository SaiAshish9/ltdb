import React, { useState, useContext, useEffect, useCallback } from "react";
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
import { useForm } from "react-hook-form";

const AddPackage = ({ open, classes, setDisabled, setOpen, disabled }) => {
  const [file, setFile] = useState(null);
  const [value, setValue] = useState(null);
  const [itemValue, setItemValue] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategoryValue, setSubCategoryValue] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [name_en, setNameEn] = useState(null);
  const [name_ar, setNameAr] = useState(null);
  const [quality, setQuality] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const { register, handleSubmit } = useForm();

  const {
    state: { games, items },
    fetchItems,
    fetchGameSubCategoryList,
    addPackage,
  } = useContext(DataContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetchItems();
    const data = await fetchGameSubCategoryList();
    setSubCategories(data);
  };

  const onSubmit = async (y) => {
    console.log(imgFile);
    addPackage({
      imgFile,
      status: 1,
      graphic_quality: quality,
      name_en,
      name_ar,
      game_id: value,
      package_item: [],
    });
  };

  const handleImgChange = useCallback(
    (e) => {
      var file1 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        setFile(reader.result);
        setImgFile(file1);
        // console.log(file);
      };
      reader.readAsDataURL(file1);
    },
    [file]
  );

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      <MenuItem value={i.game_id}>{i.name_en}</MenuItem>
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
                value={name_en}
                onChange={(e) => setNameEn(e.target.value)}
                style={{ width: "47%" }}
              />
              <TextField
                variant="outlined"
                label="Arabic Name"
                name={name_ar}
                onChange={(e) => setNameAr(e.target.value)}
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
                  <label htmlFor="package-image">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        height: "20vh",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => {
                          handleImgChange(e);
                        }}
                        style={{ display: "none" }}
                        id="package-image"
                        type="file"
                      />
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
                Graphic Quality :
              </p>
              <FormControl style={{ width: "47%" }}>
                <Select
                  value={quality}
                  onChange={(e) => {
                    setQuality(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {["Low", "Medium", "High"].map((i, k) => (
                    <MenuItem value={k}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              style={{ width: "100%" }}
            >
              <Box
                // display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0", width: "47%" }}
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
                <FormControl style={{ width: "100%" }}>
                  <Select
                    value={subCategoryValue}
                    onChange={(e) => {
                      // setSubCategoryValue(e.target.value);
                      if (!selectedSubCategories.includes(e.target.value))
                        setSelectedSubCategories([
                          ...selectedSubCategories,
                          e.target.value,
                        ]);
                      console.log(e.target.value);
                    }}
                  >
                    {subCategories ? (
                      subCategories.map((i, k) => (
                        <MenuItem value={i.name_en}>{i.name_en}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}></MenuItem>
                    )}
                  </Select>
                </FormControl>
                {selectedSubCategories.map((i, k) => (
                  <p
                    onClick={() => {
                      setSelectedSubCategories(
                        selectedSubCategories.filter((x) => x !== i)
                      );
                    }}
                    style={{ cursor: "pointer" }}
                    key={k}
                  >
                    {i}
                  </p>
                ))}
              </Box>

              <Box
                // display="flex"
                justifyContent="space-between"
                style={{ margin: "1rem 0", width: "47%" }}
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
                <FormControl style={{ width: "100%" }}>
                  <Select
                    // multiple
                    value={itemValue}
                    onChange={(e) => {
                      // setItemValue(e.target.value);
                      if (!selectedItems.includes(e.target.value))
                        setSelectedItems([...selectedItems, e.target.value]);
                      console.log(e.target.value);
                    }}
                  >
                    {items ? (
                      items.map((i, k) => (
                        <MenuItem value={i.name_en}>{i.name_en}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}></MenuItem>
                    )}
                  </Select>
                </FormControl>
                <Box>
                  {selectedItems.map((i, k) => (
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedItems(selectedItems.filter((x) => x !== i));
                      }}
                      key={k}
                    >
                      {i}
                    </p>
                  ))}
                </Box>
              </Box>
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
          </form>
        </Paper>
      )}
    </Backdrop>
  );
};

export default AddPackage;
