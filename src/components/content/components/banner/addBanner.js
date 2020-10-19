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

const AddBanner = ({ classes, open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const { addBanner, fetchBanners } = useContext(DataContext);
  const { handleSubmit } = useForm();

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setFile(reader.result);
    };
    setImgFile(file1);
    reader.readAsDataURL(file1);
  };

  const onSubmit = async () => {
    setDisabled(true);
    await addBanner({
      title_en: name_en,
      title_ar: name_ar,
      image: imgFile,
      status: 1,
    });
    setNameEn("");
    setNameAr("");
    setImgFile(null);
    setFile(null);
    await fetchBanners();
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
              width: "50vw",
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p
                style={{
                  fontWeight: "bolder",
                  color: "#282b3c",
                }}
              >
                English Name
              </p>
              <TextField
                variant="outlined"
                label="English Name"
                value={name_en}
                required
                onChange={(e) => {
                  setNameEn(e.target.value);
                }}
                style={{ width: "47%" }}
              />
            </Box>
            <br />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p
                style={{
                  fontWeight: "bolder",
                  color: "#282b3c",
                }}
              >
                Arabic Name
              </p>
              <TextField
                variant="outlined"
                label="Arabic Name"
                value={name_ar}
                required
                onChange={(e) => {
                  setNameAr(e.target.value);
                }}
                style={{ width: "47%" }}
              />
            </Box>
            <br />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p
                style={{
                  fontWeight: "bolder",
                  color: "#282b3c",
                }}
              >
                Upload Image
              </p>
              <Paper style={{ width: "47%" }} onClick={() => {}}>
                <label htmlFor="add-banner-image">
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
                </label>
                <input
                  id="add-banner-image"
                  style={{ display: "none" }}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => handleImgChange(e)}
                />
              </Paper>
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
                <Fab
                  onClick={() => onSubmit()}
                  type="submit"
                  variant="extended"
                  color="primary"
                >
                  Add
                </Fab>
              )}
            </Box>
          </Paper>
        </Box>
      </form>
    </Backdrop>
  );
};

export default AddBanner;
