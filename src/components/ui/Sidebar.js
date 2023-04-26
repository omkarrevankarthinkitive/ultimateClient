import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { NavLink } from "react-router-dom";

import { Typography, Box } from "@mui/material";

import module from "../../CSS/Sidebar.module.css";

function SideBar({ newLocation }) {
  const { collapseSidebar } = useProSidebar();

  const idParam = localStorage.getItem("id");

  function handleOperate(){
    window.location.href("/api/doctordetails/advance");

  }
  return (
    <Sidebar backgroundColor="#FFFDF1" className={module.sidebarMenuContainer}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          className={module.sidearmenuItemContainer}
        >
          <Box className={module.menuItemContainer}>
            <Typography className={module.menuItemContainerHead}>
              DOOK®
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem icon={<HomeOutlinedIcon />}>
          <NavLink
            to={`/api/doctordetails/${idParam}`}
            className={({ isActive }) =>
              isActive ? module.activeMenuItemListItem : module.menuItemListItem
            }
          >
            Doctor Details
          </NavLink>{" "}
        </MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />}>
          <NavLink
            to="/api/doctordetails/addappointment"
            className={({ isActive }) =>
              isActive ? module.activeMenuItemListItem : module.menuItemListItem
            }
          >
            Add Appointment
          </NavLink>
        </MenuItem>
        <MenuItem icon={<ContactsOutlinedIcon />}>
          <NavLink
            to="/api/doctordetails/view"
            className={({ isActive }) =>
              isActive ? module.activeMenuItemListItem : module.menuItemListItem
            }
          >
            View Appointment
          </NavLink>{" "}
        </MenuItem>
        <MenuItem icon={<ScheduleIcon />}>
          <NavLink
            to="/api/doctordetails/advance"
            className={({ isActive }) =>
              isActive ? module.activeMenuItemListItem : module.menuItemListItem
            }
            onClick={handleOperate}
          >
            Schedule Apt
          </NavLink>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
