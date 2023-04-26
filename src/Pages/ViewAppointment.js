import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import fetch from "node-fetch";
import module from "../CSS/ViewApt.module.css";


const getIdOfTheDoc=localStorage.getItem("id")


export default function ViewAppointment() {
  const [initial, setInitial] = useState([]);
  const [field, setField] = useState("");

  let statusCode;

  const getAppointment = async () => {
    await fetch("http://localhost:4222/api/appointment/get", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })
      .then((res) => {
        statusCode = res.status;
    const newArray= res.filter((item)=>{
    return item.doctorId=== getIdOfTheDoc
     })
     setInitial(newArray)
      })

 
  };

  function changeApt(e) {
    setField(e.target.value);
  }

  const appointmentSearch = async () => {
    await fetch(`http://localhost:4222/api/appointment?search=${field}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })

      .then((res) => {
     
        if (statusCode === 200) {
          setInitial(res);
        }
      });
  };

  useEffect(() => {
    
    field.length >> 0 ? appointmentSearch() : getAppointment();
  }, [field]);

  return (
    <TableContainer
      data-testid="viewApt-1"
      sx={{
        background: "#FFFDF1",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        padding: "3rem",
        height: "70vh",
        maxWidth: "50vw",
        border:"3px solid #003450",
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon sx={{ width: "60px", height: "80px", color: "#013552" }} />
        <input
          type="text"
          className={module.inputSearch}
          value={field}
          onChange={changeApt}
        />
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              First Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              Last Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              start Time
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              End Time
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              Reason
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "17px" }}
              align="left"
            >
              DoctorId
            </TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {initial ?
            (initial.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.patientFirstName}
                </TableCell>

                <TableCell align="left">{row.patientLastName}</TableCell>
                <TableCell align="left">{row.startTime}</TableCell>
                <TableCell align="left">{row.endTime}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.reason}</TableCell>
                <TableCell align="left">{row.doctorId}</TableCell>
              </TableRow>
            ))):[]}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
