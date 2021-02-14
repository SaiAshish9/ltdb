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
// import Search from "./search";
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

const BannerTable = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewBanner, setOpenViewBanner] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);
  const {
    state: { banners, message, banner_count, advanced_builders },
    fetchAdvancedBuilderCategories,
    fetchBanners,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchBanners(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchBanners(newPage + 1, rowsPerPage);
  };

  return (
    <React.Fragment>
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
                Required
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                Link Item Available
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                Order
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                Show Builder
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advanced_builders &&
              advanced_builders.length > 0 &&
              advanced_builders.map((i, k) => (
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
                    {i.name_en}
                  </TableCell>
                  <TableCell
                    style={{
                      // textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.name_ar}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.required !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {+i.required === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {+i.status === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: i.link_item_available ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {i.link_item_available ? "True" : "False"}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.order}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.is_show_builder !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {+i.is_show_builder === 1 ? "Active" : "InActive"}
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
        count={banner_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default BannerTable;
