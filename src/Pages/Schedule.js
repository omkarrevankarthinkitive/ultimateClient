import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ConstructionOutlined } from "@mui/icons-material";
import ModalApt from "../components/ModalApt";

const localizer = momentLocalizer(moment);

const today = moment().format("YYYY-MM-DD");

const schedualrId = localStorage.getItem("id").toString();
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
  const [upApt, setUpApt] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalID, setModlID] = useState("");

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    const today2 = moment(); // Get today's date
    const thirtiethDay = moment(today2).add(30, "days"); // Add 30 days to today's date
    const lastDay = thirtiethDay.format("YYYY-MM-DD"); // Output: date 30 days from today in format 'YYYY-MM-DD'

    async function waitedItsCall() {
      await fetch(
        `http://localhost:4222/api/schedule/getslot?doctorId=${schedualrId}&startDate=${today}&endDate=${lastDay}`
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
    }

    const fetchCreatedAppointments = async () => {
      const response = await fetch("http://localhost:4222/api/appointment/get");
      const data = await response.json();

      const filteredData = data.filter(
        (appointment) => appointment.doctorId === schedualrId
      );

      const formattedEvents = filteredData.map((appointment) => {
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
      setUpApt(formattedEvents);
    };

    waitedItsCall() && fetchCreatedAppointments();
  }, []);

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

    if (event.id) {
      setModlID(event.id);
    } else {
      setModlID(undefined);
    }

    const date3 = new Date(event.start);
    selectFormattedDate(moment(date3).format("YYYY-MM-DD")); // "2023-03-16"

    const date = new Date(event.start);

    await selectStartSlot(moment(date).format("h:mm A").toString());

    const date2 = new Date(event.end);

    await selectEndSlot(moment(date2).format("h:mm A").toString());

    await setDataStart(moment(date).format("HH:mm").toString());
    await setDataEnd(moment(date2).format("HH:mm").toString());

    console.log(event, "seeeellee");
  }

  function handleCloseModal() {
    setSelectedEvent(null);
  }
  function handleSelectSlot(slotInfo) {
    // You can use the `slotInfo` parameter to get information about the selected slot
    // Here, you can open a modal or do any other action when a slot is selected
  }

  //validtions
  const validateInputs = (inputs) => {
    let errors = {};
    if (
      inputs.patientFirstName.length < 2 ||
      inputs.patientFirstName.length > 50
    ) {
      errors.patientFirstName =
        "First name should be between 2 to 50 characters";
    }
    if (
      inputs.patientLastName.length < 2 ||
      inputs.patientLastName.length > 50
    ) {
      errors.patientLastName = "Last Name should be between 2 to 50 characters";
    }
    if (inputs.reason.length < 2 || inputs.reason.length > 50) {
      errors.reason = "Reason should be between 2 to 50 characters";
    }

    return errors;
  };

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

  function addScheduleDir(e) {
    const validationErrors = validateInputs(scehedlar);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const ScheduleCredential = {
      doctorId: schedualrId,
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

  function openModal(e) {
    return true;
  }

  function EditApt(data) {
    fetch("http://localhost:4222/api/appointment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        function handleRefresh() {
          window.location.reload(true);
        }
        handleRefresh();
      })
      .catch((error) => console.error(error));
  }

  function ediParent() {
    const validationErrors = validateInputs(scehedlar);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const editableData = {
      aptId: modalID,
      patientFirstName: scehedlar.patientFirstName,
      patientLastName: scehedlar.patientLastName,
      reason: scehedlar.reason,
    };
    EditApt(editableData);
    handleCloseModal();
  }

  console.log(events, "sssss");
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
        <ModalApt
          reason={scehedlar.reasons}
          modalID={modalID}
          patientLastName={scehedlar.patientLastName}
          patientFirstName={scehedlar.patientFirstName}
          openModal={openModal}
          scehedlar={scehedlar}
          handleCloseModal={handleCloseModal}
          startSlot={startSlot}
          endSlot={endSlot}
          formattedDate={formattedDate}
          handleChange={handleChange}
          errors={errors}
          events={events}
          addScheduleDir={addScheduleDir}
          ediParent={ediParent}
        />
      )}
    </Box>
  );
}

export default Schedule;
