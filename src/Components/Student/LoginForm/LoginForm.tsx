import { FaUserAlt } from "react-icons/fa";
import image from "../../../assets/login-security.gif";
import "./style.css";
import "./responsive.css";
import { FaLock } from "react-icons/fa6";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/Slices/Auth/AuthThunk";
import type { AppDispatch } from "../../../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    let newErrors: { email?: string; password?: string } = {};

    if (!email?.trim()) {
      newErrors.email = "Invalid email";
    }

    if (!password?.trim()) {
      newErrors.password = "Invalid password";
    }

    if (Object.keys(newErrors).length > 0) {
      return setError((prev) => ({ ...prev, ...newErrors }));
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      toast.success(result.message || "Login successfully");
      if (result.data?.role === "student") navigate("/");
      if (result.data?.role === "instructor") navigate("/instructor");
      if (result.data?.role === "admin") navigate("/admin");
    } catch (error: any) {
      console.log(error);
      toast.error(error || "Something went wrong");
    }
  };
  return (
    <>
      <section className="auth-section">
        <div className="auth-image-cont">
          <img src={image} className="auth-image" alt="login image" />
        </div>
        <div className="auth-form-cont">
          <div className="auth-content">
            <h3 className="auth-title">
              Login<span className="text-[#754FFE]">!</span>{" "}
            </h3>
            <p className="auth-description">
              Explore, learn, and grow with us. enjoy a seamless and enriching
              educational journey. lets begin!
            </p>
            <form action="" className="auth-form" onSubmit={handleLogin}>
              {error.email && <p className="error-message">{error.email}</p>}
              <label htmlFor="email" className="auth-input-label">
                Your email
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  className="auth-input-field"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                />
              </div>
              {error.password && (
                <p className="error-message">{error.password}</p>
              )}
              <label htmlFor="email" className="auth-input-label">
                Your password
              </label>
              <br />
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input
                  type="password"
                  className="auth-input-field"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                />
              </div>
              <button className="auth-button">Login</button>
              <p className="auth-switch">
                Don't have an account?{" "}
                <Link to={"/signup"}>
                  <span className="auth-link">Sign up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default LoginForm;
