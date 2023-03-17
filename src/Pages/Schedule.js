import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const today = moment().format("YYYY-MM-DD");
console.log(today, "todddddayyy");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFDF1",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Schedule() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startSlot, selectStartSlot] = useState("");
  const [endSlot, selectEndSlot] = useState("");
  const [formattedDate, selectFormattedDate] = useState("");
  const [scehedlar, setSchedular] = useState({
    doctorId: "",
    patientFirstName: "",
    patientLastName: "",
    startTime: "",
    endTime: "",
    reason: "",
    date: "",
  });

  const [dataStart, setDataStart] = useState("");
  const [dataEnd, setDataEnd] = useState("");
  const [errors, setErrors] = useState({});
  const [useEff, setUseEff] = useState(false);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    const today2 = moment(); // Get today's date
    const thirtiethDay = moment(today2).add(30, "days"); // Add 30 days to today's date
    const lastDay = thirtiethDay.format("YYYY-MM-DD"); // Output: date 30 days from today in format 'YYYY-MM-DD'

    fetch(
      `http://localhost:4222/api/schedule/getslot?doctorId=6412f2e70f95f477879d7ee8&startDate=${today}&endDate=${lastDay}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAvailableSlots(data);
        const events = data.map((slot) => ({
          id: slot.id,
          title: "Available Slot",
          start: new Date(`${slot.date}T${slot.startTime}:00`),
          end: new Date(`${slot.date}T${slot.endTime}:00`),
        }));
        setEvents(events);
      });

    const fetchCreatedAppointments = async () => {
      const response = await fetch("http://localhost:4222/api/appointment/get");
      const data = await response.json();
      const formattedEvents = data.map((appointment) => {
        return {
          id: appointment._id,
          title: `${appointment.patientFirstName} ${appointment.patientLastName}`,
          start: moment(
            `${appointment.date}T${appointment.startTime}`
          ).toDate(),
          end: moment(`${appointment.date}T${appointment.endTime}`).toDate(),
          color: "red",
        };
      });
      setEvents((events) => [...events, ...formattedEvents]);
    };
    fetchCreatedAppointments();
  }, [useEff]);

  useEffect(() => {}, [startSlot, endSlot, useEff]);

  const eventStyleGetter = (event) => {
    if (event.title === "Available Slot") {
      return {
        style: {
          backgroundColor: "#f0ad4e", // set background color to yellow
        },
      };
    } else {
      return {
        style: {
          backgroundColor: "red",
        },
      };
    }
    return {};
  };

  async function handleSelectEvent(event) {
    setSelectedEvent(event);
    const date3 = new Date(event.start);
    selectFormattedDate(moment(date3).format("YYYY-MM-DD")); // "2023-03-16"

    const date = new Date(event.start);

    await selectStartSlot(moment(date).format("h:mm A"));

    const date2 = new Date(event.end);

    await selectEndSlot(moment(date2).format("h:mm A"));

    await setDataStart(moment(date).format("h:mm"));
    await setDataEnd(moment(date2).format("h:mm"));
  }

  function handleCloseModal() {
    setSelectedEvent(null);
  }
  function handleSelectSlot(slotInfo) {
    // You can use the `slotInfo` parameter to get information about the selected slot
    console.log(slotInfo);

    // Here, you can open a modal or do any other action when a slot is selected
  }

  const AddSchedule = async (data) => {
    await fetch("http://localhost:4222/api/appointment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      function handleRefresh() {
        window.location.reload(true);
      }

      handleRefresh();

      return res.json();
    });
  };

  function handleChange(e) {
    setSchedular((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function addScheduleDir() {
    const ScheduleCredential = {
      doctorId: "6412f2e70f95f477879d7ee8",
      patientFirstName: scehedlar.patientFirstName,
      patientLastName: scehedlar.patientLastName,
      startTime: dataStart,
      endTime: dataEnd,
      reason: scehedlar.reason,
      date: formattedDate,
    };
    AddSchedule(ScheduleCredential);

    handleCloseModal();
  }

  return (
    <Box
      sx={{
        width: "93%",
        height: "93%",
        backgroundColor: "#FFFDF1",
        padding: "1%",
        color: "black",
        border: "3px solid #003450",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        eventPropGetter={eventStyleGetter}
        selectable={true}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
      {selectedEvent && (
        <Modal open={true} onClose={handleCloseModal}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h6 style={{ color: "black" }}>{startSlot.toString()}</h6>
              <h6 style={{ color: "black" }}>{endSlot.toString()}</h6>
              <h6 style={{ color: "black" }}>{formattedDate.toString()}</h6>
            </Box>

            <label
              style={{
                color: "#013453",
                paddingBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Patient First Name
            </label>

            <input
              style={{
                background: "transparent",
                border: "1px solid",
                width: "100%",
                marginBottom: "1rem",
                padding: "3px",
              }}
              onChange={handleChange}
              name="patientFirstName"
            />
            <label
              style={{
                color: "#013453",
                paddingBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Patient Last Name
            </label>
            <input
              style={{
                background: "transparent",
                border: "1px solid",
                width: "100%",
                marginBottom: "1rem",
                padding: "3px",
              }}
              onChange={handleChange}
              name="patientLastName"
            />

            <label
              style={{
                color: "#013453",
                paddingBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Reason
            </label>
            <input
              style={{
                background: "transparent",
                border: "1px solid",
                width: "100%",
                marginBottom: "1rem",
                padding: "3px",
              }}
              onChange={handleChange}
              name="reason"
            />

            <Button
              variant="outlined"
              sx={{ color: "black", borderColor: "black" }}
              onClick={addScheduleDir}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default Schedule;
