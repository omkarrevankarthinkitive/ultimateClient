import {
  Button,
  Typography,
  Select,
  MenuItem,
  fabClasses,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// importing the image

import homeImage from "../assets/3.png";

import module from "../CSS/Signup.module.css";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
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
    const SignUpCredential = {
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    };
    signup(SignUpCredential);
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
  let statusCode;
  // let token = localStorage.getItem("token");
  const signup = async (data) => {
    await fetch("http://localhost:4222/api/users", {
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
          setTimeout(() => {
            localStorage.setItem("islogin", true);

            navigate("/");
          }, 2000);
        }
      });
  };

  const validateInputs = (inputs) => {
    let errors = {};
    if (inputs.name.length < 2 || inputs.name.length > 50) {
      errors.name = "Name should be between 2 to 50 characters";
    }
    if (!inputs.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      errors.email = "Invalid email address";
    }
    if (
      !inputs.password ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
        inputs.password
      )
    ) {
      errors.password =
        "Password should contain one small, big letters, symbols like @ and minimum of 8 characters";
    }
    if (inputs.phoneNumber.length != 10) {
      errors.phoneNumber = "Number must be 10 numbers long";
    }
    return errors;
  };

  return (
    <div data-testid="Signup-1" className={module.signupContainer}>
      <Box
        sx={{
          display: "flex",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          border: "3px solid #023655",
          backgroundColor: "#FFFDF1",
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
            <Typography
              sx={{ fontSize: "3rem", marginTop: "5rem", color: "#08090b" }}
            >
              Create your Account
            </Typography>
            <Typography
              sx={{ fontSize: "1 rem", fontWeight: "bold", color: "#08090B" }}
            >
              Enter the fields bellow to get started
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "30px",
              }}
            >
              <input
                type="text"
                className={module.inputStyle}
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
              <Typography sx={{ color: "red" }}>{errors.name}</Typography>
              <input
                type="text"
                className={module.inputStyle}
                placeholder="E-Mail"
                name="email"
                onChange={handleChange}
              />
              <Typography sx={{ color: "red" }}>{errors.email}</Typography>

              <input
                type="password"
                className={module.inputStyle}
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              <Typography sx={{ color: "red" }}>{errors.password}</Typography>

              <input
                type="number"
                className={module.inputStyle}
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
              />

              <Typography sx={{ color: "red" }}>
                {errors.phoneNumber}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "black" },
                }}
                onClick={SubmitHandler}
              >
                Sign up
              </Button>
              <Typography sx={{ color: "black" }}>
                Already have an account?
                <Link to="/api/login" className={module.orLogin}>
                  Login
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
            className={module.imgHeigt}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Signup;
