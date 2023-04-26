import React from "react";
import { Button, Modal, Typography, Box } from "@mui/material";

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

function ModalApt({
  reason,
  openModal,
  handleCloseModal,
  startSlot,
  formattedDate,
  endSlot,
  handleChange,
  errors,
  addScheduleDir,
  modalID,
  events,
  ediParent,
}) {
  const valueID = events.find((item) => {
    return item.id === modalID;
  });
  console.log(valueID);
  const idName = valueID && valueID.title;
  console.log(valueID, "skkkkkk");

  let str = idName;
  console.log(str);
  let arr = str && str?.split(" ");
  let firstNameId = arr && arr[0];
  let lastNameID = arr && arr[1];

  console.log(modalID, "[[[[");
  return (
      <Modal open={openModal} onClose={handleCloseModal} >
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
            onBlur={handleChange}
            name="patientFirstName"
            defaultValue={modalID ? firstNameId : ""}
          />
          <Typography sx={{ color: "red" }}>
            {errors.patientFirstName}
          </Typography>

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
            onBlur={handleChange}
            name="patientLastName"
            defaultValue={modalID ? lastNameID : ""}
          />
          <Typography sx={{ color: "red" }}>
            {errors.patientLastName}
          </Typography>

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
            onBlur={handleChange}
            value={reason}
            name="reason"
          />
          <Typography sx={{ color: "red" }}>{errors.reason}</Typography>

          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "black" }}
            onClick={modalID ? ediParent : addScheduleDir}
          >
            {modalID ? "EDIT" : "Submit"}
          </Button>
        </Box>
      </Modal>
  );
}

export default ModalApt;
