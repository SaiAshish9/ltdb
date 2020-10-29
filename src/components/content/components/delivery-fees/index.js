import React, { useState } from "react";
import { Box, Paper, TextField, Button, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";

const DeliveryFees = () => {
  const [message, setMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (data) => {
    setMessage("Submission Successful");
    console.log(data);
    reset();
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
            justifyContent: "center",
            width: "50vw",
            height: "50vh",
          }}
        >
          <Box
            style={{ margin: "0 auto" }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <p
              style={{
                textAlign: "center",
                color: "#8095a1",
                fontWeight: 500,
                marginRight: "1rem"
              }}
            >
              Order between
            </p>
            <TextField
              type="number"
              style={{ textAlign: "center",display:"flex",alignItems:"center" }}
              name="below"
              inputRef={register()}
            />
            <p
              style={{
                textAlign: "center",
                color: "#8095a1",
                fontWeight: 500,
                margin: "0 1.5rem",
              }}
            >
              KD and
            </p>
            <TextField
              style={{ textAlign: "center" }}
              type="number"
              name="above"
              inputRef={register()}
            />
            <p
              style={{
                textAlign: "center",
                color: "#8095a1",
                fontWeight: 500,
              }}
            >
              KD
            </p>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: "85%", margin: "1rem auto" }}
          >
            <p
              style={{
                textAlign: "center",
                color: "#8095a1",
                fontWeight: 500,
                margin: "0 1.5rem",
              }}
            >
              Price
            </p>
            <TextField
              type="number"
              name="price"
              style={{ width: "50%",textAlign: "center"}}
              inputRef={register()}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            style={{ margin: "1.5rem 0 0" }}
          >
            <Button
              type="submit"
              style={{
                margin: "auto",
                background: "#282b3c",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "none",
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default DeliveryFees;
