import { Fragment } from "react";
import logo from "../../../assets/banner-man-1.png";
import { FaBookOpen, FaHeart, FaKey } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./style.css";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

interface SidebarProp {
    children?: ReactNode
}

const menuItems = [
  { id: "profile",    icon: <FaUserAlt />,   label: "Profile",    path: "/profile" },
  { id: "wishlist",   icon: <FaHeart />,     label: "Wishlist",   path: "/wishlist" },
  { id: "my courses", icon: <FaBookOpen />,  label: "My Courses", path: "/mycourses" },
  { id: "Account",    icon: <FaKey />,       label: "Account",    path: "/account" },
];

function SideBarContainer() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <aside className="sidebar-container">
      <div className="sidebar-user">
        <img
          src={user?.user?.profile || logo}
          className="sidebar-user-avatar"
          alt="avatar"
        />
        <div className="sidebar-user-info">
          <span className="sidebar-username">
            {user.status === "succeeded"
              ? (user?.user?.firstName ?? "") + " " + (user?.user?.lastName ?? "")
              : "My Account"}
          </span>
          <span className="sidebar-user-role">Student</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Fragment key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " sidebar-link-active" : ""}`
              }
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-label">{item.label}</span>
            </NavLink>
          </Fragment>
        ))}
      </nav>
    </aside>
  );
}

function StudentSideBar({ children }: SidebarProp) {
  return (
    <div className="sidebar-layout">
      <SideBarContainer />
      <div className="sidebar-main-content">
        {children}
      </div>
    </div>
  );
}


export default StudentSideBar;
