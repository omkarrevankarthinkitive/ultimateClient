import React from "react";
import { useState } from "react";
import { Button, Box, Typography, MenuItem, Select } from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import fetch from "node-fetch";

import module from ".././CSS/Addappointment.module.css";

const steps = [
  "Select Location and Room",
  "Fill the details",
  "set an appointment",
];

const initalState = {
  reason: "",
  location: "",
  room: "",
  diagnosis: "",
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  cellPhone: "",
  homePhone: "",
  email: "",
  address: "",
  Province: "",
  city: "",
  postalCode: "",
  aptTime: "",
  aptDate: "",
};

export const HorizontalNonLinearStepper = () => {
  const [user, setUser] = useState(initalState);

  const [activeStep, setActiveStep] = useState(0);
  const [change, setChange] = useState(false);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  console.log("Here");

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const aptFunction = async (data) => {
    await fetch("http://localhost:4222/api/appointment", {
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
        if (statusCode === 400) {
          console.log(res + "wwwwwwwwww");
        }
        if (statusCode === 201) {
          console.log("data: ", res);
        }
      });
  };

  const SubmitHandler = (event) => {
    const AddAppointmentPost = {
      reason: user.reason,
      location: user.location,
      room: user.room,
      diagnosis: user.diagnosis,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      gender: user.gender,
      cellPhone: user.cellPhone,
      homePhone: user.homePhone,
      email: user.email,
      address: user.address,
      Province: user.Province,
      city: user.city,
      postalCode: user.postalCode,
      aptTime: user.aptTime,
      aptDate: user.aptDate,
    };

    aptFunction(AddAppointmentPost);
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  let statusCode;

  return (
    <Box data-testid="addApt-1" className={module.topMainContainer}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {change ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={() => {
                  handleReset();
                }}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep + 1 === 1 ? (
              <>
                <Box sx={{ margin: "1rem" }}>
                  <h3>Appointment Reason</h3>
                  <input
                    value={user?.reason}
                    onChange={handleChange}
                    placeholder="Reason"
                    className={module.inputStylelong}
                    name="reason"
                  />
                </Box>

                <Box sx={{ margin: "1rem" }}>
                  <h3>Location</h3>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={user.location}
                    onChange={handleChange}
                    name="location"
                    sx={{
                      height: "40px",
                      width: "100%",
                      backgroundColor: "#eef0f1",
                    }}
                  >
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Bangalore">Bangalore</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ margin: "1rem" }}>
                  <h3>Room</h3>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={user.room}
                    onChange={handleChange}
                    name="room"
                    sx={{
                      height: "40px",
                      width: "100%",
                      backgroundColor: "#eef0f1",
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ margin: "1rem" }}>
                  <h3>Diagnosis</h3>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={user.diagnosis}
                    onChange={handleChange}
                    name="diagnosis"
                    sx={{
                      height: "40px",
                      width: "100%",
                      backgroundColor: "#eef0f1",
                    }}
                  >
                    <MenuItem value="covid">covid</MenuItem>
                    <MenuItem value="Diarrhea">Diarrhea</MenuItem>
                    <MenuItem value="Chickenpox">Chickenpox</MenuItem>
                    <MenuItem value="diabetes">diabetes</MenuItem>
                  </Select>
                </Box>
              </>
            ) : activeStep + 1 === 2 ? (
              <>
                <h4 className="patientDetailTitle">Patient Details</h4>
                <Box sx={{ display: "flex", gap: "20px", margin: "1rem" }}>
                  <Box className={module.flexComp}>
                    <p>First Name</p>
                    <input
                      value={user?.firstName}
                      onChange={handleChange}
                      name="firstName"
                      className={module.inputStylelong}
                    />
                  </Box>
                  <Box className={module.flexComp}>
                    <p>Last Name</p>
                    <input
                      value={user?.lastName}
                      onChange={handleChange}
                      name="lastName"
                      className={module.inputStylelong}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    margin: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <p className={module.blockComp}>Date of Birth</p>
                  <input
                    value={user?.dob}
                    onChange={handleChange}
                    name="dob"
                    className={module.inputStylelong}
                    type="date"
                  />
                </Box>

                <Box sx={{ display: "flex", gap: "20px", margin: "1rem" }}>
                  <Box className={module.flexComp}>
                    <p>Gender</p>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={user.gender}
                      onChange={handleChange}
                      name="gender"
                      sx={{
                        border: "1px solid black",
                        width: "100%",
                        backgroundColor: "#eef0f1",
                        height: "40px",
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </Box>
                  <Box className={module.flexComp}>
                    <p>Cell Phone</p>
                    <input
                      value={user?.cellPhone}
                      onChange={handleChange}
                      name="cellPhone"
                      className={module.inputStylelong}
                    />
                  </Box>
                </Box>

                <Box sx={{ margin: "1rem" }}>
                  <p>Home Phone</p>
                  <input
                    value={user?.homePhone}
                    onChange={handleChange}
                    name="homePhone"
                    className={module.inputStyleShort}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    margin: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <p className={module.blockComp}>Email</p>
                  <input
                    value={user?.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className={module.inputStylelong}
                  />
                </Box>

                <Box sx={{ margin: "1rem" }}>
                  <p>Address</p>
                  <input
                    value={user?.address}
                    onChange={handleChange}
                    name="address"
                    placeholder="Address"
                    className={module.inputStylelong}
                  />
                </Box>
                <Box sx={{ display: "flex", margin: "1rem", gap: "20px" }}>
                  <input
                    value={user?.Province}
                    onChange={handleChange}
                    name="Province"
                    placeholder="province"
                    className={module.inputStylelongFlex}
                  />
                  <input
                    value={user?.city}
                    onChange={handleChange}
                    name="city"
                    placeholder="City"
                    className={module.inputStylelongFlex}
                  />
                </Box>
                <Box sx={{ margin: "1rem" }}>
                  <input
                    value={user?.postalCode}
                    onChange={handleChange}
                    name="postalCode"
                    placeholder="Postal Code"
                    className={module.inputStyleShort}
                  />
                </Box>
              </>
            ) : activeStep + 1 == 3 ? (
              <>
                <h4 className={module.patientDetailTitle}>Patient Details</h4>

                <Box
                  sx={{
                    display: "flex",
                    margin: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <p className={module.blockComp}>Appointment Time</p>
                  <input
                    onChange={handleChange}
                    name="aptTime"
                    className={module.inputStylelong}
                    type="time"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    margin: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <p className={module.blockComp}>Appointment Day</p>
                  <input
                    onChange={handleChange}
                    name="aptDate"
                    className={module.inputStylelong}
                    type="date"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ffff",
                      color: "#1976D2",
                      "&:hover": {
                        backgroundColor: "#ffff",
                        color: "#1976D2",
                        marginTop: "1rem",
                      },
                    }}
                    onClick={() => {
                      SubmitHandler();
                      setChange(true);
                    }}
                  >
                    FINISH
                  </Button>
                </Box>
              </>
            ) : null}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                  color: "#1976D2",
                  backgroundColor: "#ffff",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#ffff", color: "#1976D2" },
                }}
                variant="contained"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                sx={{
                  mr: 1,
                  color: "#1976D2",
                  backgroundColor: "#ffff",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#ffff", color: "#1976D2" },
                }}
                variant="contained"
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    onClick={handleComplete}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};
