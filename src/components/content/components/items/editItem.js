import React, { useState, useEffect, useContext } from "react";
import {
  Backdrop,
  Paper,
  Box,
  IconButton,
  Avatar,
  TextField,
  Fab,
  Select,
  MenuItem,
  Input,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import Img from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import moment from "moment";
import Clear from "@material-ui/icons/Clear";
import { useForm } from "react-hook-form";

const EditItem = ({ classes, open, setOpen, id }) => {
  const {
    state: { item_details, linkableItems, sub_category },
    fetchItem,
    editItem,
    fetchItems,
  } = useContext(DataContext);
  const { handleSubmit, reset, register } = useForm();
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [description_ar, setDescriptionAr] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      await fetchItem(id);
    };
    fetchLinks();
  }, []);

  const handleChangeMultiple = (e) => {
    setItems(e.target.value);
  };

  const onSubmit = async (data) => {
    setDisabled(true);
    const y = [];
    var x = Object.values(data);
    for (let i = 0; i < x.length; i += 2) {
      y.push({
        custom_field_id:
          item_details.custom_fields_values[i / 2]["custom_field_id"],
        value_en: x[i],
        value_ar: x[i + 1],
      });
    }
    if (imgFile) {
      await editItem({
        category_id: item_details.category_id,
        sub_category_id: item_details.sub_category_id,
        brand_id: item_details.brand_id,
        name_en: name_en.length > 0 ? name_en : item_details.name_en,
        name_ar: name_ar.length > 0 ? name_ar : item_details.name_ar,
        description_en:
          description_en.length > 0
            ? description_en
            : item_details.description_en,
        description_ar:
          description_ar.length > 0
            ? description_ar
            : item_details.description_ar,
        link_item_id: item_details.link_items,
        newImage: imgFile,
        price: price > 0 ? price : item_details.price,
        status: item_details.status,
        item_custom_values: y,
      });
    } else {
      await editItem({
        category_id: item_details.category_id,
        sub_category_id: item_details.sub_category_id,
        brand_id: item_details.brand_id,
        name_en: name_en.length > 0 ? name_en : item_details.name_en,
        name_ar: name_ar.length > 0 ? name_ar : item_details.name_ar,
        description_en:
          description_en.length > 0
            ? description_en
            : item_details.description_en,
        description_ar:
          description_ar.length > 0
            ? description_ar
            : item_details.description_ar,
        link_item_id: item_details.link_items,
        image: item_details.image,
        price: price > 0 ? price : item_details.price,
        status: item_details.status,
        item_custom_values: y,
      });
    }
    await fetchItems();
    reset()
    setImgFile(null);
    setDisabled(false);
    setOpen(false);
  };

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setFile(reader.result);
    };
    setImgFile(e.target.files[0]);
    reader.readAsDataURL(file1);
  };

  return (
    <Backdrop open={open} className={classes.backdrop}>
      {item_details && sub_category && (
        <Paper
          style={{
            height: "80vh",
            overflowY: "scroll",
            width: "60vw",
            position: "absolute",
            top: "5vh",
            background: "#fff",
            padding: "2rem",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                onClick={() => {
                  setItems([]);
                  setOpen(false);
                }}
              >
                <Clear />
              </IconButton>
            </Box>
            <Box
              style={{
                padding: "2rem",
              }}
            >
              <input
                id="edit-item"
                type="file"
                accept=".png,.jpg,.jpeg"
                style={{ display: "none" }}
                onChange={(e) => handleImgChange(e)}
              />
              <Box display="flex" justifyContent="space-between">
                <label htmlFor="edit-item">
                  <Avatar
                    src={
                      !file
                        ? item_details
                          ? item_details.image.length > 1 && item_details.image
                          : Img
                        : file
                    }
                    style={{
                      width: "150px",
                      height: "150px",
                      marginRight: "2rem",
                      cursor: "pointer",
                    }}
                    variant="rounded"
                  ></Avatar>
                </label>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <TextField
                    defaultValue={item_details && item_details.name_en}
                    variant="outlined"
                    label="Name_en"
                    onChange={(e) => {
                      setNameEn(e.target.value);
                    }}
                  />
                  <TextField
                    defaultValue={item_details && item_details.name_ar}
                    variant="outlined"
                    label="Name_ar"
                    onChange={(e) => {
                      setNameAr(e.target.value);
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <TextField
                    multiline
                    label="Description_ar"
                    variant="outlined"
                    onChange={(e) => {
                      setDescriptionAr(e.target.value);
                    }}
                    defaultValue={item_details && item_details.description_ar}
                  />
                  <TextField
                    multiline
                    label="Description_en"
                    onChange={(e) => {
                      setDescriptionEn(e.target.value);
                    }}
                    variant="outlined"
                    value={item_details && item_details.description_en}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "2rem 0" }}
              >
                <TextField
                  defaultValue={
                    item_details && item_details.price
                      ? item_details.price
                      : null
                  }
                  variant="outlined"
                  label="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  type="number"
                />
                <TextField
                  variant="outlined"
                  id="date"
                  type="date"
                  label="Created On"
                  defaultValue={
                    item_details &&
                    moment(new Date(item_details.created_at)).format(
                      "YYYY-MM-DD"
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ margin: "2rem 0" }}
              >
                <FormControl style={{ width: "30%", marginTop: "1rem" }}>
                  <Select
                    multiple
                    defaultValue={item_details.link_items}
                    input={<Input />}
                    displayEmpty
                    onChange={handleChangeMultiple}
                  >
                    {linkableItems &&
                      linkableItems.map((i, k) => (
                        <MenuItem key={k} value={i["item_id"]}>
                          {i["name"]}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  defaultValue={
                    item_details && item_details.category_id === 1
                      ? "Pc Parts"
                      : item_details.category_id === 2
                      ? "Gaming Access"
                      : item_details.category_id === 3
                      ? "Gears"
                      : ""
                  }
                  label="category"
                />
                <TextField
                  variant="outlined"
                  defaultValue={sub_category && sub_category["name_en"]}
                  label="sub-category"
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <p style={{ fontWeight: "bold" }}>Custom Fields</p>
              </Box>

              {item_details &&
                item_details.custom_fields_values.map((i, k) => (
                  <Box
                    key={k}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ margin: "2rem 0", width: "100%" }}
                  >
                    <p style={{ width: "30%" }}>{i.name_en}</p>

                    <TextField
                      variant="outlined"
                      label="value_en"
                      required
                      style={{ width: "30%" }}
                      inputRef={register()}
                      name={`value_en${k + 1}`}
                      defaultValue={i.value_en}
                    />
                    <TextField
                      variant="outlined"
                      label="value_ar"
                      required
                      inputRef={register()}
                      name={`value_ar${k + 1}`}
                      style={{ width: "30%" }}
                      defaultValue={i.value_ar}
                    />
                  </Box>
                ))}

              <Box display="flex" flexDirection="row-reverse">
                {disabled ? (
                  <CircularProgress />
                ) : (
                  <Fab
                    onClick={() => {}}
                    type="submit"
                    variant="extended"
                    color="primary"
                  >
                    Save
                  </Fab>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      )}
    </Backdrop>
  );
};

export default EditItem;
