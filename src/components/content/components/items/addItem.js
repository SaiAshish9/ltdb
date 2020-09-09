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
  Input,
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
  const { addItem, fetchItems } = useContext(DataContext);
  const [customFields, setCustomFields] = useState([]);
  const [customFieldValue, setCustomFieldValue] = useState();
  const [fields, setFields] = useState([]);

  const handleChange = (e) => {
    setFields(e.target.value);
  };

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
      fetchCustomFields(data.data.data[0]["sub_category_id"]);
    });
  };

  const fetchCustomFields = async (id) => {
    await Api.post(`admin/subcategory/subcategory-by-id`, {
      sub_category_id: ` ${
        id ? id : subCategories[subValue]["sub_category_id"]
      }`,
    }).then((data) => {
      console.log(data.data.data);
      setFields(
        data.data.data.custom_fields.map((i, k) => {
          return `${i["name_en"]} ${i["name_ar"]} ${i["custom_field_id"]}`;
        })
      );
      setCustomFields(data.data.data.custom_fields);
    });
  };

  const handleSave = async () => {
    await addItem({
      category_id: subCategories[subValue]["category_id"],
      sub_category_id: subCategories[subValue]["sub_category_id"],
      brand_id: data[brandValue]["brand_id"],
      name_en: name_en,
      name_ar: name_ar,
      description_en: description.desc,
      description_ar: description.desc_ar,
      image: "",
      price: price ? +price : 0,
      status: 1,
      item_custom_values: customFields.map((i, k) => {
        return {
          custom_field_id: i.custom_field_id,
          value_en: i.name_en,
          value_ar: i.name_ar,
        };
      }),
    });
    await fetchItems();
    setOpen(false);
    // console.log(categories, subCategories, {
    //   category_id: subCategories[subValue]["category_id"],
    //   sub_category_id: subCategories[subValue]["sub_category_id"],
    //   brand_id: data[brandValue]["brand_id"],
    //   name_en: name_en,
    //   name_ar: name_ar,
    //   description_en: description.desc,
    //   description_ar: description.desc_ar,
    //   image: "",
    //   price: price ? +price : 0,
    //   status: 1,
    //   item_custom_values: customFields.map((i, k) => {
    //     return {
    //       custom_field_id: i.custom_field_id,
    //       value_en: i.name_en,
    //       value_ar: i.name_ar,
    //     };
    //   }),
    // });
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
                      if (value !== 0) setSubValue(e.target.value);
                      fetchCustomFields();
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
                  Custom Fields :
                </p>
                <FormControl
                  style={{
                    // position: "absolute",
                    width: "47%",
                  }}
                >
                  <Select value={fields} multiple onChange={handleChange}>
                    {customFields &&
                      customFields.map((i, k) => (
                        <MenuItem key={k} value={i.custom_field_id}>
                          {i.name_en} {i.name_ar}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
            <Fab
              onClick={() => {
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
