import { useLocation } from "react-router-dom";
import InstructorRoutes from "./InstructorRoutes";
import StudentRoutes from "./StudentRoutes";
import { useEffect } from "react";
import { fetchWishlist } from "./Redux/Slices/Wishlist/WishlistThunk";
import { fetchCart } from "./Redux/Slices/Cart/CartThunk";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./Redux/store";
import { fetchCourses } from "./Redux/Slices/Course/CourseThunk";
import { fetchCategory } from "./Redux/Slices/Category/CategoryThunk";
import { fetchUser } from "./Redux/Slices/Auth/AuthThunk";
import { fetchEnrollded } from "./Redux/Slices/Enrolled/EnrolledThunk";
import AdminRoutes from "./AdminRoutes";
import { fetchInstructorDsahboard } from "./Redux/Slices/GetIntructorDashboard/InstructorDashboardThunk";
import { fetchAdminDsahboard } from "./Redux/Slices/AdminDashboard/AdminDashboardThunk";

function AppRoutes() {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const { status: userStatus, user } = useSelector(
    (state: RootState) => state.user
  );
  const cart = useSelector((state: RootState) => state.cart);
  const enrolled = useSelector((state: RootState) => state.enrolled);
  const instructorDashboard = useSelector(
    (state: RootState) => state.instructorDashboard
  );
  const adminDashboard=useSelector((state:RootState)=>state.adminDashboard)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userStatus == "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (userStatus === "succeeded") {
      if (wishlist.status === "idle"&&user.role==='student') {
        dispatch(fetchWishlist());
      }
      if (cart.status === "idle" && user.role==='student') {
        dispatch(fetchCart());
      }
      if (enrolled.status === "idle" && user.role=='student' ) {
        dispatch(fetchEnrollded());
      }
      if (adminDashboard.status === "idle" && user.role=='admin' ) {
        dispatch(fetchAdminDsahboard());
      }
       if (instructorDashboard.status === "idle" && user.role=='instructor') {
        dispatch(fetchInstructorDsahboard());
      }
    }
  }, [dispatch, userStatus]);

 

  const location = useLocation();
  if (location.pathname.startsWith("/instructor")) {
    return <InstructorRoutes />;
  }
  if (location.pathname.startsWith("/admin")) {
    return <AdminRoutes />;
  }
  return <StudentRoutes />;
}

export default AppRoutes;
