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
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";

const ViewLabel = ({ classes, open, setOpen }) => {
  const [disabled, setDisabled] = useState(false);
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const [key, setKey] = useState("");
  const {
    addLabel,
    fetchLabels,
    state: { label_details },
  } = useContext(DataContext);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setDisabled(true);
    await addLabel({
      label_id: label_details.id,
      key:
        key === ""
          ? label_details.key
          : key
              .split("")
              .filter((x) => x !== " ")
              .join(""),
      label_en: name_en === "" ? label_details.label_en : name_en,
      label_ar: name_ar === "" ? label_details.label_ar : name_ar,
    });
    await fetchLabels();
    setNameEn("");
    setNameAr("");
    setKey("");
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
            {label_details && (
              <Box>
                <Box display="flex" flexDirection="row-reverse">
                  <IconButton
                    onClick={() => {
                      setOpen(false);
                      setNameEn("");
                      setNameAr("");
                      setKey("");
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
                    Key
                  </p>
                  <TextField
                    variant="outlined"
                    label="Key"
                    disabled
                    defaultValue={label_details.key}
                    required
                    onChange={(e) => {
                      setKey(e.target.value);
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
                    English Name
                  </p>
                  <TextField
                    variant="outlined"
                    label="English Name"
                    // value={name_en}
                    disabled
                    defaultValue={label_details.label_en}
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
                    disabled
                    // value={name_ar}
                    defaultValue={label_details.label_ar}
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
                  flexDirection="row-reverse"
                  style={{
                    marginTop: "1rem",
                    marginRight: "2rem",
                  }}
                >
                  {/* {disabled ? (
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
                  )} */}
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </form>
    </Backdrop>
  );
};

export default ViewLabel;
