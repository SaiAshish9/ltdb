import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@material-ui/core";
import Search from "./search";
import AddBannerPopup from "./addBanner";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const BannerTable = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

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
        <Box style={{ height: "7vh" }}>
          <Search />
        </Box>

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
          height: "83vh",
          width: "100%",
        }}
        elevation={0}
        component={Paper}
      >
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
                English Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Arabic Name
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
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
      <AddBannerPopup open={open} setOpen={setOpen} classes={classes} />
    </React.Fragment>
  );
};

export default BannerTable;
