import React from "react";
import { Link } from "react-router-dom";
import Post from "./Post";

const Posts = ({ blogData }) => {
  console.log(blogData);
  return (
    <div className="post_container">
      {blogData ? (
        <>
          {blogData.map((blog) => (
            <Link
              to={`/postInfo/${blog._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={blog._id}
            >
              <Post blog={blog} />
            </Link>
          ))}
        </>
      ) : (
        <h2> Create Some Blogs</h2>
      )}
    </div>
  );
};

export default Posts;
