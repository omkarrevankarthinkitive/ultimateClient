import { Button, Typography, Select, MenuItem } from "@mui/material";
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
    role: "",
  });
  const navigate = useNavigate();

  const SubmitHandler = (event) => {
    event.preventDefault();
    const SignUpCredential = {
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    console.log(SignUpCredential);
    signup(SignUpCredential);
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  let statusCode;
  let token = localStorage.getItem("token");
  console.log(token, "whythis");
  const signup = async (data) => {
    await fetch("http://localhost:4222/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })
      .then((res) => {
        if (statusCode === 400) {
          console.log(res + "wwwwwwwwww");
        }
        if (statusCode === 201) {
          console.log("data: ", res);

          setTimeout(() => {
            localStorage.setItem("islogin", true);

            navigate("/");
          }, 2000);
        }
      });
  };

  return (
    <div data-testid="Signup-1" className={module.signupContainer}>
      <Box
        sx={{
          display: "flex",
          background: "blur(10px)",
          backdropFilter: "saturate(130%) blur(10px)",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          borderRadius: "25px",
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
            <Typography sx={{ fontSize: "3rem", marginTop: "5rem" }}>
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
                gap: "25px",
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
              <input
                type="text"
                className={module.inputStyle}
                placeholder="E-Mail"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                className={module.inputStyle}
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              <input
                type="number"
                className={module.inputStyle}
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
              />

              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={user.role}
                label="Age"
                onChange={handleChange}
                name="role"
                sx={{ border: "1px solid black" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
              </Select>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#08090B",
                  "&:hover": { backgroundColor: "black" },
                }}
                onClick={SubmitHandler}
              >
                Sign up
              </Button>
              <Typography sx={{ color: "black" }}>
                Already have an account?{" "}
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
