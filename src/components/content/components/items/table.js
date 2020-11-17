import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Context as DataContext } from "../../../../api/dataProvider";
import {
  Box,
  CircularProgress,
  Snackbar,
  IconButton,
  Checkbox,
  FormGroup,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import AddItem from "./addItem";
import moment from "moment";
import Search from "./search";
import Popup from "./popup";
import Thumbnail from "../../../../assets/thumbnail1.png";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditItem from "./editItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [id, setId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [active, isActive] = useState(false);
  const [inActive, isInActive] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(0);

  const {
    state: { items, items_count, page_count, message },
    fetchItems,
    toggleItemStatus,
    fetchItem,
    clearMessage,
  } = useContext(DataContext);

  const convertRows = () => {
    return (
      items &&
      items.map((i, k) =>
        createData(
          i["item_id"],
          i["name_en"],
          i["name_ar"],
          i["created_at"],
          i["price"],
          i["status"]
        )
      )
    );
  };

  const [rows, setRows] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    setRows(null);
    setRows(convertRows());
  }, [items, fetchItems]);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchItems(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchItems(newPage + 1, rowsPerPage);
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
        <Box display="flex" alignItems="center" style={{ height: "7vh" }}>
          <Search active={active} inActive={inActive} />
        </Box>
        <Box display="flex">
          <p
            onClick={() => {
              setOpenAddItem(true);
            }}
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              position: "relative",
              top: -5,
              zIndex: 3,
              marginRight: "1.5rem",
            }}
          >
            Add Item
          </p>
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

        <Table
          style={{ minWidth: "90vw" }}
          className={classes.table}
          aria-label="simple table"
          size="small"
        >
          <TableHead
            style={{
              maxHeight: "3.4rem",
              overflowY: "hidden",
              width:"90vw",
              background: "#f4f4f4",
            }}
          >
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
                width: "90vw",
                overflowX: "scroll",
                overflowY: "hidden",
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
                {items && items.length > 0 && "S No"}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                اسم
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  // display: "flex",
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
                Price
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
                  <Paper
                    style={{ position: "absolute", width: "10rem", zIndex: 5 }}
                  >
                    <p
                      onClick={() => {
                        fetchItems(null, null, null, null);
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
                          fetchItems(null, null, null, 1);
                        }
                        if (active) {
                          fetchItems();
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
                          fetchItems(null, null, null, 0);
                        }
                        if (inActive) {
                          fetchItems();
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
                  paddingLeft: "2rem",
                  color: "#282b3c",
                }}
              >
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
                {items && openActionDialog && (
                  <Paper
                    style={{ zIndex: 2, position: "absolute", width: "10rem" }}
                  >
                    <p
                      onClick={async () => {
                        setAction(1);
                        await toggleItemStatus([...selected], 1);
                        await fetchItems();
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
                        await toggleItemStatus([...selected], 0);
                        await fetchItems();
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
          {items && items.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              style={{ width: "85vw", height: "50vh" }}
            >
              <img src={Thumbnail} alt="No items" />
              <p
                style={{
                  textAlign: "center",
                  color: "#8095a1",
                  fontWeight: 500,
                }}
              >
                No Items Found!
              </p>
            </Box>
          )}

          {!items && (
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
            {items &&
              items.length > 0 &&
              items.map((row, k) => (
                <TableRow
                  elevation={0}
                  style={{
                    height: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={row.item_id}
                >
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    <Checkbox
                      onChange={() => {
                        if (selected.includes(row.item_id)) {
                          var x = [...selected];
                          x = x.filter((x) => x !== row.item_id);
                          setSelected(x);
                        } else {
                          setSelected([...selected, row.item_id]);
                        }
                      }}
                      style={{ color: "#8095a1" }}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name_en.length > 0 && k + 1 + rowsPerPage * page}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.name_en}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.name_ar}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {moment(row.created_at).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    KD {row.price}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      await toggleItemStatus(
                        [row.item_id],
                        +row.status === 1 ? 0 : 1
                      );
                      await fetchItems(page + 1);
                      await clearMessage();
                    }}
                    style={{
                      cursor: "pointer",
                      color: row.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {row.status === 1 ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={async () => {
                          await fetchItem(row.item_id);
                          setOpen(true);
                        }}
                      >
                        <VisibilityOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          await fetchItem(row.item_id);
                          setId(row.item_id);
                          setOpenEditDialog(true);
                        }}
                      >
                        <EditOutlinedIcon />
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
        rowsPerPageOptions={[5, 10, 20]}
        page={page}
        count={items_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Popup classes={classes} open={open} setOpen={setOpen} />
      <EditItem
        id={id}
        classes={classes}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
      <AddItem open={openAddItem} setOpen={setOpenAddItem} />
    </React.Fragment>
  );
}
