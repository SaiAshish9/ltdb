import React from "react";
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

  const rows = data.map((i, k) =>
    createData(
      i["user_id"],
      i["full_name"],
      i["email"],
      i["phone"],
      i["created_at"],
      i["status"]
    )
  );

  return (
    <React.Fragment>
      <TableContainer elevation={0} component={Paper}>
        <Table
          // size="small"
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Serial Number
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
                Created_At
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
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                elevation={0}
                style={{
                  height: "3.4rem",
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
                <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                  {i === 0 && <InfoOutlinedIcon />}
                </TableCell>
              </TableRow>
            ))}

            {[...Array(4).keys()].map((i, k) => (
              <TableRow
                elevation={0}
                style={{
                  height: "3.4rem",
                  border: "none",
                }}
                key={k}
              >
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={6}
        rowsPerPage={6}
        page={0}
        //   onChangePage={handleChangePage}
        //   onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
