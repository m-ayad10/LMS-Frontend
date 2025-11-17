import { Fragment, useState } from "react";
import logo from "../../../assets/banner-man-1.png";
import { FaBars, FaGraduationCap, FaKey } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { ImCross } from "react-icons/im";
import type { ReactNode } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { RiBookShelfLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { removeAuth } from "../../../Redux/Slices/Auth/AuthSlice";
import type { UserReturn } from "../../../Redux/Slices/Auth/AuthType";
import { server_url } from "../../../Hooks/customHook";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";

interface SidebarProp {
  children?: ReactNode;
}

function SideBarContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const menuItems = [
    {
      id: "dashboard",
      icon: <MdDashboard className="sidebar-link-icon" />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      id: "instructors",
      icon: <FaGraduationCap className="sidebar-link-icon" />,
      label: "Instructors",
      path: "/admin/instructors",
    },
    {
      id: "student",
      icon: <FaUsers className="sidebar-link-icon" />,
      label: "Students",
      path: "/admin/students",
    },
    {
      id: "manage courses",
      icon: <RiBookShelfLine className="sidebar-link-icon" />,
      label: "Manage category",
      path: "/admin/category",
    },
    {
      id: "Account",
      icon: <FaKey className="sidebar-link-icon" />,
      label: "Account",
      path: "/admin/account",
    },
    // { id: "logout", icon: <FiSettings />, label: "Logout", path:'/login' },
  ];
  const handleLogout = async () => {
    try {
      const response = await fetch(`${server_url}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data: UserReturn = await response.json();
      if (!data.success) {
        toast.error(data.message || "Logout failed");
      } else {
        toast.success(data.message || "Logout successfull");
        dispatch(removeAuth());
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.message || error || "Internal server error");
    }
  };
  return (
    <>
      <div
        className={`sidebar-container ${
          open ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      >
        <div className="sidebar-header relative">
          {open && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={user?.user?.profile || logo}
                  className="sidebar-user-avatar"
                  alt=""
                />
                <span className="sidebar-username">{"   Admin         "}</span>
              </div>
            </>
          )}
           {
                !open && <FaBars onClick={toggleOpen} className="sidebar-toggle-icon" />
            }
            {
              open&& <div className=" absolute right-4 top-3">
            <ImCross
              onClick={toggleOpen}
              className="text-[1.1rem] cursor-pointer text-gray-700 hover:text-gray-900"
            />
          </div>
            }
        </div>

        {menuItems.map((value) => {
          return (
            <Fragment key={value.id}>
              <NavLink
                to={`${value.path}`}
                end
                className={({ isActive }) =>
                  `sidebar-link-item${
                    isActive ? " active-sidebar-link-item" : ""
                  }`
                }
              >
                {/* <div className="sidebar-link-item"> */}
                {value.icon}
                {open && <p className="sidebar-link-label">{value.label}</p>}
                {/* </div> */}
              </NavLink>
            </Fragment>
          );
        })}
        <div className="sidebar-link-item" onClick={() => handleLogout()}>
          <MdLogout className="sidebar-link-icon" />
          {open && <p className="sidebar-link-label">Logout</p>}
        </div>
      </div>
    </>
  );
}

function AdminSideBar({ children }: SidebarProp) {
  return (
    <>
      <div className="sidebar-layout">
        <SideBarContainer />
        <div className="sidebar-main-content">{children}</div>
      </div>
    </>
  );
}

export default AdminSideBar;
