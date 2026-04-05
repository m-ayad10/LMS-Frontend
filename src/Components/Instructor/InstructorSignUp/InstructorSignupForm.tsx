import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { server_url, useFetch } from "../../../Hooks/customHook";
import { Link, useNavigate } from "react-router-dom";


function InstructorSignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profile, setProfile] = useState<File>();
  const [loading,setLoading]=useState(false)
  const [bio, setBio] = useState<string>("");
  const [error, setError] = useState<any>({});
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!profile) newErrors.profile = "Profile file is required";
    if (!bio.trim()) newErrors.bio = "Bio is required";

    if (Object.keys(newErrors).length > 0) {
      setLoading(false)
      setError(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    if (profile) formData.append("profile", profile);
    formData.append("bio", bio.trim());

    try {
         await toast.promise(
    useFetch(`${server_url}/instructor/register`, {
      method: "POST",
      body: formData,
      credentials: "include",
    }),
    {
      loading: "Creating...",
      success: (result: any) => {
        setLoading(false)
        if (!result.success) throw new Error(result.message || "Error saving");
        navigate("/otp",{state:{email}});
        return <b>Settings saved!</b>;
      },
      error: (err: any) => <b>{err?.message || "Could not save."}</b>,
    }
  );
    } catch (error: any) {
      setLoading(false)
      toast.error(error?.message || error || "Something went wrong");
    }
  };

  return (
    <>
      <section className="auth-section">
        <div className="auth-left">

          <div className="auth-left-content">
            <h2 className="auth-left-heading">Share your expertise</h2>
            <p className="auth-left-sub">
              Build and publish your courses to thousands of eager students around the world.
            </p>
            <ul className="auth-left-features">
              <li>Build and sell courses with ease</li>
              <li>Keep 70% of every sale you make</li>
            </ul>
          </div>
          <p className="auth-left-footer">© 2026 Academy. All rights reserved.</p>
        </div>
        <div className="auth-right">
          <div className="auth-form-box">
            <h3 className="auth-title">Become an instructor</h3>
            <p className="auth-description">
              Share your knowledge and reach thousands of students
            </p>
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="auth-row">
                <div className="auth-row-item">
                  {error.firstName && (
                    <p className="error-message">{error.firstName}</p>
                  )}
                  <label htmlFor="firstName" className="auth-input-label">
                    First name
                  </label>
                  <div className="auth-input-group">
                    <FaUserAlt className="auth-input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="auth-input-field"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div className="auth-row-item">
                  {error.lastName && (
                    <p className="error-message">{error.lastName}</p>
                  )}
                  <label htmlFor="lastName" className="auth-input-label">
                    Last name
                  </label>
                  <div className="auth-input-group">
                    <FaUserAlt className="auth-input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="auth-input-field"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              {error.email && <p className="error-message">{error.email}</p>}
              <label htmlFor="email" className="auth-input-label">
                Email
              </label>
              <div className="auth-input-group">
                <FaUserAlt className="auth-input-icon" />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input-field"
                  placeholder="you@example.com"
                />
              </div>

              {error.password && (
                <p className="error-message">{error.password}</p>
              )}
              <label htmlFor="password" className="auth-input-label">
                Password
              </label>
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                  placeholder="Create a password"
                />
              </div>

              {error.profile && (
                <p className="error-message">{error.profile}</p>
              )}
              <label htmlFor="profile" className="auth-input-label">
                Profile photo
              </label>
              <div className="auth-input-group">
                <HiPhoto className="auth-input-icon" />
                <input
                  type="file"
                  name="profile"
                  onChange={(e) => setProfile(e.target.files?.[0])}
                  className="auth-input-field"
                />
              </div>

              {error.bio && <p className="error-message">{error.bio}</p>}
              <label htmlFor="bio" className="auth-input-label">
                Tell us about yourself
              </label>
              <div className="auth-input-group">
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="auth-input-textfield"
                  placeholder="Share your expertise, experience and what you'd like to teach..."
                ></textarea>
              </div>

              <button className="auth-button" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </button>
              <p className="auth-switch">
                Already have an account?{" "}
                <Link to={'/login'}>
                  <span className="auth-link">Log in</span>
                </Link>
              </p>
              <p className="auth-switch">
                <Link to={'/signup'}>
                  <span className="auth-link">Sign up</span>
                </Link>{" "}as a student
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default InstructorSignUpForm;
