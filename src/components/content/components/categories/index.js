import React,{useState} from "react";
import Table from "./table";
import { Box } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));


const Category = () => {

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
          width: "85%",
        }}
      >
        <Table />
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <Paper
          style={{
            // height: "20rem",

            width: "50vw",
            position: "absolute",
            top: "20vh",
            paddingBottom:"2rem"
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
                color:'#fff'
              }}
              size="medium"
              color="secondary"
            >
              <AddIcon />
            </Fab>
          </Box>
          <SubTable/>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default Category;
