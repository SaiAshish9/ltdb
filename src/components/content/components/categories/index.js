import React from "react";
import Table from "./table";
import { Box } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from './search'

const Category = () => {
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
                marginRight:10
            }}
            //   className={classes.margin}
          >
            <AddIcon />
          </Fab>
          <Fab variant="extended" color="primary" aria-label="add">
            Action
            <ExpandMoreIcon/>
          </Fab>
        </Box>
      </Box>
      <Box
      display="flex"
      flexDirection="row-reverse"
      style={{padding:"0 2rem"}}     
>
          <Search/>
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
    </div>
  );
};

export default Category;
