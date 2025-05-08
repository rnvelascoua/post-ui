import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const API_URL = "http://localhost:8080/api/posts"; // Update with your API URL

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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>News Feed</h1>
      <PostForm onAddPost={handleAddPost} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default NewsFeed;