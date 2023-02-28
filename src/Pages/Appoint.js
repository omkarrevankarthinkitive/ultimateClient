import React from "react";

import { HorizontalNonLinearStepper } from "./AddAppointment";

function Appoint() {
  return (
    <div data-testid="apt-1" style={{ display: "flex" }}>
      <div>
        <HorizontalNonLinearStepper />
      </div>
    </div>
  );
}

export default Appoint;
