import React, { useState } from "react";
import SignOutButton from "../pages/home/SignOutButton";
import { Link } from "react-router-dom";
import {
  createStyles,
  fade,
  IconButton,
  Theme,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./appHeader/Search";
import FriendRequests from "./appHeader/FriendRequests";
import Chats from "./appHeader/Chats";
import Notifications from "./appHeader/Notifications";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        // backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      maxWidth: "400px",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        // width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    rest: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      justifyContent: "center",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

function AppHeader() {
  const classes = useStyles();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static" onBlur={() => setIsSearchOpen(false)}>
        <Toolbar className={classes.toolbar}>
          {/* otherwise search is too big for mobile */}
          {isSearchOpen ? (
            <Search />
          ) : (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="home"
                component={Link}
                to="/"
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" onClick={() => setIsSearchOpen(true)}>
                <SearchIcon fontSize="large" />
              </IconButton>
              <FriendRequests />
              <Chats />
              <Notifications />
              <SignOutButton />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;
