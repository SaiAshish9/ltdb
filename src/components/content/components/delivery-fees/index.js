import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Context as DataContext } from "../../../../api/dataProvider";

const DeliveryFees = () => {
  const [message, setMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const { handleSubmit, reset, register } = useForm();
  const { fetchDeliveryDetails, addDeliveryFees } = useContext(DataContext);
  const [data, setData] = useState(null);
  const [newData, setNewData] = useState([]);
  const [deletedData, setDeletedData] = useState([]);

  const getData = async () => {
    const x = await fetchDeliveryDetails();
    if (x.length > 0) {
      setData(x);
      setNewData([]);
    } else {
      setData([]);
      setNewData([]);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data1) => {
    const y = [...data, ...newData];
    await addDeliveryFees(y);
    setMessage("Submission Successful");
    setData(null);
    setNewData([]);
    await getData();
    await setOpenSnackbar(true);
  };

  return (
    <Box
      display="flex"
      style={{ height: "90vh" }}
      alignItems="center"
      justifyContent="center"
    >
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          message={message}
          onClose={() => {
            setOpenSnackbar(false);
          }}
          autoHideDuration={1000}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            width: "60vw",
            height: "60vh",
            overflowY: "scroll",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <p
              style={{
                color: "#8095a1",
                fontWeight: 500,
              }}
            >
              Order Range
            </p>
            <p
              style={{
                color: "#8095a1",
                fontWeight: 500,
                width: "30%",
              }}
            >
              Delivery Fees
            </p>
          </Box>
          {data &&
            data.map((i, k) => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{ margin: "1rem 0" }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ width: "60%" }}
                >
                  <TextField
                    inputProps={{
                      min: 0,
                      step: 0.1,
                      style: {
                        textAlign: "center",
                      },
                    }}
                    type="number"
                    disabled
                    value={i["min_price"]}
                  />
                  <p
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      margin: "0 1rem",
                    }}
                  >
                    To
                  </p>
                  <TextField
                    disabled
                    inputProps={{
                      min: 0,
                      step: 0.1,
                      style: {
                        textAlign: "center",
                      },
                    }}
                    type="number"
                    value={i["max_price"]}
                  />
                </Box>
                <Box display="flex">
                  <TextField
                    disabled
                    inputProps={{
                      min: 0,
                      step: 0.1,
                      style: {
                        textAlign: "center",
                      },
                    }}
                    type="number"
                    value={i["delivery_fee"]}
                  />
                </Box>
                <Box display="flex">
                  {k === data.length - 1 && newData.length === 0 && (
                    <Fab
                      onClick={() => {
                        setNewData([
                          ...newData,
                          {
                            min_price: 0,
                            max_price: 0,
                            delivery_fee: 0,
                          },
                        ]);
                      }}
                      color="primary"
                      style={{ margin: "0 1rem" }}
                    >
                      <AddIcon />
                    </Fab>
                  )}
                  {data.length !== 1 && (
                    <Fab
                      onClick={() => {
                        const x = [...data];
                        x.splice(k, 1);
                        setData(x);
                      }}
                      color="secondary"
                      style={{ margin: "0 1rem" }}
                    >
                      <DeleteOutlineIcon />
                    </Fab>
                  )}
                </Box>
              </Box>
            ))}
          {newData.map((i, k) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              style={{ margin: "1rem 0" }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{ width: "60%" }}
              >
                <TextField
                  inputProps={{
                    min: 0,
                    step: 0.1,
                    style: {
                      textAlign: "center",
                    },
                  }}
                  value={i["min_price"]}
                  onChange={(e) => {
                    const x = [...newData];
                    x[k]["min_price"] = e.target.value;
                    setNewData(x);
                  }}
                  type="number"
                />
                <p
                  style={{
                    color: "#8095a1",
                    fontWeight: 500,
                    margin: "0 1rem",
                  }}
                >
                  To
                </p>
                <TextField
                  inputProps={{
                    min: 0,
                    step: 0.1,
                    style: {
                      textAlign: "center",
                    },
                  }}
                  type="number"
                  value={i["max_price"]}
                  onChange={(e) => {
                    const x = [...newData];
                    x[k]["max_price"] = e.target.value;
                    setNewData(x);
                  }}
                />
              </Box>
              <Box display="flex">
                <TextField
                  inputProps={{
                    min: 0,
                    step: 0.1,
                    style: {
                      textAlign: "center",
                    },
                  }}
                  type="number"
                  value={i["delivery_fee"]}
                  onChange={(e) => {
                    const x = [...newData];
                    x[k]["delivery_fee"] = e.target.value;
                    setNewData(x);
                  }}
                />
              </Box>
              <Box display="flex">
                {k === newData.length - 1 && (
                  <Fab
                    onClick={() => {
                      setNewData([
                        ...newData,
                        {
                          min_price: 0,
                          max_price: 0,
                          delivery_fee: 0,
                        },
                      ]);
                    }}
                    color="primary"
                    style={{ margin: "0 1rem" }}
                  >
                    <AddIcon />
                  </Fab>
                )}
                <Fab
                  onClick={() => {
                    const x = [...newData];
                    x.splice(k, 1);
                    setNewData(x);
                  }}
                  color="secondary"
                  style={{ margin: "0 1rem" }}
                >
                  <DeleteOutlineIcon />
                </Fab>
              </Box>
            </Box>
          ))}

          {data && (
            <Box
              style={{ width: "100%" }}
              display="flex"
              flexDirection="row-reverse"
            >
              <Fab
                variant="extended"
                type="submit"
                style={{
                  margin: "2rem 0",
                  background: "#282b3c",
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "none",
                }}
              >
                Submit
              </Fab>
            </Box>
          )}
        </Paper>
      </form>
    </Box>
  );
};

export default DeliveryFees;
