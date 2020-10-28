import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/reducers/actionTypes";
import { useForm } from "react-hook-form";
import { Box, Backdrop, makeStyles, IconButton } from "@material-ui/core";
import Lootbox from "../../lootbox.png";
import Cookie from "js-cookie";
import Api from "../../api";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Login = ({ dispatch }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState(null);
  const [forgot, setForgot] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [forgotEmail, setForgotEmail] = useState(null);
  const forgotPasswordSubmit = ({ forgotEmail }) => {
    Api.post("https://test-api.loot-box.co/api/app/user/forgot-password", {
      email: forgotEmail,
    }).then((data) => {
      setEmailSent(true);
    });
    reset();
    setForgot(false);
  };

  const onSubmit = ({ email, password }) => {
    Api.post("https://test-api.loot-box.co/api/admin/login", {
      email,
      password,
    })
      .then((data) => {
        Cookie.set("token", data.data.data.token);
        dispatch(
          setCurrentUser({
            first_name: data.data.data.first_name,
            token: data.data.data.token,
          })
        );
      })
      .catch((e) => {
        if (!password) {
          setMsg("Password is required ");
        }
        if (!email) {
          setMsg("Email is required ");
        }
        // setOpen(false);
      });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Paper
        style={{
          width: "27rem",
          padding: "2rem",
        }}
      >
        <img
          src={Lootbox}
          alt="lootbox"
          className="animate__animated animate__zoomIn"
          style={{
            width: "10rem",
            position: "absolute",
            zIndex: 1,
            marginLeft: "8rem",
            marginTop: "-7rem",
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <p
            style={{
              color: "#2c2c2c",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem",
              fontSize: "1rem",
              marginTop: "5rem",
            }}
          >
            Welcome back to lootbox
          </p>
          <TextField
            defaultValue="admin@lootbox.com"
            label="Email"
            name="email"
            type="email"
            fullWidth
            inputRef={register}
            style={{ marginTop: "1rem" }}
          />
          <TextField
            style={{ margin: "2rem 0" }}
            label="Password"
            name="password"
            type="password"
            fullWidth
            inputRef={register()}
          />
          <p
            onClick={() => {
              setForgot(true);
            }}
            style={{
              cursor: "pointer",
              // color: "blue",
              color: "#2c2c2c",
              textAlign: "end",
              fontWeight: "bold",
            }}
          >
            Forgot Password?
          </p>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            style={{
              background: "#2c2c2c",
              color: "#fff",
              borderRadius: 0,
              textAlign: "center",
              margin: "2rem auto",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              textTransform: "none",
            }}
          >
            Sign In
          </Button>
        </form>
        {msg && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={() => {
              // setOpen(false);
              setMsg(null);
            }}
            message={msg}
            autoHideDuration={1000}
          />
        )}
      </Paper>
      <Backdrop className={classes.backdrop} open={forgot}>
        <Paper
          elevation={0}
          style={{
            padding: "2rem",
            position: "absolute",
            top: "10vh",
            width: "36rem",
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box display="flex" flexDirection="row-reverse">
            <IconButton
              onClick={() => {
                setForgotEmail(null);
                reset();
                setForgot(false);
              }}
            >
              <Clear />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(forgotPasswordSubmit)}>
            <Box
              display="flex"
              // alignItems="center"
              justifyContent="space-between"
              style={{ width: "100%" }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                Email
              </p>
              <TextField
                name="forgotEmail"
                inputRef={register()}
                // fullWidth
                style={{ width: "50%" }}
                // label="Email"
                type="email"
              />
            </Box>

            <Box display="flex" flexDirection="row-reverse">
              <Button
                variant="contained"
                disableElevation
                type="submit"
                onClick={() => {
                  reset();
                  setForgot(false);
                }}
                style={{
                  background: "#2c2c2c",
                  color: "#fff",
                  borderRadius: 0,
                  textAlign: "end",
                  textTransform: "none",
                  alignSelf: "flex-end",
                  // justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={emailSent}
        onClose={() => {
          setEmailSent(false);
        }}
        message={`Email Sent To ${forgotEmail}`}
        autoHideDuration={1000}
      />
    </Box>
  );
};

export default connect(null)(Login);
