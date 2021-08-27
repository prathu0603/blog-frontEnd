import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { SiAddthis } from "react-icons/si";
import { useParams } from "react-router";
import "./update.css";
import { Col, Row } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

const UpdateBlog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const initialValue = {
    category: "",
    author: "",
    title: "",
    desc: "",
  };
  const [blogInfo, setBlogInfo] = useState(initialValue);
  const { category, author, title, desc } = blogInfo;

  useEffect(async () => {
    try {
      const res = await fetch(`https://user-blog-v1.herokuapp.com/blog/${id}`);
      const data = await res.json();
      await setBlogInfo(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleInputs = (e) => {
    setBlogInfo({ ...blogInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();
    try {
      if (!desc || !title || !author || !category) {
        toast("🦄 Fill all details", {
          position: "top-right",
        });
      } else {
        setLoading(true);
        const res = await fetch(
          `https://user-blog-v1.herokuapp.com/blog/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              category: category,
              title: title,
              author: author,
              desc: desc,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.status === 200) {
          toast.success("Blog Updated", {
            position: "top-right",
          });
          setLoading(false);
        } else {
          toast.error("Server Error", {
            position: "top-right",
          });
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      window.alert("Failed To Update Blog!");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="update_blog">
        <img
          className="update_blog_img"
          src={blogInfo?.imageUrl}
          alt="update Image"
        />

        <form onSubmit={handleSubmitFile}>
          <div className="my-3 d-flex justify-content-between">
            <SiAddthis size="2.2rem" color="rgb(53, 53, 53)" />
            <input
              type="text"
              name="title"
              className="form-control mx-3"
              placeholder="Blog Title"
              value={title}
              onChange={handleInputs}
            />
          </div>
          <Row className="mb-3">
            <Col>
              <input
                type="text"
                name="category"
                className="form-control"
                placeholder="Category"
                value={category}
                onChange={handleInputs}
              />
            </Col>
            <Col>
              <input
                type="text"
                name="author"
                className="form-control mx-3"
                placeholder="Author"
                value={author}
                onChange={handleInputs}
              />
            </Col>
          </Row>
          <div className="mb-3">
            <textarea
              name="desc"
              className="form-control"
              placeholder="Blog Details"
              rows="3"
              value={desc}
              onChange={handleInputs}
            />
          </div>

          <button className="btn btn-warning" type="submit">
            {!loading && <span>Update</span>}
            {loading && (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Updating...
              </>
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default UpdateBlog;
