import React,{useState,useEffect} from "react";
import Table from "./table";
import { Box,CircularProgress } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from './search'
import Backdrop from "@material-ui/core/Backdrop"
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SubTable from './subTable'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));




const Category = () => {

  const [loading, setLoading] = useState(true)
  const [data,setData]=useState(null)


  useEffect(() => {
    axios({
      url: `http://15.206.151.171/lootbox_backend/public/api/admin/user/list?page=1`,
      method: "get",
      headers: {
        "X-Localization": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    })
      .then((data) => {
        setData(data)
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);





  const classes = useStyles()
  const [open,setOpen]=useState(false)

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: "1rem 2rem" }}
      >
        <p
          style={{
            color: "#282b3c",
            fontWeight: 600,
            fontSize: "1.5rem",
          }}
        >
          Category List
        </p>
        <Box display="flex">
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            style={{
              marginRight: 10,
            }}
            onClick={() => {
              setOpen(true);
            }}
            //   className={classes.margin}
          >
            <AddIcon />
          </Fab>
          <Fab variant="extended" color="primary" aria-label="add">
            Action
            <ExpandMoreIcon />
          </Fab>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row-reverse"
        style={{ padding: "0 2rem" }}
      >
        <Search />
      </Box>
      <div
        style={{
          marginTop: "20vh",
          position: "absolute",
          bottom: 0,
          display:loading ?"flex":"",
          alignItems:"center",
          justifyContent:"center",
          width: "85%",
          height: "60vh",
          background: "#fff",
        }}
      >
        {loading ? (
          <CircularProgress
            style={{
              margin: "auto",
              color: "#151628",
            }}
          />
        ) : (
          <Table data={data} />
        )}
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <Paper
          style={{
            // height: "20rem",

            width: "50vw",
            position: "absolute",
            top: "20vh",
            paddingBottom: "2rem",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: "0 1rem", color: "#979aa4" }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Add Sub Category
            </p>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              padding: "1rem",
            }}
          >
            <TextField variant="outlined" label="Name" />
            <TextField variant="outlined" label="عربى" defaultValue="عربى" />
            <TextField
              variant="outlined"
              label="Status"
              defaultValue={"Active"}
            />
            <Fab
              style={{
                // color: "#282b3c",
                // background:'orange',
                color: "#fff",
              }}
              size="medium"
              color="secondary"
            >
              <AddIcon />
            </Fab>
          </Box>
          <SubTable />
        </Paper>
      </Backdrop>
    </div>
  );
};

export default Category;
