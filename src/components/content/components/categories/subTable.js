import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData(1, "Sanjiv pandey", "عربى", 24, "")];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer elevation={0} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
              S.no
            </TableCell>
            <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
              Name
            </TableCell>
            <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
              عربى
            </TableCell>
            <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
              Status
            </TableCell>
            <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
              Active
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ color: "#a197a3" }}>{row.calories}</TableCell>
              <TableCell style={{ color: "#a197a3" }}>{row.fat}</TableCell>
              <TableCell style={{ color: "#a197a3" }}>
                <Chip
                  style={{
                    color: "#fff",
                    background: "#6cc07f",
                    fontWeight: 600,
                  }}
                  label="Active"
                />
              </TableCell>
              <TableCell style={{ color: "#a197a3" }}>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
