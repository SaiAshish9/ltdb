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
import Api from "../../../../api";
import { Context as DataContext } from "../../../../api/dataProvider";
import { Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein, status) {
  return { name, calories, fat, carbs, protein, status };
}

export default function SimpleTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const {
    state: { items, items_count, page_count },
    fetchItems,
  } = useContext(DataContext);

  const convertRows = () => {
    console.log(items);
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

  useEffect(() => {
    setRows(null);
    setRows(convertRows());
  }, [items, fetchItems]);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchItems(page+1, +event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
    fetchItems(newPage + 1, rowsPerPage);
  };

  return (
    <React.Fragment>
      <TableContainer
        style={{
          height: "83vh",
          width: "100%",
        }}
        elevation={0}
        component={Paper}
      >
        <Table
          style={{ width: "100%" }}
          className={classes.table}
          aria-label="simple table"
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
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Item Id
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
                }}
              >
                Created_At
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
                Status
              </TableCell>
            </TableRow>
          </TableHead>

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
            {rows &&
              rows.map((row, i) => (
                <TableRow
                  elevation={0}
                  style={{
                    height: "3.4rem",
                    padding: "0px",
                    border: "none",
                  }}
                  key={row.name}
                >
                  <TableCell
                    style={{
                      color: "#8095a1",
                      fontWeight: 500,
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.calories}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.fat}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.carbs}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.protein}
                  </TableCell>
                  <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                    {row.status}
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
    </React.Fragment>
  );
}
