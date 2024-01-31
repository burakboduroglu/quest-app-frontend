/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
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
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post({ userId, userName, title, text, postId, likes }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setLiked] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [comments, setComments] = useState([]);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(comments);
  };

  const handleLike = () => {
    if (isLiked) {
      deleteLike();
      setLikeCount(likeCount - 1);
    } else {
      saveLike();
      setLikeCount(likeCount + 1);
    }
    setLiked(!isLiked);
  };

  const saveLike = async () => {
    if (!isLiked) {
      fetch("http://localhost:8080/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          userId: userId,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
  };

  const deleteLike = async () => {
    fetch(`http://localhost:8080/likes/${likeId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

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
  };

  const checkLikes = () => {
    let likeControl = likes.find((like) => like.userId === userId);
    if (likeControl) {
      setLikeId(likeControl.id);
      setLiked(true);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [comments]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div>
      <Card
        sx={{ width: 800, marginTop: 2, marginBottom: 1, textAlign: "left" }}
      >
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`} className="link-text">
              <Avatar
                style={{
                  background:
                    "linear-gradient(95deg, #3110F4 10%, #2196F3 90%)",
                  color: "white",
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
          <IconButton
            onClick={handleLike}
            sx={isLiked ? { color: "red" } : {}}
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
          <p>{likeCount}</p>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent fixed>
            {error
              ? "error"
              : isLoaded
              ? comments.map((comment) => {
                  return (
                    <Comment
                      key={1}
                      userId={1}
                      text={comment.text}
                      userName={"USER"}
                    />
                  );
                })
              : "Loading"}
            <CommentForm userId={1} postId={postId} userName={"USER"} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
