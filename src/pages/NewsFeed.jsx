import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { Box, Container, Typography, CircularProgress } from "@mui/material";

const API_URL = "https://facebook-api-e5s9.onrender.com/api/posts"; // Update with your API URL

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  // Handle post creation
  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post(API_URL, newPost);
      setPosts([response.data, ...posts]); // Add the new post to the top
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2, textAlign: "center" }}>
          News Feed
        </Typography>
        <PostForm onAddPost={handleAddPost} />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Container>
    </Box>
  );
};

export default NewsFeed;