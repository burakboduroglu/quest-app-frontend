import React from "react";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import {Container} from "@mui/material";

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPosts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container fixed sx={{ display: "flex", alignItems: "center", backgroundColor: "#cfe8fc", flexDirection: "column", height: "100vh" }}>
        {posts.map((post) => (
          <Post key={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} />
        ))}
      </Container>
    );
  }
}
