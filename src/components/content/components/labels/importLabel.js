import React, { useState, useContext } from "react";
import {
  Backdrop,
  Box,
  Paper,
  IconButton,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import Thumbnail from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";

const ImportLabel = ({ classes, open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [fileName, setFileName] = useState(null);
  const { fetchLabels, importLabel } = useContext(DataContext);
  const { handleSubmit } = useForm();

  const handleImgChange = (e) => {
    var file1 = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {};
    const formData = new FormData();
    formData.append("import_file", file1);
    setFile(formData);
    setFileName(file1.name);
    reader.readAsDataURL(file1);
  };

  const onSubmit = async () => {
    setDisabled(true);
    await importLabel(file);
    await fetchLabels();
    setDisabled(false);
    setFile(null);
    setFileName(null);
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
                Upload File
              </p>
              <Paper style={{ width: "47%" }} onClick={() => {}}>
                <label htmlFor="import-label-image">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      height: "20vh",
                      cursor: "pointer",
                    }}
                  >
                    {fileName ? (
                      <p>{fileName}</p>
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
                  id="import-label-image"
                  style={{ display: "none" }}
                  type="file"
                  accept=".xlsx,.csv"
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

export default ImportLabel;
