import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Alert, InputAdornment, OutlinedInput, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";

function PostForm({userId, userName, refreshPosts}) {
    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [isPost, setIsPost] = React.useState(false);

    const savePost = () => {
        fetch("http://localhost:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text
            })
        }).then(res => res.json()).catch((err) => console.log(err));
    }

    const handleSubmit = () => {
        savePost();
        setIsPost(true);
        setText("");
        setTitle("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value)
        setIsPost(false);
    }

    const handleText = (value) => {
        setText(value)
        setIsPost(false);
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setIsPost(false);
    }

    return (
        <div>
            <Snackbar open={isPost} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Post added successfully!
                </Alert>
            </Snackbar>
            <Card sx={{width: 800, marginTop: 3, textAlign: "left"}}>
                <CardHeader
                    avatar={
                        <Link to={`/users/${userId}`} className="link-text">
                            <Avatar style={{
                                background: "linear-gradient(95deg, #3110F4 10%, #2196F3 90%)",
                                color: "white"
                            }}
                                    aria-label="recipe"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>}
                    title={
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline placeholder="Title"
                            inputProps={{maxLength: 25}}
                            fullWidth
                            value={isPost ? "" : title}
                            onChange={(i) => handleTitle(i.target.value)}
                        >
                        </OutlinedInput>}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline placeholder="Text"
                            inputProps={{maxLength: 350}}
                            fullWidth
                            value={isPost ? "" : text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: "linear-gradient(95deg, #3110F4 10%, #2196F3 90%)",
                                            color: "white"
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </InputAdornment>}>
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostForm;
