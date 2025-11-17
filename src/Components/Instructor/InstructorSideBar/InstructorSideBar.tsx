import { Fragment, useState } from "react";
import logo from "../../../assets/banner-man-1.png";
import { FaBars, FaBookMedical, FaKey } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import {  NavLink, useNavigate } from "react-router-dom";

import { ImCross } from "react-icons/im";
import type  { ReactNode } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { server_url } from "../../../Hooks/customHook";
import type { UserReturn } from "../../../Redux/Slices/Auth/AuthType";
import toast from "react-hot-toast";
import { removeAuth } from "../../../Redux/Slices/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";

interface SidebarProp{
    children?:ReactNode
}


function SideBarContainer(){
   const [open, setOpen] = useState<boolean>(false);
   const user=useSelector((state:RootState)=>state.user)
   const navigate=useNavigate()
   const dispatch=useDispatch<AppDispatch>()
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const menuItems = [
    { id: "dashboard", icon: <MdDashboard className="sidebar-link-icon" />, label: "Dashboard", path: "/instructor" },
    { id: "profile", icon: <FaUserAlt className="sidebar-link-icon" />, label: "Profile", path: "/instructor/profile" },
    {
      id: "manage courses",
      icon: <FaBookMedical className="sidebar-link-icon" />,
      label: "Manage courses",
      path: "/instructor/managecourse",
    },
    { id: "Account", icon: <FaKey className="sidebar-link-icon" />, label: "Account", path: "/instructor/account" },
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
  
  return(
    <>
     <div className={`sidebar-container ${open ?'sidebar-expanded':'sidebar-collapsed'}`}>
          <div className="sidebar-header">
            {open && (
              <>
              <div className="flex flex-col items-center">
                <img src={user?.user?.profile||logo} className="sidebar-user-avatar" alt="" />
                <span className="sidebar-username">{user.status=='succeeded'?user?.user?.firstName+" "+user?.user?.lastName:'Instructor'}</span>
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
                <NavLink to={`${value.path}`} end className={({isActive})=>`sidebar-link-item${isActive?' active-sidebar-link-item':''}`}> 
                  {/* <div className="sidebar-link-item"> */}
                    {value.icon}
                    {open && <p className="sidebar-link-label">{value.label}</p>}
                  {/* </div> */}
                </NavLink>
              </Fragment>
            );
          })}
          <div className="sidebar-link-item" onClick={()=>handleLogout()}> 
            <MdLogout className="sidebar-link-icon"/>
            {open && <p className="sidebar-link-label">Logout</p>}
          </div>
        </div>
    </>
  )
}

function InstructorSideBar({children}:SidebarProp) {
 

  return (
    <>
      <div className="sidebar-layout">
       <SideBarContainer/>
        <div className="sidebar-main-content">
            {children}
        </div>
      </div>
    </>
  );
}

export default InstructorSideBar;
