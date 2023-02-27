import React, { useState } from "react";

import { TextField, Button, Typography, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetch from "node-fetch";

function AddDoctors() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    doctorName: "",
    qualification: [],
    Gender: "",
    clinicName: "",
    email: "",
    img: "",
    phoneNumber: "",
    aboutMyself: "",
  });

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "600px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "25px",
    background: "transparent",
    backdropFilter: "saturate(130%) blur(30px)",
    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
  };

  const inputStyle = {
    margin: "8px",
    borderRadius: "20px",
  };

  const buttonStyle = {
    margin: "16px",
  };
  function handleSubmit(e) {
    const dataSubmit = {
      doctorName: user.doctorName,
      qualification: [user.qualification],
      Gender: user.Gender,
      clinicName: user.clinicName,
      email: user.email,
      img: user.img,
      phoneNumber: user.phoneNumber,
      aboutMyself: user.aboutMyself,
    };

    postDoctored(dataSubmit);

    setTimeout(() => {
      navigate("/api/dashboard");
    }, 2000);
  }

  const postDoctored = async (data) => {
    await fetch("http://localhost:4222/api/doctor/doctordetail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let statusCode = res.statusCode;

        console.log(res.statusCode);
        if (statusCode === 400) {
          console.log(res + "wwwwwwwwww");
        }
        if (statusCode === 200) {
        }
      });
  };

  return (
    <Box
      data-testid="addDoc-1"
      sx={{
        backgroundImage: `url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={cardStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#013455" }}>
          ADD DOCTORS
        </Typography>
        <TextField
          name="doctorName"
          onChange={handleChange}
          value={user.doctorName}
          fullWidth
          label="Doctor Name"
          style={inputStyle}
        />
        <TextField
          name="qualification"
          onChange={handleChange}
          value={user.qualification}
          fullWidth
          label="Qualification"
          style={inputStyle}
        />
        <TextField
          name="Gender"
          onChange={handleChange}
          value={user.Gender}
          fullWidth
          label="Gender"
          style={inputStyle}
        />
        <TextField
          name="clinicName"
          onChange={handleChange}
          value={user.clinicName}
          fullWidth
          label="Clinic Name"
          style={inputStyle}
        />

        <TextField
          name="email"
          onChange={handleChange}
          value={user.email}
          fullWidth
          label="Email"
          type="text"
          style={inputStyle}
        />
        <TextField
          name="phoneNumber"
          onChange={handleChange}
          value={user.phoneNumber}
          fullWidth
          label="Phone Number"
          type="text"
          style={inputStyle}
        />
        <TextField
          name="aboutMyself"
          onChange={handleChange}
          value={user.aboutMyself}
          fullWidth
          label="About Doctor"
          type="text"
          style={inputStyle}
        />
        <TextField
          name="img"
          onChange={handleChange}
          value={user.img}
          fullWidth
          label="Image Url"
          type="text"
          style={inputStyle}
        />
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ color: "white", backgroundColor: "#013455" }}
        >
          Add Doctor
        </Button>
      </Card>
    </Box>
  );
}

export default AddDoctors;
