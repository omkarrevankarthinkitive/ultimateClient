import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

// importing the image

import homeImage from "../assets/2.png";

import { Link, useNavigate } from "react-router-dom";

import module from "../CSS/Login.module.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const SubmitHandler = (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const loginCredential = {
      email: user.email,
      password: user.password,
    };
    login(loginCredential);
  };
  let statusCode;

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  const login = async (data) => {
    await fetch("http://localhost:4222/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })

      .then((res) => {
        if (statusCode === 201) {
          localStorage.setItem("token", res.token);

          localStorage.setItem("user_id", res._id);

          setTimeout(() => {
            localStorage.setItem("islogin", true);

            navigate("/api/dashboard");
          }, 2000);
        }
      });
  };

  const validateInputs = (inputs) => {
    let errors = {};

    if (!inputs.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      errors.email = "Invalid email address";
    }
    if (
      !inputs.password ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
        inputs.password
      )
    ) {
      errors.password = "Password is cannot be empty";
    }

    return errors;
  };

  return (
    <div data-testid="login-1" className={module.loginPageContainer}>
      <Box
        sx={{
          display: "flex",
          border:"3px solid #023655",
          backgroundColor:"#FFFDF1",  
          
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        }}
      >
        <Box sx={{ padding: "30px", alignItems: "center", flex: "50%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Unbounded",
                fontSize: "2.5rem",
                color: "#08090B",
              }}
            >
              <Link to="/" className={module.titleLogo}>
                DOOK ®
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontSize: "3rem", marginTop: "3rem",color:"#08090b" }}>
              Welcome Back
            </Typography>
            <Typography
              sx={{ fontSize: "1 rem", fontWeight: "bold", color: "#08090B" }}
            >
              Welcome back,please enter your details
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                marginTop: "30px",
              }}
            >
              <input
                className={module.inputStyle}
                value={user.email}
                type="text"
                placeholder="E-Mail"
                onChange={handleChange}
                name="email"
              />
              <Typography sx={{ color: "red" }}>{errors.email}</Typography>

              <input
                className={module.inputStyle}
                value={user.password}
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
              />
              <Typography sx={{ color: "red" }}>{errors.password}</Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#08090B",
                  "&:hover": { backgroundColor: "black" },
                }}
                onClick={SubmitHandler}
              >
                Login
              </Button>
              <Typography sx={{ color: "black" }}>
                Don't have an account?
                <Link to="/api/users" className={module.signupButton}>
                  Sign up for free
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: "50%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <img
            src={homeImage}
            alt="This is an home Image"
            className={module.imgHeight}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Login;
