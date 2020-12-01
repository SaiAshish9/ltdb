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
import { Clear } from "@material-ui/icons";
import Thumbnail from "../../../../assets/thumbnail1.png";
import { Context as DataContext } from "../../../../api/dataProvider";
import { useForm } from "react-hook-form";

const ViewNotification = ({ classes, open, setOpen }) => {
  const [name_en, setNameEn] = useState("");
  const [name_ar, setNameAr] = useState("");
  const {
    state: { notification_details },
  } = useContext(DataContext);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setNameEn("");
    setNameAr("");
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
            {notification_details && (
              <Box>
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
                      value={notification_details.title_en}
                      disabled
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
                      disabled
                      value={notification_details.title_ar}
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
                      disabled
                      multiline
                      value={notification_details.description_en}
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
                      disabled
                      multiline
                      label="Enter message in arabic"
                      value={notification_details.description_ar}
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
                <Box>
                  <Box display="flex" justifyContent="space-between">
                    <p
                      style={{
                        fontWeight: "bolder",
                        color: "#282b3c",
                      }}
                    >
                      Image{" "}
                    </p>
                    <Paper style={{ width: "47%" }} onClick={() => {}}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          style={{
                            height: "20vh",
                            cursor: "pointer",
                          }}
                        >
                          {notification_details.image ? (
                            <img
                              style={{
                                height: "20vh",
                              }}
                              alt="img"
                              src={notification_details.image}
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
                    </Paper>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </form>
    </Backdrop>
  );
};

export default ViewNotification;
