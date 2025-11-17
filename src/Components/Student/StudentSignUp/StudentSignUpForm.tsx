import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import image from "../../../assets/login-security.gif";
import { HiPhoto } from "react-icons/hi2";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";
import { Link, useNavigate } from "react-router-dom";

function StudentSignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profile, setProfile] = useState<File>();
  const [error, setError] = useState<any>({});
  const navigate=useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!profile) newErrors.profile = "Profile file is required";
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    const formData = new FormData();
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    if (profile) {
      formData.append("profile", profile);
    }
   try {
  await toast.promise(
    useFetch(`${server_url}/student/register`, {
      method: "POST",
      body: formData,
      credentials: "include",
    }),
    {
      loading: "Signing up...",
      success: (result: any) => {
        if (!result.success) throw new Error(result?.message || "Signup failed");
        navigate("/otp",{state:{email}});
        return <b>Verification code sent!</b>;
      },
      error: (err: any) => <b>{err?.message || "Signup failed"}</b>,
    }
  );
} catch (error: any) {
  toast.error(error?.message || "Something went wrong");
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
              Student Signup<span className="text-[#754FFE]">!</span>{" "}
            </h3>
            <p className="auth-description">
              Explore, learn, and grow with us. enjoy a seamless and enriching
              educational journey. lets begin!
            </p>
            <form action="" className="auth-form" onSubmit={handleSignup}>
              {error.firstName && (
                <p className="error-message">{error.firstName}</p>
              )}
              <label htmlFor="firstName" className="auth-input-label">
                First name
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your first name"
                />
              </div>

              {error.lastName && (
                <p className="error-message">{error.lastName}</p>
              )}
              <label htmlFor="lastName" className="auth-input-label">
                LastName
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your last name"
                />
              </div>

              {error.email && <p className="error-message">{error.email}</p>}
              <label htmlFor="email" className="auth-input-label">
                Your email
              </label>
              <br />
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your email"
                />
              </div>

              {error.password && (
                <p className="error-message">{error.password}</p>
              )}
              <label htmlFor="password" className="auth-input-label">
                Your password
              </label>
              <br />
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                  placeholder="Enter your password"
                />
              </div>

              {error.profile && (
                <p className="error-message">{error.profile}</p>
              )}
              <label htmlFor="profile" className="auth-input-label">
                Select profile
              </label>
              <br />
              <div className="auth-input-group">
                <HiPhoto className="auth-input-icon" />
                <input
                  type="file"
                  name="profile"
                  onChange={(e) => setProfile(e.target.files?.[0])}
                  className="auth-input-field"
                />
              </div>

              {/* <input type="image" /> */}
              <button className="auth-button">Sign up</button>
              <p className="auth-switch">
                Alldready have an account?{" "}
                <Link to={'/login'}>
                <span className="auth-link">Login</span>
                </Link>
              </p>
              <p className="auth-switch">
                <Link to={'/instructor/signup'}>
                <span className="auth-link">Sign up</span> </Link>as a instructor
                
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default StudentSignUpForm;
