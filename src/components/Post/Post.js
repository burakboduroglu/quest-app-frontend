import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import {Link} from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post({userId, userName, title, text, postId}) {
    const [expanded, setExpanded] = React.useState(false);
    const [isLiked, setLiked] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [comments, setComments] = useState([]);
    const [isInitialMount, setInitialMount] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(comments);
    };

    const handleLike = () => {
        setLiked(!isLiked);
    }

    const refreshComments = async () => {
        fetch(`http://localhost:8080/comments?postId=${postId}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setComments(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else refreshComments();
    }, [comments]);

    return (
        <div>
            <Card sx={{width: 800, marginTop: 2, marginBottom: 1, textAlign: "left"}}>
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
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleLike} sx={isLiked ? {color: "red"} : {}} aria-label="add to favorites">
                        <FavoriteIcon/>
                    </IconButton>
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}
                                aria-label="show more">
                        <CommentIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent fixed>
                        {error ? "error" :
                            isLoaded ? comments.map((comment) => {
                                return <Comment key={1} userId={1} text={comment.text} userName={"USER"}/>
                            }) : "Loading"
                        }
                        <CommentForm userId={1} postId={postId} userName={"USER"}/>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default Post;
