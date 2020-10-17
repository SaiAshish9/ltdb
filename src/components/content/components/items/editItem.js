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
} from "@material-ui/core";
import Img from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import moment from "moment";
import Clear from "@material-ui/icons/Clear";

const EditItem = ({ classes, open, setOpen, id }) => {
  const {
    state: { item_details, linkableItems },
    fetchItem,
  } = useContext(DataContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      await fetchItem(id);
    };
    fetchLinks();
  }, []);

  const handleChangeMultiple = (e) => {
    setItems(e.target.value);
  };
  return (
    <Backdrop open={open} className={classes.backdrop}>
      {item_details && (
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
            <Box display="flex" justifyContent="space-between">
              <Avatar
                src={
                  item_details
                    ? item_details.image.length > 1 && item_details.image
                    : Img
                }
                style={{ width: "150px", height: "150px", marginRight: "2rem" }}
                variant="rounded"
              ></Avatar>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <TextField
                  defaultValue={item_details && item_details.name_en}
                  variant="outlined"
                  label="Name_en"
                />
                <TextField
                  defaultValue={item_details && item_details.name_ar}
                  variant="outlined"
                  label="Name_ar"
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
                  defaultValue={item_details && item_details.description_ar}
                />
                <TextField
                  multiline
                  label="Description_en"
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
                  item_details && item_details.price ? item_details.price : null
                }
                variant="outlined"
                label="Price"
                type="number"
              />
              <TextField
                variant="outlined"
                id="date"
                label="created_at"
                value={
                  item_details &&
                  moment(new Date(item_details.created_at)).format(
                    "DD MMM YYYY"
                  )
                }
                InputLabelProps={{
                  shrink: true,
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
                defaultValue={item_details && item_details.sub_category_id}
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
                    style={{ width: "30%" }}
                    defaultValue={i.value_en}
                  />
                  <TextField
                    variant="outlined"
                    label="value_ar"
                    style={{ width: "30%" }}
                    defaultValue={i.value_ar}
                  />
                </Box>
              ))}

            <Box display="flex" flexDirection="row-reverse">
              <Fab
                onClick={() => {}}
                type="submit"
                variant="extended"
                color="primary"
              >
                Save
              </Fab>
            </Box>
          </Box>
        </Paper>
      )}
    </Backdrop>
  );
};

export default EditItem;
