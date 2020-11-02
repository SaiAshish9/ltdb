import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Popup from "./popup";
import { Box, CircularProgress } from "@material-ui/core";
import {
  Snackbar,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@material-ui/core";
import { Context as DataContext } from "../../../../api/dataProvider";
import Search from "./search";
import Thumbnail from "../../../../assets/thumbnail1.png";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function createData(name, calories, fat, carbs, protein, status) {
  return { name, calories, fat, carbs, protein, status };
}

export default function SimpleTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    state: { users, user_count, message },
    fetchUser,
    fetchUsers,
    toggleUserStatus,
    clearMessage,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [active, isActive] = useState(false);
  const [inActive, isInActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(0);
  const [openActionDialog, setOpenActionDialog] = useState(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchUsers(page + 1);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchUsers(newPage + 1);
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{
          position: "fixed",
          top: 0,
          height: "10vh",
          zIndex: 2,
          width: "85vw",
          paddingRight: "2rem",
        }}
      >
        <Box style={{ height: "7vh" }}>
          <Search active={active} inActive={inActive} />
        </Box>
      </Box>
      <TableContainer
        dense={true}
        style={{
          height: "83vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={0}
        component={Paper}
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
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead
            style={{
              background: "#f4f4f4",
              height: "3.4rem",
            }}
          >
            <TableRow
              style={{
                background: "#f4f4f4",
                maxHeight: "3.4rem",
              }}
            >
              <TableCell
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              ></TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                {users && users.length > 0 && "Serial Number"}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Email Id
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Mobile No
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Created On
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                <Box display="flex" alignItems="center">
                  Status{" "}
                  <IconButton
                    onClick={() => {
                      setOpenDialog(!openDialog);
                    }}
                  >
                    {openDialog ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                </Box>
                {openDialog && (
                  <Paper style={{ position: "absolute", width: "10rem" }}>
                    <p
                      onClick={() => {
                        fetchUsers(null, null, null, null);
                        setOpenDialog(false);
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#282b3c",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      All
                    </p>
                    <p
                      onClick={() => {
                        if (!active) {
                          isInActive(false);
                          fetchUsers(null, null, null, 1);
                        }
                        if (active) {
                          fetchUsers();
                        }
                        isActive(!active);
                        setOpenDialog(false);
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#282b3c",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Active
                    </p>
                    <p
                      onClick={() => {
                        if (!inActive) {
                          isActive(false);
                          fetchUsers(null, null, null, 0);
                        }
                        if (inActive) {
                          fetchUsers();
                        }
                        isInActive(!inActive);
                        setOpenDialog(false);
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#282b3c",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      InActive
                    </p>
                  </Paper>
                )}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                <Box display="flex" alignItems="center">
                  Action
                  <IconButton
                    onClick={() => {
                      setOpenActionDialog(!openActionDialog);
                    }}
                  >
                    {openActionDialog ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </IconButton>
                </Box>
                {openActionDialog && (
                  <Paper
                    style={{
                      position: "absolute",
                      width: "10rem",
                      zIndex: 2,
                      right: 10,
                    }}
                  >
                    <p
                      onClick={async () => {
                        setAction(1);
                         await toggleUserStatus([...selected], 1);
                         await fetchUsers();
                        setOpenActionDialog(false);
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#282b3c",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Bulk Active
                    </p>
                    <p
                      onClick={async () => {
                        setAction(0);
                        await toggleUserStatus([...selected], 0);
                        await fetchUsers();
                        setOpenActionDialog(false);
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#282b3c",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Bulk InActive
                    </p>
                  </Paper>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          {users && users.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              style={{ width: "85vw", height: "50vh" }}
            >
              <img src={Thumbnail} alt="No users" />
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                No Users Found!
              </p>
            </Box>
          )}
          {!users && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ height: "70vh", width: "85vw" }}
            >
              <CircularProgress
                style={{
                  color: "#151628",
                }}
              />
            </Box>
          )}

          <TableBody>
            {users &&
              users.length > 0 &&
              users.map((x, i) => (
                <TableRow
                  elevation={0}
                  style={{
                    maxHeight: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={x.user_id}
                >
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    <Checkbox
                      // disabled
                      // checked={selected.includes(x.user_id)}
                      onChange={() => {
                        if (selected.includes(x.user_id)) {
                          var a = [...selected];
                          a = a.filter((y) => y !== x.user_id);
                          setSelected(a);
                        } else {
                          setSelected([...selected, x.user_id]);
                        }
                      }}
                      style={{ color: "#8095a1" }}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                      textAlign: "center",
                    }}
                    component="th"
                    scope="row"
                  >
                    {x.full_name.length > 0 && i + 1 + rowsPerPage * page}
                    {/* {x.user_id} */}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {x.full_name}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {" "}
                    {x.email}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {" "}
                    {x.phone}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      maxHeight: "3.4rem",
                    }}
                  >
                    {" "}
                    {moment(x.created_at).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      await toggleUserStatus(
                        [x.user_id],
                        +x.status === 1 ? 0 : 1
                      );
                      await fetchUsers(page + 1);
                      await clearMessage();
                    }}
                    style={{
                      cursor: "pointer",
                      color: x.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {x.status === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    <IconButton
                      onClick={async () => {
                        await fetchUser(x.user_id);
                        setOpen(true);
                      }}
                    >
                      <InfoOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={user_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Popup classes={classes} open={open} setOpen={setOpen} />
    </React.Fragment>
  );
}
