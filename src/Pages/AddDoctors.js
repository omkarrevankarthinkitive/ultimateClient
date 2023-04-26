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
    img: "",
    phoneNumber: "",
    aboutMyself: "",
    workingTime: "",
    slotDuration: "",
    workingDays: [],
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(user);
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
    const validationErrors = validateInputs(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const dataSubmit = {
      doctorName: user.doctorName,
      qualification: [user.qualification],
      Gender: user.Gender,
      clinicName: user.clinicName,
      img: user.img,
      phoneNumber: user.phoneNumber,
      aboutMyself: user.aboutMyself,
      workingTime: user.workingTime,
      slotDuration: user.slotDuration,
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

  const placeholder = "Select Slot";
  const placeholder2 = "Gender";

  console.log(user.workingDays);

  function validateTimeRange(timeRange) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeRange);
  }

  const validateInputs = (inputs) => {
    let errors = {};
    if (inputs.doctorName.length < 2 || inputs.doctorName.length > 50) {
      errors.doctorName = "Name should be between 2 to 50 characters";
    }
    if (inputs.clinicName.length < 2 || inputs.clinicName.length > 50) {
      errors.clinicName = "Clinic Name should be between 2 to 50 characters";
    }
    if (inputs.qualification.length < 2 || inputs.qualification.length > 50) {
      errors.qualification = "Clinic Name should be between 2 to 50 characters";
    }
    if (!inputs.Gender) {
      errors.Gender = "Please select an option from the dropdown";
    }
    if (inputs.aboutMyself.length < 10 || inputs.aboutMyself.length > 50) {
      errors.aboutMyself = "About Doctor should be between 10 to 50 characters";
    }
    if (!inputs.img) {
      errors.img = "Please paste an link here";
    }
    if (!inputs.slotDuration) {
      errors.slotDuration = "Please select an option from the dropdown";
    }
    if (!inputs.workingDays) {
      errors.workingDays = "Please select an options";
    }
    if (!/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(inputs.workingTime)) {
      errors.workingTime = "Invalid time range format. Please use HH:MM-HH:MM";
    } else {
      const [startTime, endTime] = inputs.workingTime.split("-");
      const startHour = parseInt(startTime.split(":")[0], 10);
      const endHour = parseInt(endTime.split(":")[0], 10);

      if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
        errors.workingTime = "Hours should be between 00 and 23";
      }
    }

    if (inputs.phoneNumber.length != 10) {
      errors.phoneNumber = "Number must be 10 numbers long";
    }
    return errors;
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
        <Typography sx={{ color: "red" }}>{errors.doctorName}</Typography>

        <TextField
          name="qualification"
          onChange={handleChange}
          value={user.qualification}
          fullWidth
          label="Qualification"
          style={inputStyle}
        />
        <Select
          sx={{
            "& .MuiSelect-select .notranslate::after": placeholder2
              ? {
                  content: `"${placeholder2}"`,
                  opacity: 0.7,
                }
              : {},
            width: "100%",
          }}
          placeholder="time Slots"
          id="demo-select-small"
          value={user.Gender}
          onChange={handleChange}
          name="Gender"
          // sx={{
          //   height: "40px",
          //   width: "100%",
          //   background: "transparent",
          // }}
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
        <Typography sx={{ color: "red" }}>{errors.Gender}</Typography>

        <TextField
          name="clinicName"
          onChange={handleChange}
          value={user.clinicName}
          fullWidth
          label="Clinic Name"
          style={inputStyle}
        />
        <Typography sx={{ color: "red" }}>{errors.clinicName}</Typography>

        <TextField
          name="phoneNumber"
          onChange={handleChange}
          value={user.phoneNumber}
          fullWidth
          label="Phone Number"
          type="text"
          style={inputStyle}
        />
        <Typography sx={{ color: "red" }}>{errors.phoneNumber}</Typography>

        <TextField
          name="aboutMyself"
          onChange={handleChange}
          value={user.aboutMyself}
          fullWidth
          label="About Doctor"
          type="text"
          style={inputStyle}
        />
        <Typography sx={{ color: "red" }}>{errors.aboutMyself}</Typography>

        <TextField
          name="img"
          onChange={handleChange}
          value={user.img}
          fullWidth
          label="Image Url"
          type="text"
          style={inputStyle}
        />
        <Typography sx={{ color: "red" }}>{errors.img}</Typography>

        <TextField
          fullWidth
          label="Time Range"
          placeholder="hh:mm-hh:mm"
          onChange={handleChange}
          type="text"
          value={user.workingTime}
          name="workingTime"
        />
        <Typography sx={{ color: "red" }}>{errors.workingTime}</Typography>

        <Select
          sx={{
            "& .MuiSelect-select .notranslate::after": placeholder
              ? {
                  content: `"${placeholder}"`,
                  opacity: 0.7,
                }
              : {},
            width: "100%",
          }}
          placeholder="time Slots"
          id="demo-select-small"
          value={user.slotDuration}
          onChange={handleChange}
          name="slotDuration"
          // sx={{
          //   height: "40px",
          //   width: "100%",
          //   background: "transparent",
          // }}
        >
          <MenuItem value={"15"}>15</MenuItem>
          <MenuItem value={"30"}>30</MenuItem>
          <MenuItem value={"45"}>45</MenuItem>
          <MenuItem value={"60"}>60</MenuItem>
        </Select>
        <Typography sx={{ color: "red" }}>{errors.slotDuration}</Typography>

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
          <Typography sx={{ color: "red" }}>{errors.workingDays}</Typography>
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
