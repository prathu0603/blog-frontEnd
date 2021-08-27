import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);

  const LoginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Fill All Fields", {
        position: "top-right",
      });
    } else {
      const res = await fetch("https://user-blog-v1.herokuapp.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      await localStorage.setItem("userId", data._id);

      if (res.status == 401) {
        toast.error("Invalid Credentials", {
          position: "top-right",
        });
      } else if (res.status == 500) {
        toast.error("Server Error", {
          position: "top-right",
        });
      } else if (res.status == 200) {
        history.push("/");
      }
    }
  };
  return (
    <div className="mt-5">
      <Container>
        <h3>Welcome Back !</h3>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Enter Mail</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button type="submit" onClick={LoginUser}>
                Login
              </Button>
            </Col>
            <Col>
              Don't Have Account, &nbsp;
              <NavLink to="/signup">Signup</NavLink>
            </Col>
          </Row>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Signin;
