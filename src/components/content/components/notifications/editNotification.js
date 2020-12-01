import React, { useState, useContext, useEffect } from "react";
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

const EditNotification = ({ classes, open, setOpen, notificationId }) => {
  const [name_en, setNameEn] = useState(null);
  const [name_ar, setNameAr] = useState(null);
  const [description_en, setDescriptionEn] = useState(null);
  const [description_ar, setDescriptionAr] = useState(null);
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const {
    state: { notification_details },
    addNotification,
    fetchNotifications,
    fetchNotificationDetails,
  } = useContext(DataContext);
  const { handleSubmit } = useForm();

  useEffect(() => {
    const getData = async () => {
      const x = await fetchNotificationDetails(notificationId);
      console.log(x);
      if (x) {
        setNameEn(x.title_en);
        setNameAr(x.title_ar);
        setDescriptionAr(x.description_ar);
        setDescriptionEn(x.description_en);
      }
    };
    getData();
  }, [notificationId]);

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
    console.log({
      notification_id: notification_details.notification_id,
      title_en: name_en,
      title_ar: name_ar,
      description_en,
      description_ar,
    });
    await addNotification({
      notification_id: notification_details.notification_id,
      title_en: name_en,
      title_ar: name_ar,
      description_en,
      description_ar,
      image: imgFile,
      imgFile: notification_details.image,
    });
    // setNameEn(null);
    // setNameAr(null);
    // setDescriptionEn(null);
    // setDescriptionAr(null);
    setImgFile(null);
    setFile(null);
    await fetchNotifications();
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
              height: "72vh",
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
                    {name_en ? (
                      <TextField
                        variant="outlined"
                        label="Enter title in english"
                        value={name_en}
                        required
                        onChange={(e) => {
                          setNameEn(e.target.value);
                        }}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        label="Enter title in english"
                        value={notification_details.title_en}
                        required
                        onChange={(e) => {
                          setNameEn(e.target.value);
                        }}
                      />
                    )}
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
                    {name_ar ? (
                      <TextField
                        variant="outlined"
                        label="Enter title in arabic"
                        value={name_ar}
                        required
                        onChange={(e) => {
                          setNameAr(e.target.value);
                        }}
                        inputProps={{
                          dir: "rtl",
                          style: {
                            textAlign: "right",
                            direction: "rtl",
                          },
                        }}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        label="Enter title in arabic"
                        value={notification_details.title_ar}
                        required
                        onChange={(e) => {
                          setNameAr(e.target.value);
                        }}
                        inputProps={{
                          dir: "rtl",
                          style: {
                            textAlign: "right",
                            direction: "rtl",
                          },
                        }}
                      />
                    )}
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

                    {description_en ? (
                      <TextField
                        variant="outlined"
                        label="Enter message in english"
                        rows={7}
                        multiline
                        value={description_en}
                        required
                        onChange={(e) => {
                          setDescriptionEn(e.target.value);
                        }}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        label="Enter message in english"
                        rows={7}
                        multiline
                        value={notification_details.description_en}
                        required
                      />
                    )}
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
                    {description_ar ? (
                      <TextField
                        variant="outlined"
                        rows={7}
                        multiline
                        label="Enter message in arabic"
                        value={description_ar}
                        inputProps={{
                          dir: "rtl",
                          style: {
                            textAlign: "right",
                            direction: "rtl",
                          },
                        }}
                        required
                        onChange={(e) => {
                          setDescriptionAr(e.target.value);
                        }}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        rows={7}
                        multiline
                        label="Enter message in arabic"
                        value={notification_details.description_ar}
                        inputProps={{
                          dir: "rtl",
                          style: {
                            textAlign: "right",
                            direction: "rtl",
                          },
                        }}
                        required
                        onChange={(e) => {
                          setDescriptionAr(e.target.value);
                        }}
                      />
                    )}
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
                      <label htmlFor="notification-button1">
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
                          ) : notification_details.image.length > 0 ? (
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
                      </label>
                      <input
                        id="notification-button1"
                        style={{ display: "none" }}
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => handleImgChange(e)}
                      />
                    </Paper>
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
              </Box>
            )}
          </Paper>
        </Box>
      </form>
    </Backdrop>
  );
};

export default EditNotification;
