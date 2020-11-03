import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Snackbar,
  TableRow,
  Paper,
  Box,
  IconButton,
  TablePagination,
  Checkbox,
} from "@material-ui/core";
import Search from "./search";
import { Context as DataContext } from "../../../../api/dataProvider";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const OrderTable = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewBanner, setOpenViewBanner] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);
  const {
    state: { orders, message, order_count },
    fetchOrders
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  //   const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchOrders(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchOrders(newPage + 1, rowsPerPage);
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
          <Search />
        </Box>

        {/* <p
          onClick={() => {
            setOpen(true);
          }}
          style={{
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            position: "relative",
            zIndex: 3,
            marginRight: "2rem",
          }}
        >
          Add Banner
        </p> */}
      </Box>

      <TableContainer
        style={{
          height: "83vh",
          width: "100%",
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
        <Table style={{ width: "100%" }} size="small">
          <TableHead>
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
                width: "85vw",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                S. NO.
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Order Number
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
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
                  textAlign: "center",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ textAlign: "center", paddingLeft: "2rem" }}
                >
                  Payment Status
                </Box>{" "}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ textAlign: "center", paddingLeft: "2rem" }}
                >
                  Order Status
                </Box>{" "}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                Action
                <IconButton
                  onClick={() => {
                    setOpenDialog(!openDialog);
                  }}
                >
                  {openDialog ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
                {orders && openDialog && (
                  <Paper
                    style={{ zIndex: 2, position: "absolute", width: "10rem" }}
                  >
                    <p
                      onClick={async () => {
                        setAction(1);
                        // await toggleBannerStatus([...selected], 1);
                        // await fetchBanners();
                        // setSelected([]);
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
                      Bulk Active
                    </p>
                    <p
                      onClick={async () => {
                        setAction(0);
                        // await toggleBannerStatus([...selected], 0);
                        // await fetchBanners();
                        // setSelected([])
                        // setSelected([...selected, ...banners.map((x) => x.id)]);
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
                      Bulk InActive
                    </p>
                  </Paper>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.length > 0 &&
              orders.map((i, k) => (
                <TableRow
                  key={k}
                  elevation={0}
                  style={{
                    height: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                >
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {k + 1}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      // textAlign: "center",
                    }}
                  >
                    {i.order_id}
                  </TableCell>
                  <TableCell
                    style={{
                      // textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.user_name}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      //   await toggleBannerStatus([i.id], +i.status === 0 ? 1 : 0);
                      //   await fetchBanners();
                    }}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: i.payment_status !== "Success" ? "red" : "green",
                      fontWeight: 500,
                      paddingLeft: "4rem",
                    }}
                  >
                    {i.payment_status}
                    {/* {+i.status === 1 ? "Active" : "InActive"} */}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      //   await toggleBannerStatus([i.id], +i.status === 0 ? 1 : 0);
                      //   await fetchBanners();
                    }}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.order_status !== 1 ? "red" : "green",
                      fontWeight: 500,
                      paddingLeft: "4rem",
                    }}
                  >
                    {i.order_status_text}
                    {/* {+i.order_status === 1 ? "Active" : "InActive"} */}
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={async () => {
                          //   await fetchBannerDetails(i.id);
                          //   setOpenEditBanner(true);
                        }}
                      >
                        <EditOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton onClick={async () => {}}>
                        <VisibilityOutlinedIcon
                          onClick={async () => {
                            // await fetchBannerDetails(i.id);
                            // setOpenViewBanner(true);
                          }}
                          style={{ cursor: "pointer" }}
                        />{" "}
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <AddBannerPopup open={open} setOpen={setOpen} classes={classes} />
      <ViewBannerPopup
        open={openViewBanner}
        setOpen={setOpenViewBanner}
        classes={classes}
      />
      <EditBannerPopup
        open={openEditBanner}
        setOpen={setOpenEditBanner}
        classes={classes}
      /> */}
      <TablePagination
        component="div"
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        page={page}
        count={order_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default OrderTable;
