import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import fetch from "node-fetch";

import module from "../CSS/Dashboard.module.css";

function DashBorad() {
  const navigate = useNavigate();

  const [dname, setDname] = useState("");
  const [dataAll, setDataAll] = useState([]);

  function handleDoctorChange(e) {
    setDname(e.target.value);
  }

  useEffect(() => {
    const named = {
      searchField: dname,
    };
    searchDoctors(named);
  }, [dname]);
  let statusCode;

  const token = localStorage.getItem("token");
  const searchDoctors = async (data) => {
    await fetch(
      "http://localhost:4222/api/doctor/doctordetail/getdoctorsname",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })

      .then((res) => {
        if (statusCode === 400) {
          console.log(res + "wwwwwwwwww");
        }
        if (statusCode === 200) {
          console.log("data: ", res);

          setDataAll(res);
        }
      });
  };

  function handleLogOut() {
    localStorage.clear();
    navigate("/");
  }

  function doctorDetail(e) {
    const id = e;

    navigate(`/api/doctordetails/${id}`);
  }

  function toAddDoctor() {
    navigate(`/api/addoctors`);
  }

  return (
    <div data-testid="dash-1" className={module.mainConatinerDash}>
      <Box sx={{ padding: "2rem" }}>
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
              fontSize: "1.5rem",
              color: "#08090B",
            }}
          >
            <Link to="/" className={module.titleLogo}>
              DOOK ®
            </Link>
          </Typography>
          <Button
            variant="outlined"
            sx={{
              border: "2px solid black",
              borderRadius: "30px",
              fontWeight: "bold",
              float: "right",
              fontSize: "1.5rem",
              color: "#08090B",
            }}
            onClick={handleLogOut}
          >
            LogOut
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "blur(10px)",
          backdropFilter: "saturate(130%) blur(10px)",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          borderRadius: "50px",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "Bold",
            marginTop: "50px",
            color: "#013455",
          }}
        >
          GET AN APPOINTEMNT TO YOUR NEAREST DOCTOR.
        </Typography>
        <Box>
          <SearchIcon sx={{ fontSize: 50, color: "#454949", opacity: "60%" }} />
          <input
            placeholder="Search Doctor Name"
            className={module.inputSearchIcon}
            onChange={handleDoctorChange}
            type="search"
          />
          <hr />
        </Box>
        <div className={module.divSmalls}>
          {
            // border:"2px solid #EAE0DA"
            dname &&
              dataAll &&
              dataAll.map((item) => {
                return (
                  <Button
                    sx={{
                      fontSize: "1.3rem",
                      color: "#454949",
                      paddingBottom: "5px",
                      animationDelay: "2sec",
                      margin: "10px",
                      borderRadius: "10px",
                      justifyContent: "space-between",
                      padding: "20px 20px 20px 1rem",
                      "&:hover": {
                        background: "blur(10px)",
                        backdropFilter: "saturate(200%) blur(10px)",
                        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                        borderRadius: "50px",
                      },
                      animationDelay: "250ms",
                      fontWeight: "bold",
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 5px 10px",
                    }}
                    onClick={() => doctorDetail(item._id)}
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    {" "}
                    <span className={module.buttonFlex}>
                      <Avatar sx={{ marginRight: "20px" }} src={item.img} />{" "}
                      {item.doctorName}
                    </span>{" "}
                  </Button>
                );
              })
          }
          {dname && (
            <Button
              onClick={toAddDoctor}
              sx={{
                fontSize: "1.3rem",
                color: "#454949",
                paddingBottom: "5px",
                animationDelay: "2sec",
                margin: "10px",
                borderRadius: "10px",
                justifyContent: "space-between",
                padding: "20px 20px 20px 1rem",
                "&:hover": {
                  background: "blur(10px)",
                  backdropFilter: "saturate(200%) blur(10px)",
                  boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                  borderRadius: "50px",
                },
                animationDelay: "250ms",
                fontWeight: "bold",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 5px 10px",
              }}
              endIcon={<ArrowForwardIosIcon />}
            >
              {" "}
              <span className={module.buttonFlex}>ADD NEW DOCTOR</span>{" "}
            </Button>
          )}

          <option value="value" />
        </div>
      </Box>
    </div>
  );
}

export default DashBorad;
