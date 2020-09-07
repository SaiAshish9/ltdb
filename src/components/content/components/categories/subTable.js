import React, { useState, useCallback } from "react";
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
import axios from "axios";
import Box from "@material-ui/core/Box";
import { ArrowBack } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditDialog from "./editDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable({ setOpenSubCategory,rows, classes1, setCurrent,openEditDialog,setOpenEditDialog }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchCustomFields = useCallback(
    async (id) => {
      axios({
        url: `https://test-api.loot-box.co/api/admin/subcategory/custom-fields?sub_category_id=${id}`,
        method: "get",
        headers: {
          "X-Localization": "ar",
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
        },
      }).then((data) => {
        var x = data.data.data.map((x) => ({
          id: x["custom_field_id"],
          name: x["name_en"],
          name_ar: x["name_ar"],
        }));
        setData(x);
      });
    },
    [openEditDialog,setOpenEditDialog]
  );

  return (
    <React.Fragment>
      {!open && (
        <TableContainer elevation={0} component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
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
              {!rows ? (
                <CircularProgress />
              ) : (
                rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell style={{ color: "#a197a3" }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ color: "#a197a3" }}>
                      {row.name_ar}
                    </TableCell>
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
                    <TableCell
                      style={{
                        color: "#a197a3",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          fetchCustomFields(row.id);
                        }}
                        style={{
                          color: "#3f51b5",
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setCurrent(false);
                          setOpenEditDialog(true);
                          setSelected(row);
                          fetchCustomFields(row.id);
                        }}
                        style={{ color: "orange" }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          console.log(row);
                        }}
                        style={{ color: "red" }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {open && (
        <Box>
          <Tooltip title="Go Back" placement="right">
            <Fab
              onClick={() => {
                setOpen(false);
                setData(null);
              }}
              size="medium"
              color="secondary"
              aria-label="add"
            >
              <ArrowBack />
            </Fab>
          </Tooltip>
          <TableContainer
            style={{ marginTop: "1rem" }}
            elevation={0}
            component={Paper}
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                    Id
                  </TableCell>
                  <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell style={{ color: "#4c5172", fontWeight: 600 }}>
                    اسم
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? (
                  data.map((i, k) => (
                    <TableRow key={k}>
                      <TableCell component="th" scope="row">
                        {i.id}
                      </TableCell>
                      <TableCell style={{ color: "#a197a3" }}>
                        {i.name}
                      </TableCell>
                      <TableCell style={{ color: "#a197a3" }}>
                        {i.name_ar}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <CircularProgress size={27} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <EditDialog
        classes1={classes1}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        current={selected}
        data={data}
        setData={setData}
        setOpen={setOpenSubCategory}
      />
    </React.Fragment>
  );
}
