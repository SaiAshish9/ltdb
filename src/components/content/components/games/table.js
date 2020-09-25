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
import { Box, CircularProgress, Snackbar, IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Popup from "./popup";
import EditGame from "./editGame";

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

  const {
    state: { games, message, game_count },
    fetchGames,
    fetchGame,
    toggleGameStatus,
    clearMessage,
  } = useContext(DataContext);

  const [rows, setRows] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    await fetchGames();
  };

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchGames(page + 1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
    fetchGames(newPage + 1, rowsPerPage);
  };

  return (
    <React.Fragment>
      <TableContainer
        style={{
          height: "83vh",
          maxHeight: "83vh",
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
          style={{ width: "100%" }}
          className={classes.table}
          aria-label="simple table"
          size="small"
        >
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
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                {games && "S No."}
                {/* S No. */}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  textAlign: "center",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
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
                  textAlign: "center",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  color: "#282b3c",
                }}
              >
                Action
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  color: "#282b3c",
                }}
              >
                View
              </TableCell>
            </TableRow>
          </TableHead>

          {!games && (
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
            {games &&
              games.map((row, k) => (
                <TableRow
                  elevation={0}
                  style={{
                    height: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={row.game_id}
                >
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {row.name_en.length>0 && k + 1 + rowsPerPage * page}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {row.name_en}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                  >
                    {row.name_ar}
                  </TableCell>
                  <TableCell
                    onClick={async () => {
                      console.log(row.game_id, +row.status === 1 ? 0 : 1);
                      await toggleGameStatus(
                        row.game_id,
                        +row.status === 1 ? 0 : 1
                      );
                      await fetchGames(page + 1);
                      await clearMessage();
                    }}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
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
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={async () => {
                        await fetchGame(row.game_id);
                        setOpenEditDialog(true);
                      }}
                    >
                      <EditOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={async () => {
                        await fetchGame(row.game_id);
                        setOpen(true);
                      }}
                    >
                      <VisibilityOutlinedIcon style={{ cursor: "pointer" }} />{" "}
                    </IconButton>
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
        count={game_count}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Popup classes={classes} open={open} setOpen={setOpen} />
      <EditGame
        classes={classes}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
    </React.Fragment>
  );
}
