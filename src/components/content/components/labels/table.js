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
  TablePagination,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Context as DataContext } from "../../../../api/dataProvider";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import AddLabel from "./addLabel";
import EditLabel from "./editLabel";
import ViewLabel from "./viewLabel";
import ImportLabel from "./importLabel";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const LabelTable = () => {
  const [open, setOpen] = useState(false);
  const [openViewLabel, setOpenViewLabel] = useState(false);
  const [openEditLabel, setOpenEditLabel] = useState(false);
  const [openImportLabel, setOpenImportLabel] = useState(false);
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const {
    state: { labels, message, label_count },
    fetchLabelDetails,
    fetchLabels,
  } = useContext(DataContext);
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchLabels(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchLabels(newPage + 1, rowsPerPage);
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
        <Box style={{ height: "7vh" }}>{/* <Search /> */}</Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <p
            onClick={() => {
              setOpenImportLabel(true);
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
            Import Label
          </p>
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
            Add Label
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
                {labels && "S. NO."}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  color: "#282b3c",
                }}
              >
                Key
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
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
                  textAlign: "center",
                }}
              >
                Arabic Name
              </TableCell>
              {/* <TableCell
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
                  <IconButton
                    onClick={() => {
                      setOpenDialog(!openDialog);
                    }}
                  >
                  </IconButton>
                </Box>{" "}
              </TableCell> */}
              {/* {openDialog ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} */}
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
          {!labels && (
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
            {labels &&
              labels.length > 0 &&
              labels.map((i, k) => (
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
                    {i.key.length > 0 && k + 1 + rowsPerPage * page}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {i.key}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {i.label_en}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {i.label_ar}
                  </TableCell>
                  {/* <TableCell
                    onClick={async () => {
                      // await toggleBannerStatus(i.id, +i.status === 0 ? 1 : 0);
                      // await fetchLabels();
                    }}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      color: +i.status !== 1 ? "red" : "green",
                      fontWeight: 500,
                    }}
                  >
                    {+i.status === 1 ? "Active" : "InActive"}
                  </TableCell> */}

                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={async () => {
                          await fetchLabelDetails(i.id);
                          setOpenEditLabel(true);
                        }}
                      >
                        <EditOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                      </IconButton>
                      <IconButton onClick={async () => {}}>
                        <VisibilityOutlinedIcon
                          onClick={async () => {
                            await fetchLabelDetails(i.id);
                            setOpenViewLabel(true);
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
      <TablePagination
        component="div"
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        page={page}
        count={label_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddLabel classes={classes} open={open} setOpen={setOpen} />
      <EditLabel
        classes={classes}
        open={openEditLabel}
        setOpen={setOpenEditLabel}
      />
      <ViewLabel
        classes={classes}
        open={openViewLabel}
        setOpen={setOpenViewLabel}
      />
      <ImportLabel
        classes={classes}
        open={openImportLabel}
        setOpen={setOpenImportLabel}
      />
    </React.Fragment>
  );
};

export default LabelTable;
