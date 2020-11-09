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
  const [newData, setNewData] = useState(null);

  useEffect(() => {
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
    getData();
  }, []);

  const onSubmit = async (data) => {
    setMessage("Submission Successful");
    const x = Object.values(data).map((x) => +x);
    var y = [];
    for (let i = 0; i < x.length; i += 3) {
      y.push({
        min_price: x[i],
        max_price: x[i + 1],
        delivery_fee: x[i + 2],
      });
    }
    await addDeliveryFees(y);
    await fetchDeliveryDetails();
    reset();
    setData(null);
    setOpenSnackbar(true);
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
          {!data ? (
            <Box
              display="flex"
              style={{ width: "60vw", height: "60vh" }}
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress
                style={{
                  color: "#151628",
                }}
              />
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between">
              <Box>
                <p
                  style={{
                    color: "#8095a1",
                    fontWeight: 500,
                  }}
                >
                  Order Range
                </p>
                {data &&
                  data.length > 0 &&
                  data.map((i, k) => (
                    <Box
                      key={k}
                      style={{ height: "10vh" }}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        type="number"
                        disabled
                        name={`min_price${k}`}
                        defaultValue={data[k].min_price}
                        inputRef={register()}
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                          },
                        }}
                      />
                      <p
                        style={{
                          color: "#8095a1",
                          fontWeight: 500,
                          margin: "0 1.5rem",
                        }}
                      >
                        To
                      </p>{" "}
                      <TextField
                        type="number"
                        disabled
                        name={`max_price${k}`}
                        inputRef={register()}
                        defaultValue={i.max_price}
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                          },
                        }}
                      />
                    </Box>
                  ))}
                {newData &&
                  newData.length > 0 &&
                  newData.map((i, k) => (
                    <Box
                      key={k}
                      style={{ height: "10vh" }}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        type="number"
                        name={`min_price${k + data.length}`}
                        inputRef={register()}
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                          },
                        }}
                      />
                      <p
                        style={{
                          color: "#8095a1",
                          fontWeight: 500,
                          margin: "0 1.5rem",
                        }}
                      >
                        To
                      </p>{" "}
                      <TextField
                        type="number"
                        name={`max_price${k}`}
                        inputRef={register()}
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                          },
                        }}
                      />
                    </Box>
                  ))}
              </Box>

              <Box>
                <p
                  style={{
                    color: "#8095a1",
                    fontWeight: 500,
                  }}
                >
                  Delivery Fees
                </p>
                {data &&
                  data.length > 0 &&
                  data.map((i, k) => (
                    <Box
                      style={{ height: "10vh" }}
                      key={k}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        type="number"
                        disabled
                        defaultValue={data[k].delivery_fee}
                        name={`delivery_fee${k}`}
                        inputRef={register()}
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                          },
                        }}
                      />
                      <p
                        style={{
                          color: "#8095a1",
                          fontWeight: 500,
                          marginLeft: "1.5rem",
                        }}
                      >
                        KD
                      </p>
                      <Box display="flex" justifyContent="space-between">
                        {newData && newData.length === 0 && (
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
                          disabled={newData && newData.length === 0}
                          onClick={() => {
                            const x = [...data];
                            x.splice(k, 1);
                            setData(x);
                          }}
                          color="secondary"
                        >
                          <DeleteOutlineIcon />
                        </Fab>
                      </Box>
                    </Box>
                  ))}
                {newData &&
                  newData.length > 0 &&
                  newData.map((i, k) => (
                    <Box
                      style={{ height: "10vh" }}
                      key={k}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        type="number"
                        name={`delivery_fee${k + data.length}`}
                        inputRef={register()}
                        inputProps={{
                          min: 0,
                          style: {
                            textAlign: "center",
                          },
                        }}
                      />
                      <p
                        style={{
                          color: "#8095a1",
                          fontWeight: 500,
                          marginLeft: "1.5rem",
                        }}
                      >
                        KD
                      </p>
                      <Box display="flex" justifyContent="space-between">
                        {newData.length - 1 === k && (
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
                          disabled={newData.length === 1 && data && data.length ===0}
                          color="secondary"
                        >
                          <DeleteOutlineIcon />
                        </Fab>
                        {/* )} */}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
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
