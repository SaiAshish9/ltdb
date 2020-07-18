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
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function DenseTable({rows}) {
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
              Custom Fields
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!rows?
          <CircularProgress/>
          :rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{ color: "#a197a3" }}>{row.name}</TableCell>
              <TableCell style={{ color: "#a197a3" }}>{row.name_ar}</TableCell>
              <TableCell style={{ color: "#a197a3" }}>
                <Chip
                  style={{
                    color: "#6cc07f",
                    background: "#fff",
                    fontWeight: 600,
                  }}
                  label={row.status}
                />
              </TableCell>
              <TableCell style={{ color: "#a197a3" }}>
                <p
                  style={{
                    cursor: "pointer",
                    color: "#3f51b5",
                    fontWeight: 600,
                    // textAlign:'center'
                    marginLeft: "2rem",
                  }}
                >
                  View
                </p>
              </TableCell>
              <TableCell>
                <IconButton style={{color:'red'}}>
                  <DeleteOutlineIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
