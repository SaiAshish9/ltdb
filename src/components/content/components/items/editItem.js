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
    reset();
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
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                English Name
              </p>
              <TextField
                defaultValue={item_details && item_details.name_en}
                variant="outlined"
                style={{ width: "50%" }}
                onChange={(e) => {
                  setNameEn(e.target.value);
                }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Arabic Name
              </p>
              <TextField
                defaultValue={item_details && item_details.name_ar}
                value={name_ar.length > 0 ? name_ar : item_details.name_ar}
                variant="outlined"
                style={{ width: "50%" }}
                onChange={(e) => {
                  setNameAr(e.target.value.split("").reverse().join(""));
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Description
              </p>
              <TextField
                multiline
                rows={7}
                style={{ width: "50%" }}
                onChange={(e) => {
                  setDescriptionEn(e.target.value);
                }}
                variant="outlined"
                defaultValue={item_details && item_details.description_en}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                وصف :
              </p>
              <TextField
                multiline
                rows={7}
                style={{ width: "50%" }}
                variant="outlined"
                value={
                  description_ar.length > 0
                    ? description_ar
                    : item_details.name_ar
                }
                onChange={(e) => {
                  setDescriptionAr(e.target.value.split("").reverse().join(""));
                }}
                defaultValue={item_details && item_details.description_ar}
              />
            </Box>
            <Box
              style={{ margin: "2rem 0" }}
              display="flex"
              justifyContent="space-between"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Image
              </p>
              <Paper
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  id="edit-item"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => handleImgChange(e)}
                />
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
              </Paper>
            </Box>
            <Box
              style={{ margin: "2rem 0" }}
              display="flex"
              justifyContent="space-between"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Price
              </p>
              <TextField
                defaultValue={
                  item_details && item_details.price ? item_details.price : null
                }
                variant="outlined"
                style={{ width: "50%" }}
                inputProps={{ min: 0 }}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
              />
            </Box>
            {/* <Box
              style={{ margin: "2rem 0" }}
              display="flex"
              justifyContent="space-between"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Created On
              </p>
              <TextField
                variant="outlined"
                id="date"
                type="date"
                style={{ width: "50%" }}
                defaultValue={
                  item_details &&
                  moment(new Date(item_details.created_at)).format("YYYY-MM-DD")
                }
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Box> */}
            <Box
              style={{ margin: "2rem 0" }}
              display="flex"
              justifyContent="space-between"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                LinkableItems
              </p>
              <FormControl style={{ width: "50%", marginTop: "1rem" }}>
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
            </Box>
            <Box
              style={{ margin: "2rem 0" }}
              display="flex"
              justifyContent="space-between"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Category
              </p>
              <Select
                style={{ width: "50%" }}
                defaultValue={item_details && item_details.category_id}
              >
                <MenuItem value={0}>PC Parts</MenuItem>
                <MenuItem value={1}>Gaming Access</MenuItem>
                <MenuItem value={2}>Gears</MenuItem>
              </Select>
            </Box>
            <Box
              style={{ margin: "2rem 0" }}
              display="flex"
              justifyContent="space-between"
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Sub Category
              </p>
              <Select defaultValue={0} style={{ width: "50%" }}>
                <MenuItem value={0}>
                  {sub_category && sub_category["name_en"]}
                </MenuItem>
              </Select>
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
          </form>
        </Paper>
      )}
    </Backdrop>
  );
};

export default EditItem;
