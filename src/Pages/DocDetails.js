import React, { useEffect, useState } from "react";
import "../CSS/DocDetail.css";

import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";
import fetch from "node-fetch";

function DocDetails() {
  const [allData, setDataAll] = useState([]);
  const location = useParams();
  const newLocation = location.id;

  let justData = {
    _id: newLocation,
  };
  useEffect(() => {
    getdocByID(justData);
  }, []);

  let statusCode;

  let token = localStorage.getItem("token");
  const getdocByID = async (data) => {
    await fetch(
      `http://localhost:4222/api/doctor/doctordetail/doctorsPage?id=${data._id}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        statusCode = res.status;
        return res.json();
      }).then(
        (res)=>{
          console.log(res,"ressewdd")
         setDataAll(res)

         
        }
      )

     
  };

  console.log(allData,"alldat")

  return (
    <div style={{ display: "flex" }}>
      <Box sx={{ flex: 1 }}>
        {allData && <SideBar allData={allData} newLocation={newLocation} />}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 6,
          backgroundImage: `url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {allData ? <Outlet /> : null}
      </Box>
    </div>
  );
}

export default DocDetails;
