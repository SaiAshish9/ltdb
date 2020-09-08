import React, { useState, useEffect, useContext } from "react";
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
} from "@material-ui/core";
import { Add, Clear, CameraAlt } from "@material-ui/icons";
import Api from "../../../../api";
import { Context as DataContext } from "../../../../api/dataProvider";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AddItem = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subValue, setSubValue] = useState(0);
  const [value, setValue] = useState(0);
  const [brandValue, setBrandValue] = useState(0);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const { addItem,fetchItems } = useContext(DataContext);
  useEffect(() => {
    Api("admin/item/brand-list")
      .then((data) => {
        setData(data.data.data);
      })
      .catch((error) => console.log(error));

    Api(`admin/category/list`)
      .then((data) => {
        setCategories(data.data.data);
      })
      .catch((error) => console.log(error));

    Api(`admin/item/getitem?item_id=20`)
      .then((data) => {
        var x = data.data.data;
        setDescription({
          desc: x.description_en,
          desc_ar: x.description_ar,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchSubCategories = (id) => {
    Api.post("admin/subcategory/category-wise-list", {
      category_id: id,
    }).then((data) => {
      setSubCategories(data.data.data);
    });
  };

  const handleSave = async () => {
      await addItem({
      category_id: categories[value]["category_id"],
      sub_category_id: subCategories[subValue]["sub_category_id"],
      brand_id: data[brandValue]["brand_id"],
      name_en: name_en,
      name_ar: name_ar,
      description_en: description.desc,
      description_ar: description.desc_ar,
      image: "",
      price: price ? +price : 0,
      status: 1,
    });
    await fetchItems();
    setOpen(false)
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "1rem 2rem" }}
    >
      <Fab
        size="medium"
        onClick={() => {
          setOpen(true);
        }}
        color="secondary"
      >
        <Add />
      </Fab>
      <Backdrop open={open} className={classes.backdrop}>
        <Paper
          style={{
            position: "absolute",
            top: "10vh",
            maxHeight: "70vh",
            overflowY: "scroll",
            width: "27rem",
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
          <Box style={{ padding: "0 2rem 2rem" }}>
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
                  Select Category :
                </p>
                <FormControl style={{ width: "47%" }}>
                  <Select
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      fetchSubCategories(e.target.value);
                    }}
                  >
                    {categories &&
                      categories.map((i, k) => (
                        <MenuItem value={i["category_id"]}>
                          {i["name_en"]}
                        </MenuItem>
                      ))}
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
                  Select Sub-Category :
                </p>
                <FormControl style={{ width: "47%" }}>
                  <Select
                    value={subValue}
                    onChange={(e) => {
                      setSubValue(e.target.value);
                    }}
                  >
                    {subCategories ? (
                      subCategories.map((i, k) => (
                        <MenuItem value={k}>{i["name_en"]}</MenuItem>
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
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                  }}
                >
                  Select Brand :
                </p>

                <Select
                  style={{
                    width: "47%",
                  }}
                  value={brandValue}
                  onChange={(e) => {
                    setBrandValue(e.target.value);
                  }}
                >
                  {data &&
                    data.map((i, k) => (
                      <MenuItem value={k}>{i["name_en"]}</MenuItem>
                    ))}
                </Select>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <TextField
                variant="outlined"
                label="name"
                value={name_en}
                onChange={(e) => setNameEn(e.target.value)}
                style={{ width: "47%" }}
              />
              <TextField
                variant="outlined"
                label="name_ar"
                name={name_ar}
                onChange={(e) => setNameAr(e.target.value)}
                style={{ width: "47%" }}
              />
            </Box>

            {description && (
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#282b3c",
                      fontWeight: 600,
                    }}
                  >
                    Description_en :
                  </p>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    defaultValue={description.desc}
                    // placeholder="placeholder text"
                    style={{ width: "47%", opacity: 0.8 }}
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
                      color: "#282b3c",
                      fontWeight: 600,
                    }}
                  >
                    Description_ar :
                  </p>
                  <TextField
                    multiline
                    rows={4}
                    defaultValue={description.desc_ar}
                    variant="outlined"
                    style={{ width: "47%", opacity: 0.8 }}
                  />
                </Box>
              </Box>
            )}

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
                  Price :
                </p>
                <TextField
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
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
                  Image :
                </p>
                <Paper style={{ width: "47%" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      height: "20vh",
                      cursor: "pointer",
                    }}
                  >
                    <IconButton>
                      <CameraAlt />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>{" "}
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
            <Fab
              onClick={() => {
                // setOpen(false);
                handleSave();
              }}
              variant="extended"
              color="primary"
            >
              Save
            </Fab>
          </Box>
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default AddItem;
