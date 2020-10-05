import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Context as DataContext } from "../../../../api/dataProvider";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const { fetchGames } = useContext(DataContext);
  const [searched, setSearched] = useState(false);

  return (
    <Paper component="form" className={classes.root}>
      {!searched ? (
        <IconButton
          onClick={async () => {
            if (value) {
              await fetchGames(null, null, value);
            }
            setSearched(true);
            // setValue(null);
          }}
          className={classes.iconButton}
          aria-label="menu"
        >
          <SearchIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={async () => {
            if (value) {
              await fetchGames();
              // setValue(null);
              setSearched(false);
            }
          }}
          className={classes.iconButton}
          aria-label="menu"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      )}

      <InputBase
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={classes.input}
        placeholder="Search "
        inputProps={{ "aria-label": "search google maps" }}
      />
    </Paper>
  );
}
