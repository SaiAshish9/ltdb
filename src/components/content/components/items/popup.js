import React, { useEffect, useContext } from "react";
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
} from "@material-ui/core";
import Img from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import moment from "moment";
import Clear from "@material-ui/icons/Clear";

const Popup = ({ classes, open, setOpen }) => {
  const {
    state: { item_details, linkableItems, sub_category },
    fetchLinkableItems,
  } = useContext(DataContext);

  useEffect(() => {
    fetchLinkableItems();
  }, []);

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
                disabled
                variant="outlined"
                style={{ width: "50%" }}
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
                variant="outlined"
                disabled
                style={{ width: "50%" }}
              />
            </Box>
            <Box
              display="flex"
              // alignItems="center"
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
                rows={7}
                multiline
                disabled
                variant="outlined"
                style={{ width: "50%" }}
                value={item_details && item_details.description_en}
              />
            </Box>
            <Box
              display="flex"
              // alignItems="center"
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
                rows={7}
                multiline
                disabled
                style={{ width: "50%" }}
                variant="outlined"
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
                <Avatar
                  src={
                    item_details
                      ? item_details.image.length > 1 && item_details.image
                      : Img
                  }
                  style={{ width: "150px", height: "150px" }}
                  variant="rounded"
                ></Avatar>
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
                inputProps={{ minLength: 0 }}
                variant="outlined"
                disabled
                type="number"
                style={{ width: "50%" }}
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
                Status
              </p>
              <TextField
                defaultValue={
                  item_details && item_details.status === 1
                    ? "Active"
                    : "InActive"
                }
                variant="outlined"
                disabled
                style={{ width: "50%" }}
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
                Created On
              </p>
              <TextField
                variant="outlined"
                id="date"
                style={{ width: "50%" }}
                disabled
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
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Linkable Items
              </p>
              <TextField
                variant="outlined"
                style={{ width: "50%" }}
                onClick={() => {
                  console.log(linkableItems);
                }}
                value={item_details.link_items
                  .map((i, k) => {
                    if (i == linkableItems[k]["item_id"]) {
                      return linkableItems[k]["name"];
                    }
                  })
                  .toString()}
                disabled
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "2rem 0" }}
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
              {/* <TextField
                defaultValue={item_details && item_details.category_id}
                disabled
                style={{ width: "50%" }}
              /> */}
              <Select
                disabled
                style={{ width: "50%" }}
                defaultValue={item_details && item_details.category_id}
              >
                <MenuItem value={0}>PC Parts</MenuItem>
                <MenuItem value={1}>Gaming Access</MenuItem>
                <MenuItem value={2}>Gears</MenuItem>
              </Select>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "2rem 0" }}
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
              <Select defaultValue={0} disabled style={{ width: "50%" }}>
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
                    style={{ width: "30%" }}
                    label="value_en"
                    defaultValue={i.value_en}
                    disabled
                  />
                  <TextField
                    variant="outlined"
                    label="value_ar"
                    style={{ width: "30%" }}
                    defaultValue={i.value_ar}
                    disabled
                  />
                </Box>
              ))}

            <Box display="flex" flexDirection="row-reverse">
              <Fab
                onClick={() => {}}
                disabled
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

export default Popup;
