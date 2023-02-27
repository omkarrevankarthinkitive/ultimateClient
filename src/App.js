import "./App.css";

//routes
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DashBorad from "./Pages/DashBorad";
//importing react router dom
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ProtectedRoutes from "./shared/ProtectedRoutes";
import DocDetails from "./Pages/DocDetails";

import Appoint from "./Pages/Appoint";
import { HorizontalNonLinearStepper } from "./Pages/AddAppointment";
import RightDocDetals from "./components/ui/RightDocDetals";
import ViewAppointment from "./Pages/ViewAppointment";

import { ProSidebarProvider } from "react-pro-sidebar";
import AddDoctors from "./Pages/AddDoctors";

function App() {
  let { id } = useParams();
  return (
    <ProSidebarProvider>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/users" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/api/dashboard" element={<DashBorad />} />
          </Route>

          <Route path="/api/doctordetails" element={<DocDetails />}>
            <Route path="/api/doctordetails/:id" element={<RightDocDetals />} />
            <Route
              path="/api/doctordetails/addappointment"
              element={<HorizontalNonLinearStepper />}
            />
            <Route
              path="/api/doctordetails/view"
              element={<ViewAppointment />}
            />
          </Route>

          <Route path="/api/apt" element={<Appoint />} />
          <Route path="/api/addoctors" element={<AddDoctors />} />
        </Routes>
      </BrowserRouter>
    </ProSidebarProvider>
  );
}

export default App;
