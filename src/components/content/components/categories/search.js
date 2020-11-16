import React, { useState, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "20rem",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: "#3d4977",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({ categoryId, fetchSubCategories }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [searched, setSearched] = useState(false);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (!searched) {
        if (value) {
          await fetchSubCategories(categoryId, value);
        }
        setSearched(true);
    } else {
        setValue("");
        fetchSubCategories(categoryId);
        setSearched(false);
    }
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!searched ? (
          <IconButton
            // onClick={async () => {
            //   if (value) {
            //     await fetchSubCategories(categoryId, value);
            //   }
            //   setSearched(true);
            // }}
            className={classes.iconButton}
            aria-label="menu"
          >
            <SearchIcon />
          </IconButton>
        ) : (
          <IconButton
            // onClick={() => {
            //   setValue("");
            //   fetchSubCategories(categoryId);
            //   setSearched(false);
            // }}
            className={classes.iconButton}
            aria-label="menu"
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        )}

        <InputBase
          value={value}
          name="search"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={classes.input}
          placeholder="Search "
        />
      </form>
    </Paper>
  );
}
