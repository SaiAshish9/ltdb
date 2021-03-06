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
  Checkbox,
  TablePagination,
} from "@material-ui/core";
import AddNotificationPopup from "./addNotification";
import { Context as DataContext } from "../../../../api/dataProvider";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ViewNotificationPopup from "./viewNotification";
import EditNotificationPopup from "./editNotification";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { MdNotificationsNone } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const NotificationTable = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewNotification, setOpenViewNotification] = useState(false);
  const [openEditNotification, setOpenEditNotification] = useState(false);
  const {
    state: { notifications, message, notification_count },
    fetchNotificationDetails,
    toggleBannerStatus,
    fetchNotifications,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(0);
  const [notificationId, setNotificationId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchNotifications(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchNotifications(newPage + 1, rowsPerPage);
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row-reverse"
        style={{
          position: "fixed",
          top: 0,
          height: "10vh",
          zIndex: 2,
          width: "85vw",
          paddingRight: "2rem",
          color: "#fff",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <IconButton style={{ color: "#fff" }}>
            <MdNotificationsNone color="#fff" style={{ color: "#fff" }} />
          </IconButton>
          <p
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
              marginLeft: "1rem",
            }}
          >
            Add Notification
          </p>
        </Box>
      </Box>

      <TableContainer
        style={{
          height: "83vh",
          width: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
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
                Title
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                عنوان
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Type
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
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications &&
              notifications.length > 0 &&
              notifications.map((i, k) => (
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
                    }}
                  >
                    {i.title_en}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.title_ar}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {+i.type === 1 ? "All Users" : "Specific User"}
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={() => {
                          setNotificationId(i.notification_id);
                          setOpenEditNotification(true);
                        }}
                      >
                        <EditOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          await fetchNotificationDetails(i.notification_id);
                          setOpenViewNotification(true);
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton onClick={() => {}}>
                        <IoIosSend />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        page={page}
        count={notification_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddNotificationPopup open={open} setOpen={setOpen} classes={classes} />
      <ViewNotificationPopup
        open={openViewNotification}
        setOpen={setOpenViewNotification}
        classes={classes}
      />
      {notificationId && (
        <EditNotificationPopup
          open={openEditNotification}
          setOpen={setOpenEditNotification}
          classes={classes}
          notificationId={notificationId}
        />
      )}
    </React.Fragment>
  );
};

export default NotificationTable;
