import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  let userId = 123;
  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="title">
          <Link to="/" className="link-text">
            Home
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to={`/users/${userId}`} className="link-text">
            User
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
