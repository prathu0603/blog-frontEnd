import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import { useHistory } from "react-router";
import Navbar from "../Navbar/Navbar";
const Home = () => {
  const history = useHistory();

  const callHome = async () => {
    try {
      const res = await fetch("https://user-blog-v1.herokuapp.com/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!(res.status === 200)) {
        history.push("/signin");
      }
    } catch (error) {
      console.log("Server Error");
      history.push("/signin");
    }
  };

  useEffect(() => {
    callHome();
  }, []);

  return (
    <div>
      <Navbar />
      <Banner />
      <Category />
    </div>
  );
};

export default Home;
