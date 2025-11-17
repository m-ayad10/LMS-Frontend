import navlogo from "../../../assets/Logo navbar.png";
import { FiChevronDown, FiShoppingCart, FiUser } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { BiHeart, BiLogOut } from "react-icons/bi";
import { useState } from "react";
import "./style.css";
import "./responsive.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import image from "../../../assets/banner-man-1.png";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { server_url } from "../../../Hooks/customHook";
import type { UserReturn } from "../../../Redux/Slices/Auth/AuthType";
import toast from "react-hot-toast";
import { removeAuth } from "../../../Redux/Slices/Auth/AuthSlice";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const cart = useSelector((state: RootState) => state.cart);
  const [search,setSearch]=useState<string>('')
  const [open, setOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSeachOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
      <nav className="navbar-cont">
        <div className="navbar">
          <div className="nav-start">
            <img src={navlogo} className="nav-logo" alt="" />
            <div className="hidden md:flex items-center gap-2 md:gap-1">
              <Link to={"/"}>
                <p className="nav-text">Home</p>
              </Link>
              <Link to={"/courses"}>
                <p className="nav-text">Courses</p>
              </Link>
              <div className="nav-search ">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  onKeyDown={(e)=>{
                    if(e.key==='Enter')
                    {
                      navigate('/courses',{state:{search}})
                    }
                  }}
                  className="nav-search-input"
                />
                <AiOutlineSearch className="nav-search-icon" />
              </div>
            </div>
            {!open && (
              <div className="relative block md:hidden ">
                <AiOutlineSearch
                  className="nav-search-btn "
                  onClick={() => setIsSeachOpen(!isSearchOpen)}
                />
                {isSearchOpen && (
                  <div className="absolute z-10 top-10 left-0 translate-search-dropdown">
                    <div className="nav-search ">
                      <input
                        type="text"
                        placeholder="Search"
                        className="nav-search-input"
                      />
                      <AiOutlineSearch className="nav-search-icon" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="nav-end ">
            <div className="flex md:hidden">
              {open ? (
                <ImCross
                  className="navbar-bar"
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <FaBars className="navbar-bar" onClick={() => setOpen(!open)} />
              )}
            </div>
            <div className="hidden md:flex gap-3 items-center lg:gap-1.5">
              <Link to={"/mycourses"}>
                <p className="nav-text">My course</p>
              </Link>
              <Link to={"/cart"}>
                <div className="nav-cart">
                  {user.status === "succeeded" && (
                    <p className="nav-cart-count">
                      {cart.cart?.courses?.length || 0}
                    </p>
                  )}
                  <FiShoppingCart className="nav-cart-icon" />
                </div>
              </Link>
              <Link to={"/wishlist"}>
                <div className="nav-cart">
                  {user.status === "succeeded" && (
                    <p className="nav-cart-count">
                      {wishlist?.wishlist?.length || 0}
                    </p>
                  )}
                  <BiHeart className="nav-cart-icon" />
                </div>
              </Link>
              {user.status === "succeeded" ? (
                <div className="relative">
                  <div className="user-dropdown" onClick={toggleOpen}>
                    <img src={image} alt="user" className="user-dropdown-img" />
                    <FiChevronDown className="user-dropdown-icon" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-14 z-10 bg-[#E6EAEF] px-4 py-3 rounded-[4px] ">
                      <Link to={"/profile"}>
                        <p className="dropdown-item">
                          <FiUser className="dropdown-item-icon" />
                          <span className="flex text-nowrap ">
                            User profile
                          </span>
                        </p>
                      </Link>
                      <hr className="w-full m-0 p-0 h-[0.5px]" />
                      <Link to={"/mycourses"}>
                        <p className="dropdown-item">
                          <CgNotes className="dropdown-item-icon" />
                          <span className="flex text-nowrap ">My courses </span>
                        </p>
                      </Link>
                      <hr className="w-full m-0 p-0 h-[0.5px]" />
                      <Link to={"/cart"}>
                        <p className="dropdown-item">
                          <FiShoppingCart className="dropdown-item-icon" />
                          <span className="flex text-nowrap ">Cart </span>
                        </p>
                      </Link>
                      <hr className="w-full m-0 p-0 h-[0.5px]" />
                      <Link to={"/wishlist"}>
                        <p className="dropdown-item">
                          <BiHeart className="dropdown-item-icon" />
                          <span className="flex text-nowrap ">Wishlist</span>
                        </p>
                      </Link>
                      <hr className="w-full m-0 p-0 h-[0.5px]" />
                      <p className="dropdown-item">
                        <BiLogOut className="dropdown-item-icon" />
                        <span
                          className="flex text-nowrap "
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"/login"}>
                  <button className="nav-login-btn">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {open && (
          <>
            <Link to={"/"}>
              <div className="nav-responsive-item"> Home</div>
            </Link>
            <Link to={"/profile"}>
              <div className="nav-responsive-item">User profile</div>
            </Link>
            <Link to={"/courses"}>
              <div className="nav-responsive-item">Courses</div>
            </Link>
            <Link to={"/mycourses"}>
              <div className="nav-responsive-item">My course</div>
            </Link>
            <Link to={"/cart"}>
              <div className="nav-responsive-item">Cart</div>
            </Link>
            <Link to={"/wishlist"}>
              <div className="nav-responsive-item">Wishlist</div>
            </Link>
            {/* <div className='nav-search '>
                        <input type="text" placeholder='Search'  className='w-full nav-search-input '/>
                        <AiOutlineSearch className='nav-search-icon'/>
                    </div> */}
            {user.status == "succeeded" && (
              <div className="nav-responsive-item" onClick={handleLogout}>
                Logout
              </div>
            )}
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
