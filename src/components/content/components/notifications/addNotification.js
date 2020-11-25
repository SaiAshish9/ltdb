import React, { useState, useContext } from "react";
import {
  Backdrop,
  Box,
  Paper,
  IconButton,
  TextField,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import { Clear, CameraAlt } from "@material-ui/icons";
import Thumbnail from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";

const AddNotification = ({ classes, open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const { addBanner, fetchBanners } = useContext(DataContext);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setDisabled(true);
    // await addBanner({
    //   title_en: name_en,
    //   title_ar: name_ar,
    //   image: imgFile,
    //   status: 1,
    // });
    setNameEn("");
    setNameAr("");
    setImgFile(null);
    setFile(null);
    // await fetchBanners();
    setDisabled(false);
    setOpen(false);
  };

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Paper
            style={{
              position: "absolute",
              top: "12vh",
              maxHeight: "80vh",
              overflowY: "scroll",
              width: "80vw",
              padding: "2rem",
              margin: "auto",
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
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                style={{ width: "47%" }}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#282b3c",
                  }}
                >
                  Title{" "}
                </p>
                <TextField
                  variant="outlined"
                  label="Enter title in english"
                  value={name_en}
                  required
                  onChange={(e) => {
                    setNameEn(e.target.value);
                  }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                style={{ width: "47%" }}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#282b3c",
                    textAlign: "right",
                  }}
                >
                  عنوان
                </p>
                <TextField
                  variant="outlined"
                  label="Enter title in arabic"
                  value={name_ar}
                  inputProps={{
                    dir: "rtl",
                    style: {
                      textAlign: "right",
                      direction: "rtl",
                    },
                  }}
                  required
                  onChange={(e) => {
                    setNameAr(e.target.value);
                  }}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "2rem 0" }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                style={{ width: "47%" }}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#282b3c",
                  }}
                >
                  Message{" "}
                </p>
                <TextField
                  variant="outlined"
                  label="Enter message in english"
                  rows={7}
                  multiline
                  // value={name_en}
                  required
                  onChange={(e) => {
                    setNameEn(e.target.value);
                  }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                style={{ width: "47%" }}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#282b3c",
                    textAlign: "right",
                  }}
                >
                  سالة
                </p>
                <TextField
                  variant="outlined"
                  rows={7}
                  multiline
                  label="Enter message in arabic"
                  // value={name_ar}
                  inputProps={{
                    dir: "rtl",
                    style: {
                      textAlign: "right",
                      direction: "rtl",
                    },
                  }}
                  required
                  onChange={(e) => {
                    setNameAr(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row-reverse"
              style={{
                marginTop: "1rem",
              }}
            >
              {disabled ? (
                <CircularProgress />
              ) : (
                <Fab
                  onClick={() => onSubmit()}
                  type="submit"
                  variant="extended"
                  color="primary"
                >
                  Submit
                </Fab>
              )}
            </Box>
          </Paper>
        </Box>
      </form>
    </Backdrop>
  );
};

export default AddNotification;