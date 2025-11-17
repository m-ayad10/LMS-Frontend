import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Students/Home";
import Login from "./Pages/Students/Login";
import StudentSignup from "./Pages/Students/StudentSignup";
import ExploreCourses from "./Pages/Students/ExploreCourses";
import Cart from "./Pages/Students/Cart";
import Profile from "./Pages/Students/Profile";
import StudentChangePassword from "./Pages/Students/StudentChangePassword";
const WishlistPage = React.lazy(() => import("./Pages/Students/Wishlist"));
const MyCoursesPage = React.lazy(() => import("./Pages/Students/MyCourses"));

import CourseDetailPage from "./Pages/Students/CourseDetailPage";
import Otp3 from "./Components/Student/Otp/Otp";
import { ProtectedRoute } from "./AuthMiddleware";

function StudentRoutes() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp3 />} />
          <Route path="/detail/:id" element={<CourseDetailPage />} />
          <Route path="/signup" element={<StudentSignup />} />
          <Route path="/courses" element={<ExploreCourses />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<StudentChangePassword />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/mycourses" element={<MyCoursesPage />} />
          </Route>
          {/* <Route path='/course/detail/:id' element={<DummyCourseDetail/>} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default StudentRoutes;
