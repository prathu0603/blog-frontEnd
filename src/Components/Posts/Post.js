import React from "react";
import "./post.css";
const Post = ({ blog }) => {
  return (
    <div className="post">
      <img src={blog.imageUrl} alt="post" />
      <div className="blog_info">
        <p className="blog_category">{blog.category}</p>
        <h3 className="blog_title">{blog.title}</h3>
        <p className="blog_author">Author : {blog.author}</p>
        <p className="blog_details">{blog.desc}</p>
      </div>
    </div>
  );
};

export default Post;
