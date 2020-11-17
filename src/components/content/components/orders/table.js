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
import ViewOrderPopup from "./viewOrder";
import EditOrderPopup from "./editOrder";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const OrderTable = () => {
  const classes = useStyles();
  const [openViewOrderPopup, setOpenViewOrderPopup] = useState(false);
  const [openEditOrderPopup, setOpenEditOrderPopup] = useState(false);
  const {
    state: { orders, message, order_count },
    fetchOrders,
    toggleOrderStatus,
    fetchOrder,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [selected, setSelected] = useState(-1);

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
          <TableHead
            style={{
              maxHeight: "3.4rem",
              overflowY: "hidden",
              background: "#f4f4f4",
            }}
          >
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
                width: "85vw",
                overflowY: "hidden",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              ></TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                {orders && orders.length > 0 && "S No."}
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
                }}
              >
                Grand Total
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
                  paddingLeft:"4rem"
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
                {orders && openActionDialog && (
                  <Paper
                    style={{
                      zIndex: 5,
                      position: "absolute",
                      width: "10rem",
                      right: 10,
                    }}
                  >
                    <p
                      onClick={async () => {
                        await toggleOrderStatus(selected)
                        await fetchOrders()
                        setOpenActionDialog(false)
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#282b3c",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Update Status
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
                    <Checkbox
                      checked={selected === i.order_id}
                      onChange={() => {
                        setSelected(i.order_id);
                      }}
                      style={{ color: "#8095a1" }}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.order_id && k + 1 + rowsPerPage * page}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.order_id}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.user_name}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    KD {i.grand_total}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: i.payment_status !== "Success" ? "red" : "green",
                      fontWeight: 500,
                      paddingLeft: "4rem",
                    }}
                  >
                    {i.payment_status}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.order_status !== 1 ? "red" : "green",
                      fontWeight: 500,
                      paddingLeft: "4rem",
                    }}
                  >
                    {i.order_status_text}
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={async () => {
                          await fetchOrder(i.order_id);
                          setOpenEditOrderPopup(true);
                        }}
                      >
                        <EditOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          await fetchOrder(i.order_id);
                          setOpenViewOrderPopup(true);
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ViewOrderPopup
        open={openViewOrderPopup}
        setOpen={setOpenViewOrderPopup}
        classes={classes}
      />
      <EditOrderPopup
        open={openEditOrderPopup}
        setOpen={setOpenEditOrderPopup}
        classes={classes}
      />
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
