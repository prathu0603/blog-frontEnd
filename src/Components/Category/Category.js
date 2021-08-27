import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./category.css";
import { Link } from "react-router-dom";
import Posts from "../Posts/Posts";
import { IoIosCreate } from "react-icons/io";

const Category = () => {
  const [blogData, setBlogData] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(async () => {
    try {
      const res = await fetch("https://user-blog-v1.herokuapp.com/blog");
      const data = await res.json();
      await setBlogData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filter = (e) => {
    setCategory(e?.value);
  };

  const options = [
    { value: "All", label: "All" },
    { value: "Adventure", label: "Adventure" },
    { value: "Travel", label: "Travel" },
    { value: "Animals", label: "Animals" },
    { value: "Gaming", label: "Gaming" },
  ];

  const categorySearch = async () => {
    if (!category) return;
    const res = await fetch(
      `https://user-blog-v1.herokuapp.com/blog/?category=${category}`
    );
    const data = await res.json();
    await setBlogData(data);
  };

  console.log(category);
  return (
    <>
      <div className="category">
        <Link
          to="/createBlog"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <a className="btn blog-btn btn-lg">
            <span>
              <IoIosCreate /> Create Blog
            </span>
          </a>
        </Link>

        <div className="select_section">
          <Select
            className="select"
            closeMenuOnSelect={true}
            options={options}
            placeholder="Select catergory"
            isClearable
            onChange={filter}
          />
          <button
            className="btn btn-success search_btn"
            onClick={categorySearch}
          >
            Search
          </button>
        </div>
      </div>

      <Posts blogData={blogData} />
    </>
  );
};

export default Category;
