import React from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function Comment({ userId, text, userName }) {
  return (
    <OutlinedInput
      disabled
      id="outlined-adorment-amount"
      multiline
      inputProps={{ maxLength: 25 }}
      fullWidth
      sx={{ mt: 1 }}
      value={text}
      startAdornment={
        <InputAdornment position="start">
          <Link to={`/users/${userId}`} className="link-text">
            <Avatar
              style={{
                background: "linear-gradient(95deg, #3110F8 10%, #2196F3 90%)",
                color: "white",
              }}
              aria-label="recipe"
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        </InputAdornment>
      }
    ></OutlinedInput>
  );
}

export default Comment;
