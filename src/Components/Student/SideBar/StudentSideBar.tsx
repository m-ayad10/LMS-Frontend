import { Fragment, useState } from "react";
import logo from "../../../assets/banner-man-1.png";
import { FaBars, FaBookOpen, FaHeart, FaKey } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import {  NavLink } from "react-router-dom";
import "./style.css";
import './responsive.css'
import { ImCross } from "react-icons/im";
import type  { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

interface SidebarProp{
    children?:ReactNode
}

function SideBarContainer(){
  const user=useSelector((state:RootState)=>state.user)
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const menuItems = [
    { id: "profile", icon: <FaUserAlt className="sidebar-link-icon" />, label: "Profile", path: "/profile" },
    { id: "wishlist", icon: <FaHeart className="sidebar-link-icon" />, label: "Wishlist", path: "/wishlist" },
    {
      id: "my courses",
      icon: <FaBookOpen className="sidebar-link-icon" />,
      label: "My courses",
      path: "/mycourses",
    },
    { id: "Account", icon: <FaKey className="sidebar-link-icon" />, label: "Account", path: "/account" },
    // { id: "logout", icon: <FiSettings />, label: "Logout", path:'/login' },
  ];
  return(
    <>
    <div className={`sidebar-container ${open ?'sidebar-expanded':'sidebar-collapsed'}`}>
          <div className="sidebar-header">
            {open && (
              <>
              <div className="flex flex-col items-center">
                <img src={user?.user?.profile||logo} className="sidebar-user-avatar" alt="" />
                <span className="sidebar-username">{user.status=='succeeded'?user?.user?.firstName+" "+user?.user?.lastName:'User'}</span>
            </div>
              </>
            )}

            {open ? (
              <ImCross onClick={toggleOpen} className="text-[0.9rem] cursor-pointer" />
            ) : (
              <FaBars onClick={toggleOpen} className="sidebar-toggle-icon" />
            )}
          </div>

          {menuItems.map((value) => {
            return (
              <Fragment key={value.id}>
                <NavLink to={`${value.path}`}  className={({isActive})=>`sidebar-link-item${isActive?' active-sidebar-link-item':''}`}> 
                  {/* <div className="sidebar-link-item"> */}
                    {value.icon}
                    {open && <p className="sidebar-link-label">{value.label}</p>}
                  {/* </div> */}
                </NavLink>
              </Fragment>
            );
          })}
        </div>
    </>
  )
}

function StudentSideBar({children}:SidebarProp) {

  return (
    <>
      <div className="sidebar-layout">
        <SideBarContainer />

        <div className="sidebar-main-content">
            {children}
        </div>
      </div>
    </>
  );
}


export default StudentSideBar;
