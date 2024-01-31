import React from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function CommentForm({ userId, postId, userName }) {
  const [text, setText] = React.useState("");

  const saveComment = () => {
    fetch("http://localhost:8080/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    saveComment();
    setText("");
  };
  const handleChange = (value) => {
    setText(value);
  };

  return (
    <OutlinedInput
      id="outlined-adorment-amount"
      multiline
      inputProps={{ maxLength: 250 }}
      fullWidth
      placeholder="Write a comment..."
      sx={{ mt: 3 }}
      onChange={(event) => handleChange(event.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <Link to={`/users/${userId}`} className="link-text">
            <Avatar
              style={{
                background: "linear-gradient(95deg, #3110F4 10%, #2196F3 90%)",
                color: "white",
              }}
              aria-label="recipe"
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <Button
            variant="contained"
            style={{
              background: "linear-gradient(95deg, #3110F4 10%, #2196F3 90%)",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </InputAdornment>
      }
    ></OutlinedInput>
  );
}

export default CommentForm;
