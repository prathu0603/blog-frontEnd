import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { SiAddthis } from "react-icons/si";
import "./create.css";
import { Col, Row } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

const CreateBlog = () => {
  const ownerId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    category: "",
    title: "",
    author: "",
    desc: "",
    ownerId: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const [imageInputState, setImageInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    previewImage(file);
    setSelectedImage(file);
    setImageInputState(e.target.value);
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) {
      window.alert("Choose An Image");
    }
    uploadFiles(previewSource);
  };

  const uploadFiles = async (base64EncodedImage) => {
    try {
      const { category, title, author, desc } = user;
      if (!desc || !title || !author || !category) {
        toast("🦄 Fill all details", {
          position: "top-right",
        });
      } else {
        setLoading(true);
        const res = await fetch("https://user-blog-v1.herokuapp.com/blog", {
          method: "POST",
          body: JSON.stringify({
            category,
            title,
            author,
            desc,
            ownerId: ownerId,
            image: base64EncodedImage,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          toast.success("Blog Created", {
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
      window.alert("Failed To create Blog!");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create_blog">
        {previewSource ? (
          <div className="preview">
            <h1>Blog Cover Preview</h1>
            {/* <img src={previewSource}  alt="chosen" style={{ height: "300px" }} /> */}
            <img
              className="create_blog_img"
              src={previewSource}
              alt="Blog Image"
            />
          </div>
        ) : (
          <>
            <img
              className="create_blog_img"
              src="https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
              alt="Blog Image Sample"
            />
          </>
        )}

        <form onSubmit={handleSubmitFile}>
          <div className="mt-3">
            <label className="mb-3">Blog Cover</label>
            <input
              type="file"
              name="image"
              onChange={handleImageInputChange}
              value={imageInputState}
              className="form-control shadow-none mb-3"
            />
          </div>

          <div className="my-3 d-flex justify-content-between">
            <SiAddthis size="2.2rem" color="rgb(53, 53, 53)" />
            <input
              type="text"
              name="title"
              className="form-control mx-3"
              placeholder="Blog Title"
              value={user.title}
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
                value={user.category}
                onChange={handleInputs}
              />
            </Col>
            <Col>
              <input
                type="text"
                name="author"
                className="form-control mx-3"
                placeholder="Author"
                value={user.author}
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
              value={user.desc}
              onChange={handleInputs}
            />
          </div>

          <button className="btn btn-dark" type="submit">
            {!loading && <span>Publish</span>}
            {loading && (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Creating...
              </>
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateBlog;
