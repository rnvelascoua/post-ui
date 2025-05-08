import React from "react";

const PostCard = ({ post }) => {
  return (
    <div style={styles.card}>
      <h3>{post.author}</h3>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" style={styles.image} />}
      <p style={styles.timestamp}>
        Created At: {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginTop: "8px",
  },
  timestamp: {
    color: "#888",
    fontSize: "12px",
    marginTop: "8px",
  },
};

export default PostCard;