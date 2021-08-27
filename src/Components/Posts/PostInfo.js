import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link, useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const PostInfo = () => {
  const history = useHistory();
  const owner = localStorage.getItem("userId");
  console.log(owner);
  const { id } = useParams();
  const [blogInfo, setBlogInfo] = useState({});
  useEffect(async () => {
    try {
      const res = await fetch(`https://user-blog-v1.herokuapp.com/blog/${id}`);
      const data = await res.json();
      await setBlogInfo(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteBlog = async () => {
    const res = await fetch(`https://user-blog-v1.herokuapp.com/blog/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      window.alert("Blog Deleted");
      history.push("/");
    } else {
      toast.error("Server Error, Refresh", {
        position: "top-right",
      });
    }
  };

  console.log(blogInfo);
  console.log(blogInfo.ownerId === owner);
  console.log(blogInfo.ownerId);

  return (
    <>
      <Navbar />
      <div className="post_info">
        <img
          className="post_info_img"
          src={blogInfo?.imageUrl}
          alt="Post Image"
        />
        {blogInfo.ownerId === owner && (
          <div className="post_info_icons">
            <AiTwotoneDelete className="delete_icon" onClick={deleteBlog} />

            <Link
              to={`/updateBlog/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <FiEdit className="edit_icon" />
            </Link>
          </div>
        )}

        <h2 className="post_info_title">{blogInfo?.title}</h2>
        <div className="post_info_subtitle">
          <p>Author : {blogInfo?.author}</p>
          {blogInfo && (
            <p>Published on : {blogInfo.timestamp?.split("T")[0]}</p>
          )}
        </div>
        <p className="post_info_desc">{blogInfo?.desc}</p>
        <ToastContainer />
      </div>
    </>
  );
};

export default PostInfo;
