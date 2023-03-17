import React, { useState } from "react";

import {
  TextField,
  Button,
  Typography,
  Card,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetch from "node-fetch";

const workingDaysOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
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
    workingTime: "",
    slotDuration: "",
    workingDays: [],
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
    border: "3px solid #023655",
    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
    backgroundColor: "#FFFDF1",
  };

  const inputStyle = {
    margin: "8px",
    borderRadius: "20px",
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
      workingTime: user.workingTime,
      SlotDuration: user.SlotDuration,
      workingDays: user.workingDays,
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
        const statusCode = res.statusCode;
      });
  };

  const handleWorkingDaysChange = (event) => {
    const selectedDays = event.target.value.filter(
      (day) => !user.workingDays.includes(day)
    );
    setUser((prevState) => ({
      ...prevState,
      workingDays: [...prevState.workingDays, ...selectedDays],
    }));
  };

  console.log(user.workingDays);
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
        <TextField fullWidth label="Time Range" placeholder="hh:mm-hh:mm" />
        <Box></Box>
        <InputLabel>Select Slot</InputLabel>
        <Select
        label="Select Slots"
          labelId="demo-select-small"
           placeholder="time Slots"
          id="demo-select-small"
          value={user.slotDuration}
          onChange={handleChange}
          name="slotDuration"
          sx={{
            height: "40px",
            width: "100%",
            background:"transparent"
          }}
        >
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <InputLabel id="working-days-label">Select working days:</InputLabel>
          <Select
            labelId="working-days-label"
            id="working-days"
            multiple
            value={user.workingDays}
            onChange={handleWorkingDaysChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {workingDaysOptions.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Box>

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
