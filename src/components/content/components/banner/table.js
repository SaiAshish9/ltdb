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
} from "@material-ui/core";
// import Search from "./search";
import AddBannerPopup from "./addBanner";
import { Context as DataContext } from "../../../../api/dataProvider";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ViewBannerPopup from "./viewBanner";
import EditBannerPopup from "./editBanner";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const BannerTable = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewBanner, setOpenViewBanner] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);
  const {
    state: { banners, message },
    fetchBannerDetails,
    toggleBannerStatus,
    fetchBanners,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(0);

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
        <Box style={{ height: "7vh" }}>{/* <Search /> */}</Box>

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
          }}
        >
          Add Banner
        </p>
      </Box>

      <TableContainer
        style={{
          height: "90vh",
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
                  textAlign: "center",
                }}
              >
                S. NO.
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  // textAlign: "center",
                  color: "#282b3c",
                }}
              >
                English Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  // textAlign: "center",
                }}
              >
                Arabic Name
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
                  Status{" "}
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
                {banners && openDialog && (
                  <Paper
                    style={{ zIndex: 2, position: "absolute", width: "10rem" }}
                  >
                    <p
                      onClick={async () => {
                        setAction(1);
                        await toggleBannerStatus([...selected], 1);
                        await fetchBanners();
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
                        await toggleBannerStatus([...selected], 0);
                        await fetchBanners();
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
            {banners &&
              banners.length > 0 &&
              banners.map((i, k) => (
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
                      // disabled
                      // checked={selected.includes(i.id)}
                      onChange={() => {
                        if (selected.includes(i.id)) {
                          var x = [...selected];
                          x = x.filter((x) => x !== i.id);
                          setSelected(x);
                        } else {
                          setSelected([...selected, i.id]);
                        }
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
                    {k + 1}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      // textAlign: "center",
                    }}
                  >
                    {i.title_en}
                  </TableCell>
                  <TableCell
                    style={{
                      // textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.title_ar}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      await toggleBannerStatus([i.id], +i.status === 0 ? 1 : 0);
                      await fetchBanners();
                    }}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                      paddingLeft: "4rem",
                    }}
                  >
                    {+i.status === 1 ? "Active" : "InActive"}
                  </TableCell>

                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={async () => {
                          await fetchBannerDetails(i.id);
                          setOpenEditBanner(true);
                        }}
                      >
                        <EditOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton onClick={async () => {}}>
                        <VisibilityOutlinedIcon
                          onClick={async () => {
                            await fetchBannerDetails(i.id);
                            setOpenViewBanner(true);
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
      <AddBannerPopup open={open} setOpen={setOpen} classes={classes} />
      <ViewBannerPopup
        open={openViewBanner}
        setOpen={setOpenViewBanner}
        classes={classes}
      />
      <EditBannerPopup
        open={openEditBanner}
        setOpen={setOpenEditBanner}
        classes={classes}
      />
    </React.Fragment>
  );
};

export default BannerTable;
