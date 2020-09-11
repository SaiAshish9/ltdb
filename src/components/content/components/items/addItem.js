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
  Avatar,
  FormControl,
} from "@material-ui/core";
import { Add, Clear, CameraAlt } from "@material-ui/icons";
import Api from "../../../../api";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";

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
  // const [customFieldValue, setCustomFieldValue] = useState();
  const [fields, setFields] = useState([]);
  const { register, handleSubmit } = useForm();
  // const [valueData, setValueData] = useState(null);
  const [file, setFile] = useState(null);

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setFile(reader.result);
      console.log(file);
    };
    reader.readAsDataURL(file1);
  };

  const handleChange = (e) => {
    setFields(e.target.value);
  };

  const handleSubmit1 = async (data) => {
    const y = [];
    var x = Object.values(data);
    for (let i = 0; i < x.length; i += 2) {
      y.push({
        custom_field_id: customFields[i / 2]["custom_field_id"],
        value_en: x[i],
        value_ar: x[i + 1],
      });
    }
    await handleSave(y);
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

  const handleSave = async (y) => {
    console.log(y);
    await addItem({
      category_id: subCategories[subValue]["category_id"],
      sub_category_id: subCategories[subValue]["sub_category_id"],
      brand_id: data[brandValue]["brand_id"],
      name_en: name_en,
      name_ar: name_ar,
      description_en: description.desc,
      description_ar: description.desc_ar,
      image: file,
      price: price ? +price : 0,
      status: 1,
      item_custom_values: y,
    });
    await fetchItems();
    setOpen(false);
    console.log({
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
      item_custom_values: y,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "1rem 2rem" }}
    >
      <form onSubmit={handleSubmit(handleSubmit1)}>
        <input
          accept=".png,.jpeg,.jpg"
          onChange={(e) => handleImgChange(e)}
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
        />

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
              top: "7vh",
              maxHeight: "80vh",
              overflowY: "scroll",
              width: "70vw",
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
                <Box
                  justifyContent="space-between"
                  style={{ margin: "1rem 0" }}
                >
                  {customFields.length>0 && (
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Custom Fields :
                    </p>
                  )}

                  {customFields &&
                    customFields.map((i, k) => (
                      <Box key={k}>
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#282b3c",
                            fontWeight: 600,
                          }}
                        >
                          {i.name_en}
                        </p>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          style={{ margin: "1rem 0" }}
                        >
                          <TextField
                            variant="outlined"
                            label="value_en"
                            required
                            inputRef={register}
                            name={`value_en${k + 1}`}
                            style={{ width: "47%" }}
                          />
                          <TextField
                            variant="outlined"
                            label="value_ar"
                            required
                            inputRef={register}
                            name={`value_ar${k + 1}`}
                            style={{ width: "47%" }}
                          />
                        </Box>
                      </Box>
                    ))}
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
                <Box display="flex" justifyContent="space-between">
                  <div style={{ width: "47%" }}>
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
                      // defaultValue={description.desc}
                      style={{ width: "100%", opacity: 0.8 }}
                    />
                  </div>
                  <div style={{ width: "47%" }}>
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
                      // defaultValue={description.desc_ar}
                      variant="outlined"
                      style={{ width: "100%", opacity: 0.8 }}
                    />
                  </div>
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
                    <label htmlFor="icon-button-file">
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
                              // width: "6rem",
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
              <Fab type="submit" variant="extended" color="primary">
                Save
              </Fab>
            </Box>
          </Paper>
        </Backdrop>
      </form>
    </Box>
  );
};

export default AddItem;
